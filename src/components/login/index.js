import { CButton, CForm, CFormCheck, CFormInput, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CTab, CTabContent, CTabList, CTabPanel, CTabs } from "@coreui/react";
import "./styles.scss";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PiEyeSlashThin, PiEyeThin } from "react-icons/pi";
import SliderVerify from "../slider-verify";
import { AUTH_TEXT } from "../auth-modal";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { receiveCaptchaCallback } from "@/apis/auth";

const validation = Yup.object().shape({
    password: Yup.string()
        .required("需要密码"),
    email: Yup.string()
        .required("电子邮件为必填项")
        .email("电子邮件无效")
});

const SITE_KEY = "6Lc-Yj4cAAAAANDGfr0GeGij-AW4iuyFawjkE1L4";

export default function Login(props) {
    const { onGoToPage } = props || {};
    const codeRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
    const [isShowEye, setIsShowEye] = useState(false);
    const [isVerify, setIsVerify] = useState(false);
    const [captchaToken, setCaptchaToken] = useState("");


    const capchaCallbackMutation = useMutation((body) => {
        return receiveCaptchaCallback(body)
    }, {
        onSuccess: async ({ data }) => {
            console.log(data, 'ddddđ')
        },
        onError: (err) => {
            console.log(err, 'errrrrr')
        }
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log(values, 'values')
    }


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


    // Load reCAPTCHA script khi modal hiển thị
    useEffect(() => {
        // if (!isOpen) return;
        console.log('import reacha')
        // Thêm script nếu chưa có
        if (!document.getElementById("recaptcha-script")) {
            const script = document.createElement("script");
            console.log(script, 'ffffffffffff')
            script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
            script.id = "recaptcha-script";
            script.async = true;
            document.body.appendChild(script);
        }
    }, [isOpen]);

    // Khi modal hiển thị thì gọi reCAPTCHA
    useEffect(() => {
        // if (!isOpen) return;

        const interval = setInterval(() => {
            if (window.grecaptcha) {
                window.grecaptcha.ready(() => {
                    window.grecaptcha.execute(SITE_KEY, { action: "submit" }).then(async (token) => {
                        console.log("reCAPTCHA token 2:", token);
                        setCaptchaToken(token);
                        // const data = await capchaCallbackMutation.mutateAsync({
                        //     captchaKey:token,
                        //     us: "cebb80e1-717e-4f6a-9943-500ddac09a04",
                        //     publicKey:SITE_KEY
                        // })
                        const body = {
                            captchaKey: token,
                            us: "cebb80e1-717e-4f6a-9943-500ddac09a04",
                            publicKey: SITE_KEY
                        }
                        const data = await fetch('/api/proxy?type=captchaCallback', {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(body),
                        })

                        console.log(data, 'data')

                        // 👉 Gửi token này về server nếu cần
                    });
                });
                clearInterval(interval); // Đảm bảo chỉ chạy 1 lần
            }
        }, 300);

        return () => clearInterval(interval);
    }, [isOpen]);

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
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
                    <div className="login">
                        <div className="auth-top">
                            <CTabs activeItemKey={2} defaultActiveItemKey={1}>
                                <CTabList className="auth-tab-list">
                                    <CTab disabled className="border-bottom-0" aria-controls="phone-tab" itemKey={1}>手机号登录</CTab>
                                    <CTab aria-controls="email-tab" itemKey={2}>其他方式登录</CTab>
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
                                            <CFormInput placeholder="请输入手机号" />
                                        </div>

                                    </CTabPanel>
                                    <CTabPanel aria-labelledby="email-tab" itemKey={2}>
                                        <div className="wrap-input">

                                            <CFormInput
                                                autoComplete={false}
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="请输入邮箱 / 帐号"
                                            />
                                            <small className="error-text">{errors.email && touched.email && errors.email}</small>

                                        </div>
                                    </CTabPanel>

                                </CTabContent>
                            </CTabs>
                        </div>
                        <div className="auth-bottom">
                            <div className="wrap-input mt-3">
                                <CFormInput
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type={isShowEye ? "password" : "text"}
                                    placeholder="请输入密码"
                                    className="px-2" />
                                <div className="eye-show-pass" onClick={() => setIsShowEye(!isShowEye)}>
                                    {
                                        isShowEye
                                            ? <PiEyeSlashThin />
                                            : <PiEyeThin className="text-blue" />
                                    }
                                </div>
                                <small className="error-text">{errors.password && touched.password && errors.password}</small>

                            </div>
                            <div className="d-flex justify-content-end">
                                <span className="forgot-pass-link" onClick={() => onGoToPage(AUTH_TEXT.FORGOT_PASSWORD)}>忘记密码?</span>
                            </div>
                            <SliderVerify onSuccess={() => setIsVerify(true)} />
                            <CButton disabled={!isVerify} type='submit' className="btn-login">登 录</CButton>
                            <div className="remember-register">
                                <div className="d-flex align-items-center">
                                    <input type='checkbox' id='rememberLogin' />
                                    <label htmlFor="rememberLogin" className="ms-2">自动登录</label>
                                </div>
                                <div>
                                    <span>
                                        没有账号？立即
                                    </span>
                                    <span className="text-blue cursor-pointer text-underline-hover" onClick={() => onGoToPage(AUTH_TEXT.REGISTER)}> 注册</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CForm>
            )}
        </Formik>
    );
}