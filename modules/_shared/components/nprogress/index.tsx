import Progress from "nprogress";
import { useRouter } from "next/router";
import { useEffect } from "react";

// https://leerob.io/snippets/loading-progress
export default function NProgress() {
  const router = useRouter();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let doneTimeout: NodeJS.Timeout;

    const start = () => {
      timeout = setTimeout(Progress.start, 100);
    };

    const done = () => {
      doneTimeout = setTimeout(() => {
        clearTimeout(timeout);
        Progress.done();
      }, 100);
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", done);

    router.events.on("hashChangeStart", start);
    router.events.on("hashChangeComplete", done);

    router.events.on("routeChangeError", done);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", done);

      router.events.off("hashChangeStart", start);
      router.events.off("hashChangeComplete", done);

      router.events.off("routeChangeError", done);
    };
  }, [router]);
  return <></>;
}
