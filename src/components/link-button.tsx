import * as React from "react";
import {useState} from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const LinkButton: React.FC<{
    children: any,
    onClick?: () => void,
    href: string,
    target?: string,
    type: 'full' | 'skinny',
    className?: string
}> = ({children, onClick, href, target, type, className}) => {

    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        if (!!onClick) { onClick(); }
        setIsClicked(true);
        // Automatically reset after animation completes
        setTimeout(() => setIsClicked(false), 125);
    };

    const getClasses = () => {
        if (type === 'skinny') {
            return twMerge("transform transition duration-100 hover:scale-105 hover:bg-gray-50 hover:text-gray-950 transparent text-gray-50 rounded border-2 border-white p-2", className);
        } else if (type === 'full') {
            return twMerge("transform transition duration-100 hover:scale-105 hover:bg-gray-800 hover:text-gray-50 transparent text-gray-950 bg-gray-50 rounded border-2 border-white p-2", className);
        }
    };

  return (
    <motion.a
        href={href}
        target={target ?? "_blank"}
        className={getClasses()}
            onClick={handleClick}
            animate={isClicked ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.125, ease: "easeOut" }}>
            {children}
    </motion.a>
  );
}

export default LinkButton;