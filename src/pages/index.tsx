import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR, { useSWRInfinite } from "swr";
// components
import { PostCard } from "../components/postCard";
import Seo from "../components/seo";
import { useAuthState } from "../context/auth";

// types
import { Sub, Post } from "../types";

// import { GetServerSideProps } from "next";

export default function Home() {
  const [observedPosts, setObservedPosts] = useState("");
  // const { data: posts } = useSWR<Post[]>("/post");
  const { data: topSubs } = useSWR<Sub[]>("/misc/top-subs");

  const { authenticated } = useAuthState();

  const {
    data,
    error,
    size: page,
    setSize: setPage,
    isValidating,
    revalidate,
  } = useSWRInfinite<Post[]>((index) => `/posts?page=${index}`);

  const posts = data ? [].concat(...data) : [];
  const isInitialLoading = !data && !error;

  useEffect(
    function () {
      if (!posts || posts.length === 0) return;

      const id = posts[posts.length - 1].identifier;

      if (id !== observedPosts) {
        setObservedPosts(id);
        observeElement(document.getElementById(id));
      }
    },
    [posts]
  );

  const observeElement = (element: HTMLElement) => {
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true) {
          setPage(page + 1);
          observer.unobserve(element);
        }
      },
      { threshold: 1 }
    );

    observer.observe(element);
  };

  return (
    <>
      <Seo />
      <div className="container pt-4 flex">
        {/* Posts feed */}
        <div className="w-full md:w-160 px-4 md:p-0">
          {isInitialLoading && (
            <p className="text-lg text-center">Loading...</p>
          )}
          {posts?.map((post) => (
            <PostCard
              key={post.identifier}
              post={post}
              revalidate={revalidate}
            />
          ))}

          {isValidating && posts.length && (
            <p className="text-lg text-center">Loading More...</p>
          )}
        </div>
        {/* Sidebar */}
        <div className="hidden md:block ml-6 w-80">
          <div className="bg-white rounded">
            <div className="p-4 border-b-2">
              <p className="text-lg font-semibold text-center">
                Top Comunities
              </p>
            </div>
            <div>
              {topSubs?.map((sub) => (
                <div
                  key={sub.name}
                  className="flex items-center px-4 py-2 text-xs border-b"
                >
                  <Link href={`/r/${sub.name}`}>
                    <a>
                      <Image
                        className="rounded-full cursor-pointer"
                        src={sub.imageUrl}
                        alt="sub"
                        width={(6 * 16) / 4}
                        height={(6 * 16) / 4}
                      />
                    </a>
                  </Link>
                  <Link href={`/r/${sub.name}`}>
                    <a className="ml-2 font-bold hover:cursor-pointer">
                      /r/{sub.name}
                    </a>
                  </Link>
                  <p className="ml-auto font-med">{sub.postCount}</p>
                </div>
              ))}
            </div>
            {authenticated && (
              <div className="p-4 border-t-2">
                <Link href="/subs/create">
                  <a className="w-full px-2 py-1 blue button">
                    Create Community
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// export const getServerSidePosts: GetServerSideProps = async (ctx) => {
//   try {
//     const res = await axios.get("/posts");

//     return { props: { posts: res.data } };
//   } catch (err) {
//     return { props: { error: "Something went wrong" } };
//   }
// };
