import React, { useState, useRef, useEffect } from "react";
import "./styles.scss";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export const CustomDropdown = (props) => {
    const { title, children } = props || {};
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(prev => !prev);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="position-relative d-inline-block">
            <div onClick={toggleDropdown} className="cursor-pointer d-flex align-items-center text-white-hover fs-5">
                {title}
                {isOpen ? <MdKeyboardArrowUp className="ms-2 fs-3" /> : <MdKeyboardArrowDown className="ms-2 fs-3" />}
            </div>

            {isOpen &&
                children
            }
        </div>
    );
}
