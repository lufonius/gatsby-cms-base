import * as React from "react";
import FeatherIcon from 'feather-icons-react';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, Input, DialogPanel, DialogTitle, Description, DialogBackdrop, Field, Label, Switch } from '@headlessui/react';
import dayjs from 'dayjs';
import DownloadPhotosDialog from "./download-photos-dialog";
import Button from "./button";

const CubeEvent: React.FC<{
  startDate?: Date,
  endDate?: Date,
  city?: string,
  location?: string,
  googleMapsLink?: string,
  swissTransferLink?: string,
  swissTransferLinkValidUntil?: Date
}> = ({ city, swissTransferLink, swissTransferLinkValidUntil }) => {

  let [isOpen, setIsOpen] = useState(false);

  const daysUntilLinkExpires = () => {
    const now = dayjs();
    const expiryDate = dayjs(swissTransferLinkValidUntil);
    return expiryDate.diff(now, 'day');
  };

  return (
    <div className="flex flex-col p-4 cursor-pointer transform transition duration-100 opacity-100 hover:bg-gray-800 mt-6">
        <div className="flex flex-row">
            <div className="flex flex-col">
                <div className="rounded bg-white p-4 text-2xl text-gray-900 text-center">18</div>
                <div className="text-xl text-gray-50 text-center w-full mt-2">DEZ</div>
            </div>
            <div className="flex flex-col pl-4">
                <div className="text-2xl"><span><b>Cube in {city}, Züghusplatz</b></span></div>
                <div className="flex flex-col">
                    <div>
                        <div className="bg-red-800 text-gray-50 uppercase p-1 px-2 rounded inline-block mt-1"><b>Abgesagt</b></div>
                    </div>

                    <div className="flex flex-row py-1 mt-3">
                        <div className="text-gray-50 pr-2 "><FeatherIcon icon="calendar"></FeatherIcon></div>
                        <div><span>Samstag, 18. Dez (5 mal schlafen)</span></div>
                    </div>

                    <div className="flex flex-row py-1">
                        <div className="text-gray-50 pr-2"><FeatherIcon icon="clock"></FeatherIcon></div>
                        <div><span>14:00 - 17:00</span></div>
                    </div>

                    <div className="flex flex-row py-1">
                        <div className="text-gray-50 pr-2"><FeatherIcon icon="map-pin"></FeatherIcon></div>
                        <div><span>Züghusplatz</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex">
            <div className="flex flex-grow h-1"></div>
            <div className="mt-4">
                {!!swissTransferLink && !!swissTransferLinkValidUntil && daysUntilLinkExpires() > 0 &&
                    <Button className="mr-2" onClick={() => setIsOpen(true)} type="skinny">Fotos herunterladen</Button>
                }
                <Button type="full">Mehr Infos</Button>
            </div>
        </div>

        {!!swissTransferLink  && !!swissTransferLinkValidUntil && daysUntilLinkExpires() > 0 && (
            <DownloadPhotosDialog
                isOpen={isOpen}
                onClosed={() => setIsOpen(false)}
                swissTransferLink={swissTransferLink}
                swissTransferLinkValidUntil={swissTransferLinkValidUntil} />
        )}

    </div>
  );
}

export default CubeEvent;