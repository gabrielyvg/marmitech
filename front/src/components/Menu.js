
import React, { useState, useRef } from 'react';
import mockObject from '../utils/mock';
import { Menu } from 'primereact/menu';

export default function HeadlessDemo() {
    const itemRenderer = (item) => (
        <div className='p-menuitem-content'>
            <a className="flex align-items-center p-menuitem-link">
                <span className={item.icon} />
                <span className="mx-2">{item.label}</span>
            </a>
        </div>
    );

    const headerTemplate = () => (
        <div className="flex flex-col items-center p-3 bg-white border-1 border-t-black">
            <span className="font-bold text-xl mt-2">Marmitech</span>
        </div>
    );

    const convertMenuOptions = (options) => {
        return options.map(option => {
            const items = [
                option.url && {
                    label: option.subtitle,
                    icon: 'pi pi-bars',
                    url: option.url,
                    command: () => {
                        console.log('Redirecionando para:', option.url); // Verifique o URL
                        window.location.href = option.url;
                    },
                    template: null
                },
                option.subitem && {
                    label: option.subitem.title,
                    icon: 'pi pi-plus',
                    url: option.subitem.url,
                    command: () => {
                        console.log('Redirecionando para:', option.subitem.url); // Verifique o URL
                        window.location.href = option.subitem.url;
                    },
                    template: null
                }
            ].filter(Boolean);
    
            return {
                label: option.title,
                items,
            };
        });
    };
    

    const items = convertMenuOptions(mockObject.menuOptions);

    return (
        <>
            <div className="card">
                {headerTemplate()}
                <Menu model={items} className="md:w-15rem min-h-screen lg:static" />
            </div>
        </>
    )
}
