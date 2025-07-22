"use client"

import { IoIosInformationCircleOutline } from "react-icons/io";
import "./styles.scss";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from "react-tooltip";

export const CommonToolTip = (props) => {
    const { content } = props;

    return (
        <span className="ms-1 fs-6 common-tooltip">
            <IoIosInformationCircleOutline className="text-info" data-tooltip-id="common-tooltip" data-tooltip-content={content} />
            <Tooltip id="common-tooltip" className="shadow-sm text-primary bg-white" /></span>
    );
}