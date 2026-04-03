"use client"

import {
    SquareArrowRight, SquareArrowLeft, Moon,
    Sun,
} from "lucide-react";
import {useEffect, useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {businessNav, userNav} from "@/app/constant";

const Menu = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isDark, setIsDark] = useState(false);

    const pathname = usePathname();

    return (
        <menu
            className={`border-l border-black relative ${isOpen ? 'w-[18rem]' : 'w-[4rem]'} 
            overflow-hidden h-full transition-all duration-300
            bg-white text-black`}
            /* ^ Uses your variables: --color-white and --color-black */
        >
            <div className="flex mt-8 mb-15 items-center">
                {isOpen && <h1 className="uppercase font-semibold ml-5">monolith</h1>}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute right-5 transition-all duration-300 cursor-pointer hover:opacity-70"
                >
                    {isOpen ? <SquareArrowLeft/> : <SquareArrowRight/>}
                </button>
            </div>

            <ul className="w-full h-fit border-b border-grey pb-5">
                {businessNav.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`
                                flex items-center justify-start ml-3 mt-4 p-2.5 rounded-[0.5rem] transition-colors
                                ${isOpen ? 'w-[16rem]' : 'w-fit'}  
                                ${isActive ? 'bg-grey' : 'hover:bg-grey/50'}
                            `}
                        >
                            <Icon size={20} strokeWidth={2.5}/>
                            {isOpen && (
                                <span className="ml-2 pt-1 tracking-wide uppercase text-[12px] font-medium">
                                    {item.label}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </ul>

            <button
                // onClick={toggleTheme}
                className={`cursor-pointer mt-auto mb-4 mx-3
              flex items-center rounded-[0.5rem] px-2.5 py-3 text-sm font-medium

              ${isOpen ? "w-[16rem] gap-3" : "w-fit justify-center"}
            `}
            >
                {isDark ? <Sun size={20} strokeWidth={2.5}/> : <Moon size={20} strokeWidth={2.5}/>}
                {isOpen && <span className="uppercase text-[12px] tracking-wide pt-1">
                {isDark ? "Light Mode" : "Dark Mode"}
            </span>}
            </button>


        </menu>
    );
}

export default Menu;
