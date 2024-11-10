import React, { useCallback, useEffect, useRef, useState } from 'react'
import Cards from '../components/userHomePage/Cards'
import { ListFilter, Loader, RefreshCw } from 'lucide-react'
import useCustomAxios from '../hooks/useCustomAxios';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { UPLOAD_BUCKET } from '../config/upload';
import CardsSkeleton from '../components/skeletons/CardsSkeleton';

const FOOTER_HEIGHT = 380;
const LIMIT = 6;

function UserHomePage() {

  const abortController = useRef(); // used to abort when component unmounts

  const isFetchingRef = useRef(true);
  const [isFetching, setIsFetching] = useState(true); // to check if a request to get posts was sent, if yes show a little spinner

  const [hasMore, setHasmore] = useState(false); // is there more posts
  const cursor = useRef(null);
  const [posts, setPosts] = useState([]);

  const [showRetryBtn, setShowRetryBtn] = useState(false);
  const selectSortingRef = useRef(null);

  const navigator = useNavigate();

  const customAxios = useCustomAxios();

  // get the posts covers url;
  const setUpPostsCover = useCallback(async (posts) => {
    const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_API_KEY);

    return await Promise.all(posts.map(async (post) => {
      const { data: exists } = await supabase.storage.from(UPLOAD_BUCKET).exists(post.cover);
      post.cover = exists ? supabase.storage.from(UPLOAD_BUCKET).getPublicUrl(post.cover).data.publicUrl : null;
      post.isCoverLoaded = true; // this is used in the card component
      return post;
    }));
  }, []);

  const fetchPosts = useCallback(async (signal) => {
    showRetryBtn && setShowRetryBtn(false) // if retry button is visible then hide it;

    const nextCursor = cursor.current ? `&cursor=${cursor.current}` : '';
    const sort = selectSortingRef.current ? `&sort=${selectSortingRef.current.value}` : '';

    try {
      const response = await customAxios.get(`/posts?limit=${LIMIT}${nextCursor}${sort}`, { signal });

      // if there is no cursor then this is the first fetch request to get posts
      if (cursor.current) {
        setPosts(prev => [...prev, ...response.data.posts]); // add the posts whithout getting the posts covers
      } else {
        setPosts(response.data.posts);
      }

      const postsWithCovers = await setUpPostsCover(response.data.posts);

      if (cursor.current) {
        setPosts(prev => {
          // remove the previously added post that doesn't have yet a cover;
          const filteredPosts = prev.slice(0, -postsWithCovers.length);
          return [...filteredPosts, ...postsWithCovers];
        });
      } else {
        setPosts(postsWithCovers);
      }
      cursor.current = response.data.cursor;
      setHasmore(Boolean(response.data.cursor));

    } catch (error) {
      console.log(error);
      if (error.code === 'ERR_NETWORK') {
        setShowRetryBtn(true);
      } else if (error.response && error.response.status >= 500) {
        navigator('/internal-server-error', {
          state: {
            code: error.response.status,
            message: 'Server Error'
          }
        });
      }
    } finally {
      setIsFetching(false);
      isFetchingRef.current = false;
    }
  })

  useEffect(() => {
    abortController.current = new AbortController();

    fetchPosts(abortController.current.signal);

    return () => abortController.current.abort();
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
        abortController.current = new AbortController();
        fetchPosts(abortController.current.signal);
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  // fetch posts all over again with the selected sort (top, latest, oldest)
  const handleChange = () => {
    cursor.current = null;
    abortController.current = new AbortController();
    fetchPosts(abortController.current.signal);
  }

  const refetchPosts = () => {
    abortController.current = new AbortController();
    fetchPosts(abortController.current.signal);
  }

  return (
    <div className='mx-4'>
      <div className='flex justify-between px-2 items-center flex-nowrap gap-y-3'>
        <h1 className='text-3xl sm:text-4xl font-extrabold transition-colors duration-500 ease-in-out dark:text-zinc-200'>Latest posts</h1>
        <div className='flex items-center transition-colors duration-500 ease-in-out dark:text-zinc-200'>
          <label htmlFor='sort' className=''>
            <ListFilter className='inline size-5 sm:size-6' />
          </label>
          <select onChange={handleChange} ref={selectSortingRef} className='py-1 ps-1 sm:ps-2 pe-2 bg-transparent text-mg sm:text-lg cursor-pointer'>
            <option value='latest'>Latest</option>
            <option value='oldest'>Oldest</option>
            <option value='top'>Top</option>
          </select>
        </div>
      </div>

      {(posts.length > 0) && <Cards posts={posts} />}

      {((posts.length === 0) && isFetching) && <CardsSkeleton />}

      {
        showRetryBtn
        &&
        <div className='flex flex-col justify-center items-center gap-2 py-8'>
          <p className='transition-colors duration-500 ease-in-out text-lg sm:text-xl text-zinc-700 dark:text-zinc-200'>Unable to load posts</p>
          <button onClick={refetchPosts} className='transition-all duration-500 ease-in-out border border-zinc-200 bg-slate-50 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:border-zinc-800 dark:hover:text-zinc-200 text-base sm:text-lg py-2 sm:py-3 px-6 sm:px-8 mt-3 rounded-lg flex justify-center items-center gap-2'>
            <RefreshCw className='inline-block size-5 sm:size-6' />
            <span>Try again</span>
          </button>
        </div>
      }

      {
        (hasMore && isFetchingRef)
        &&
        <div className='text-zinc-950 dark:text-zinc-50'>
          <Loader className='animate-spin size-8 mx-auto' />
        </div>
      }
    </div>
  )
}

export default UserHomePage