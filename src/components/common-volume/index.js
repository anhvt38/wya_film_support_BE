"use client"

import { IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";
import "./styles.scss";

import { CommonDropdownHover } from "../common-dropdown-hover";
import React, { useEffect, useRef, useState } from "react";

export const CommonVolume = React.memo(function CommonVolume(props) {
    const { onSetValue, videoRef } = props || {};
    const [isOpenSelectSound, setIsOpenSelectSound] = useState(false);
    const [soundValue, setSoundValue] = useState(0);
    const volumeRef = useRef(0.01);
    const SoundButton = () => {
        return (
            <div className="d-flex flex-column align-items-center cursor-pointer text-white-hover">
                {
                    soundValue
                        ? <IoMdVolumeHigh className=" fs-3 fw-bold" onClick={() => setSoundValue(0)} />
                        : <IoMdVolumeOff className=" fs-3 fw-bold" onClick={() => setSoundValue(volumeRef.current)} />
                }

            </div>
        )
    }

    const SoundOption = () => {
        const [isSeeking, setIsSeeking] = useState(false);

        const handleInput = (e) => {
            const v = parseFloat(e.target.value);

            volumeRef.current = v;
        };

        const handleMouseUp = (e) => {
            setSoundValue(volumeRef.current);
        };


        return (
            <div className="option-common-dropdown " onMouseMove={() => setIsOpenSelectSound(true)}>
                <div className="wrap-option-dropdown p-4 sound-range">
                    <input
                        type="range"
                        className=""
                        id="sound-input"
                        min={0}
                        max={1}
                        step={0.01}
                        defaultValue={soundValue}
                        onInput={handleInput}
                        onMouseUp={(e) => handleMouseUp(e)}
                        style={{
                            background: `linear-gradient(to right, #fc748c ${soundValue * 100}%, #fff 0%)`
                        }}
                    />
                </div>

            </div>
        )
    }

    useEffect(() => {
        onSetValue(soundValue)
    }, [soundValue])

    return (
        <CommonDropdownHover
            isOpen={isOpenSelectSound}
            toggle={(value) => setIsOpenSelectSound(value)}
        >
            {[<SoundButton key="button" />, <SoundOption key="option" />]}
        </CommonDropdownHover>
    );
})