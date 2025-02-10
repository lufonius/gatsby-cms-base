import * as React from "react";
import { Dialog as HeadlessUIDialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
import FeatherIcon from "feather-icons-react";

export const Dialog: React.FC<{
  isOpen: boolean,
  onClosed: () => void,
  children: any
}> = ({ isOpen, onClosed, children }) => {

  return (
    <HeadlessUIDialog open={isOpen} onClose={() => onClosed()}
        transition
        className="relative z-50 transition duration-300 ease-out">
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm backdrop-brightness-50" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="max-w-lg space-y-4 bg-gray-800 p-6 rounded">
            <div className="flex w-full">
              <div className="h-1 flex grow"></div>
              <div onClick={() => onClosed()}><FeatherIcon className="text-gray-50" icon="x" /></div>
            </div>
            <div className="p-6">{children}</div>
            </DialogPanel>
        </div>
    </HeadlessUIDialog>
  );
}

export const DialogTitle: React.FC<{children: any}> = ({children}) => {
    return (<h3 className="font-bold text-2xl">{children}</h3>);
};

export const DialogActions: React.FC<{children: any}> = ({children}) => {
    return (<div className="flex gap-4 items-center mt-4">{children}</div>);
};