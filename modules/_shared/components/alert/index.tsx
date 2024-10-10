import cn from "classnames";
import { FiInfo } from "react-icons/fi";

interface AlertPropsI {
  title?: string;
  intent?: "success" | "danger" | "info" | "warning";
  children: React.ReactNode;
}

export default function Alert({
  title,
  intent = "info",
  children,
}: AlertPropsI) {
  return (
    <div
      className={cn(
        "bg-blue-50 bg-opacity-50 border border-blue-100 flex px-5 py-4 rounded"
      )}
    >
      <div className="flex space-x-3">
        <FiInfo size={20} className="mt-0.5 shrink-0 text-primary-600" />
        <div className="">
          <h3 className="mb-3 font-medium text-primary-600">{title}</h3>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
