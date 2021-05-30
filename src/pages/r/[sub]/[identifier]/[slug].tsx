import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// config for dayJs
dayjs.extend(relativeTime);

// components
import { Sidebar } from "../../../../components/sidebar";
import { VoteButtons } from "../../../../components/postCard/voteButtons";
import { ActionButton } from "../../../../components/postCard/actionButtons";

// context
import { useAuthState } from "../../../../context/auth";

// types
import { Post, Comment } from "../../../../types";

export default function PostPage() {
  // local state
  const [newComment, setNewComment] = useState("");
  // global state
  const { authenticated, user } = useAuthState();

  const router = useRouter();
  const { identifier, sub, slug } = router.query;

  const { data: post, error } = useSWR<Post>(
    identifier && slug ? `/posts/${identifier}/${slug}` : null
  );

  const { data: comments, revalidate } = useSWR<Comment[]>(
    identifier && slug ? `/posts/${identifier}/${slug}/comments` : null
  );

  if (error) router.push("/");

  const vote = async (value: number, comment?: Comment) => {
    // if not logged in go to login
    if (!authenticated) router.push("/login");

    // if vote is the same reset vote
    if (
      (!comment && value === post.userVote) ||
      (comment && comment.userVote === value)
    )
      value = 0;

    try {
      await axios.post("/misc/vote", {
        identifier,
        slug,
        value,
        commentIdentifier: comment?.identifier,
      });

      revalidate();
    } catch (err) {
      console.log(err);
    }
  };

  const submitComment = async (evt: FormEvent) => {
    evt.preventDefault();
    if (newComment.trim() === "") return;

    try {
      await axios.post(`/posts/${post.identifier}/${post.slug}/comments`, {
        body: newComment,
      });

      setNewComment("");
      revalidate();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Link href={`/r/${sub}`}>
        <a>
          <div className="flex items-center w-full h-20 p-8 bg-blue-500">
            <div className="container flex">
              {post && (
                <div className="rounded-full mr-2 overflow-hidden w-8 h-8">
                  <Image
                    src={post.sub.imageUrl}
                    height={(8 * 16) / 4}
                    width={(8 * 16) / 4}
                  />
                </div>
              )}
              <p className="text-xl font-semibold text-white">/r/{sub}</p>
            </div>
          </div>
        </a>
      </Link>
      <div className="container flex pt-5">
        {/* Post */}
        <div className="w-160">
          <div className="bg-white rounded">
            {post && (
              <>
                <div className="flex">
                  {/* vote section */}
                  <VoteButtons
                    userVote={post.userVote}
                    voteScore={post.voteScore}
                    updateVote={vote}
                    bg="bg-white"
                  />
                  <div className="py-2 pr-2">
                    <div className="flex-items-center flex">
                      <p className="text-xs text-gray-500">
                        Posted by
                        <Link href={`/u/${post.username}`}>
                          <a className="mx-1 hover:underline">
                            /u/{post.username}
                          </a>
                        </Link>
                        <Link href={`/r/${post.url}`}>
                          <a className="mx-1 hover:underline">
                            {dayjs(post.createdAt).fromNow()}
                          </a>
                        </Link>
                      </p>
                    </div>
                    {/* Post title */}
                    <h1 className="my-1 text-xl font-medium">{post.title}</h1>
                    {/* post body */}
                    <p className="my-3 text-sm">{post.body}</p>
                    {/* actions buttons */}
                    <div className="flex">
                      <Link href={post.url}>
                        <a>
                          <ActionButton>
                            <i className="fas fa-comment fa-xs mr-1 font-bold"></i>
                            <span>{post.commentCount} comments</span>
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
                {/* comment input area */}
                <div className="pl-10 pr-6 mb-4">
                  {authenticated ? (
                    <div>
                      <p className="mb-1 text-xs">
                        Comment as{" "}
                        <Link href={`/u/${user.username}`}>
                          <a className="font-semibold text-blue-500">
                            {user.username}
                          </a>
                        </Link>
                      </p>
                      <form onSubmit={submitComment}>
                        <textarea
                          className="w-full p-3 border border-gray-300 focus:outline-none focus:border-gray-600 rounded"
                          onChange={(e) => setNewComment(e.target.value)}
                          value={newComment}
                        ></textarea>
                        <div className="flex justify-end">
                          <button
                            className="px-3 py-1 blue button"
                            disabled={newComment.trim() === ""}
                          >
                            Comment
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="flex items-center px-2 py-4 border rounded border-gray-300 justify-between">
                      <p className="text-gray-400 font-semibold">
                        Log in or sign up to leave a comment
                      </p>
                      <div>
                        <Link href="/login">
                          <a className="px-4 py-1 hollow blue button mr-4">
                            Login
                          </a>
                        </Link>
                        <Link href="/register">
                          <a className="px-4 py-1 blue button">Sign up</a>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                <hr />
                {/* comments feed */}
                {comments?.map((comment) => (
                  <div className="flex" key={comment.identifier}>
                    {/* vote section */}
                    <VoteButtons
                      bg="bg-white"
                      userVote={comment.userVote}
                      voteScore={comment.voteScore}
                      updateVote={vote}
                    />
                    <div className="py-2 pr-2">
                      <p className="mb-1 text-xs leading-none">
                        <Link href={`/u/${comment.username}`}>
                          <a className="mr-1 font-bold hover:underline">
                            {comment.username}
                          </a>
                        </Link>
                        <span className="text-gray-600">
                          {`
                            ${comment.voteScore}
                            points •
                            ${dayjs(comment.createdAt).fromNow()}
                            `}
                        </span>
                      </p>
                      <p>{comment.body}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        {/* Sidebar */}
        {post && <Sidebar sub={post.sub} />}
      </div>
    </>
  );
}
