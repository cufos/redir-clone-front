import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios from "axios";
import { useAuthState } from "../../context/auth";

// components
import { ActionButton } from "./actionButtons";
import { VoteButtons } from "./voteButtons";

// config for dayJs
dayjs.extend(relativeTime);

// custom types
import { Post } from "../../types";
import { useRouter } from "next/router";

// custom interface
interface PostCardProps {
  post: Post;
  revalidate?: Function;
}

export const PostCard: React.FC<PostCardProps> = ({
  post: {
    voteScore,
    body,
    identifier,
    url,
    username,
    subName,
    createdAt,
    title,
    commentCount,
    userVote,
    slug,
    sub,
  },
  revalidate,
}) => {
  const { authenticated } = useAuthState();
  const router = useRouter();
  const isInSubPage = router.pathname === "/r/[sub]";

  const vote = async (value: number) => {
    try {
      if (!authenticated) router.push("/login");

      if (value === userVote) value = 0;
      const res = await axios.post("/misc/vote", {
        identifier,
        slug,
        value,
      });

      if (revalidate) revalidate();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex mb-4 bg-white rounded" id={identifier}>
      {/* Vote section */}
      <VoteButtons
        voteScore={voteScore}
        userVote={userVote}
        updateVote={vote}
        bg="bg-gray-200 "
      />
      {/* Post data section */}
      <div className="w-full p-2">
        <div className="flex-items-center flex">
          {isInSubPage && (
            <>
              <Link href={`/r/${subName}`}>
                <img
                  src={sub.imageUrl}
                  className="w-6 h-6 mr-1 rounded-full cursor-pointer"
                />
              </Link>
              <Link href={`/r/${subName}`}>
                <a className="text-xs font-bold hover:underline cursor-pointer">
                  /r/{subName}
                </a>
              </Link>
              <span className="mx-1 text-xs text-gray-500">•</span>
            </>
          )}
          <p className="text-xs text-gray-500">
            Posted by
            <Link href={`/u/${username}`}>
              <a className="mx-1 hover:underline">/u/{username}</a>
            </Link>
            <Link href={`/r/${url}`}>
              <a className="mx-1 hover:underline">
                {dayjs(createdAt).fromNow()}
              </a>
            </Link>
          </p>
        </div>
        <Link href={url}>
          <a className="my-1 text-lg font-medium">{title}</a>
        </Link>
        {body && <p className="my-1 text-sm">{body}</p>}

        <div className="flex">
          <Link href={url}>
            <a>
              <ActionButton>
                <i className="fas fa-comment fa-xs mr-1 font-bold"></i>
                <span>{commentCount} comments</span>
              </ActionButton>
            </a>
          </Link>
          <ActionButton>
            <i className="fas fa-share fa-xs mr-1 font-bold"></i>
            <span>Share</span>
          </ActionButton>
          <ActionButton>
            <i className="fas fa-bookmark fa-xs mr-1 font-bold"></i>
            <span>Save</span>
          </ActionButton>
        </div>
      </div>
    </div>
  );
};
