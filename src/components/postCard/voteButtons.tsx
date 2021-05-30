import classNames from "classnames";
type Props = {
  bg: string;
  updateVote: (value: number, comment?) => Promise<void>;
  userVote: number;
  voteScore: number;
};

export function VoteButtons({ updateVote, userVote, voteScore, bg }: Props) {
  return (
    <div className={`w-10 text-center ${bg} rounded-l py-2 flex-shrink-0`}>
      {/* UpVote */}
      <div
        className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
        onClick={() => updateVote(1)}
      >
        <i
          className={classNames("icon-arrow-up", {
            "text-red-500": userVote === 1,
          })}
        ></i>
      </div>
      <p className="text-xs font-bold">{voteScore}</p>
      {/* DownVote */}
      <div
        className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600"
        onClick={() => updateVote(-1)}
      >
        <i
          className={classNames("icon-arrow-up", {
            "text-blue-600": userVote === -1,
          })}
        ></i>
      </div>
    </div>
  );
}
