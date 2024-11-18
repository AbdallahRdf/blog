import React, { useCallback, useEffect, useRef, useState } from 'react'
import Cards from '../components/postsPage/Cards'
import { ListFilter, Loader } from 'lucide-react'
import useCustomAxios from '../hooks/useCustomAxios';
import { useNavigate } from 'react-router-dom';
import CardsSkeleton from '../components/skeletons/CardsSkeleton';
import RetryBtn from '../components/commun/RetryBtn';

const FOOTER_HEIGHT = 380;
const LIMIT = 9;

function Posts() {

  const didFetch = useRef(false); // prevents getting the same posts twice when the component first mounts, because of the strict mode

  const isFetchingRef = useRef(true);
  const [isFetching, setIsFetching] = useState(true); // to check if a request to get posts was sent, if yes show a little spinner

  const [hasMore, setHasmore] = useState(false); // is there more posts
  const cursor = useRef(null);
  const [posts, setPosts] = useState([]);

  const [showRetryBtn, setShowRetryBtn] = useState(false);
  const selectSortingRef = useRef(null);

  const [h1Title, setH1Title] = useState('Latest posts');

  const navigator = useNavigate();

  const customAxios = useCustomAxios();

  const fetchPosts = useCallback(async () => {
    showRetryBtn && setShowRetryBtn(false) // if retry button is visible then hide it;

    const nextCursor = cursor.current ? `&cursor=${cursor.current}` : '';
    const sort = selectSortingRef.current ? `&sort=${selectSortingRef.current.value}` : '';

    try {
      const response = await customAxios.get(`/posts?limit=${LIMIT}${nextCursor}${sort}`);
      setPosts(prev => [...prev, ...response.data.posts]);
      cursor.current = response.data.cursor;
      setHasmore(Boolean(response.data.cursor));
    } catch (error) {
      console.log(error);
      if (error.code === 'ERR_NETWORK') {
        setShowRetryBtn(true);
      } else if (error.response && error.response.status >= 500) {
        navigator('/internal-server-error', {
          state: {
            statusCode: error.response.status,
            message: 'Server Error'
          }
        });
      }
    } finally {
      setIsFetching(false);
      isFetchingRef.current = false;
      setH1Title(`${(selectSortingRef.current) ? (selectSortingRef.current.value.charAt(0).toUpperCase() + selectSortingRef.current.value.slice(1)) : 'Latest'} posts`);
    }
  }, [showRetryBtn, cursor, selectSortingRef])

  useEffect(() => {
    scroll(0, 0);
    if (!didFetch.current) {
      didFetch.current = true;
      fetchPosts();
    }
  }, []);

  useEffect(() => {
    // handles infinite scroll
    const handleScroll = () => {
      // if it is fetching (a request is already sent) or cursor.current is null (there is not more posts to get)
      if (isFetchingRef.current || !cursor.current) return;

      const { clientHeight, scrollHeight, scrollTop } = document.scrollingElement;

      // if we reach the bottom, no getting posts request is pending, and there is more posts (cursor.current !== null)
      if ((clientHeight + scrollTop >= scrollHeight - FOOTER_HEIGHT)) {
        isFetchingRef.current = true;
        setIsFetching(true);
        fetchPosts();
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  // fetch posts all over again with the selected sort (top, latest, oldest)
  const handleChange = () => {
    cursor.current = null;
    setPosts([]);
    fetchPosts();
  }

  return (
    <div className='mx-4 mt-36'>
      <div className='flex justify-between px-2 items-center flex-nowrap gap-y-3'>
        <h1 className='text-3xl sm:text-4xl font-extrabold transition-colors duration-500 ease-in-out dark:text-zinc-200'>
          {h1Title}
        </h1>
        <div className='flex items-center transition-colors duration-500 ease-in-out dark:text-zinc-200'>
          <label htmlFor='sort' className=''>
            <ListFilter className='inline size-5 sm:size-6' />
          </label>
          <select onChange={handleChange} ref={selectSortingRef} className='py-1 ps-1 sm:ps-2 pe-2 bg-transparent text-mg sm:text-lg cursor-pointer transition-colors duration-500 ease-in-out bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50'>
            <option value='latest'>Latest</option>
            <option value='oldest'>Oldest</option>
            <option value='top'>Top</option>
          </select>
        </div>
      </div>

      {(posts.length > 0) && <Cards posts={posts} />}

      {((posts.length === 0) && isFetching) && <CardsSkeleton />}

      {showRetryBtn && <RetryBtn label='Unable to load posts' retry={fetchPosts} />}

      {
        (hasMore && isFetching)
        &&
        <div className='text-zinc-950 dark:text-zinc-50'>
          <Loader className='animate-spin size-8 mx-auto' />
        </div>
      }
    </div>
  )
}

export default Posts