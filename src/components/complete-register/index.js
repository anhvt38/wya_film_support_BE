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
import { SEX } from "@/contants/variables";

const validation = Yup.object().shape({
    password: Yup.string()
        .required("需要密码")
        .min(6, '密码至少 6 个字符')
        .max(20, '密码最多 20 个字符'),
    confirmPassword: Yup.string()
        .required("需要密码")
        .min(6, '密码至少 6 个字符')
        .max(20, '密码最多 20 个字符')
        .oneOf([Yup.ref('password'), null], '密码不匹配'),
    name: Yup.string()
        .required("昵称为必填项"),
    sex: Yup.string()
        .required("性别是强制性的")

});

export default function CompleteRegister(props) {
    const { onGoToPage } = props || {};
    const codeRef = useRef(null);

    const [isShowEye, setIsShowEye] = useState(false);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log(values, 'values')
    }


    return (
        <Formik
            initialValues={{
                password: "",
                confirmPassword: "",
                name: "",
                sex: "" || SEX.FEMALE.value
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
                    <div className="complete-register">
                        <h3 className="mt-5 title-group-register">设置密码</h3>
                        <div className="d-flex align-items-center justify-content-between">
                            <label>登录密码</label>
                            <div className="wrap-input mt-3">
                                <CFormInput
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type={isShowEye ? "password" : "text"}
                                    placeholder="6-20位英文字母或数字"
                                    className="px-2" />
                                <div className="eye-show-pass" onClick={() => setIsShowEye(!isShowEye)}>
                                    {
                                        isShowEye
                                            ? <PiEyeSlashThin />
                                            : <PiEyeThin className="" />
                                    }
                                </div>
                                <small className="error-text">{errors.password && touched.password && errors.password}</small>

                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            <label>重复密码</label>
                            <div className="wrap-input mt-3">
                                <CFormInput
                                    name="confirmPassword"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="重复输入密码"
                                    className="px-2" />
                                <small className="error-text">{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</small>

                            </div>
                        </div>

                        <h3 className=" title-group-register mt-3">登录信息</h3>
                        <div className="d-flex align-items-center justify-content-between">
                            <label>呢称</label>
                            <div className="wrap-input mt-3">
                                <CFormInput
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="对其他用户显示的名称"
                                    className="px-2"
                                />
                                <small className="error-text">{errors.name && touched.name && errors.name}</small>

                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-4">
                            <label>性别</label>
                            <div className="group-select-sex ps-4 position-relative">
                                <div className="d-flex gap-2 align-items-center">
                                    <label class="custom-radio-sex">
                                        <CFormInput
                                            type="radio"
                                            name="sex"
                                            onChange={(e) => {
                                                setFieldValue('sex', e.target.value)
                                            }}
                                            value={SEX.FEMALE.value}
                                            defaultChecked={values.sex == SEX.FEMALE.value}

                                        />
                                        <span></span>
                                    </label>
                                    <div>{SEX.FEMALE.label}</div>
                                </div>

                                <div className="d-flex gap-2 align-items-center">
                                    <label class="custom-radio-sex">
                                        <CFormInput
                                            type="radio"
                                            name="sex"
                                            value={SEX.MALE.value}
                                            onChange={(e) => {
                                                setFieldValue('sex', e.target.value)
                                            }}
                                            defaultChecked={values.sex == SEX.MALE.value}

                                        />
                                        <span></span>
                                    </label>
                                    <div>{SEX.MALE.label}</div>

                                </div>
                                <small className="error-text">{errors.sex && touched.sex && errors.sex}</small>


                            </div>
                        </div>

                        <div className="d-flex justify-content-center mt-4">
                            <CButton type="submit" className="btn-complete-register">下一步</CButton>

                        </div>
                    </div>

                </CForm>
            )}
        </Formik>
    );
}