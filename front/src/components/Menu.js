
import React, { useState, useRef } from 'react';
import mockObject from '../utils/mock';
import { MegaMenu } from 'primereact/megamenu';

//TODO: refazer menu
export default function HeadlessDemo() {
    const menu = useRef(null);

    const headerTemplate = () => (
        <div className="flex flex-col items-center p-3 bg-white border-1 border-t-black">
            <a href='/home' className="font-bold text-xl mt-2">Marmitech</a>
        </div>
    );

    const convertMenuOptions = (options) => {
        return options.map(option => {
            let items;
            if (option.subitem) {
                items = [
                    {
                        items: [

                            option.url && {
                                label: option.subtitle,
                                icon: 'pi pi-bars',
                                url: option.url,
                                command: () => {
                                    console.log('Redirecionando para:', option.url);
                                    window.location.href = option.url;
                                },
                                template: null
                            },
                            option.subitem && {
                                label: option.subitem.title,
                                icon: 'pi pi-plus',
                                url: option.subitem.url,
                                command: () => {
                                    console.log('Redirecionando para:', option.subitem.url);
                                    window.location.href = option.subitem.url;
                                },
                                template: null
                            }

                        ]
                    }
                ]
            } else {
                items = [
                    {
                        items: [
                            option.url && {
                                label: option.subtitle,
                                icon: 'pi pi-bars',
                                url: option.url,
                                command: () => {
                                    console.log('Redirecionando para:', option.url);
                                    window.location.href = option.url;
                                },
                                template: null
                            }
                        ]
                    }
                ]
            }

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
                <MegaMenu model={items} ref={menu} orientation="vertical" breakpoint="960px" className="md:w-15rem min-h-screen lg:static" />
            </div>
        </>
    )
}
