"use client";

import Link from "next/link";
import { useState } from 'react';
import { useTheme } from 'next-themes';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();
    const router = useRouter();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleCheck = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault(); 
        Cookies.remove('jwt');
        router.push('/api/auth/login'); 
    };

    return (
        <header className="flex justify-between items-center p-4">
            <h1 className="text-4xl font-bold text-primary">Recipes Explorer</h1>
            <div className="relative flex items-center gap-4">
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only"
                        checked={resolvedTheme === 'dark'}
                        onChange={toggleCheck}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full transition">
                        <div className={`absolute top-[2px] left-[2px] w-5 h-5 rounded-full bg-white transition-transform border border-gray-300 ${resolvedTheme === 'dark' ? "translate-x-full" : ""}`}></div>
                    </div>
                </label>

                <div
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer"
                    onClick={toggleDropdown}
                >
                    <span>👤</span>
                </div>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white text-black border rounded-md shadow-lg z-10">
                        <ul className="py-2">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                            <li className="px-4 py-2 hover:bg-danger cursor-pointer text-danger hover:text-white">
                                <a href="#" onClick={handleLogout}><span>Logout</span></a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
}