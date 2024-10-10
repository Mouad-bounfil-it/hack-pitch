import cn from "classnames";
import { BsCircle } from "react-icons/bs";
import { FaRegDotCircle } from "react-icons/fa";

interface ChoiseChipsI {
  options: { label: string; value: string | boolean }[];
  selectedChip: any;
  onClick: (e) => any;
}

export default function ChoiseChips(data: ChoiseChipsI) {
  const { options, selectedChip, onClick } = data;
  return (
    <div className="flex space-x-3">
      {options?.map((opt, i) => {
        return (
          <div
            key={i}
            className={cn(
              "flex items-center px-2 py-1 space-x-1 border border-blue-400 rounded-md shadow-sm cursor-pointer hover:shadow",
              {
                "bg-blue-gray-100": opt?.value === selectedChip,
              }
            )}
            onClick={() => {
              onClick(opt?.value);
            }}
          >
            {opt?.value === selectedChip ? (
              <FaRegDotCircle className="text-green-500" size={14} />
            ) : (
              <BsCircle className="text-blue-gray-400" size={12} />
            )}
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-blue-500">
                {opt?.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
