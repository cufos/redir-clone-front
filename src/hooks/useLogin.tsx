import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuthDispatch } from "../context/auth";

export const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>({});
  const dispatch = useAuthDispatch();

  const router = useRouter();

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();

    try {
      const res = await axios.post("/auth/login", {
        password,
        username,
      });
      dispatch({
        type: "LOGIN",
        payload: res.data,
      });

      router.back();
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  return {
    handleSubmit,
    error,
    password,
    setPassword,
    username,
    setUsername,
  };
};
