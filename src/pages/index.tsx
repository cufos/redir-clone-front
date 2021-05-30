import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
// components
import { PostCard } from "../components/postCard";

// types
import { Sub } from "../types";

// import { GetServerSideProps } from "next";

export default function Home() {
  const { data: posts } = useSWR("/post");
  const { data: topSubs } = useSWR("/misc/top-subs");

  return (
    <>
      <div className="container pt-4 flex">
        {/* Posts feed */}
        <div className="w-160">
          {posts?.map((post) => (
            <PostCard key={post.identifier} post={post} />
          ))}
        </div>
        {/* Sidebar */}
        <div className="ml-6 w-80">
          <div className="bg-white rounded">
            <div className="p-4 border-b-2">
              <p className="text-lg font-semibold text-center">
                Top Comunities
              </p>
            </div>
            <div>
              {topSubs?.map((sub: Sub) => (
                <div
                  key={sub.name}
                  className="flex items-center px-4 py-2 text-xs border-b"
                >
                  <Link href={`/r/${sub.name}`}>
                    <Image
                      className="rounded-full cursor-pointer"
                      src={sub.imageUrl}
                      alt="sub"
                      width={(6 * 16) / 4}
                      height={(6 * 16) / 4}
                    />
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
