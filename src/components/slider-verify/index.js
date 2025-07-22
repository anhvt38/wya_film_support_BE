import { CButton, CFormCheck, CFormInput, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CTab, CTabContent, CTabList, CTabPanel, CTabs } from "@coreui/react";
import "./styles.scss";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PiEyeSlashThin, PiEyeThin } from "react-icons/pi";


export default function SliderVerify({ onSuccess }) {
    const [isVerified, setIsVerified] = useState(false);
    const [dragX, setDragX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [offsetX, setOffsetX] = useState(0);
    const sliderRef = useRef(null);
    const containerRef = useRef(null);
    const HANDLE_WIDTH = 65;
    const isSliding = isDragging || dragX > 0;

    const handleMouseDown = (e) => {
        if (isVerified) return;
        setIsDragging(true);

        const sliderRect = sliderRef.current.getBoundingClientRect();
        setOffsetX(e.clientX - sliderRect.left);
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging || isVerified) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            let newX = e.clientX - containerRect.left - offsetX;
            const maxX = containerRect.width - HANDLE_WIDTH;

            newX = Math.max(0, Math.min(newX, maxX));
            setDragX(newX);
        };

        const handleMouseUp = () => {
            if (!isDragging || isVerified) return;
            const containerWidth = containerRef.current.offsetWidth;
            if (dragX >= containerWidth - HANDLE_WIDTH) {
                setIsVerified('loading');
                setDragX(containerWidth - HANDLE_WIDTH);
                setTimeout(() => {
                    setIsVerified(true);
                    onSuccess && onSuccess();
                }, 1500);
            } else {
                setDragX(0); // reset
            }
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragX, isVerified, offsetX, onSuccess]);

    return (
        <div
            ref={containerRef}
            className="slider-verify user-select-none"
        >
            {/* Thanh kéo được */}
            <div
                className=" tow-bar"
                style={{
                    width: isVerified ? '100%' : `${dragX}px`,
                    transition: isVerified ? 'width 0.3s ease' : undefined,
                }}
            >
            </div>

            {/* Nội dung */}
            <div className="text-content-verify ">
                {isVerified ? '验证成功' : '请按住滑块，拖到最右边'}
            </div>

            <div
                className="wrap-verified-loading"
                style={{
                    width: `${dragX}px`,

                }}
            >
                {
                    isVerified == 'loading'
                        ? <span className="text-verified-loading">
                            正在验证...
                        </span>
                        : isVerified
                            ? <span className="text-verified-loading">
                                验证成功
                            </span>
                            : null
                }
            </div>

            {/* Nút kéo */}
            <div
                ref={sliderRef}
                className="btn-drag-verify "
                onMouseDown={handleMouseDown}
                style={{
                    transform: `translateX(${dragX}px)`,
                    cursor: isVerified ? 'not-allowed' : 'all-scroll',
                    borderTopLeftRadius: isSliding ? '0px' : '8px',
                    borderBottomLeftRadius: isSliding ? '0px' : '8px',
                    borderTopRightRadius: isSliding ? '8px' : '0px',
                    borderBottomRightRadius: isSliding ? '8px' : '0px',
                }}
            >
                {
                    isVerified == 'loading'
                        ? <Image alt='ic loading verify' src="/ic-loading-verify.gif" width={25} height={25} />
                        : isVerified
                            ? <Image alt='ic success verify' src="/ic-success-verify.png" width={24} height={24} />
                            : <Image alt='arrow slider verify' src="/arrow-slider-verify.gif" width={22} height={17} onMouseDown={handleMouseDown}
                                draggable={false} />
                }


            </div>
        </div>
    );
}