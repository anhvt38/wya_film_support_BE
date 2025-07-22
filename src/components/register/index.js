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
import { Formik } from "formik";
import * as Yup from "yup";
import { checkEmailIsValid } from "@/apis/auth";
import { useMutation } from "react-query";

const validation = Yup.object().shape({
    email: Yup.string()
        .required("电子邮件为必填项")
        .email('请输入有效的邮箱地址'),

});


export default function Register(props) {
    const { onNextPage } = props || {};

    const codeRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
    const [checked, setChecked] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false)


  const createMutation = useMutation((body) => {
        return checkEmailIsValid(body)
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
        const data = await fetch('/api/proxy?type=checkEmail', {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
        const response = await data.json();
        if (response) {
        console.log('chuyển qua nhập code')
            onNextPage(values.email)
        }
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

    return (
        <Formik
            initialValues={{
                email: ""
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
                    <div className="register">
                        <div className="auth-top">
                            <CTabs activeItemKey={2} defaultActiveItemKey={1}>
                                <CTabList className="auth-tab-list">
                                    <CTab disabled className="border-bottom-0" aria-controls="phone-tab" itemKey={1}>手机号注册 </CTab>
                                    <CTab aria-controls="email-tab" itemKey={2}>邮箱注册</CTab>
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
                                        <div className="ensure-text my-3 text-start">请确保此邮箱能正常接收邮件，否则请使用手机号注册！</div>
                                    </CTabPanel>
                                    <CTabPanel aria-labelledby="email-tab" itemKey={2}>
                                        <div className="wrap-input">

                                            <CFormInput
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type="email"
                                                placeholder="请输入邮箱地址" />
                                            <small className="error-text">{errors.email && touched.email && errors.email}</small>

                                        </div>
                                        <div className="ensure-text my-3 text-start">请确保此邮箱能正常接收邮件，否则请使用手机号注册！</div>
                                    </CTabPanel>

                                </CTabContent>
                            </CTabs>
                        </div>
                        <div className="auth-bottom">
                            <CButton 
                            type="submit" 
                      disabled={isSubmiting}
                        
                            className="btn-login">下一步</CButton>
                            <div className="">
                                <label className="read-checkbox-wrapper">
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={(e) => setChecked(e.target.checked)}
                                    />
                                    <span className={`read-checkbox ${checked ? 'checked' : ''}`}>
                                        {checked && <TiTick className="check-icon" />}
                                    </span>
                                    <span className="label-text"> 我已阅读并同意</span>
                                    <Link href="/" className="text-blue user-agreement">《任意门用户协议》</Link>
                                </label>
                            </div>
                        </div>
                    </div>
                </CForm>
            )}
        </Formik>
    );
}