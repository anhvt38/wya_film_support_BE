import { CButton, CForm, CFormCheck, CFormInput, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CTab, CTabContent, CTabList, CTabPanel, CTabs } from "@coreui/react";
import "./styles.scss";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PiEyeSlashThin, PiEyeThin } from "react-icons/pi";
import SliderVerify from "../slider-verify";
import { TiTick } from "react-icons/ti";
import Link from "next/link";
import ScratchBackground from "../scratch-background";
import { Formik } from "formik";
import * as Yup from "yup";


const validation = Yup.object().shape({
    email: Yup.string()
        .required("必须填写邮箱地址")
        .email('无效的电子邮件'),
    capcha: Yup.string()
        .required("请输入验证码")

});
export default function ForgotPassword(props) {
    const { onToEmailNotFound } = props || {};

    const codeRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);

    const [captchaCode, setCaptchaCode] = useState('');
    const [input, setInput] = useState('');
    const [isValidCapcha, setIsValidCapcha] = useState('');

    const handleVerify = (capcha) => {
        if (capcha == captchaCode) {
            setIsValidCapcha(true)
            return true
        } else {
            setIsValidCapcha(false)
            return false
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (codeRef.current && !codeRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const validCapcha = handleVerify(values.capcha);
        if (validCapcha) {
            console.log(values, 'values')

            onToEmailNotFound()
        }
    }

    return (
        <Formik
            initialValues={{
                email: "",
                capcha: "",
            }}
            validationSchema={validation}
            onSubmit={handleSubmit}
        >
            {({
                values,
                errors,
                touched,
                setFieldValue,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting
            }) => (
                <CForm
                    className="row justify-content-center gap-2"
                    onSubmit={handleSubmit}
                >
                    <div className="forgot-password">
                        <div className="auth-top">
                            <CTabs activeItemKey={2} defaultActiveItemKey={1}>
                                <CTabList className="auth-tab-list">
                                    <CTab disabled className="border-bottom-0" aria-controls="phone-tab" itemKey={1}>短信找回密码</CTab>
                                    <CTab aria-controls="email-tab" itemKey={2}>邮箱/安全问题找回密码</CTab>
                                </CTabList>
                                <CTabContent className="auth-tab-content">
                                    <CTabPanel aria-labelledby="phone-tab" itemKey={1}>
                                        <div className="wrap-input">
                                            <div className="position-relative d-flex gap-2">
                                                <div className="d-flex gap-2 align-items-center" ref={codeRef} onClick={() => setIsOpen(prev => !prev)}>
                                                    <span className="fs-6 area-code">+84</span>
                                                    <MdKeyboardArrowDown className="text-main-gray fs-4" />
                                                </div>

                                                {
                                                    isOpen &&
                                                    <div className="phone-countries">
                                                        <span>1</span>
                                                        <span>1</span>
                                                        <span>1</span>
                                                        <span>1</span>
                                                    </div>
                                                }

                                            </div>
                                            <div className="line-country-phone"></div>
                                            <CFormInput placeholder="输入手机号" />
                                        </div>
                                        <div className="wrap-input mt-3">
                                            <div className="wrap-capcha">
                                                <ScratchBackground onChange={setCaptchaCode} />
                                            </div>
                                            <CFormInput
                                                placeholder="请输入右侧验证码"
                                                className="capcha-input"
                                                onChange={(e) => setInput(e.target.value)}
                                            />
                                        </div>
                                        <div className="ensure-text my-3 text-start">请确保此手机号能正常接收短信，否则请使用其他方式重设密码！</div>
                                    </CTabPanel>
                                    <CTabPanel aria-labelledby="email-tab" itemKey={2}>
                                        <div className="wrap-input">

                                            <CFormInput
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="请输入你的邮箱 / 帐号"
                                            />
                                            <small className="error-text">{errors.email && touched.email && errors.email}</small>

                                        </div>
                                        <div className="wrap-input mt-3">
                                            <div className="wrap-capcha">
                                                <ScratchBackground onChange={setCaptchaCode} />
                                            </div>
                                            <CFormInput
                                                placeholder="请输入右侧验证码"
                                                className="capcha-input"
                                                name="capcha"
                                                value={values.capcha}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <small className="error-text">{(errors.capcha && touched.capcha && errors.capcha) || (isValidCapcha === false && "请输入正确的验证码")}</small>

                                        </div>

                                        <div className="ensure-text my-3 text-start">请确保此邮箱能正常接收邮件，否则请使用短信重设密码！</div>
                                    </CTabPanel>

                                </CTabContent>
                            </CTabs>
                        </div>
                        <div className="auth-bottom">

                            <CButton className="btn-login" type="submit">下一步</CButton>

                        </div>
                    </div>
                </CForm>
            )}
        </Formik>
    );
}