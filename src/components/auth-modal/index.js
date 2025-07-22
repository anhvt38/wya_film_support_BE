import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";
import "./styles.scss";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { useContext, useState } from "react";
import Login from "../login";
import Register from "../register";
import ForgotPassword from "../forgot-password";
import { MainContext } from "@/layouts/MainLayout";
import InputCode from "../input-code";
import EmailVerified from "../email-verified";
import CompleteRegister from "../complete-register";
import EmailNotFound from "../email-not-found";

export const AUTH_TEXT = {
    LOGIN: "LOGIN",
    REGISTER: "REGISTER",
    FORGOT_PASSWORD: "FORGOT_PASSWORD",
    EMAIL_NOT_FOUND: "EMAIL_NOT_FOUND",
    INPUT_CODE: "INPUT_CODE",
    EMAIL_VERIFIED: "EMAIL_VERIFIED",
    COMPLETE_REGISTER: "COMPLETE_REGISTER",

}

export default function AuthModal(props) {
    const { title, isOpen, onClose, action, ...rest } = props;
    const [isShow, setIsShow] = useState(AUTH_TEXT.LOGIN)
    const [currentEmail, setCurrentEmail] = useState(null)

    const { setIsOpenAuthModal } = useContext(MainContext);

    const sendCodeToEmail = async (email) => {
        setIsShow(AUTH_TEXT.INPUT_CODE)
        setCurrentEmail(email)
    }

    const render = () => {
        switch (isShow) {
            case AUTH_TEXT.REGISTER:
                return <Register onNextPage={sendCodeToEmail} />
            case AUTH_TEXT.FORGOT_PASSWORD:
                return <ForgotPassword onToEmailNotFound={() => setIsShow(AUTH_TEXT.EMAIL_NOT_FOUND)} />
            case AUTH_TEXT.EMAIL_NOT_FOUND:
                return <EmailNotFound onToForgotPassword={() => setIsShow(AUTH_TEXT.FORGOT_PASSWORD)} />
            case AUTH_TEXT.INPUT_CODE:
                return <InputCode currentEmail={currentEmail} onToEmailVerify={() => setIsShow(AUTH_TEXT.EMAIL_VERIFIED)} />
            case AUTH_TEXT.EMAIL_VERIFIED:
                return <EmailVerified onToCompleteRegister={() => setIsShow(AUTH_TEXT.COMPLETE_REGISTER)} />
            case AUTH_TEXT.COMPLETE_REGISTER:
                return <CompleteRegister />
            default:
                return <Login onGoToPage={(v) => setIsShow(v)} />
        }
    }

    return (
        <CModal
            visible={isOpen}
            onClose={onClose}
            alignment="center"
            size="lg"
            fullscreen="xl"
            className="auth-modal"
            {...rest}
        >
            <CModalBody className="p-0">
                <div className="d-flex position-relative">
                    <IoCloseSharp className="auth-close-btn" onClick={() => setIsOpenAuthModal(false)} />
                    <div className="auth-left">
                        <span>广告</span>
                        <Image alt='ads' src="/ads-auth.jpg" width={380} height={540} />
                    </div>
                    <div className="auth-right">
                        <div className="position-relative">
                            {
                                isShow != AUTH_TEXT.LOGIN && isShow != AUTH_TEXT.EMAIL_VERIFIED && isShow != AUTH_TEXT.EMAIL_NOT_FOUND &&
                                <span className="back-to-login text-blue-hover" onClick={() => setIsShow(AUTH_TEXT.LOGIN)}>{"<"} 返回登录</span>
                            }
                            {
                                isShow == AUTH_TEXT.INPUT_CODE &&
                                <span className="fs-5 text-blue title-verify-account">验证账号</span>
                            }

                            {
                                isShow == AUTH_TEXT.COMPLETE_REGISTER &&
                                <span className="fs-5 text-blue title-verify-account">完善注册信息</span>
                            }

                            {
                                isShow == AUTH_TEXT.EMAIL_VERIFIED &&
                                <h1 className="fs-3 title-email-verified">您的帐号已经通过验证，请继续</h1>
                            }

                            {
                                isShow == AUTH_TEXT.EMAIL_NOT_FOUND &&
                                <h1 className="fs-3 title-email-verified">不是合法邮箱或该帐号不存在</h1>
                            }
                            {render()}
                        </div>
                    </div>
                </div>
            </CModalBody>

        </CModal>
    );
}