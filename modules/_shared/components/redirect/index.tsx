import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Redirect({ to, isReplace = false }) {
  const router = useRouter();

  useEffect(() => {
    if (isReplace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  }, []);

  return null;
}
