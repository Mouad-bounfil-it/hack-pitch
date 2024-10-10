import { withLayout } from "@moxy/next-layout";
import MainAuthWrapper from "@/layouts/main-auth-wrapper/main-auth-wrapper";
import { Center, Loader } from "@mantine/core";
import MainPlatformLayout from "@/layouts/main-platform-layout/main-platform-layout";

function HomePage() {
  return <Center>Loading ..</Center>;
}

export default withLayout(<MainPlatformLayout />)(HomePage);
