
import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import LikeButon from "../shared/LikeButon";
import ShareButton from "../shared/ShareButton";
import { DeleteButton } from "../shared/DeleteButton";
interface Props {
    key: string;
    id: string;
    currentUserId: string;
    parentId: string | null;
    content: string;
    author: {
        name: string;
        image: string;
        id: string;
    };
    community: {
        id: string;
        name: string;
        image: string;
    } | null;
    createdAt: string;
    comments: {
        author: {
            image: string;
        };
    }[];
    isComment?: boolean;
    likes: string[]
}

const ThreadCard = ({
    key,
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    isComment,
    likes
}: Props) => {
    return (
        <article
            className={`flex flex-col w-full rounded-xl ${isComment ? "px-0 xs:px-7 mt-3" : "p-4 sm:p-7 bg-dark-2"
                }`}
        >
            <div className="flex items-start justify-between">
                <div className="flex flex-row flex-1 w-full gap-3 sm:gap-4">
                    <div className="flex flex-col items-center">
                        <Link
                            href={`/profile/${author.id}`}
                            className="relative w-10 h-10 sm:h-11 sm:w-11"
                        >
                            <Image
                                src={author.image}
                                alt="Profile Image"
                                fill
                                className="rounded-full cursor-pointer"
                            />
                        </Link>
                        <div className="thread-card_bar" />
                    </div>

                    <div className="flex flex-col w-full">
                        <div className="flex justify-between">
                            <Link href={`/profile/${author.id}`} className="w-fit">
                                <h4 className="cursor-pointer text-base-semibold text-light-1">
                                    {author.name}
                                </h4>
                            </Link>
                            <DeleteButton
                                threadId={id.toString()}
                                authorId={author.id.toString()}
                                currentUserId={currentUserId.toString()}
                            />
                        </div>
                        <p className="mt-2 text-small-regular text-light-2">{content}</p>
                        <p className="text-[12px] text-gray-1">{formatDateString(createdAt)}</p>
                        <div className="flex flex-col gap-3 mt-5">
                            <div className="flex gap-3">
                                <div className="flex items-center gap-1 cursor-pointer">
                                    <LikeButon
                                        threadId={id.toString()}
                                        likes={likes}
                                        likedUser={currentUserId.toString()}
                                    />
                                </div>
                                <Link href={`/thread/${id}`}>
                                    <Image
                                        src="/assets/reply.svg"
                                        alt="heart"
                                        width={24}
                                        height={24}
                                        className="object-contain cursor-pointer"
                                    />
                                </Link>
                                <ShareButton
                                    content={content}
                                    id={id.toString()}
                                />
                                {isComment && comments.length > 0 && (
                                    <Link href={`/thread/${id}`}>
                                        <p className="mt-1 text-subtle-medium text-gray-1">
                                            {comments.length} replies
                                        </p>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            {!isComment && comments.length > 0 && (
                <div className="flex items-center gap-2 mt-4">
                    {/* Show only first 3 comment profile images */}
                    <div className="flex -space-x-2">
                        {comments.slice(0, 3).map((comment, index) => (
                            <Image
                                key={index}
                                src={comment.author.image}
                                alt={`Commenter ${index + 1}`}
                                width={28}
                                height={28}
                                className="border-2 rounded-full border-dark-2"
                            />
                        ))}
                    </div>
                    {/* Show count of total comments */}
                    <Link href={`thread/${id}`}>
                        <p className="text-subtle-medium text-gray-1">
                            {comments.length} {comments.length === 1 ? "reply" : "replies"}
                        </p>
                    </Link>
                </div>
            )}

        </article>
    );
};

export default ThreadCard;
