import { HiX } from "react-icons/hi";

export interface ModalHeaderPropsI {
  title?: React.ReactNode;
  onClose: () => any;
  className?: string;
}

export default function ModalHeader({
  title = "",
  onClose = () => {},
  className,
}: ModalHeaderPropsI) {
  return (
    <div
      className={`flex items-center p-5 bg-blue-gray-50 bg-opacity-20 border-b border-blue-gray-100 ${className}`}
    >
      {typeof title === "string" ? (
        <h4 className="flex items-center space-x-5 text-lg font-medium line-clamp-1">
          {title}
        </h4>
      ) : (
        <>{title}</>
      )}
      <a
        href="#close"
        onClick={(e) => {
          e.preventDefault();
          onClose();
        }}
        className="ml-auto text-blue-gray-400 hover:text-blue-gray-600 focus:outline-none"
      >
        <HiX size={22} />
      </a>
    </div>
  );
}
