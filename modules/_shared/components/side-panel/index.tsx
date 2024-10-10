import { useCallback, useEffect } from "react";
import cn from "classnames";
import { useKey } from "react-use";
import { motion, AnimatePresence } from "framer-motion";

import { FiX } from "react-icons/fi";

interface SidePanelPropsI {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => any;
  closeOnEscape?: boolean;
  closeOnclickOutside?: boolean;
  // size?: "small" | "medium" | "large" | "extraLarge";
}

export default function SidePanel({
  children,
  isOpen,
  onClose,
  closeOnEscape = false,
  closeOnclickOutside = false,
}: SidePanelPropsI) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  useKey(closeOnEscape ? "Escape" : null, onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "fixed inset-0 z-[100] bg-blue-gray-500 bg-opacity-60 w-screen h-screen flex justify-end"
          )}
          onClick={(e) => {
            e.preventDefault();
            if (closeOnclickOutside) {
              onClose();
            }
          }}
        >
          <motion.div
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            transition={{ type: "just" }}
            className={cn("relative w-4/5 bg-white border-l overflow-auto")}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <a
              href="#close"
              className={cn(
                "fixed z-10 -ml-11 top-4 rounded-full p-1 bg-blue-gray-600 text-white hover:bg-blue-gray-500"
              )}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
            >
              <FiX size={20} />
            </a>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
