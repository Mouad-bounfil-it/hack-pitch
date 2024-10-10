import { useRef } from "react";
import cn from "classnames";
import {
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogContent,
} from "@reach/alert-dialog";

import { Button } from "@startupsquare/ds";

import AlertDialogHeader from "./header";

interface AlertDialogPropsI {
  isOpen: boolean;
  onClose?: () => any;
  onPrimaryAction?: () => any;
  intent?: "success" | "danger" | "destructive" | "info" | "warning";
  title: string;
  content?: string;
  renderContent?: () => React.ReactNode;
  primaryButtonText?: string;
  cancelButtonText?: string;
  renderActionButtons?: (any) => React.ReactNode;
  className?: string;
  overlayClassName?: string;
  isDismissible?: boolean;
  isLoading?: boolean;
}

export default function AlertDialog({
  intent = "destructive",
  isOpen = false,
  title,
  content,
  onClose = () => {},
  onPrimaryAction = () => {},
  renderContent,
  primaryButtonText,
  cancelButtonText,
  renderActionButtons,
  isDismissible = true,
  isLoading = false,
  className,
  overlayClassName,
}: AlertDialogPropsI) {
  const cancelRef = useRef();

  return (
    <AlertDialogOverlay
      className={cn(
        overlayClassName,
        "fixed inset-0 z-[200] bg-blue-gray-500 bg-opacity-60 w-screen h-screen flex items-center justify-center"
      )}
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onDismiss={() => {
        if (isDismissible) {
          onClose();
        }
      }}
    >
      <AlertDialogContent
        className={cn(
          className,
          "w-full max-w-lg bg-white border rounded-md shadow-xl overflow-hidden focus:outline-none",
          "slide-up"
        )}
      >
        <AlertDialogHeader title={title} onClose={onClose} intent={intent} />
        <AlertDialogDescription className="px-5">
          {renderContent ? (
            renderContent()
          ) : (
            <p className="leading-relaxed">{content}</p>
          )}
        </AlertDialogDescription>
        <div className="p-5">
          {renderActionButtons ? (
            renderActionButtons(cancelRef)
          ) : (
            <div className="flex items-center justify-end space-x-2.5">
              {cancelButtonText ? (
                <Button
                  onClick={onClose}
                  ref={cancelRef}
                  intent="secondary"
                  style="ghost"
                >
                  {cancelButtonText}
                </Button>
              ) : null}
              <Button
                onClick={onPrimaryAction}
                isLoading={isLoading}
                intent={
                  intent === "destructive"
                    ? "danger"
                    : intent === "info"
                    ? "tertiary"
                    : intent
                }
              >
                {primaryButtonText || "Dismiss"}
              </Button>
            </div>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialogOverlay>
  );
}
