import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";
import "./styles.scss";
import { IoCloseSharp } from "react-icons/io5";


export default function MainNoti(props) {
    const { content, toggle, action, ...rest } = props;

    return (
        <CModal
            alignment="center"
            visible={content}
            onClose={toggle}
            className="main-noti-modal"
            {...rest}
        >
            {
                content &&
                <CModalBody>
                    <IoCloseSharp className="text-main-gray text-white-hover" onClick={toggle} />
                    <p className="text-white text-center">{content}</p>
                </CModalBody>
            }

            <CModalFooter>
                <div className="text-white-hover text-color-main" onClick={toggle}>确定</div>
            </CModalFooter>
        </CModal>
    );
}