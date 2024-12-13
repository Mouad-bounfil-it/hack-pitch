import { useEffect } from "react";
import { useViewportSize } from "@mantine/hooks";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/shadcn-button";
import { FaCheckCircle } from "react-icons/fa";
import LoadingComponent from "@/modules/_shared/components/loading-platform";

interface AuthPlatformProps {
  onClose?: () => void;
  authPlatformMode?: string;
}

const AuthPlatform: React.FC<AuthPlatformProps> = ({
  onClose,
  authPlatformMode,
}) => {
  const router = useRouter();
  const { status } = useSession();
  const { width } = useViewportSize();

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    signIn("google");
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <LoadingComponent />
      </div>
    );
  }

  const isDesktop = width >= 768;

  return (
    <div className="overflow-y-auto">
      {isDesktop ? (
        <section className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center justify-center w-4/5 gap-32 mx-auto my-20 lg:flex-row">
            {/* text and auth */}
            <div className="w-full mb-8 text-left lg:w-1/2 lg:mb-0">
              <div className="flex items-center mb-4 text-lg text-black gap-x-4">
                <span className="w-[30px] h-[2px] bg-black"></span>
                Welcome Back 👋
              </div>
              <h1 className="mb-8 text-5xl font-bold text-black">Login Now</h1>
              <p className="subtitle max-w-[400px]">
                Rapidly learn German with engaging News and Stories transformed
                into bite-sized language lessons. LingoBoss offers a fun and
                effective way to learn languages through interactive and
                accessible content. Start your language journey today with
                LingoBoss!
              </p>
              {/* Wrap each button in a div with the desired styles */}
              <div
                className="flex items-center justify-center px-4 py-1 text-white transition-colors bg-black rounded-full"
                onClick={handleGoogleLogin}
              >
                {/* <Button
                  className="flex items-center justify-center text-white"
                  onClick={handleGoogleLogin}
                > */}
                Login with Google
                <FcGoogle size={20} className="ml-3" />
                {/* </Button> */}
              </div>
            </div>
            {/* Read Anywhere Anytime Section */}
            <div className="flex flex-col gap-y-4">
              <h2 className="flex flex-col mb-4 text-4xl font-bold text-gray-900 gap-y-3">
                <span>Read</span>
                <span className="text-secondary">Anytime</span>
                <span>Anywhere</span>
              </h2>
              <div className="flex items-center">
                <div className="p-2 mr-3 bg-green-100 rounded-full">
                  <FaCheckCircle className="text-lg text-green-600" />
                </div>
                <p className="text-lg text-gray-800">
                  Learn with 1000+ stories & news
                </p>
              </div>
              <div className="flex items-center">
                <div className="p-2 mr-3 bg-green-100 rounded-full">
                  <FaCheckCircle className="text-lg text-green-600" />
                </div>
                <p className="text-lg text-gray-800">
                  Enjoy daily new lessons for all languages
                </p>
              </div>
              <div className="flex items-center">
                <div className="p-2 mr-3 bg-green-100 rounded-full">
                  <FaCheckCircle className="text-lg text-green-600" />
                </div>
                <p className="text-lg text-gray-800">
                  Powerful flashcards with story context
                </p>
              </div>
              <div className="flex items-center">
                <div className="p-2 mr-3 bg-green-100 rounded-full">
                  <FaCheckCircle className="text-lg text-green-600" />
                </div>
                <p className="text-lg text-gray-800">
                  Easy grammar lessons & fun quizzes
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center justify-center w-4/5 gap-32 mx-auto my-20 lg:flex-row">
            {/* text and auth */}
            <div className="w-full mb-8 text-left lg:w-1/2 lg:mb-0">
              <div className="flex items-center mb-4 text-lg text-black gap-x-4">
                <span className="w-[30px] h-[2px] bg-black"></span>
                Willkommen zurück 👋
              </div>
              <h1 className="mb-8 text-4xl font-bold text-black">
                Jetzt anmelden
              </h1>
              <p className="subtitle max-w-[400px]">
                Erlernen Sie schnell Deutsch mit ansprechenden Nachrichten und
                Geschichten, die in kleine Sprachlektionen umgewandelt wurden.
                LingoBoss bietet eine unterhaltsame und effektive Möglichkeit,
                Sprachen durch interaktive und zugängliche Inhalte zu lernen.
                Beginnen Sie noch heute Ihre Sprachreise mit LingoBoss!
              </p>
              {/* Wrap each button in a div with the desired styles */}
              <div
                className="flex items-center justify-center px-4 py-3 mt-3 text-white transition-colors bg-black rounded-full cursor-pointer"
                onClick={handleGoogleLogin}
              >
                {/* <Button
                  className="flex items-center justify-center text-white"
                  onClick={handleGoogleLogin}
                > */}
                Mit Google anmelden
                <FcGoogle size={20} className="ml-3" />
                {/* </Button> */}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AuthPlatform;
