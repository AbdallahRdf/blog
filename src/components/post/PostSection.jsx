import { formatDate } from '../../utils/formatter';
import PostTitle from './PostTitle';
import PostPublishDate from './PostPublishDate';
import PostCover from './PostCover';
import InteractionBar from './InteractionBar';
import SideMenu from './SideMenu';
import PostBody from './PostBody';
import PostDescription from './PostDescription';
import { useSuspenseQuery } from '@tanstack/react-query';
import useCustomAxios from '../../hooks/useCustomAxios';
import { useNavigate, useParams } from 'react-router-dom';
import CommentsSection from '../comments/CommentsSection';

function PostSection() {

    const { slug } = useParams();

    const customAxios = useCustomAxios();

    const navigator = useNavigate();

    const {
        data: post,
    } = useSuspenseQuery({
        queryKey: ["post", slug],
        queryFn: async () => {
            try {
                const response = await customAxios.get(`/posts/${slug}`);
                return response.data;
            } catch (error) {
                console.log(error);
                if (error?.response?.status === 404) {
                    navigator(`/page-not-found`, {
                        statusCode: 404,
                        message: "Page not found"
                    });
                } else {
                    throw error;
                }
            }
        }
    })

    const postedAt = formatDate(post.createdAt);

    return (
        <>
            <div className='w-full xl:w-[1280px] mx-auto pt-32 pb-24 px-2 scroll-smooth'>
                <PostTitle title={post.title} />

                <PostPublishDate date={postedAt} />

                <div className="flex flex-col lg:flex-row gap-6">
                    <div className='w-full lg:max-w-4xl'>
                        <PostCover coverPath={post.cover} />

                        <InteractionBar post={post} />

                        <PostDescription description={post.description} />

                        <SideMenu author={post.author} headers={post.headers} tags={post.tags} isItOnTheSide={false} />

                        <PostBody postContent={post.content} />
                    </div>
                    <SideMenu author={post.author} headers={post.headers} tags={post.tags} />
                </div>
            </div>
            <CommentsSection postId={post._id} />
        </>
    )
}

export default PostSection