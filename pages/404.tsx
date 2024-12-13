import MainAuthWrapper from "@/layouts/main-auth-wrapper/main-auth-wrapper";
import { withLayout } from "@moxy/next-layout";

import API from "../router";
import { Center, Skeleton } from "@mantine/core";

function CustomNotFoundPage() {
  return (
    <div className="flex flex-col justify-center max-w-3xl min-h-screen gap-6 px-3 mx-auto md:px-0">
      <h1>Page Not Found</h1>
    </div>
  );
}

export default withLayout(<MainAuthWrapper></MainAuthWrapper>)(
  CustomNotFoundPage
);