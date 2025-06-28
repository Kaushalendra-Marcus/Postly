import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface ThreadPageProps {
  params: { id: string };
}

const Page = async ({ params }: ThreadPageProps) => {
  const { id } = await params;
  if (!id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(id);
  if (!thread) return <p>Thread not found</p>;

  return (
    <section className="relative">
      <div>
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={user.id}
          parentId={thread.parentId}
          content={thread.text}
          author={{
            id: thread.author._id.toString(),
            name: thread.author.name,
            image: thread.author.image,
          }}
          community={
            thread.community
              ? {
                  id: thread.community._id.toString(),
                  name: thread.community.name,
                  image: thread.community.image,
                }
              : null
          }
          createdAt={thread.createdAt}
          comments={thread.children}
          likes={thread.likes?.map((like: any) => like.toString()) || []}
        />
      </div>

      <div className="mt-7">
        <Comment
          threadId={thread._id.toString()}
          currentUserImg={userInfo.image}
          currentUserId={userInfo._id.toString()}
        />
      </div>

      <div className="mt-10">
        {thread.children.map((child: any) => (
          <ThreadCard
            key={child._id.toString()}
            id={child._id.toString()}
            currentUserId={user.id}
            parentId={child.parentId}
            content={child.text}
            author={{
              id: child.author._id.toString(),
              name: child.author.name,
              image: child.author.image,
            }}
            community={
              child.community
                ? {
                    id: child.community._id.toString(),
                    name: child.community.name,
                    image: child.community.image,
                  }
                : null
            }
            createdAt={child.createdAt}
            comments={child.children}
            isComment
            likes={thread.likes?.map((like: any) => like.toString()) || []}
          />
        ))}
      </div>
    </section>
  );
};

export default Page;
