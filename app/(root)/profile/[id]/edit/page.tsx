import { currentUser } from "@clerk/nextjs/server";
import { fetchUser } from "@/lib/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";
import { redirect } from "next/navigation";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const loggedInUserId = user.id;
  const { id } = params;

  const userInfo = await fetchUser(id);


  if (!userInfo || userInfo.id !== loggedInUserId) {
    redirect("/"); // unauthorized
  }

  const userData = {
    id: userInfo.id,
    objectId: userInfo._id.toString(),
    username: userInfo.username,
    name: userInfo.name,
    bio: userInfo.bio,
    image: userInfo.image,
  };

  return (
    <main className="flex flex-col justify-start max-w-3xl px-10 mx-auto">
      <h1 className="head-text">Edit Profile</h1>
      <section className="p-10 mt-9 bg-dark-2">
        <AccountProfile user={userData} btnTitle="Save Changes" />
      </section>
    </main>
  );

}

export default Page;
