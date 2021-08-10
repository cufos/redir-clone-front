import { ChangeEvent, createRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import useSWR from "swr";
import classNames from "classnames";

// components
import { PostCard } from "../../components/postCard";
import { Sidebar } from "../../components/sidebar";

// context
import { useAuthState } from "../../context/auth";

// types
import { Sub } from "../../types";
import axios from "axios";

export default function SubPage() {
  // local state
  const [ownSub, setOwnSub] = useState(false);
  // global state
  const { authenticated, user } = useAuthState();
  const fileInputRef = createRef<HTMLInputElement>();
  const router = useRouter();
  const subName = router.query.sub;

  const {
    data: sub,
    error,
    revalidate,
  } = useSWR<Sub>(subName ? `/subs/${subName}` : null);

  if (error) router.push("/");

  let postMarkup;
  if (!sub) {
    postMarkup = <p className="text-lg text-center">Loading...</p>;
  } else if (sub.posts.length === 0) {
    postMarkup = <p className="text-lg text-center">No posts submitted yet</p>;
  } else {
    postMarkup = sub.posts.map((post) => (
      <PostCard key={post.identifier} post={post} revalidate={revalidate} />
    ));
  }

  useEffect(() => {
    if (!sub) return;

    setOwnSub(authenticated && user.username === sub.username);
  }, [sub]);

  const openFileInput = (type: string) => {
    if (!ownSub) return;

    fileInputRef.current.name = type;
    fileInputRef.current.click();
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", fileInputRef.current.name);

    try {
      await axios.post<Sub>(`/subs/${sub.name}/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      revalidate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {sub && (
        <>
          <input
            type="file"
            hidden={true}
            ref={fileInputRef}
            onChange={uploadImage}
          />
          {/* sub info and images */}
          <div>
            {/* Banner image */}
            <div
              className={classNames("bg-blue-500", {
                "cursor-pointer": ownSub,
              })}
              onClick={() => openFileInput("banner")}
            >
              {sub.bannerUrl ? (
                <div
                  className="h-56 bg-blue-500"
                  style={{
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundImage: `url(${sub.bannerUrl})`,
                  }}
                ></div>
              ) : (
                <div className="h-20 bg-blue-500"></div>
              )}
            </div>
            {/* sub metadata */}
            <div className="h-20 bg-white">
              <div className="container flex relative">
                <div className="absolute" style={{ top: -15 }}>
                  <Image
                    src={sub.imageUrl}
                    alt="Sub"
                    className={classNames("rounded-full", {
                      "cursor-pointer": ownSub,
                    })}
                    width={70}
                    height={70}
                    onClick={() => openFileInput("image")}
                  />
                </div>
                <div className="pt-1 pl-24">
                  <div className="flex items-center">
                    <h1 className="mb-1 text-3xl font-bold">{sub.title}</h1>
                  </div>
                  <p className="text-sm text-gray-600 font-bold">
                    /r/{sub.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Posts & sidebar */}
          <div className="flex pt-5 container">
            <div className="w-160">{postMarkup}</div>
            <Sidebar sub={sub} />
          </div>
        </>
      )}
    </div>
  );
}
