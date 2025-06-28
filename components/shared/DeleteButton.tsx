// components/DeleteButton.tsx
"use client";

import { FaTrash } from "react-icons/fa";
import { deleteThread } from "@/lib/actions/thread.actions";
import { useRouter } from "next/navigation";

export const DeleteButton = ({
  threadId,
  authorId,
  currentUserId,
}: {
  threadId: string;
  authorId: string;
  currentUserId: string;
}) => {
  const router = useRouter();

  if (authorId !== currentUserId) return null;

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteThread(threadId, "/");
        router.refresh();
      } catch (error) {
        console.error("Failed to delete post:", error);
        alert("Failed to delete post");
      }
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-600 hover:text-red-700">
      <FaTrash />
    </button>
  );
};