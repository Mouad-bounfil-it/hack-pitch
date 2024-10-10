import { Components as SharedComponents } from "@/modules/_shared";
import { Spinner } from "@startupsquare/ds";
import { FiSearch } from "react-icons/fi";

interface SearchModalPropsI {
  isOpen: boolean;
  onClose: () => any;
  children: React.ReactNode;
  searchTerm: string;
  setSearchTerm: (any) => any;
  isLoading?: boolean;
}

export default function SearchModal({
  isOpen = false,
  onClose = () => {},
  searchTerm = "",
  setSearchTerm = () => {},
  isLoading = false,
  children,
}: SearchModalPropsI) {
  return (
    <SharedComponents.Modal isOpen={isOpen} onClose={onClose}>
      <SharedComponents.Modal.Content>
        <div className="relative -mt-4 flex items-center space-x-3 border-b-2 border-blue-gray-200 focus-within:border-primary-600">
          <FiSearch size={22} className="text-blue-gray-400" />
          <input
            type="text"
            placeholder="Search .."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="flex-1 py-5 border-0 bg-white focus:ring-0 text-lg placeholder-blue-gray-400"
          />
          {isLoading && <Spinner color="indigo" size="medium" />}
          <span className="text-2xs px-2 py-2 rounded text-blue-gray-500 uppercase bg-blue-gray-100">
            ESC to Quit
          </span>
        </div>
        <div className="flex flex-col mt-5">{children}</div>
      </SharedComponents.Modal.Content>
    </SharedComponents.Modal>
  );
}
