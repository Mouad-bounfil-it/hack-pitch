import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { RedirectComponent } from "@/modules/_shared/components";
import { BiLoaderAlt } from "react-icons/bi";

interface AuthSessionWrapperI {
  children?: React.ReactNode;
}

export default function MainAuthWrapper({ children }: AuthSessionWrapperI) {
  const router = useRouter();

  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <BiLoaderAlt className="text-gray-400 animate-spin" size={30} />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <RedirectComponent
        to="/auth/login"
        query={{ returnUrl: router.asPath }}
      />
    );
  }

  return <>{children}</>;
}
