import ThreadCard from "@/components/cards/ThreadCard";
import LoadMore from "@/components/shared/LoadMore";
import { fetchPosts } from "@/lib/actions/thread.actions"
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser()
  const result = await fetchPosts(1, 10)

  return (
    <>
      <h1 className="text-left head-text">Home</h1>
      <section className="flex flex-col gap-10 mt-9">
        {result.posts.length === 0 ? (
          <p className="no-result">No post found</p>
        ) : (
          <>
            {result.posts.map((post: any) => (
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
            {result.isNext && <LoadMore />}
          </>
        )}
      </section>
    </>
  )
}