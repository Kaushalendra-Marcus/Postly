"use client";

import { useEffect, useRef, useState } from "react";
import { fetchPosts } from "@/lib/actions/thread.actions";
import ThreadCard from "@/components/cards/ThreadCard";
import { useUser } from "@clerk/nextjs";

export default function LoadMore() {
  const { user } = useUser();
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, page]);

  const loadMore = async () => {
    setLoading(true);
    try {
      const result = await fetchPosts(page, 10);
      setPosts((prev) => [...prev, ...result.posts]);
      setHasMore(result.isNext);
      setPage((prev) => prev + 1);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {posts.map((post: any) => (
        <ThreadCard
          key={post._id.toString()}
          id={post._id.toString()}
          currentUserId={user?.id || ""}
          parentId={post.parentId}
          content={post.text}
          author={post.author}
          community={post.community}
          createdAt={post.createdAt}
          comments={post.children}
          likes={post.likes?.map((like: any) => like.toString()) || []}
          views={post.views ?? 0}
        />
      ))}
      <div ref={loaderRef} className="py-4 text-center">
        {loading && <p className="text-gray-1 text-sm">Loading...</p>}
      </div>
    </>
  );
}