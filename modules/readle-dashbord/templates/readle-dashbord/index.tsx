import React from "react";
import { BiLoaderAlt } from "react-icons/bi";
import API from "@/router/index";



const FirsPage: React.FC = () => {
  const { data, isValidating, error, isLoading } = API.public.useFirstCom();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <BiLoaderAlt className="text-gray-400 animate-spin" size={30} />
      </div>
    );
  }

  return (
    <div>
      <span>This is the response from server</span>
      <span className="text-blue-500">{data?.message}</span>
    </div>
  );
};

export default FirsPage;
