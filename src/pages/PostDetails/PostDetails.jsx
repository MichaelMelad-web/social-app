import { useParams } from "react-router-dom";
import { gettSinglePost } from "../../services/postServices";
import { useEffect, useState } from "react";
import CardHeader from "../../components/PostCard/CardHeader";
import PostSkeleton from "../../components/Skeletons/PostSkeleton";
import CardBody from "../../components/PostCard/CardBody";
import CardFooter from "../../components/PostCard/CardFooter";

import Sidebar from "../../components/sidebar/Sidebar";

export default function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [postComments, setPostComments] = useState([]);

  async function getPostDetails(postId) {
    try {
      const { data } = await gettSinglePost(postId);
      // console.log(data);
      setPost(data.post);

      setPostComments(data.post.comments);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPostDetails(id);
  }, []);

  return (
    <>
      <title> PostDetails | SocialApp</title>
      <main className="min-h-screen bg-gray-200">
        <div className="container p-5">
          <div className="grid grid-cols-4">
            <div className="col-span-1">
              <Sidebar />
            </div>

            <div className="col-span-2 space-y-5">
              <div className="max-w-2xl  mx-auto m-5 bg-white rounded-lg shadow-sm border border-gray-200">
                {isLoading ? (
                  <PostSkeleton />
                ) : (
                  <>
                  
                    <CardHeader
                      photo={post?.user?.photo}
                      name={post?.user?.name}
                      createdAt={post.createdAt}
                      postUserId={post?.user?._id}
                      post={post}
                      getAllPosts={() => getPostDetails(id)} 
                    />

                    <CardBody
                      setPostComments={setPostComments}
                      id={id}
                      isPostDetails={true}
                      body={post.body}
                      image={post.image}
                      commentsLength={postComments.length}
                    />

                    {postComments.length > 0 && (
                      <>
                        {postComments.map((comment) => (
                          <CardFooter
                            key={comment._id}
                            comment={comment}
                            postUserId={post?.user?._id}
                            postId={id}
                            setPostComments={setPostComments}
                          />
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
