
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@heroui/react";
import React, { useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { authContext } from "../../context/AuthContext";
import CreatePostModal from "../CreatePost/CreatePostModal";
import { deletePost } from "../../services/postServices";

export default function CardHeader({ photo, name, createdAt , postUserId , getAllPosts , post }) {
  const { userData } = useContext(authContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  async function deleteUserPost() {
    try {
      if (!post?._id) return;

      const data = await deletePost(post._id);
      console.log(data);

      getAllPosts(); 
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src={photo}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">
              {new Date(createdAt).toLocaleString("en-US", {
                dateStyle: "long",
                timeStyle: "short",
              })}
            </p>
          </div>
        </div>

        {userData._id === postUserId && (
          <Dropdown placement="bottom-end">
            <DropdownTrigger className="cursor-pointer">
              <BsThreeDotsVertical className="w-5 h-5" />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem onPress={onOpen} key="edit">
                Edit
              </DropdownItem>

              <DropdownItem
                color="danger"
                className="text-danger-500"
                key="delete"
                onPress={deleteUserPost}
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </div>

      <CreatePostModal
        post={post}
        
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
