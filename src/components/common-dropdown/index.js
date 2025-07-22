import React, { useState, useRef, useEffect } from "react";
import "./styles.scss";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Image from "next/image";

export const CommonDropdown = (props) => {
    const { children, isOpen, toggle } = props || {};

    const dropdownRef = useRef(null);

    const onToggleDropdown = () => {
        toggle(!isOpen)
    };


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                toggle(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="position-relative d-inline-block">
            <div 
            onClick={onToggleDropdown} 
            className=" d-flex align-items-center text-white-hover">
                {children[0]}
            </div>

            {isOpen &&
                children[1]
            }
        </div>
    );
}
