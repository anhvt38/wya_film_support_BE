import React, { useState, useRef, useEffect } from "react";
import "./styles.scss";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Image from "next/image";

export const SelectLanguageDropdown = (props) => {
    const { children } = props || {};
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState(null);

    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        setLanguage(JSON.parse(localStorage.getItem('lang')))
    }, [])

    return (
        <div ref={dropdownRef} className="position-relative d-inline-block">
            <div onClick={toggleDropdown} className=" d-flex align-items-center text-white-hover">
                <div className="cursor-pointer d-flex align-items-center">
                    {
                        language
                            ? <>
                            <Image alt='map' src={language.src} width={30} height={20} />
                            <font className="me-4 ms-2 text-color-main">{language.text}</font>
                            </>
                            : <>
                            <Image alt='map' src="/GL.png" width={30} height={20} />
                            <font className="me-4 ms-2 text-color-main">全球</font>
                            </>
                    }
                    
                </div>
            </div>

            {isOpen &&
                children
            }
        </div>
    );
}
