"use client"

import {
    SquareArrowRight, SquareArrowLeft, Moon,
    Sun,
} from "lucide-react";
import {useEffect, useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {businessNav, userNav} from "@/app/constant";
import ThemeToggle from "@/components/ui/ThemeToggle";

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <menu
            className={`z-100 h-screen relative ${isOpen ? 'w-[20rem]' : 'w-[4rem] '} 
            overflow-hidden h-full transition-all duration-300 
            dark:bg-black dark:text-white text-black bg-white
`}
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
                                ${isActive ? 'bg-grey text-black' : 'hover:bg-grey/50'}
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

            <ThemeToggle isOpen={isOpen}/>


        </menu>
    );
}

export default Menu;
