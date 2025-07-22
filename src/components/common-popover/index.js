"use client"

import { useState } from "react";
import "./styles.scss";

import { CPopover, CToast, CToastBody, CToastClose } from "@coreui/react";

export const CommonPopover = ({ title, content, placement = 'bottom', onHover = () => {}, children }) => {
        const [visible, setVisible] = useState(false)
      
        const handleMouseEnter = () => setVisible(true)
        const handleMouseLeave = () => setVisible(false)
      
        return (
          <div
          className="wrap-popover"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ display: 'inline-block' }}
          >
            <CPopover
              // title={title}
              onMouseEnter={() => onHover(true)}
              onMouseLeave={() => onHover(false)}
              content={content} 
              placement={placement}
              trigger="manual"
              visible={visible}
              delay={{ show: 100, hide: 200 }}
            >
              {children}
            </CPopover>
          </div>
        )
      
}