import { useKey } from "react-use";
import { motion, AnimatePresence } from "framer-motion";

import { FiX } from "react-icons/fi";
import { cn } from "@/components/utils";

interface PagePanelPropsI {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => any;
  className?: string;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  // size?: "small" | "medium" | "large" | "extraLarge";
}

export default function PagePanel({
  children,
  isOpen,
  onClose,
  className,
  closeOnEscape = true,
  showCloseButton = true,
}: PagePanelPropsI) {
  if (isOpen) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }

  useKey(closeOnEscape ? "Escape" : null, onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "fixed inset-0 z-[100] bg-blue-gray-500/0 bg-opacity-60 w-screen h-screen flex justify-end"
          )}
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "just" }}
            className={cn("relative w-full bg-white overflow-auto", className)}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {showCloseButton && (
              <a
                href="#close"
                className={cn(
                  "fixed hover:text-blue-gray-700 left-4 rounded-full text-blue-gray-400 top-4 z-30"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClose();
                }}
              >
                <FiX size={24} />
              </a>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
