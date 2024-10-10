import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import cn from "classnames";

interface DropdownMenuI {
  children: React.ReactNode;
  menuItems: any[];
  onItemSelected?: (any) => any;
  className?: string;
}

export default function DropdownMenu({
  children = null,
  menuItems = [],
  onItemSelected = () => {},
  className = "",
}: DropdownMenuI) {
  const cls = cn(
    className,
    "absolute right-0 w-40 mt-2 origin-top-right bg-white border border-slate-200 divide-y divide-slate-100 rounded shadow-md outline-none overflow-hidden"
  );
  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button as={Fragment}>{children}</Menu.Button>
          <Transition
            show={open}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className={cls}>
              {menuItems.map((menuItem, i) => {
                return (
                  <Menu.Item
                    key={i}
                    as="a"
                    href="#menu"
                    className={`flex items-center w-full px-3 py-2 text-sm hover:bg-slate-50 hover:text-primary-600 focus:outline-none ${
                      menuItem?.className ?? ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      onItemSelected(menuItem);
                    }}
                  >
                    {menuItem?.Icon && (
                      <div className="flex mr-2">{menuItem?.Icon}</div>
                    )}
                    <span className="text-sm">{menuItem.title}</span>
                  </Menu.Item>
                );
              })}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
