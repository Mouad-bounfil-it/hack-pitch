import { Button, Center } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

export type ErrorType =
  | "default"
  | "configuration"
  | "accessdenied"
  | "verification";

const errors: Record<ErrorType, Record<"h1" | "msg" | "msg2", string>> = {
  default: {
    h1: "Error",
    msg: "Something bad happened!",
    msg2: "",
  },
  configuration: {
    h1: "Server error",
    msg: "There is a problem with the server configuration.",
    msg2: "Check the server logs for more information.",
  },
  accessdenied: {
    h1: "Access Denied",
    msg: "You do not have permission to sign in.",
    msg2: "",
  },
  verification: {
    h1: "Unable to sign in",
    msg: "The sign in link is no longer valid.",
    msg2: "It may have been used already or it may have expired.",
  },
};

export default function Error() {
  const { query } = useRouter();
  const error = query.error as string;
  const { h1, msg, msg2 } =
    errors[error?.toLowerCase() as ErrorType] ?? errors.default;

  return (
    <Center className="flex flex-col min-h-screen">
      <div className="-mt-32 md:w-1/3">
        <div className="flex flex-col items-center mt-4">
          <h1 className="text-2xl">{h1}</h1>
          <p className="mt-2 text-center text-slate-500">
            {msg} <br /> {msg2}
          </p>
          <Link href="/">
            <Button variant="default" component="a" className="mt-4">
              Go to home page
            </Button>
          </Link>
        </div>
      </div>
    </Center>
  );
}
