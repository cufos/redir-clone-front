import { useEffect, useState } from "react";
import axios from "axios";
// custom types
import { Post } from "../types";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get("/post")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return {
    posts,
  };
}
