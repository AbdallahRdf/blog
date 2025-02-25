import { useCallback, useContext, useEffect, useRef, useState } from "react";
import useCustomAxios from "./useCustomAxios";
import { AuthContext } from "../context/contexts";
import { toast } from "react-toastify";
import debounce from '../utils/debounce';
import useToast from "./useToast";

/**
 * Custom hook to manage likes and dislikes for a post, comment, or reply.
 * It fetches the initial reaction state (liked/disliked), tracks the counts,
 * and updates the state when a user interacts with like or dislike buttons.
 *
 * @param {number} likes - Initial count of likes.
 * @param {number} dislikes - Initial count of dislikes.
 * @param {string} postId - ID of the post to associate the reaction with.
 * @param {string} [commentId=null] - (Optional) ID of the comment, if applicable.
 * @param {string} [replyId=null] - (Optional) ID of the reply, if applicable.
 * @returns {Object} - An object containing the current likes count, dislikes count,
 *                     the states of the like and dislike buttons, and handler functions:
 *   @property {number} likesCount - Current count of likes.
 *   @property {number} dislikesCount - Current count of dislikes.
 *   @property {boolean} isLiked - Whether the current user has liked the item.
 *   @property {boolean} isDisliked - Whether the current user has disliked the item.
 *   @property {Function} handleLikeClick - Function to handle the like button click.
 *   @property {Function} handleDislikeClick - Function to handle the dislike button click.
 */

const useReaction = (likes, dislikes, postId, commentId = null, replyId = null) => {

    const { user, setAccessToken } = useContext(AuthContext);

    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);

    const isLikedRef = useRef(false);
    const isDislikedRef = useRef(false);

    const [likesCount, setLikesCount] = useState(likes);
    const [dislikesCount, setDislikesCount] = useState(dislikes);

    const likesCountRef = useRef(likes);
    const dislikesCountRef = useRef(dislikes);

    const url = useRef(`/posts/${postId}${commentId ? `/comments/${commentId}` : ''}${replyId ? `/replies/${replyId}` : ''}/reaction`);

    const customAxios = useCustomAxios();

    const { showToast } = useToast();

    const getReaction = useCallback(async () => {
        try {
            const response = await customAxios.get(url.current);
            setIsLiked(response.data.isLiked);
            setIsDisliked(response.data.isDisliked);
            isLikedRef.current = response.data.isLiked;
            isDislikedRef.current = response.data.isDisliked;
            response.data.accessToken && setAccessToken(response.data.accessToken);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setIsDisliked(false);
                setIsLiked(false);
            }
            if (!(error.response && error.response.status < 500)) {
                showToast('Failed to fetch your reaction. Please try again.', toast.error);
            }
        }
    }, [url]);

    useEffect(() => {
        if (user) {
            getReaction();
        }
    }, [user, getReaction]);

    const sendReaction = useCallback(debounce(async (isLiked, isDisliked, previousIsLiked, previousIsDisliked, previousLikesCount, previousDislikesCount) => {
        try {
            await customAxios.post(url.current, { isLiked, isDisliked });
        } catch (error) {
            // Revert to previous state
            setIsLiked(previousIsLiked);
            setIsDisliked(previousIsDisliked);
            setLikesCount(previousLikesCount);
            setDislikesCount(previousDislikesCount);

            isLikedRef.current = previousIsLiked;
            isDislikedRef.current = previousIsDisliked;
            likesCountRef.current = previousLikesCount;
            dislikesCountRef.current = previousDislikesCount;

            showToast('Failed to save you reaction', toast.error);
        }
    }, 5000), []);

    const handleLikeClick = () => {
        if (!user) {
            showToast('You need to log in to perform this action. Please log in or sign up to continue.');
            return;
        }
        // the item is disliked, and the like button is clicked
        if (!isLiked && isDisliked) {
            setIsDisliked(false);
            isDislikedRef.current = false;
            setDislikesCount(prev => prev - 1);
            dislikesCountRef.current -= 1;
        }
        setIsLiked(prev => !prev);
        isLikedRef.current = !isLikedRef.current;

        if (isLikedRef.current) {
            setLikesCount(prev => prev + 1);
            likesCountRef.current += 1;
        } else {
            setLikesCount(prev => prev - 1);
            likesCountRef.current -= 1;
        }

        sendReaction(isLikedRef.current, isDislikedRef.current, isLiked, isDisliked, likesCountRef.current, dislikesCountRef.current);
    }

    const handleDislikeClick = () => {
        if (!user) {
            showToast('You need to log in to perform this action. Please log in or sign up to continue.');
            return;
        }
        // the item is liked, and the dislike button is clicked
        if (!isDisliked && isLiked) {
            setIsLiked(false);
            isLikedRef.current = false;
            setLikesCount(prev => prev - 1);
            likesCountRef.current -= 1;
        }
        setIsDisliked(prev => !prev);
        isDislikedRef.current = !isDislikedRef.current;

        if (isDislikedRef.current) {
            setDislikesCount(prev => prev + 1);
            dislikesCountRef.current += 1;
        } else {
            setDislikesCount(prev => prev - 1);
            dislikesCountRef.current -= 1;
        }

        sendReaction(isLikedRef.current, isDislikedRef.current, isLiked, isDisliked, likesCountRef.current, dislikesCountRef.current);
    }

    return { likesCount, dislikesCount, isLiked, isDisliked, handleLikeClick, handleDislikeClick }
}

export default useReaction;