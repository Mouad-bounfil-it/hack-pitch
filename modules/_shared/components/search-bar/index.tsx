import cn from "classnames";
import { Input } from "@startupsquare/ds";

import { FaTimes } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

interface SearchBarPropsI {
  searchTerm: string;
  setSearchTerm: (any) => any;
  className?: string;
  inputClassName?: string;
}

export default function SearchBar({
  searchTerm = "",
  setSearchTerm = (text) => {},
  className = "",
  inputClassName = "",
}: SearchBarPropsI) {
  return (
    <>
      <div
        className={`flex items-center overflow-hidden bg-white border rounded-md border-blue-gray-100 focus-within:ring-0 focus-within:border-blue-400 ${className}`}
      >
        <span className="flex items-center justify-center py-2 pl-2 text-blue-gray-400">
          <FiSearch size={14} />
        </span>

        <Input
          placeholder="Search ..."
          shape="rectangle"
          size="small"
          type="text"
          value={searchTerm}
          className={`!border-0 !shadow-none w-full !bg-transparent ${inputClassName}`}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <span
          className={cn(
            "flex items-center justify-center px-2 text-blue-gray-400 cursor-pointer",
            { hidden: searchTerm === "" }
          )}
          onClick={(e) => {
            e && e.preventDefault();
            setSearchTerm("");
          }}
        >
          <FaTimes size={12} />
        </span>
      </div>
    </>
  );
}
