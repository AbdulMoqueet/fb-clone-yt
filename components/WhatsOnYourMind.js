import React, { useRef, useState } from "react";
import { IoVideocamSharp } from "react-icons/io5";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { GoSmiley } from "react-icons/go";
import { MdOutlineClose } from "react-icons/md";

import Button from "./Button";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const WhatsOnYourMind = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const fPicker = useRef(null);

  const { data: session } = useSession();

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const sendPost = async () => {
    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setLoading(false);
    setInput("");
    setSelectedFile(null);
  };

  return (
    <div
      className={`px-4 py-6 bg-white rounded-[17px] shadow-md mt-5 ${
        loading && "opacity-50"
      }`}
    >
      <div className="flex gap-4 border-b border-gray-300 pb-4">
        <img
          className="w-[44px] h-[44px] object-cover rounded-full"
          src={session?.user?.image}
          alt="dp"
        />

        <input
          className="outline-none border-none w-[100%] text-[18px] placeholder:text-gray-600"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What's on your mind?"
        />
      </div>

      {selectedFile && (
        <div className="relative">
          <img src={selectedFile} alt="pic" />
          <div
            className="bg-gray-300 text-gray-500 absolute top-0 right-0 m-[10px] text-[18px] h-[30px] w-[30px] rounded-full cursor-pointer grid place-items-center"
            onClick={() => {
              setSelectedFile(null);
              fPicker.current.value = "";
            }}
          >
            <MdOutlineClose />
          </div>
        </div>
      )}

      <div className="flex justify-between px-4 pt-6">
        <div className="flex items-center gap-2 cursor-pointer">
          <IoVideocamSharp className="text-[#E42645] text-[30px]" />
          <p className="text-gray-500 font-medium">Live Video</p>
        </div>

        <label htmlFor="filePicker">
          <div className="flex items-center gap-2 cursor-pointer">
            <MdOutlinePhotoLibrary className="text-[#41B35D] text-[30px]" />
            <p className="text-gray-500 font-medium">Photo/video</p>
          </div>

          <input
            type="file"
            name="filePicker"
            id="filePicker"
            accept="image/*"
            onChange={addImageToPost}
            ref={fPicker}
            hidden
          />
        </label>

        <div className="hidden sm:flex items-center gap-2 cursor-pointer">
          <GoSmiley className="text-[#ECBF55] text-[30px]" />
          <p className="text-gray-500 font-medium">Feeling/activity</p>
        </div>
      </div>

      <Button input={input} selectedFile={selectedFile} onClick={sendPost} />
    </div>
  );
};

export default WhatsOnYourMind;
