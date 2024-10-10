import cn from "classnames";
import { DialogOverlay, DialogContent } from "@reach/dialog";

// export sub components
import ModalHeader from "./header";
import ModalContent from "./content";
import ModalFooter from "./footer";

interface ModalPropsI {
  isOpen: boolean;
  onClose: () => any;
  children?: React.ReactNode;
  // size?: "small" | "medium" | "large" | "extraLarge";
  className?: string;
  overlayClassName?: string;
}

// const sizeClassnameMap = {
//   small: "max-w-md",
//   medium: "max-w-xl",
//   large: "max-w-2xl",
//   extraLarge: "max-w-5xl",
//   fullScreen: "max-w-full",
// };

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default function Modal({
  isOpen = false,
  onClose = () => {},
  children,
  // size = "fullScreen",
  className,
  overlayClassName,
}: ModalPropsI) {
  return (
    <DialogOverlay
      className={cn(
        overlayClassName,
        "fixed inset-0 z-[100] max-h-screen py-20 overflow-auto",
        "bg-blue-gray-500 bg-opacity-60"
      )}
      isOpen={isOpen}
      onDismiss={onClose}
    >
      <DialogContent
        aria-label="modal"
        className={cn(
          className,
          "w-full bg-white border rounded-md shadow-xl focus:outline-none",
          "max-w-2xl mx-auto",
          "slide-up"
          // sizeClassnameMap[size]
        )}
      >
        {children}
      </DialogContent>
    </DialogOverlay>
  );
}
