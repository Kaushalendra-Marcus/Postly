"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  content: string;
  id: string;
}

const ShareButton = ({ content, id }: Props) => {
  const [postUrl, setPostUrl] = useState("");

  useEffect(() => {
    // This runs only on client side after component mounts
    setPostUrl(`${window.location.origin}/thread/${id}`);
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Check this latest post on postly, the emerging indian social media platform`,
        text: content.substring(0, 100),
        url: postUrl,
      });
    } else {
      navigator.clipboard.writeText(postUrl);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div>
      <Image
        src="/assets/share.svg"
        alt="Share"
        width={24}
        height={24}
        className="object-contain cursor-pointer"
        onClick={handleShare}
      />
    </div>
  );
};

export default ShareButton;