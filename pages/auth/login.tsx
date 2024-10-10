import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Button, Center, Loader, TextInput } from "@mantine/core";
import { RedirectComponent } from "@/modules/_shared/components";

export default function Login() {
  const router = useRouter();
  const { status } = useSession();
  const [loading, handlers] = useDisclosure(false);

  const returnUrl = (router.query.returnUrl as string) || "/";

  const form = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value?.trim()) ? null : "Invalid email",
    },
  });

  async function login(email: string) {
    handlers.open();

    await signIn("email", {
      email: email?.trim(),
      callbackUrl: `${process.env.NEXT_PUBLIC_FRONT_URL}${returnUrl}`,
    });

    handlers.close();
  }

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        Loading ..
      </div>
    );
  }

  if (status === "authenticated") {
    let baseUrl = "/";
    let queryParams = {};

    try {
      if (returnUrl) {
        const url = new URL(`${process.env.NEXT_PUBLIC_FRONT_URL}${returnUrl}`);

        baseUrl = url.pathname;
        queryParams = Object.fromEntries(url.searchParams.entries());
      }
    } catch (error) {}

    return <RedirectComponent to={baseUrl} query={queryParams} />;
  }

  return (
    <Center className="min-h-screen">
      <form
        onSubmit={form.onSubmit((values) => login(values.email))}
        className="md:w-1/4 min-w-[300px]"
      >
        <div className="flex flex-col items-center mt-4">
          <h1 className="text-2xl">Login via email</h1>
          <p className="mt-2 text-slate-500">
            We'll send you a link to your email.
          </p>
        </div>

        <TextInput
          mt={32}
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
          size="md"
        />

        <Button type="submit" fullWidth size="md" mt={18} loading={loading}>
          Sign in
        </Button>
      </form>
    </Center>
  );
}
