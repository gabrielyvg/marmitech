import Link from 'next/link';
import mockObject from '../utils/mock';
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const [expandedMenuId, setExpandedMenuId] = useState(null);

    const handleTitleClick = (id) => {
        setExpandedMenuId(id === expandedMenuId ? null : id);
    };
    
    return (
        <aside className='fixed top-0 left-0 w-64 h-full shadow-lg shadow-black' aria-label="Sidenav">
            <div>
                <ul>
                    {mockObject.menuOptions.map((menu) => (
                        <li key={menu.id}>
                            <div className="flex items-center justify-around cursor-pointer" onClick={() => handleTitleClick(menu.id)}>
                                <span className="p-4 mr-4" >
                                    {menu.title}
                                </span>
                                <FontAwesomeIcon
                                    icon={faSortDown}
                                />
                            </div>
                            {expandedMenuId === menu.id && (
                                <ul className='m-2'>
                                    <li key={menu.subitem.id}>
                                        <Link className="p-4 ml-10" href={menu.subitem.url}>{menu.subitem.title}</Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
