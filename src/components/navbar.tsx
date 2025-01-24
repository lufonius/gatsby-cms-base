import * as React from "react";
import {useState} from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import FeatherIcon from "feather-icons-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const Navbar: React.FC<{
    children: any,
    selectedNavItem: string,
    selectedSubItem?: string
}> = ({children, selectedNavItem, selectedSubItem}) => {
  return (
    <div className="flex flex-row items-start overflow-auto h-screen">
        <header className="flex flex-row items-center sticky self-start top-0 mr-6 pr-3">
            <nav>
                <ol className="hidden md:flex md:flex-col">
                    <li className="mb-6">
                        <div>
                            <img className="h-16" src="/logo.png" />
                        </div>
                    </li>
                    <NavItem isSelected={selectedNavItem === "home"}>Home</NavItem>
                    <NavItemDropDown
                        isSelected={selectedNavItem === "vegan-leben"}
                        selectedSubItem={selectedSubItem ?? ""}
                        subItems={[
                            {displayText: "Warum vegan leben?", value: "vegan-warum", href: "/warum-vegan"},
                            {displayText: "Wie vegan leben?", value: "vegan-wie", href: "/wie-vegan"}
                        ]}
                    >
                        Vegan leben
                    </NavItemDropDown>
                    <NavItem isSelected={selectedNavItem === "aktiv-werden"}>Aktiv werden</NavItem>
                    <NavItem isSelected={selectedNavItem === "wissen"}>Wissen</NavItem>
                    <NavItem isSelected={selectedNavItem === "wissen"}>Galerie</NavItem>
                    <NavItem isSelected={selectedNavItem === "team"}>Über uns</NavItem>
                    <NavItem isSelected={selectedNavItem === "team"}>Team</NavItem>
                    <NavItem isSelected={selectedNavItem === "kontakt"}>Kontakt</NavItem>
                </ol>
                <div className="block md:hidden text-gray-50">
                    <FeatherIcon icon="menu" size={36}></FeatherIcon>
                </div>
            </nav>
        </header>
        <main>{children}</main>
    </div>
  );
}

const asSelected = (isSelected: boolean) => {    
    return (classes: string) => {
        if (isSelected) return twMerge("bg-gray-50 text-gray-950", classes);
        return classes;
    };
};

const NavItem: React.FC<{children: any, isSelected: boolean}> = ({ children, isSelected }) => {
    return (<li className={asSelected(isSelected)("rounded bg-gray-900 hover:border-2 hover:border-gray-900 text-gray-50 px-4 hover:bg-gray-50 border-bottom-2 border-gray-900 hover:text-gray-900 py-4 cursor-pointer mt-1")}>{children}</li>);
};

const NavItemDropDown: React.FC<{
    children: any,
    subItems: {displayText: string, value: string, href: string}[],
    isSelected: boolean,
    selectedSubItem: string
}> = ({ children, subItems, isSelected, selectedSubItem }) => {

    const withRounded = (array: any[], index: number) => {
        return (classes: string) => {
            if (index === 0) return twMerge("rounded-t", classes);
            else if (index === array.length - 1) return twMerge("rounded-b", classes);
            else return classes;
        };
    }

    const withBorder = (array: any[], index: number) => {
        return (classes: string) => {
            if (index === array.length - 1) return twMerge("border-b-2 border-t-2 border-l-2 border-r-2", classes);
            else return twMerge("border-t-2 border-l-2 border-r-2", classes);
        };
    }

    const menuButtonClasses = "rounded w-full bg-gray-900 hover:border-2 hover:border-gray-900 text-gray-50 px-4 hover:bg-gray-50 hover:text-gray-900 py-4 cursor-pointer mt-1";
    const menuItemClasses = "block bg-gray-900 border-gray-50 text-gray-50 px-4 hover:bg-gray-50 border-bottom-2 border-gray-50 hover:text-gray-900 py-4 cursor-pointer ml-1";

    return (
        <li>
            <Menu>
                <MenuButton className={asSelected(isSelected)(menuButtonClasses)}>{children}</MenuButton>
                <MenuItems anchor="right" >
                    {subItems.map((item, i) => (
                        <MenuItem>
                            <a className={withBorder(subItems, i)(asSelected(item.value === selectedSubItem)(withRounded(subItems, i)(menuItemClasses)))} href={item.href}>{item.displayText}</a>
                        </MenuItem>
                    ))}
                </MenuItems>
            </Menu>     
        </li>
    );
};

export default Navbar;