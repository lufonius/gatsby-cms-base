import * as React from "react";
import LinkButton from "./link-button";
import { Cube } from "../model/cube";
import { Dialog, DialogActions, DialogTitle } from "./dialog";

const DownloadPhotosDialog: React.FC<{
  isOpen: boolean,
  onClosed: () => void,
  cube: Cube
}> = ({ isOpen, cube, onClosed }) => {

  return (
    <Dialog isOpen={isOpen} onClosed={() => onClosed()}>
        <DialogTitle>Fotos herunterladen</DialogTitle>
        <p>Info: Für den Download benötigst du ein <b>Passwort</b>, welches wir in unserer Whatsapp -und Signalgruppe preisgeben.</p><br />
        <p>Die Fotos speichern wir bei einem Schweizer Anbieter (Infomaniak / Swisstransfer)</p>
        <DialogActions>
          {!!cube.swissTransferLink && <LinkButton className="mr-2" href={cube.swissTransferLink} onClick={() => onClosed()} type='full'>Herunterladen</LinkButton>}
          <p className="text-red-500"><b>Link läuft in {cube.getDaysUntilSwissTransferLinkExpired()} Tage(n) ab!</b></p>
        </DialogActions>
    </Dialog>
  );
}

export default DownloadPhotosDialog;