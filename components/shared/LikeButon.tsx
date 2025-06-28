"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { addLike } from "@/lib/actions/thread.actions"; // adjust path

interface Props {
  threadId: string;
  likes: string[];
  likedUser: string;
}

const LikeButon = ({ threadId, likes, likedUser }: Props) => {
  const [like, setLike] = useState(false);
  const [countLikes, setCountLikes] = useState(likes.length);

  useEffect(() => {
    setLike(likes.includes(likedUser));
  }, [likes, likedUser]);

  const handleLikes = async () => {
    if (like) {
      setLike(false);
      setCountLikes((prev) => prev - 1);
    } else {
      setLike(true);
      setCountLikes((prev) => prev + 1);
    }

    try {
      await addLike(threadId, likedUser, "/");
    } catch (error) {
      console.error(error);
      // rollback
      if (like) {
        setLike(true);
        setCountLikes((prev) => prev + 1);
      } else {
        setLike(false);
        setCountLikes((prev) => prev - 1);
      }
    }
  };

  return (
    <div onClick={handleLikes} className="flex items-center gap-1 cursor-pointer">
      <Image
        src={like ? "/assets/heart-red.svg" : "/assets/heart-gray.svg"}
        alt="heart"
        width={24}
        height={24}
        className="object-contain"
      />
      <span className="text-sm text-light-2">{countLikes}</span>
    </div>
  );
};

export default LikeButon;
