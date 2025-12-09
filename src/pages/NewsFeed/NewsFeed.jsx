import { Pagination, Skeleton, Slider } from "@heroui/react";
import Sidebar from "../../components/sidebar/Sidebar";
import PostCard from "../../components/Post/Post";

import { gettAllPosts } from "../../services/postServices";
import { useEffect, useState } from "react";
import PostSkeleton from "../../components/Skeletons/PostSkeleton";
import CreatePost from "../../components/CreatePost/CreatePost";
import { useQuery } from "@tanstack/react-query";
import Post from "../../components/Post/Post";

export default function NewsFeed() {
  const [page, setPage] = useState(1);
  const [initialLoad, setInitialLoad] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["getPosts", page],
    queryFn: () => gettAllPosts(page),
  });

  useEffect(() => {
    if (data?.data?.paginationInfo?.numberOfPages) {
      setTotalPages(data.data.paginationInfo.numberOfPages);
      setInitialLoad(false);
    }
  }, [data]);

  useEffect(()=>{
    window.scrollTo({top:0 ,behavior:"smooth"})
  },[page])
  return (
    <>
          <title> NewsFeed | SocialApp</title>
      <main className="min-h-screen bg-gray-200">
        <div className="container p-5">
          <div className="grid grid-cols-4">
            <div className="col-span-1">
              <Sidebar />
            </div>

            <div className="col-span-2 space-y-5">
              <CreatePost />

              {isLoading ? (
                [...Array(5)].map((_, index) => <PostSkeleton key={index} />)
              ) : (
                <>
                  {data?.data.posts &&
                    data?.data.posts.map((post) => (
                      <Post key={post.id} post={post} />
                    ))}
                </>
              )}
              {initialLoad ? (
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              ) : (
                <>
                  <Pagination
                    key={data?.data?.paginationInfo?.numberOfPages}
                    page={page}
                    total={
                      data?.data?.paginationInfo?.numberOfPages || totalPages
                    }
                    onChange={setPage}

                    showControls
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
