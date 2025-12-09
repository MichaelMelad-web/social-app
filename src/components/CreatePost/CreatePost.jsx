import { Card, CardFooter, Divider, Input, Skeleton, useDisclosure } from "@heroui/react";

import { HiVideoCamera } from "react-icons/hi2";
import { IoMdPhotos } from "react-icons/io";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { FaFaceSmile } from "react-icons/fa6";
import CreatePostModal from "./CreatePostModal";
import { useContext } from "react";
import { authContext } from "../../context/AuthContext";

export default function CreatePost({getAllPosts}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const{userData,isLoading}=useContext(authContext)

  return (
   <>
    <Card className="">
    {isLoading ?       <div className=" w-full flex items-center gap-2 p-3">
      <div>
        <Skeleton className="shrink-0 flex rounded-full size-10" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-4/5 rounded-lg" />
      </div>
    </div>  : 
    
      <div className=" p-5 flex items-center gap-2">
        <div>
          <div>
            <img
              className="size-10 rounded-full overflow-hidden"
              src={userData.photo}
              alt=""
            />
          </div>
        </div>

        <Input
          isReadOnly
          placeholder={` "What's on your mind" ,${userData.name}?`}
          type="text"
          onClick={onOpen}
        />
      </div>}
      <Divider />

      <CardFooter className="py-5">
        <div className=" flex justify-between gap-30 ">
          <div className="flex  items-center gap-2">
            <HiVideoCamera color="orange" size={"30"} />
            <span>Go Live</span>
          </div>
          <div className="flex  items-center gap-2">
            <IoMdPhotos color="green" size={"30"} />
            <span>photo</span>
          </div>
          <div className="flex  items-center gap-2">
            <MdOutlineSlowMotionVideo color="red" size={"30"} />
            <span>Go Live</span>
          </div>
          <div className="flex  items-center gap-2">
            <FaFaceSmile color="blue" size={"30"} />
            <span>Go Live</span>
          </div>
        </div>
      </CardFooter>
    </Card>
    <CreatePostModal callback={getAllPosts} isOpen={isOpen} onOpenChange={onOpenChange}/>
   </>
  );
}
