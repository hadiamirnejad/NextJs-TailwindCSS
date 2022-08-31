import React from "react";
import { sessionState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";

function Story({ img, username }) {
  const [session, setSession] = useRecoilState(sessionState)
  return (
    <div>
      <img
        className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transform duration-200 ease-out"
        src={img}
        alt={username}
      ></img>
      <p className="text-xs w-14 truncate text-center">{username}</p>
    </div>
  );
}

export default Story;