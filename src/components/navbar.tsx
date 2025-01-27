import * as React from "react";
import {useState} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import FeatherIcon from "feather-icons-react";
import { Dialog as HeadlessUIDialog, DialogPanel, DialogBackdrop } from '@headlessui/react';

const Navbar: React.FC<{
    children: any,
    selectedNavItem: string,
    selectedSubItem?: string
}> = ({children, selectedNavItem, selectedSubItem}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="flex flex-col md:flex-row items-start overflow-auto h-screen">
        <header className="flex flex-row items-start sticky h-screen self-start top-0 z-10">
            <div>
                <nav aria-label="desktop-navigation" className="p-4 hidden md:block">
                    <motion.ol className="hidden md:flex md:flex-col">
                        <li className="mb-6">
                            <div className="flex justify-center mt-4">
                                <img className="h-16" src="/logo.png" />
                            </div>
                        </li>
                        <AnimatePresence>
                            <NavItem isSelected={selectedNavItem === "home"} display="Home"/>
                            <NavItem isSelected={selectedNavItem === "aktiv-werden"} display="Eventkalender" />
                            <NavItemDropDown
                                display="Aktivist:in werden"
                                isSelected={selectedNavItem === "aktivistin-werden"}
                                selectedSubItem={selectedSubItem ?? ""}
                                subItems={[
                                    {displayText: "Getting started", value: "getting-started", href: "/getting-started"},
                                    {displayText: "Cube guide", value: "cube-guide", href: "/cube-guide"},
                                    {displayText: "Wie macht man Outreach?", value: "cube-guide", href: "/cube-guide"},
                                ]}
                            />
                            <NavItemDropDown
                                display="Vegan leben"
                                isSelected={selectedNavItem === "vegan-leben"}
                                selectedSubItem={selectedSubItem ?? ""}
                                subItems={[
                                    {displayText: "Warum umsteigen?", value: "vegan-warum", href: "/warum-vegan"},
                                    {displayText: "Wo beginne ich?", value: "vegan-wie", href: "/wie-vegan"}
                                ]}
                            />
                            <NavItem isSelected={selectedNavItem === "wissen"} display="Wissen" />
                            <NavItem isSelected={selectedNavItem === "galerie"} display="Galerie" />
                            <NavItemDropDown
                                display="Über uns"
                                isSelected={selectedNavItem === "ueber-uns"}
                                selectedSubItem={selectedSubItem ?? ""}
                                subItems={[
                                    {displayText: "Unsere Werte", value: "our-values", href: "/our-values"},
                                    {displayText: "Wir, das Team", value: "team", href: "/team"}
                                ]}
                            />
                            <NavItem isSelected={selectedNavItem === "contact"} display="Kontakt" />
                            <NavItem isSelected={selectedNavItem === "shop"} display="Merchshop" />
                        </AnimatePresence>
                    </motion.ol>
                </nav>
                <nav aria-label="mobile-navigation" className="flex flex-row w-screen md:hidden text-gray-50 bg-gray-900 p-5 items-center">
                    <div className="">
                        <img className="h-16" src="/logo.png" />
                    </div>
                    <div className="h-1 flex flex-grow"></div>
                    <div onClick={() => setMobileMenuOpen(true)}><FeatherIcon icon="menu" size={36} /></div>
                    <FullScreenDialog isOpen={mobileMenuOpen}><h1>hoooi</h1></FullScreenDialog>
                </nav>
            </div>
        </header>
        <main className="p-4">{children}</main>
    </div>
  );
}

const asSelected = (isSelected: boolean) => {    
    return (classes: string) => {
        if (isSelected) return twMerge(classes, "bg-gray-50 text-gray-950");
        return classes;
    };
};

const NavItem: React.FC<{display: string, isSelected: boolean, visible?: boolean, indented?: boolean}> = ({ display, isSelected, indented }) => {
    const isIndented = (isIndented: boolean) => {    
        return (classes: string) => {
            if (isIndented) return twMerge(classes, "pl-6");
            return classes;
        };
    };

    const className = "rounded min-w-52 overflow-hidden bg-gray-900 text-gray-50 px-4 border-gray-900 py-4 cursor-pointer mt-1 transform transition duration-100 hover:bg-gray-800 hover:text-gray-100";

    return (<motion.li
        className={isIndented(indented ?? false)(asSelected(isSelected)(className))}
        key={display}
        initial={{ height: 0, paddingTop: 0}}
        animate={{ height: "3.5rem", paddingTop: "1rem"}}
        exit={{ height: 0, paddingTop: 0}}
        transition={{ duration: 0.125 }}
        
    >{display}</motion.li>);
};

const NavItemDropDown: React.FC<{
    display: string,
    subItems: {displayText: string, value: string, href: string}[],
    isSelected: boolean,
    selectedSubItem: string
}> = ({ display, subItems, isSelected, selectedSubItem }) => {
    let [isOpen, setIsOpen] = useState(isSelected);

    return (<>
        <DropDownItem onToggle={(showItems) => setIsOpen(showItems)} isSelected={isSelected || isOpen}>{display}</DropDownItem>
        <AnimatePresence propagate>
            {isOpen && subItems.map(item => <NavItem display={item.displayText} indented={true} isSelected={selectedSubItem === item.value} />)}
        </AnimatePresence>
    </>);
};

const DropDownItem: React.FC<{
    children: any,
    isSelected: boolean,
    onToggle: (isOpen: boolean) => void
}> = ({ children, isSelected, onToggle }) => {
    let [isOpen, setIsOpen] = useState(false);

    const onClick = () => {
        let toggledIsOpen = !isOpen;
        setIsOpen(toggledIsOpen );
        onToggle(toggledIsOpen);
    };

    return (<motion.li
            onClick={onClick}
            className={asSelected(isSelected)("rounded bg-gray-900 text-gray-50 px-4 border-bottom-2 border-gray-900 py-4 cursor-pointer mt-1 transform transition duration-100 hover:bg-gray-800 hover:text-gray-100")}
            key={children}
            initial={{ height: 0, paddingTop: 0}}
            animate={{ height: "3.5rem", paddingTop: "1rem"}}
            exit={{ height: 0, paddingTop: 0}}
            transition={{ duration: 0.125 }}
            
        >
            {children}
        </motion.li>);
};

const FullScreenDialog: React.FC<{children: any, isOpen: boolean}> = ({children, isOpen}) => {
    return (<>
        <HeadlessUIDialog open={isOpen} onClose={() => {}}
        transition
        className="relative z-50 transition duration-300 ease-out">
        <div className="fixed inset-0 flex w-screen h-screen">
            <DialogPanel className="w-screen space-y-4 bg-gray-900 p-12">
                {children}
            </DialogPanel>
        </div>
    </HeadlessUIDialog>
    </>);
};

export default Navbar;