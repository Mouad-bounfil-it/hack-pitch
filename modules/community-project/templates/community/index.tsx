// /modules/readle-project/templates/readle/index.tsx
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { IoHome } from "react-icons/io5";
import { clsx, Portal } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { TbFaceIdError } from "react-icons/tb";
import { Button } from "@/components/button";
import { Drawer, DrawerContent } from "@/components/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import Stream from "./section/stream";
import Feed from "./section/feed";
import Chat from "./section/chat";
import Profile from "./section/profile";
import AuthPlatform from "@/modules/community-project/components/auth-platform";
import { FaReadme, FaUser } from "react-icons/fa";
import { BsSignpostSplit } from "react-icons/bs";
import { IoMdChatboxes } from "react-icons/io";
import { RiLiveLine } from "react-icons/ri";


const DEFAULT_TABS = [
  {
    desktopTitle: "Feed",
    phoneTitle: "Feed",
    value: "FEED",
    icon: <BsSignpostSplit className="w-5 h-5" />,
    Component: Feed,
    isAuthRequired: false,
  },
  {
    desktopTitle: "Chat",
    phoneTitle: "Chat",
    value: "CHAT",
    icon: <IoMdChatboxes className="w-5 h-5" />,
    Component: Chat,
    isAuthRequired: true,
  },
  {
    desktopTitle: "Stream",
    phoneTitle: "Stream",
    value: "STREAM",
    icon: <RiLiveLine  className="w-5 h-5" />,
    Component: Stream,
    isAuthRequired: true,
  },
  {
    desktopTitle: "Profile",
    phoneTitle: "Profile",
    value: "PROFILE",
    icon: <FaUser className="w-5 h-5" />,
    Component: Profile,
    isAuthRequired: true,
  },
];

function index() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { width } = useViewportSize();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string | undefined>();

  useEffect(() => {
    if (!!router?.query?.currentTab) {
      const isCurrentTabExist = DEFAULT_TABS?.find(
        (t) => t?.value === router?.query?.currentTab?.toString()
      );

      const currentSelectedTabId = isCurrentTabExist
        ? router?.query?.currentTab?.toString()
        : DEFAULT_TABS[0]?.value;

      setSelectedTab(currentSelectedTabId);
    }
  }, [router?.query?.currentTab]);

  const defaultTab = "HOME";
  const isDesktop = width >= 768;

  return (
    <>
      <Portal>
        <Drawer
          open={isLoginOpen}
          onOpenChange={(open) => {
            if (open === false) {
              setIsLoginOpen(false);
            }
          }}
        >
          <DrawerContent
            className="w-full h-auto bg-white"
            onOpenAutoFocus={(e) => {
              e?.preventDefault();
            }}
          >
            <AuthPlatform
              onClose={() => {
                setIsLoginOpen(false);
              }}
            />
          </DrawerContent>
        </Drawer>
      </Portal>

      <div className={`w-full min-h-screen bg-primary`}>
        <Tabs
          defaultValue={defaultTab}
          value={selectedTab}
          className="flex-col items-center justify-center w-full md:flex md:flex-row md:justify-between md:items-start"
        >
          {isDesktop ? (
            <div
              className={`z-10 flex items-center justify-start w-1/4 h-screen py-10 bg-fifth`}
            >
              <TabsList
                className={
                  "animate-delay-300 h-full !pt-0 animate-fade-right bg-fifth backdrop-blur-sm bg-opacity-90 flex-col gap-3 items-center justify-start mb-4  px-5 rounded-2xl text-muted-foreground z-10 w-full"
                }
              >
                <div className="flex items-center justify-start w-full mb-10 text-xl font-bold">
                  <FaReadme size={25} className="mr-4 text-third shrink-0 " />
                  LingoBoss
                </div>
                {DEFAULT_TABS.map(({ value, icon: Icon, desktopTitle }) => {
                  return (
                    <TabsTrigger
                      key={value}
                      value={value}
                      className="w-full animate-fade-up text-gray-500 hover:text-gray-700 animate-delay-300 flex gap-3 justify-center items-center data-[state=active]:text-third data-[state=active]:border data-[state=active]:border-slate-100  data-[state=active]:bg-primary data-[state=active]:rounded-md py-3"
                      onClick={() => {
                        setSelectedTab(value);
                        try {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        } catch (error) {}

                        const { selected, ...cleanRouter } = router.query;

                        router.push(
                          { query: { ...cleanRouter, currentTab: value } },
                          null,
                          { shallow: true }
                        );
                      }}
                    >
                      <div className="flex items-center justify-start w-[70%] gap-3">
                        {Icon ? Icon : null}
                        <div className="text-[17px] font-medium capitalize">
                          {desktopTitle}
                        </div>
                      </div>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>
          ) : (
            <TabsList
              className={clsx(
                "w-full z-10 pt-0 fixed bottom-0 right-0 flex items-center justify-evenly pb-5",
                "animate-fade-top animate-delay-300 border-t border-slate-200 rounded-none rounded-t-[30px]"
              )}
              // @ts-ignore
              disableHeight={true}
            >
              {DEFAULT_TABS.map(({ value, icon: Icon, phoneTitle }) => {
                return (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="text-gray-500 px-1.5 hover:text-gray-700 data-[state=active]:text-third data-[state=active]:pt-1 data-[state=active]:border-third animate-fade-up animate-delay-300 flex-col justify-center items-center"
                    onClick={() => {
                      setSelectedTab(value);
                      try {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } catch (error) {}

                      const { selected, ...cleanRouter } = router.query;

                      router.push(
                        { query: { ...cleanRouter, currentTab: value } },
                        null,
                        { shallow: true }
                      );
                    }}
                  >
                    {Icon ? Icon : null}
                    <span className="mt-1 text-xs truncate">{phoneTitle}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          )}
          {DEFAULT_TABS.map(({ Component, value, isAuthRequired }) => {
            return (
              <TabsContent
                key={value}
                value={value}
                className="pb-[70px] z-1 md:w-3/4 md:h-screen md:overflow-y-auto animate-fade-up md:animate-fade-left"
              >
                {isAuthRequired && status === "unauthenticated" ? (
                  <div className="w-[90%] h-screen mx-auto rounded-md flex flex-col justify-center items-center animate-fade">
                    <div className="w-[90%] text-center flex flex-col items-center gap-4">
                      <div className="flex flex-col items-center gap-1">
                        <TbFaceIdError
                          size={70}
                          className="text-third shrink-0"
                        />
                        <span className="text-fourth">
                          Bitte melden Sie sich an, um auf diesen Bereich
                          zuzugreifen.
                        </span>
                      </div>

                      <Button
                        onClick={() => setIsLoginOpen(true)}
                        className="font-semibold border shadow-md text-third bg-fifth border-secondary"
                      >
                        Anmelden
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Component />
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </>
  );
}

export default index;
