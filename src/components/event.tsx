import * as React from "react";
import FeatherIcon from 'feather-icons-react';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, Input, DialogPanel, DialogTitle, Description, DialogBackdrop, Field, Label, Switch } from '@headlessui/react';
import dayjs from 'dayjs';
import DownloadPhotosDialog from "./download-photos-dialog";
import Button from "./button";
import { Cube } from "../model/cube";
import Badge from "./badge";

const CubeEvent: React.FC<{
  cube: Cube
}> = ({ cube }) => {

  let [isOpen, setIsOpen] = useState(false);

  const getClassForStatus = () => {
    if (cube.eventStatus === "in-planning") {
        return "bg-orange-700";
    } else if (cube.eventStatus === "cancelled") {
        return "bg-red-800";
    }
  }

  return (
    <div className="rounded flex flex-col p-4 cursor-pointer transform transition duration-100 opacity-100 hover:bg-gray-800 mt-6 max-w-lg">
        <div className="flex flex-row">
            <div className="flex flex-col">
                <div className="rounded bg-white p-4 text-2xl text-gray-900 text-center">{cube.getDay()}</div>
                <div className="text-xl text-gray-50 text-center w-full mt-2">{cube.getMonthAbbreviation()}</div>
            </div>
            <div className="flex flex-col pl-6">
                <div className="text-2xl"><span className={cube.isCancelled() ? "line-through" : ""}><b>Cube in {cube.location.city.name}, {cube.location.name}</b></span></div>
                <div className="flex flex-col">
                    {cube.isInPlanningOrCancelled() && <div className="mt-1">
                        <Badge className={getClassForStatus()}>{cube.getEventStatusDisplayText()}</Badge>
                    </div>}

                    <div className="flex flex-row py-1 mt-3">
                        <div className="text-gray-50 pr-2 "><FeatherIcon icon="calendar"></FeatherIcon></div>
                        <div><span>{cube.getWeekday()}, {cube.getDateInSwissFormat()}</span></div>
                    </div>

                    <div className="flex flex-row py-1">
                        <div className="text-gray-50 pr-2"><FeatherIcon icon="clock"></FeatherIcon></div>
                        <div><span>{cube.getStartTime()} - {cube.getEndTime()}</span></div>
                    </div>

                    <div className="flex flex-row py-1">
                        <div className="text-gray-50 pr-2"><FeatherIcon icon="map-pin"></FeatherIcon></div>
                        <div><a className="text-gray-50 hover:text-blue-700" href={cube.location.googleMapsLink} target="_blank">
                            <span className="inline mr-1 hover:text-blue-700">{cube.location.name}</span>
                            <FeatherIcon className="inline" icon="external-link" size="1.2rem" />
                        </a></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex">
            <div className="flex flex-grow h-1"></div>
            <div className="mt-4">
                {cube.hasActiveSwissTransferlink() &&
                    <Button className="mr-2" onClick={() => setIsOpen(true)} type="skinny">Fotos herunterladen</Button>
                }
                <Button type="full">Mehr Infos</Button>
            </div>
        </div>

        {cube.hasActiveSwissTransferlink() && (
            <DownloadPhotosDialog
                isOpen={isOpen}
                onClosed={() => setIsOpen(false)}
                cube={cube}
            />
        )}

    </div>
  );
}

export default CubeEvent;