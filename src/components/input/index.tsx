import classNames from "classnames";

interface Props {
  className?: string;
  type: string;
  placeholder: string;
  value: string;
  error: string | undefined;
  setValue: (str: string) => void;
}

export const CustomInput: React.FC<Props> = ({
  type,
  placeholder,
  value,
  setValue,
  error,
  className = "mb-2",
}) => {
  return (
    <div className={className}>
      <input
        type={type}
        className={classNames(
          "transition duration-200 px-3 py-2 bg-gray-50focus:bg-white hover:bg-white border border-gray-300 rounded w-full outline-none",
          {
            "border-red-500": error,
          }
        )}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <small className="font-medium text-red-600">{error}</small>
    </div>
  );
};
