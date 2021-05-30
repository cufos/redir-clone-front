import Link from "next/link";
import axios from "axios";
// images
import ReaditLogo from "../images/readit.svg";
// context
import { useAuthDispatch, useAuthState } from "../../context/auth";

const NavBar: React.FC = () => {
  const { authenticated, loading } = useAuthState();
  const dispatch = useAuthDispatch();

  const logout = () => {
    axios
      .get("/auth/logout")
      .then(() => {
        dispatch({ type: "LOGOUT" });

        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="bg-white fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 px-5">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/">
          <a>
            <ReaditLogo className="w-8 h-8 mr-2" />
          </a>
        </Link>
        <span className="text-2xl font-semibold">
          <Link href="/">readit</Link>
        </span>
      </div>
      {/* Seachr input */}
      <div className="flex mx-auto border rounded items-center bg-gray-100 hover:bg-white hover:border-blue-500">
        <i className="fas fa-search text-gray-500 pl-4 pr-3"></i>
        <input
          type="text"
          placeholder="Search"
          className="w-160 py-1 pr-3 rounded focus:outline-none bg-transparent"
        />
      </div>
      {/* buttons */}
      <div className="flex">
        {!loading && authenticated ? (
          <button
            className="w-32 py-1 hollow blue button mr-4 leading-5"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <>
            <Link href="/login">
              <a className="w-32 py-1 hollow blue button mr-4 leading-5">
                Login
              </a>
            </Link>

            <Link href="/register">
              <a className="w-32 py-1 blue button leading-5">Sign Up</a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
