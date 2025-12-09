import { Button } from "@heroui/react";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiCamera, BiMessageRounded, BiShareAlt } from "react-icons/bi";
import { BsEmojiSmile, BsSend } from "react-icons/bs";
import { Link } from "react-router-dom";
import { createComment } from "../../services/commentServices";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export default function CardBody({
  id,
  body,
  image,
  commentsLength,
  isPostDetails,
  setPostComments,
}) {
  const [commentMsg, setCommentMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);


  const {mutate , isPending} = useMutation({
    mutationFn: createComment,
    onSuccess: (data) => {
      setPostComments(data?.data.comments);
      setCommentMsg("");
      toast.success("Comment Added successfully");
    },
    onError:(error)=>{
      console.log(error);
      
    }
  });

  return (
    <>

      <div className="px-4 pb-3">
        <p className="text-gray-800">{body}</p>
      </div>


      <div className="w-full">
        <img
          src={
            image ||
            "https://media.istockphoto.com/id/1980276924/vector/no-photo-thumbnail-graphic-element-no-found-or-available-image-in-the-gallery-or-album-flat.jpg?s=612x612&w=0&k=20&c=ZBE3NqfzIeHGDPkyvulUw14SaWfDj2rZtyiKv3toItk="
          }
          alt="Post content"
          className={`w-full  object-cover ${isPostDetails ? "" : "h-80"}`}
        />
      </div>

      
      <div className="flex items-center gap-6 px-4 py-3 border-b border-gray-100">
        <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
          <AiOutlineHeart className="w-6 h-6" />
          <span className="font-medium">1200</span>
        </button>

        <Link
          to={`/post-details/${id}`}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
        >
          <BiMessageRounded className="w-6 h-6" />
          <span className="font-medium">{commentsLength}</span>
        </Link>

        <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
          <BiShareAlt className="w-6 h-6" />
          <span className="font-medium">17</span>
        </button>
      </div>


      <div className="flex items-center gap-3 p-4 border-b border-gray-100">
        <input
          onChange={(e) => setCommentMsg(e.target.value)}
          value={commentMsg}
          type="text"
          placeholder="Write your comment"
          className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          isLoading={isPending}
          onPress={() => {
            mutate({
              content: commentMsg,
              post: id,
            });
          }}
          disabled={commentMsg ? false : true}
          size="sm"
          variant="shadow"
          radius="full"
          color="primary"
          className=" disabled:bg-gray-400 disabled:cursor-not-allowed  cursor-pointer "
        >
          <BsSend />
        </Button>
        <button className="text-gray-400 hover:text-gray-600">
          <BiCamera className="w-5 h-5" />
        </button>
        <button className="text-gray-400 hover:text-gray-600">
          <BsEmojiSmile className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}
