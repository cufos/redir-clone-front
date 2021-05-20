import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
// components
import { CustomInput } from "../components/input";
// context
import { useAuthState } from "../context/auth";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [error, setError] = useState<any>({});
  const { authenticated } = useAuthState();

  const router = useRouter();
  if (authenticated) router.push("/");

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();

    if (!agreement) {
      setError({ ...error, agreement: "You must agree to T&Cs" });
      return;
    }

    try {
      await axios.post("/auth/register", {
        email,
        password,
        username,
      });

      router.push("/login");
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

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
            <div className="mb-6">
              <input
                type="checkbox"
                id="agreement"
                className="mr-1 cursor-pointer"
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
              />
              <label htmlFor="agreement" className="text-xs cursor-pointer">
                I agree to get emails about cool stuff on Readit
              </label>
              <small className="font-medium text-red-600 block">
                {error.agreement}
              </small>
            </div>
            <CustomInput
              type="email"
              placeholder="Email"
              value={email}
              setValue={setEmail}
              error={error.email}
            />
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
              Sign Up
            </button>
          </form>
          <small>
            ALready register?
            <Link href="/login">
              <a className="mb-1 text-blue-500 uppercase">Log In</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
