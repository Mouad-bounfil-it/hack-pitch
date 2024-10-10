import React from "react";
import API from "@/router/index";

function index() {
  const { data } = API.public.useFirstCom();
  console.log(data);
  return <div>
    <h1>Check</h1>

  </div>;
}

export default index;
