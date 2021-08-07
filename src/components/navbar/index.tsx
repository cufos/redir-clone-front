import Link from "next/link";
import axios from "axios";
// images
import ReaditLogo from "../images/readit.svg";
// context
import { useAuthDispatch, useAuthState } from "../../context/auth";
import { useEffect, useState } from "react";
import { Sub } from "../../types";
import Image from "next/image";
import { useRouter } from "next/router";

const NavBar: React.FC = () => {
  const [name, setName] = useState("");
  const [subs, setSubs] = useState<Sub[]>([]);
  const [timer, setTimer] = useState(null);
  const { authenticated, loading } = useAuthState();
  const dispatch = useAuthDispatch();

  const router = useRouter();

  const logout = () => {
    axios
      .get("/auth/logout")
      .then(() => {
        dispatch({ type: "LOGOUT" });

        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (name.trim() === "") {
      setSubs([]);
      return;
    }

    searchSub();
  }, [name]);

  const searchSub = () => {
    clearTimeout(timer);
    setTimer(
      setTimeout(async () => {
        try {
          const { data } = await axios.get(`/sub/search/${name}`);
          setSubs(data);
        } catch (err) {
          console.log(err);
        }
      }, 250)
    );
  };

  const goToSub = (subName: string) => {
    router.push(`/r/${subName}`);
    setName("");
  };
  return (
    <div className="bg-white fixed inset-x-0 top-0 z-10 flex items-center justify-between h-12 px-5">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/">
          <a>
            <ReaditLogo className="w-8 h-8 mr-2" />
          </a>
        </Link>
        <span
          className="text-2xl font-semibold hidden lg:block
        "
        >
          <Link href="/">readit</Link>
        </span>
      </div>
      {/* Seachr input */}
      <div className="px-4 w-160 max-w-full">
        <div className="relative flex border rounded items-center bg-gray-100 hover:bg-white hover:border-blue-500">
          <i className="fas fa-search text-gray-500 pl-4 pr-3"></i>
          <input
            type="text"
            placeholder="Search"
            className="py-1 pr-3 rounded focus:outline-none bg-transparent"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div
            className="absolute left-0 right-0 bg-white"
            style={{ top: "100%" }}
          >
            {subs?.map((sub) => (
              <div
                key={sub?.name}
                onClick={() => goToSub(sub.name)}
                className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-200"
              >
                <Image
                  src={sub.imageUrl}
                  alt="Sub"
                  height={(8 * 16) / 4}
                  width={(8 * 16) / 4}
                  className="rounded-full"
                />
                <div className="text-sm ml-4">
                  <p className="font-medium">{sub.name}</p>
                  <p className="text-gray-600">{sub.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* buttons */}
      <div className="flex">
        {!loading && authenticated ? (
          <button
            className="hidden sm:block lg:w-32 w-20 py-1 hollow blue button mr-4 leading-5"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <>
            <Link href="/login">
              <a className="hidden sm:block lg:w-32 w-20 py-1 hollow blue button mr-4 leading-5">
                Login
              </a>
            </Link>

            <Link href="/register">
              <a className="hidden sm:block lg:w-32 w-20 py-1 blue button leading-5">
                Sign Up
              </a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
