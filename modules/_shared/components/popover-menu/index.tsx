import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { clsx } from "@mantine/core";

interface PopoverMenuI {
  children: React.ReactNode;
  menuItems: any[];
  onItemSelected?: (any) => any;
  className?: string;
  selectedItem?: any;
  isGroupedItems?: boolean;
}

// menuItems => [{title:"",value:"",Icon:"",className:""}]

export default function PopoverMenu({
  children = null,
  menuItems = [],
  onItemSelected = () => {},
  className = "",
  selectedItem = {},
}: PopoverMenuI) {
  return (
    <Popover className="relative">
      {({ open, close: _close }) => (
        <>
          <Popover.Button as={Fragment}>{children}</Popover.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Popover.Panel className="absolute left-0 z-10 max-w-xs px-4 -mr-4 transform bg-white sm:px-0 top-6 w-28">
              {/* Grouped cards */}
              <div
                className={clsx(
                  "absolute right-0 w-40 mt-2 origin-top-right bg-white border border-slate-200 rounded-sm shadow-md outline-none overflow-hidden",
                  className
                )}
              >
                {menuItems.map((menuItem, i) => {
                  return (
                    <div
                      key={i}
                      className={`flex cursor-pointer items-center w-full px-3 py-2 text-sm hover:bg-slate-50 hover:text-primary-600 focus:outline-none ${
                        (menuItem?.className ?? "",
                        selectedItem?.value === menuItem?.value
                          ? "text-primary-600"
                          : "")
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        onItemSelected(menuItem);
                        _close();
                      }}
                    >
                      {menuItem?.Icon && (
                        <div className="flex mr-2">{menuItem?.Icon}</div>
                      )}

                      <span className="text-sm">{menuItem.title}</span>
                    </div>
                  );
                })}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
