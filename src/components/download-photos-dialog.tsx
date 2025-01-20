import * as React from "react";
import { Dialog, DialogPanel, DialogTitle, Description, DialogBackdrop } from '@headlessui/react';
import dayjs from 'dayjs';
import LinkButton from "./link-button";
import { Cube } from "../model/cube";

const DownloadPhotosDialog: React.FC<{
  isOpen: boolean,
  onClosed: () => void,
  cube: Cube
}> = ({ isOpen, cube, onClosed }) => {

  return (
    <Dialog open={isOpen} onClose={() => onClosed()}
        transition
        className="relative z-50 transition duration-300 ease-out">
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm backdrop-brightness-50" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="max-w-lg space-y-4 bg-gray-800 p-12 rounded">
            <DialogTitle className="font-bold"><h3 className="text-2xl">Fotos herunterladen</h3></DialogTitle>
            <Description>
                <p>Info: Für den Download benötigst du ein <b>Passwort</b>, welches wir in unserer Whatsapp -und Signalgruppe preisgeben.</p><br />
                <p>Die Fotos speichern wir bei einem Schweizer Anbieter (Infomaniak / Swisstransfer)</p>
            </Description>
            <div className="flex gap-4 items-center mt-4">
              {!!cube.swissTransferLink && <LinkButton className="mr-2" href={cube.swissTransferLink} onClick={() => onClosed()} type='full'>Herunterladen</LinkButton>}
              <p className="text-red-500"><b>Link läuft in {cube.getDaysUntilSwissTransferLinkExpired()} Tage(n) ab!</b></p>
            </div>
            </DialogPanel>
        </div>
    </Dialog>
  );
}

export default DownloadPhotosDialog;