

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@heroui/react";
import { useContext, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { authContext } from "../../context/AuthContext";
import { deleteComment, getPostComments, updateComment } from "../../services/commentServices";

export default function CardFooter({ comment, postUserId , postId , setPostComments }) {
  const { userData } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(comment?.content);

  async function updateUserComment() {
    setIsLoading(true);
    try {
      await updateComment(comment._id, newContent);
      await getNewComments(postId);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }


  async function deleteUserComment(commentId) {
    setIsLoading(true);
    try {
      await deleteComment(commentId);
      await getNewComments(postId);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getNewComments(postId) {
    try {
      const { data } = await getPostComments(postId);
      setPostComments(data.comments);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <img
            src={
              comment?.commentCreator?.photo?.includes("/undefined")
                ? "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                : comment?.commentCreator?.photo
            }
            alt={comment?.commentCreator?.name}
            className="w-10 h-10 rounded-full object-cover"
          />

          
          <div className="grow bg-gray-50 rounded-2xl px-4 py-3">
            <h4 className="font-semibold text-sm text-gray-900">
              {comment?.commentCreator?.name}
            </h4>

            {isEditing ? (
              <div>
                <textarea
                  className="w-full border p-2 rounded"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                ></textarea>

                <div className="flex gap-2 mt-2">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                    onClick={updateUserComment}
                  >
                    Update
                  </button>
                  <button
                    className="px-3 py-1 bg-gray-300 rounded"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-700 mt-1">{comment?.content}</p>
            )}
          </div>

          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {userData._id === postUserId &&
                userData._id === comment?.commentCreator?._id && (
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger className="cursor-pointer">
                      <BsThreeDotsVertical className="w-5 h-5" />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                      <DropdownItem
                        key="edit"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit
                      </DropdownItem>

                      <DropdownItem
                        color="danger"
                        className="text-danger-500"
                        key="delete"
                        onClick={() => deleteUserComment(comment._id)}
                      >
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
