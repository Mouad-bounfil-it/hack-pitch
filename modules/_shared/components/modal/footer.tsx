interface ModalFooterPropsI {
  children: React.ReactNode;
}

export default function ModalFooter({ children }: ModalFooterPropsI) {
  return (
    <div className="p-5 bg-blue-gray-50 bg-opacity-20 border-t border-blue-gray-100">
      {children}
    </div>
  );
}
