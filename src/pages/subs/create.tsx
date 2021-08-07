import axios from "axios";
import { GetServerSideProps } from "next";
import { FormEvent, useState } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";

export default function Create() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const [errors, setErrors] = useState<Partial<any>>({});

  const submitForm = async (evt: FormEvent) => {
    evt.preventDefault();

    try {
      const res = await axios.post("subs", { name, title, description });

      router.push(`/r/${res.data.name}`);
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  return (
    <div className="flex bg-white">
      <div
        className="w-36 h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bricks.jpg')" }}
      ></div>

      <div className="flex flex-col justify-center pl-6">
        <div className="w-98">
          <h1 className="mb-2 text-lg font-medium">Create a community</h1>
          <hr />
          <form onSubmit={submitForm}>
            {/* Name */}
            <div className="my-6">
              <p className="font-medium">Name</p>
              <p className="text-xs text-gray-500 mb-2">
                Community names including capitalization cannot be changed.
              </p>
              <input
                type="text"
                className={classNames(
                  "border border-gray-200 rounded p-3 hover:border-gray-500 w-full",
                  { "border-red-500": errors.name }
                )}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <small className="text-red-500 font-medium">{errors.name}</small>
            </div>
            {/* title */}
            <div className="my-6">
              <p className="font-medium">Title</p>
              <p className="text-xs text-gray-500 mb-2">
                Community title represent the topic and you can change it at any
                time.
              </p>
              <input
                type="text"
                className={classNames(
                  "border border-gray-200 rounded p-3 hover:border-gray-500 w-full",
                  { "border-red-500": errors.title }
                )}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <small className="text-red-500 font-medium">{errors.name}</small>
            </div>
            {/* Description */}
            <div className="my-6">
              <p className="font-medium">Description</p>
              <p className="text-xs text-gray-500 mb-2">
                This is how members come to understand your community
              </p>
              <textarea
                className={classNames(
                  "border border-gray-200 rounded p-3 hover:border-gray-500 w-full",
                  { "border-red-500": errors.title }
                )}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <small className="text-red-500 font-medium">
                {errors.description}
              </small>
            </div>
            <div className="flex justify-end">
              <button className="px-4 py-1 blue button text-sm capitalize font-semibold">
                Create community
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const cookie = req.headers.cookie;

    if (!cookie) throw new Error("Missing auth token cookie");

    await axios.get("/auth/me", { headers: { cookie } });

    return { props: {} };
  } catch (err) {
    res.writeHead(307, { location: "/login" }).end();
  }
};
