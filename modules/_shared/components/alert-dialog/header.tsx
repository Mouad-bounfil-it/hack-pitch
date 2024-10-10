import { AlertDialogLabel } from "@reach/alert-dialog";
import cn from "classnames";

import {
  HiOutlineCheckCircle,
  HiOutlineExclamation,
  HiOutlineExclamationCircle,
  HiOutlineInformationCircle,
  HiOutlineTrash,
  HiX,
} from "react-icons/hi";

const IntentIcons = {
  info: HiOutlineInformationCircle,
  warning: HiOutlineExclamation,
  destructive: HiOutlineTrash,
  danger: HiOutlineExclamationCircle,
  success: HiOutlineCheckCircle,
};

export default function AlertDialogHeader({ intent, title, onClose }) {
  const IntentIcon = IntentIcons[intent] || HiOutlineInformationCircle;
  return (
    <AlertDialogLabel>
      <div className="flex items-center justify-between p-5">
        <h4 className="flex items-center space-x-5 text-lg font-medium">
          <span
            className={cn("text-white rounded-full p-1", {
              "bg-red-500": intent === "destructive" || intent === "danger",
              "bg-indigo-500": intent === "info",
              "bg-yellow-500": intent === "warning",
              "bg-green-500": intent === "success",
            })}
          >
            <IntentIcon size={18} className="" />
          </span>
          <span className="line-clamp-1">{title}</span>
        </h4>
        <a
          href="#close"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
          className="text-blue-gray-400 hover:text-blue-gray-600 focus:outline-none"
        >
          <HiX size={22} />
        </a>
      </div>
    </AlertDialogLabel>
  );
}
