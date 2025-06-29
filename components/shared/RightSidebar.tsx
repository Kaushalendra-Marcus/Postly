import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
import UserCard from "@/components/cards/UserCard";

const RightSidebar = async () => {
    const user = await currentUser()
    if (!user) return null;
    const userInfo = await fetchUser(user.id)
    if (!userInfo?.onboarded) redirect('/onboarding')
    //Fetch Users 
    const result = await fetchUsers({
        userId: user.id,
        searchString: "",
        pageNumber: 1,
        pageSize: 20
    })
    return (
        <section className='custom-scrollbar rightsidebar'>
            {/* <div className='flex flex-col justify-start flex-1'>
                <h3 className='text-heading4-medium text-light-1'>Suggested Communuties</h3>
            </div> */}
            <div className='flex flex-col justify-start flex-1'>
                <h3 className='mb-4 text-heading4-medium text-light-1'>Suggested Users</h3>
                <section>
                    <div className="grid grid-cols-1 gap-4">
                        {result.users.length === 0 ? (
                            <p className="flex flex-col gap-20 mt-30">User not found</p>
                        ) : (
                            <>
                                {result.users.map((person) => (
                                    <UserCard
                                        key={person.id}
                                        id={person.id}
                                        name={person.name}
                                        username={person.username}
                                        imgUrl={person.image}
                                        personType="User"
                                    />
                                ))}
                            </>
                        )}
                    </div>
                </section>

            </div>
        </section>
    )
}

export default RightSidebar
