import { communityTabs } from "@/constants";
import ThreadsTab from "@/components/shared/ThreadsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image";
import { fetchCommunityDetails } from "@/lib/actions/community.actions";
import UserCard from "@/components/cards/UserCard";
async function Page({ params }: { params: { id: string } }) {
    const user = await currentUser()
    if (!user) return null;
    const userInfo = await fetchUser(params.id)
    if (!userInfo?.onboarded) redirect('/onboarding');
    const communityDetails = await fetchCommunityDetails(params.id)
    return (
        <section>
            <ProfileHeader
                accountId={communityDetails.id}
                authUserId={communityDetails.id}
                name={communityDetails.name}
                username={communityDetails.username}
                imgUrl={communityDetails.image}
                bio={communityDetails.bio}
                type="Community"
            />
            <div className="mt-9">
                <Tabs defaultValue="threads" className="w-full">
                    <TabsList className="tab">
                        {communityTabs.map((tab) => (
                            <TabsTrigger key={tab.label} value={tab.value} className="tab">
                                <Image
                                    src={tab.icon}
                                    alt={tab.label}
                                    width={24}
                                    height={24}
                                    className="object-contain" />
                                <p className="max-sm:hidden">{tab.label}</p>
                                {tab.label === "Threads" && (
                                    <p className="px-2 py-1 ml-1 rounded-md bg-primary-500 !text-tiny-medium text-white">
                                        {communityDetails?.threads?.length}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value="threads" className="w-full text-light-1">
                        <ThreadsTab
                            currentUserId={user.id}
                            accountId={communityDetails._id}
                            accountType="Community"
                        />
                    </TabsContent>
                    <TabsContent value="members" className="w-full text-light-1">
                        <section>
                            {communityDetails.map((member: any) => {
                                <UserCard
                                    key={member.id}
                                    id={member.id}
                                    username={member.name}
                                    name={member.name}
                                    imgUrl={member.image}
                                    personType="User"
                                />
                            })}
                        </section>
                    </TabsContent>
                    <TabsContent value="requests" className="w-full text-light-1">
                        <ThreadsTab
                            currentUserId={user.id}
                            accountId={communityDetails._id}
                            accountType="Community"
                        />
                    </TabsContent>

                </Tabs>
            </div>
        </section>
    )
}
export default Page;


