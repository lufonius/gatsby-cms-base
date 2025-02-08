import * as React from "react";
import {useState} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import FeatherIcon from "feather-icons-react";
import { Dialog as HeadlessUIDialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
import { StaticImage } from "gatsby-plugin-image";

const Navbar: React.FC<{
    children: any,
    selectedNavItem: string,
    selectedSubItem?: string
}> = ({children, selectedNavItem, selectedSubItem}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="flex flex-col md:flex-row items-start overflow-auto h-screen">
        <header className="flex flex-row items-start sticky md:h-screen self-start top-0 z-10">
            <div>
                <nav aria-label="desktop-navigation" className="p-4 hidden md:block">
                    <ol className="hidden md:flex md:flex-col">
                        <li className="mb-6">
                            <div className="flex justify-center mt-4">
                                <StaticImage className="h-16" height={64} src="../logo.png" alt="Anonymous for Animal Rights Logo" />
                            </div>
                        </li>
                        <NavItem isSelected={selectedNavItem === "home"} display="Home"/>
                        <NavItem isSelected={selectedNavItem === "kalender"} display="Eventkalender" />
                        <NavItemDropDown
                            display="Aktivist:in werden"
                            isSelected={selectedNavItem === "aktivistin-werden"}
                            selectedSubItem={selectedSubItem ?? ""}
                            subItems={[
                                {displayText: "Getting started", value: "getting-started", href: "/getting-started"},
                                {displayText: "Event guide", value: "cube-guide", href: "/cube-guide"},
                                {displayText: "Gespräche führen", value: "cube-guide", href: "/cube-guide"},
                            ]}
                        />
                        <NavItem isSelected={selectedNavItem === "vegan-leben"} display="Vegan leben" />
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
                    </ol>
                </nav>
                <nav aria-label="mobile-navigation" className="flex flex-row w-screen md:hidden text-gray-50 bg-gray-900 p-5 items-center">
                    <div className="">
                        <StaticImage className="h-16" height={64} src="../logo.png" alt="Anonymous for Animal Rights Logo" />
                    </div>
                    <div className="h-1 flex flex-grow"></div>
                    <div onClick={() => setMobileMenuOpen(true)}><FeatherIcon icon="menu" size={36} /></div>
                    <FullScreenDialog isOpen={mobileMenuOpen}>
                    <ol className="flex flex-col">
                        <div className="flex items-center text-gray-50 mb-5">
                            <StaticImage className="h-16" height={64} src="../logo.png" alt="Anonymous for Animal Rights Logo" />
                            <div className="h-1 flex-grow"></div>
                            <div onClick={() => setMobileMenuOpen(false)}><FeatherIcon icon="x" size={36} /></div>
                        </div>

                        <NavItem isSelected={selectedNavItem === "home"} display="Home"/>
                        <NavItem isSelected={selectedNavItem === "kalender"} display="Eventkalender" />
                        <NavItemDropDown
                            display="Aktivist:in werden"
                            isSelected={selectedNavItem === "aktivistin-werden"}
                            selectedSubItem={selectedSubItem ?? ""}
                            subItems={[
                                {displayText: "Getting started", value: "getting-started", href: "/getting-started"},
                                {displayText: "Event guide", value: "cube-guide", href: "/cube-guide"},
                                {displayText: "Gespräche führen", value: "cube-guide", href: "/cube-guide"},
                            ]}
                        />
                        <NavItem isSelected={selectedNavItem === "vegan-leben"} display="Vegan leben" />
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
                    </ol>
                    </FullScreenDialog>
                </nav>
            </div>
        </header>
        <main>{children}</main>
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

    return (<li className={isIndented(indented ?? false)(asSelected(isSelected)(className))}>{display}</li>);
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
        {isOpen && subItems.map(item => <NavItem display={item.displayText} indented={true} isSelected={selectedSubItem === item.value} />)}
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

    return (<li
            onClick={onClick}
            className={asSelected(isSelected)("rounded bg-gray-900 text-gray-50 px-4 border-bottom-2 border-gray-900 py-4 cursor-pointer mt-1 transform transition duration-100 hover:bg-gray-800 hover:text-gray-100")}
        >
            {children}
        </li>);
};

const FullScreenDialog: React.FC<{children: any, isOpen: boolean}> = ({children, isOpen}) => {
    return (<>
        <HeadlessUIDialog open={isOpen} onClose={() => {}}
        transition
        className="relative z-50 transition duration-300 ease-out">
        <div className="fixed inset-0 flex w-screen min-h-screen">
            <DialogPanel className="w-screen space-y-4 bg-gray-900 p-5 overflow-x-auto">
                {children}
            </DialogPanel>
        </div>
    </HeadlessUIDialog>
    </>);
};



export default Navbar;