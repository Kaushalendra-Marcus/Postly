import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser, updateUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Button } from "@/components/ui/button";
import Link from "next/link";
async function Page({ params }: { params: { id: string } }) {
    const user = await currentUser()
    if (!user) return null;
    const { id } = await params;
    const userInfo = await fetchUser(id)
    if (!userInfo?.onboarded) redirect('/onboarding');
    return (
        <section>
            <ProfileHeader
                accountId={userInfo.id}
                authUserId={user.id}
                name={userInfo.name}
                username={userInfo.username}
                imgUrl={userInfo.image}
                bio={userInfo.bio}
            />
            <Link href={`/profile/${id}/edit`} className="flex justify-center mt-4">
                <Button className="px-6 py-2 font-semibold text-white transition-colors duration-200 rounded-full shadow-sm bg-primary-500 hover:bg-primary-600">
                    Update Profile
                </Button>
            </Link>

            <div className="mt-9">
                <Tabs defaultValue="threads" className="w-full">
                    <TabsList className="tab">
                        {profileTabs.map((tab) => (
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
                                        {userInfo?.threads?.length}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {profileTabs.map((tab) => (
                        <TabsContent key={`content-${tab.label}`} value={tab.value} className="w-full text-light-1">
                            <ThreadsTab
                                currentUserId={user.id}
                                accountId={userInfo.id}
                                accountType="User"
                            />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    )
}
export default Page;


