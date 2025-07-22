import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";
import "./styles.scss";


export default function ConfirmModal(props) {
    const { title, content, toggle, action, ...rest } = props;

    return (
        <CModal
            visible={content}
            onClose={toggle}
            {...rest}
        >
            <CModalHeader>
                <CModalTitle>{title}</CModalTitle>
            </CModalHeader>
            {
                content &&
<CModalBody>
                <p>{content}</p>
            </CModalBody>
            }
            
            <CModalFooter>
                <CButton color="secondary" onClick={toggle}>Huỷ</CButton>
                <CButton color="primary" onClick={() => {
                    action()
                    toggle();
                }}>Đồng ý</CButton>
            </CModalFooter>
        </CModal>
    );
}