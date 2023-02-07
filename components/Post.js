import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaGlobeAmericas } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { TfiComment } from "react-icons/tfi";
import { useSession } from "next-auth/react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const Post = ({ data, id }) => {
  const { data: session } = useSession();

  const isAdmin = (post_data_id, session_id) => {
    if (post_data_id === session_id) return true;
    else if (session_id === "103122479951529079566") return true;

    return false;
  };

  return (
    <div className="py-4 bg-white rounded-[17px] shadow-md mt-5">
      <div className="px-4 flex justify-between items-center">
        <div className="flex gap-2">
          <img
            className="w-[44px] h-[44px] object-cover rounded-full"
            src={data.userImg}
            alt="dp"
          />
          <div>
            <h1 className="text-[16px] font-semibold">{data.username}</h1>
            <div className="text-gray-500 flex items-center gap-2">
              <p>1 d</p>
              <p>·</p>
              <FaGlobeAmericas />
            </div>
          </div>
        </div>

        <div className="text-gray-500 text-[26px] flex gap-4">
          <FiMoreHorizontal className="cursor-pointer" />
          {isAdmin(data.id, session?.user?.uid) && (
            <MdOutlineClose
              className="cursor-pointer"
              onClick={() => {
                // console.log("deleting: ", data.id);
                deleteDoc(doc(db, "posts", id));
              }}
            />
          )}
        </div>
      </div>

      <p className="px-4 mt-[15px] text-gray-800 font-normal">{data.text}</p>

      <div className="mt-[15px]">
        {data.image && <img src={data.image} alt="post pic" />}
      </div>

      <div className="mx-4 h-[1px] bg-gray-300 mt-[15px]"></div>

      <div className="flex mt-[7px] text-gray-500">
        <div className="flex gap-2 justify-center items-center w-[50%] py-2 rounded-[10px] hover:bg-gray-200 cursor-pointer">
          <AiOutlineLike className="text-[26px]" />
          <p className="font-medium">Like</p>
        </div>
        <div className="flex gap-2 justify-center items-center w-[50%] py-2 rounded-[10px] hover:bg-gray-200 cursor-pointer">
          <TfiComment className="text-[20px] translate-y-[4px]" />
          <p className="font-medium">Comment</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
