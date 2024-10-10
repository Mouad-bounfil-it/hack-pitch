interface ModalContentPropsI {
  children: React.ReactNode;
}

export default function ModalContent({ children }: ModalContentPropsI) {
  return <div className="p-5">{children}</div>;
}
