import { withLayout } from "@moxy/next-layout";
import MainPlatformLayout from "@/layouts/main-platform-layout/main-platform-layout";
import BanAuthWrapper from "@/layouts/ban-auth-wrapper/ban-auth-wrapper";
import AppPage from "@/modules/community-project/templates/community";
import HackPitch from "@/modules/community-project/templates/hack-pitch";



function HomePage() {
  return (
    <BanAuthWrapper>
      <HackPitch />
    </BanAuthWrapper>
  );
}

export default withLayout(<MainPlatformLayout />)(HomePage);
