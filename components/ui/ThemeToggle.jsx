"use client"
import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

export const ThemeToggle = ({isOpen}) => {
    const {theme, setTheme, resolvedTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const isDark = resolvedTheme === "dark";
    return (
        <>
            <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
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
        </>
    )
}

export default ThemeToggle
