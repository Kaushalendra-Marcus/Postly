import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
import UserCard from "@/components/cards/UserCard";
async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser()
  if (!user) return null;
  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')
  //Fetch Users 
  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 40
  })
  return (
    <section>
      <h1 className="mb-10 head-text">Search</h1>


      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {result.users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          result.users.map((person: any) => (
            <UserCard
              key={person.id}
              id={person.id}
              name={person.name}
              username={person.username}
              imgUrl={person.image}
              personType="User"
            />
          ))
        )}
      </div>
    </section>
  )
}

export default Page