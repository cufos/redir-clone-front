export function ActionButton({ children }) {
  return (
    <div className="px-1 mr-2 text-gray-400 rounded cursor-pointer hover:bg-gray-200 text-xs py-1">
      {children}
    </div>
  );
}
