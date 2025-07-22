import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";
import "./styles.scss";
import { IoCloseSharp } from "react-icons/io5";
import { useContext, useState } from "react";
import { MainContext } from "@/layouts/MainLayout";
import { FiMapPin } from "react-icons/fi";

export default function UploadFileModal(props) {
    const { title, isOpen, onClose, action, ...rest } = props;

    const { setIsOpenUploadFileModal } = useContext(MainContext);

    return (
        <CModal
            visible={isOpen}
            onClose={onClose}
            alignment="center"
            size="lg"
            fullscreen="xl"
            className="upload-file-modal"
        >
            <CModalBody className="p-0">
                <div className="">
                    <IoCloseSharp className="auth-close-btn" onClick={() => setIsOpenUploadFileModal(false)} />
                    <div className="upload-file-right">
                        <h5 className="header-text">發動態</h5>
                        <div className="select-uplaod-type">
                            <div className="select-type-btn">
                                <span>上傳照片</span>
                            </div>
                            <div className="select-type-btn">
                                <span>上傳影片</span>
                            </div>

                        </div>
                        <div className="edit-text-container">
                            <div className="edit-text-inner">
                                <form>
                                    <div className="div-input-area">
                                        <textarea id="content-input" placeholder="注意，以下行為將被封號：政治言論、嚴重劇透、發布廣告、木馬連結、宣傳同類網站、辱罵工作人員等。"></textarea>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="bottom-container-upload-file d-flex justify-content-between align-items-center">
                            <div class="location-selector">
                                <div class="location-box">
                                    <FiMapPin className=" fs-3 me-2 text-color-main" />
                                    <span>所在位置</span>
                                </div>
                            </div>
                            <div class="submit-edit">
                                <span>發表</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CModalBody>

        </CModal>
    );
}