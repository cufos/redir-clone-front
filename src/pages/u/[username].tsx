import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { PostCard } from "../../components/postCard";
import { Post, Comment } from "../../types";

export default function User() {
  const router = useRouter();

  const username = router.query.username;

  const { data, error } = useSWR<any>(username ? `/users/${username}` : null);

  if (error) router.push("/");
  return (
    <>
      {data && (
        <div className="container flex pt-5">
          <div className="w-160">
            {data.submissions.map((submission: any) => {
              if (submission.type === "Post") {
                const post: Post = submission;
                return <PostCard key={post.identifier} post={post} />;
              } else {
                const comment: Comment = submission;

                return (
                  <div
                    key={comment.identifier}
                    className="flex rounded bg-white my-4"
                  >
                    <div className="bg-gray-200 flex-shrink-0 w-10 py-4 text-center rounded-l">
                      <i className="fas fa-comment-alt fa-xs text-gray-500"></i>
                    </div>

                    <div className="w-full p-2">
                      <p className="mb-2 text-xs text-gray-500">
                        {comment.username}
                        <span> commented on </span>
                        <Link href={`${comment.post.url}`}>
                          <a className="cursor-pointer hover:underline font-semibold">
                            {comment.post.title}
                          </a>
                        </Link>

                        <span className="mx-1">•</span>
                        <Link href={`/r/${comment.post.subName}`}>
                          <a className="text-black cursor-pointer hover:underline">
                            /r/{comment.post.subName}
                          </a>
                        </Link>
                      </p>
                      <hr />
                      <p>{comment.body}</p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="w-80 ml-6">
            <div className="bg-white rounded">
              <div className="bg-blue-500 rounded-t p-3">
                <img
                  src="https://www.gravatar.com/00000000000000000000000?d=mp&f=y"
                  alt="User Image"
                  className="w-16 h-16 mx-auto border-2 border-white rounded-full"
                />
              </div>
              <div className="p-3 text-center">
                <h1 className="mb-3 text-xxl">{data.user.username}</h1>
                <hr />
                <p className="mt-3">
                  Joined {dayjs(data.user.createdAt).format("MMM YYYY")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
