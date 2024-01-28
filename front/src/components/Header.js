import Link from 'next/link';
import mockObject from '../utils/mock';
import React from "react";

export default function Header() {
    return (
        <header>
            <div className="w-full h-10 sticky top-0 bg-stone-950">
                <div className="flex justify-items-end items-center h-full">
                    <nav className="text-white">
                        {mockObject.menuOptions.map((menu) => (
                            <React.Fragment key={menu.id}>
                                <Link className="p-4" href={menu.url} >{menu.title}</Link>
                            </React.Fragment>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
}
