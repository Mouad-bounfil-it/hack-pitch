import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import LoadingComponent from "@/modules/_shared/components/loading-platform";

interface BanAuthWrapperProps {
  children?: React.ReactNode;
}

export default function BanAuthWrapper({ children }: BanAuthWrapperProps) {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingComponent className="stroke-secondary" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <>{children}</>;
  }

  if (status === "authenticated") {
    const isBanned = session?.user?.isBanned || false;

    if (isBanned) {
      router.push("/ban");
      return null;
    }

    return <>{children}</>;
  }

  return <>{children}</>;
}
