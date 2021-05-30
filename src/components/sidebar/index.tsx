import Link from "next/link";
import dayjs from "dayjs";

// context
import { useAuthState } from "../../context/auth";
// types
import { Sub } from "../../types";

export function Sidebar({ sub }: { sub: Sub }) {
  const { authenticated } = useAuthState();
  return (
    <div className="ml-6 w-80">
      <div className="bg-white rounded">
        <div className="p-3 bg-blue-500 rounded-t">
          <p className="font-semibold text-white">About community</p>
        </div>
        <div className="p-3">
          <p className="mb-3 text-md">{sub.description}</p>
          <div className="flex mb-3 text-sm font-medium">
            <div className="w-1/2">
              <p>3.4k</p>
              <p>members</p>
            </div>
            <div className="w-1/2">
              <p>220</p>
              <p>online</p>
            </div>
          </div>
          <p className="my-3">
            <i className="fas fa-birthday-cake mr-2"></i>
            Created {dayjs(sub.createdAt).format("D MMM YYYY")}
          </p>
          {authenticated && (
            <Link href={`/r/${sub.name}/submit`}>
              <a className="w-full blue button text-sm py-1">Create Post</a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
