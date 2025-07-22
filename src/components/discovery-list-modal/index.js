import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";
import "./styles.scss";
import { IoCloseSharp } from "react-icons/io5";
import { useContext, useState } from "react";
import { MainContext } from "@/layouts/MainLayout";

export default function FollowedLocalModal(props) {
    const { title, isOpen, onClose, action, ...rest } = props;

    const { setIsOpenFollowedLocalModal } = useContext(MainContext);

    return (
        <CModal
            visible={isOpen}
            onClose={onClose}
            alignment="center"
            size="l"
            fullscreen="l"
            className="followed-local-modal"
        >
            <CModalBody className="p-0">
                <div className="d-flex position-relative">
                    <IoCloseSharp className="auth-close-btn" onClick={() => setIsOpenFollowedLocalModal(false)} />
                    <div className="followed-local-right">
                        <h5 className="message noIcon">未定位到您的城市，請嘗試手動定位。</h5>
                        <div className="dn-dialog-buttons ng-star-inserted">
                            <div className="dn-dialog-button" onClick={() => setIsOpenFollowedLocalModal(false)} >
                                <span className="dn-dialog-button-text">
                                    取消
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </CModalBody>

        </CModal>
    );
}