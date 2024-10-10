import cn from "classnames";
import { Button, Input } from "@startupsquare/ds";
import { FiLoader, FiUploadCloud } from "react-icons/fi";

export default function InputFileUpload({
  isDisabled = false,
  isLoading = false,
  value,
  onChange = (any, boolean) => {},
}) {
  let _value = "Select file";
  const isValueString = value && typeof value === "string";

  if (isValueString) {
    _value = value;
  }

  if (value && value.name) {
    _value = value.name;
  }

  return (
    <div
      className={cn("relative flex shadow-sm rounded overflow-hidden h-11", {
        "border bg-white text-blue-gray-600 focus-within:border-primary-600":
          !isDisabled,
        "border bg-blue-gray-100 text-blue-gray-600": isDisabled,
      })}
    >
      <input
        disabled={isDisabled}
        className={cn("h-11 text-sm flex-1 px-3 truncate focus:outline-none")}
        onChange={(e) => {
          onChange(e, false);
        }}
        value={_value}
      />
      <button
        disabled={isDisabled}
        className="relative cursor-pointer text-blue-gray-400 hover:text-primary-600 h-11 flex items-center justify-center px-5 bg-blue-gray-50 border-l focus:outline-none"
      >
        {!isLoading && (
          <FiUploadCloud
            size={20}
            className="ml-auto flex-shrink-0 cursor-pointer"
          />
        )}
        {isLoading && (
          <FiLoader
            size={20}
            className="ml-auto flex-shrink-0 cursor-pointer animate-spin"
          />
        )}
        <input
          disabled={isDisabled}
          type="file"
          className="absolute cursor-pointer left-0 w-full top-0 h-full opacity-0 focus:outline-none"
          onChange={(e) => {
            onChange(e, true);
          }}
        />
      </button>
    </div>
  );
}
