"use client";

import Link from "next/link";
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Cookies from 'js-cookie';
import { TfiAlignJustify, TfiClose } from "react-icons/tfi";// Import hamburger and close icons
// import { WiDaySunny, WiMoonWaningCrescent4 } from "react-icons/wi";


export default function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();
    const [loginState, setLoginState] = useState(Cookies.get('jwt') ? true : false);

    useEffect(() => {
        // Update login state based on cookie
        setLoginState(!!Cookies.get('jwt'));
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleCheck = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    const handleLogout = () => {
        Cookies.remove('jwt');
        setLoginState(false); // Update login state on logout
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <header className="flex justify-between items-center p-4">
            <h1 className="text-4xl font-bold text-primary">Recipes Explorer</h1>
            <div className="relative flex items-center gap-4">
                <label className="inline-flex items-center cursor-pointer hidden md:flex">
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

                {loginState ? (
                    <div className="relative hidden md:flex">
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
                                        <Link href={"/api/auth/login"} onClick={handleLogout}>
                                            <span>Logout</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link href={"/api/auth/login"} className="border py-2 px-5 rounded-md border-success text-success hover:bg-success hover:text-customText hidden md:block">
                        Sign In
                    </Link>
                )}

                <div className="md:hidden">
                    <TfiAlignJustify className="w-8 h-8 cursor-pointer" onClick={toggleSidebar} />
                </div>
            </div>

            {/* Sidebar for mobile */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-gray-700 bg-opacity-75 z-20">
                    <div className="absolute top-0 right-0 w-64 h-full bg-black bg-opacity-50 backdrop-blur-lg shadow-lg p-4 flex flex-col justify-center">
                        <div className="absolute top-0 right-0 w-full flex justify-between items-center px-3 mt-4">
                            <h2 className="text-xl font-bold text-secondry">Menu</h2>
                            <TfiClose className="w-6 h-6 text-white cursor-pointer" onClick={toggleSidebar} />
                        </div>
                        {/* Centered buttons */}
                        <div className="relative flex flex-col items-center space-y-4">
                            {loginState ? (
                                <>
                                    <Link href="/profile" className="block px-4 py-2 border border-white rounded-md text-white dark:hover:bg-white hover:text-customText">Profile</Link>
                                    <Link href="/api/auth/login" onClick={handleLogout} className="block px-4 py-2 border border-danger rounded-md text-danger hover:bg-danger hover:text-white">Logout</Link>
                                </>
                            ) : (
                                <Link href="/api/auth/login" className="block px-4 py-2 border border-success rounded-md text-success hover:bg-success hover:text-customText">Sign In</Link>
                            )}

                            {/* Toggle Mode Button */}
                            <button
                                onClick={toggleCheck}
                                className="block px-4 py-2 border border-gray-500 rounded-md text-white hover:bg-gray-500"
                            >
                                Toggle Mode
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}