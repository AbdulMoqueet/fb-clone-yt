import React from "react";
import { BsFacebook, BsMessenger } from "react-icons/bs";
import { AiOutlineSearch, AiFillHome } from "react-icons/ai";
import { IoStorefrontOutline, IoNotifications } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="py-2 px-4 bg-white shadow-md flex justify-between items-center top-0 sticky z-50">
      <div className="flex items-center gap-2">
        <BsFacebook className="text-primary text-[40px]" />

        <div className="relative hidden sm:block">
          <AiOutlineSearch className="absolute text-[20px] top-[10px] left-[10px] text-gray-500" />
          <input
            className="bg-[#F0F2F5] p-2 rounded-full pl-9 outline-none placeholder:text-gray-500"
            type="text"
            placeholder="Search Facebook"
          />
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-[100px] text-[30px] text-gray-500">
        <div className="relative">
          <AiFillHome className="text-primary" />
          <div className="absolute bg-primary -left-[40px] h-[3px] w-[110px] -bottom-[16px]"></div>
        </div>

        <IoStorefrontOutline />
        <svg viewBox="0 0 28 28" fill="currentColor" height="28" width="28">
          <path d="M25.5 14C25.5 7.649 20.351 2.5 14 2.5 7.649 2.5 2.5 7.649 2.5 14 2.5 20.351 7.649 25.5 14 25.5 20.351 25.5 25.5 20.351 25.5 14ZM27 14C27 21.18 21.18 27 14 27 6.82 27 1 21.18 1 14 1 6.82 6.82 1 14 1 21.18 1 27 6.82 27 14ZM7.479 14 7.631 14C7.933 14 8.102 14.338 7.934 14.591 7.334 15.491 6.983 16.568 6.983 17.724L6.983 18.221C6.983 18.342 6.99 18.461 7.004 18.578 7.03 18.802 6.862 19 6.637 19L6.123 19C5.228 19 4.5 18.25 4.5 17.327 4.5 15.492 5.727 14 7.479 14ZM20.521 14C22.274 14 23.5 15.492 23.5 17.327 23.5 18.25 22.772 19 21.878 19L21.364 19C21.139 19 20.97 18.802 20.997 18.578 21.01 18.461 21.017 18.342 21.017 18.221L21.017 17.724C21.017 16.568 20.667 15.491 20.067 14.591 19.899 14.338 20.067 14 20.369 14L20.521 14ZM8.25 13C7.147 13 6.25 11.991 6.25 10.75 6.25 9.384 7.035 8.5 8.25 8.5 9.465 8.5 10.25 9.384 10.25 10.75 10.25 11.991 9.353 13 8.25 13ZM19.75 13C18.647 13 17.75 11.991 17.75 10.75 17.75 9.384 18.535 8.5 19.75 8.5 20.965 8.5 21.75 9.384 21.75 10.75 21.75 11.991 20.853 13 19.75 13ZM15.172 13.5C17.558 13.5 19.5 15.395 19.5 17.724L19.5 18.221C19.5 19.202 18.683 20 17.677 20L10.323 20C9.317 20 8.5 19.202 8.5 18.221L8.5 17.724C8.5 15.395 10.441 13.5 12.828 13.5L15.172 13.5ZM16.75 9C16.75 10.655 15.517 12 14 12 12.484 12 11.25 10.655 11.25 9 11.25 7.15 12.304 6 14 6 15.697 6 16.75 7.15 16.75 9Z"></path>
        </svg>
        <svg viewBox="0 0 28 28" fill="currentColor" height="28" width="28">
          <path d="M23.5 9.5H10.25a.75.75 0 00-.75.75v7c0 .414.336.75.75.75H17v5.5H4.5v-19h19v5zm0 14h-5v-6.25a.75.75 0 00-.75-.75H11V11h12.5v12.5zm1.5.25V4.25C25 3.561 24.439 3 23.75 3H4.25C3.561 3 3 3.561 3 4.25v19.5c0 .689.561 1.25 1.25 1.25h19.5c.689 0 1.25-.561 1.25-1.25z"></path>
        </svg>
      </div>

      <div className="flex items-center gap-4">
        <div className="icon_wrapper text-[28px]">
          <CgMenuGridO />
        </div>

        <div className="icon_wrapper text-[20px]">
          <BsMessenger />
        </div>

        <div className="icon_wrapper text-[20px]">
          <IoNotifications />
        </div>

        <img
          className="w-[44px] cursor-pointer rounded-full"
          src={session.user?.image}
          alt="dp"
          onClick={signOut}
        />
      </div>
    </div>
  );
};

export default Navbar;
