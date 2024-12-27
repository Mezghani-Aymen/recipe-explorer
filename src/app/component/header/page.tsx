"use client";

import Link from "next/link";
import { useState } from "react";



export default function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }
    return (
        <header className="flex justify-between items-center p-4  ">
            <h1 className="text-4xl font-bold text-primary">Recipes</h1>
            <div className="relative">
                <div
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer"
                    onClick={toggleDropdown}
                >

                    <span>👤</span>
                </div>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white text-black  border rounded-md shadow-lg z-10">
                        <ul className="py-2">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                            <li className="px-4 py-2 hover:bg-danger cursor-pointer text-danger hover:text-white">
                                <Link href="/api/auth/login"><span>Logout</span></Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
}
