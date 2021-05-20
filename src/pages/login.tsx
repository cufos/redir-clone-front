import Link from "next/link";
import { useRouter } from "next/router";
// hooks
import { useLogin } from "../hooks/useLogin";
// components
import { CustomInput } from "../components/input";

// context
import { useAuthState } from "../context/auth";

export default function Login() {
  const { handleSubmit, error, username, setUsername, password, setPassword } =
    useLogin();
  const { authenticated } = useAuthState();
  const router = useRouter();

  if (authenticated) router.push("/");

  return (
    <div className="flex bg-white">
      <div
        className="w-36 h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bricks.jpg')" }}
      ></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-70">
          <h1 className="text-lg mb-2 font-medium">Sign Up</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our agreement and Privacy Policy
          </p>
          <form onSubmit={handleSubmit}>
            <CustomInput
              type="text"
              placeholder="Username"
              value={username}
              setValue={setUsername}
              error={error.username}
            />
            <CustomInput
              type="password"
              placeholder="Password"
              value={password}
              setValue={setPassword}
              error={error.password}
              className="mb-4"
            />
            <button className="py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded w-full">
              Login
            </button>
          </form>
          <small>
            New to Readit?
            <Link href="/register">
              <a className="mb-1 text-blue-500 uppercase">Sngn up</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
