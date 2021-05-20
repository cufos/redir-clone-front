import useSWR from "swr";
// components
import { PostCard } from "../components/postCard";

// import { GetServerSideProps } from "next";

export default function Home() {
  const { data: posts } = useSWR("/post");

  return (
    <div className="pt-12">
      <div className="container pt-4 flex">
        {/* Posts feed */}
        <div className="w-160">
          {posts?.map((post) => (
            <PostCard key={post.identifier} post={post} />
          ))}
        </div>
      </div>
    </div>
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
