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

const SEND_CODE_STATUS = {
    NOT_YET: "NOT_YET",
    SENDING: "SENDING",
    SEND_AGAIN: "SEND_AGAIN",
}

const validation = Yup.object().shape({
    code: Yup.string()
        .required("请输入正确的验证码")

});


export default function InputCode(props) {
    const { currentEmail, onToEmailVerify } = props || {};

    const [sendCodeStatus, setSendCodeStatus] = useState(SEND_CODE_STATUS.NOT_YET);
    const [seconds, setSeconds] = useState(60);

    const onActionSendCode = async () => {
        const body = {
            tel: "0044notexist",
            email: currentEmail,
            templateID: 1,
            validate: "03AFcWeA6zH_yg7KJkAXVUEymQueYKsTnvxSICqyDyoxcnWxIsxHT1zqs7QmSGC8UBkbNJjKb1LWBJgE3g9SV8u-WjQt6Qc66l1QdD_RFOSr67u1W45aYKDfkAq7YJ03yCUy3hquHj6GLYb5faGPDOv9DK7dHSTVVGl8a8TUrGYCo0414eb-LzPFI-T2Lw7BsMk2GKJg4Thd6W3hzi1VJ10s36CFtlC01g4tKLBOFE65QPlyg2GfxHMk9bqeRewdSyulLCsf2xQ_mJsM_CROZKNr1J3q-vcQcvZSpB5L3arel4F2tfYUtDcaHHVPYBwQ0yFG1JIHwtojyxQois6IwncVwaHimWNB1YMQZUpyddZ2lY3G0lNGzsooabpI-k1Tu9710O4j8Fz-2m2mxiX76A49PXpWMRYXnln9nrRKLJ6yyryyxrg1I20i5C742O1pvl-tTWIPdZUMeI1OPAJIemoKn68RdgYaURdaJ7re7e742LjhYKMXlpYBAogdV0y7SyIrIeqi1iajeSCmmIOnH6SRAXc7krmLLFiX8M-Wwza0je5Fx1s1ULWKyNH_wJed10M48eythqvwFPyju3MyZ03zaaopN0wAPIJSFt3eFjVJYx9fZkTKakM-MhTUQeEprrtqoglrdsl0n6PbIvAT1GJQbzJcpCwXrsm-snNFnVVnyWPXQiJW7z1GvZXa_hyy3uGqIgn4jQ6tWlWumEID3kjFgRb08Jiph1PdLqiN_OOV0BfJn-K_sDPR5ceMYLuhozLHyx6Y8HGEVjJ8ZpTJ85WF6INfc3vn-HG7NeSQ-fL5oEn5zYUpeLxy23YFKgqxdhN8Ic3Xr3KWgKh2sYdyVhKFWZhegdbi9vKMeNgr1TVQ1F0V8y-P2EpbBlZXh3r41ZfWUkKwpUtXMd712vSW_pTp3jhfHJoEC_qUg-SqbIl0cY1CyJsdma6fVFxm59UJNGc73i9dMdVgB3",
            publicKey: "6Ld1wwscAAAAAE-0zWlEWxlrfQ5dV-XtjyoEc0c9",
            __RequestVerificationToken: "mQYeFzZ-K8KfF_hJlry6fiRFWofXM6h9JwsbBOgO4bUyjuMN92ArTl74VeAS1aStVA2NQwG_7FUBKL1bMSsM7MciiyTCpV_CA-Cda91_ekM1"
        }
        setSendCodeStatus(SEND_CODE_STATUS.SENDING)
        const data = await fetch('/api/proxy?type=sendCode', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        const response = await data.json();
    }

    useEffect(() => {
        let timer = null;
        if (sendCodeStatus == SEND_CODE_STATUS.SENDING) {
            if (seconds === 0) {
                setSendCodeStatus(SEND_CODE_STATUS.SEND_AGAIN)
                setSeconds(60)
                return;
            }

            timer = setInterval(() => {
                setSeconds(prev => prev - 1);
            }, 1000);
        }


        return () => clearInterval(timer);
    }, [sendCodeStatus, seconds]);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log(values, 'values')
        onToEmailVerify()

    }

    return (
        <Formik
            initialValues={{
                code: ""
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
                    <div className="input-code">
                        <div className="wrap-input mt-5 gap-1">
                            <div className="position-relative w-full">
                                <CFormInput
                                placeholder="请输入右侧验证码"
                                className=""
                                name="code"
                                value={values.code}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={sendCodeStatus == SEND_CODE_STATUS.NOT_YET}
                            />
                            <small className="error-text">{errors.code && touched.code && errors.code}</small>
                            </div>

                            <CButton
                                disabled={sendCodeStatus == SEND_CODE_STATUS.SENDING}
                                className="btn-send-code fs-6"
                                onClick={onActionSendCode}>
                                {sendCodeStatus == SEND_CODE_STATUS.NOT_YET ? "获取验证码" : "重发"}{sendCodeStatus == SEND_CODE_STATUS.SENDING ? `(${seconds})` : null}
                            </CButton>

                        </div>
                        <div className="my-3 fs-6">点击按钮将发送4位验证码到： {currentEmail}</div>
                        <div>
                            <CButton type='submit' className="btn-next-code" >下一步</CButton>
                        </div>
                        <div className="input-code-bottom">
                            <div className="my-3">收不到邮件?</div>
                            <div className="d-flex flex-column">
                                <span>1. 请确保您的邮箱填写正确</span>
                                <span>2. 请确保您的邮箱能正常收到邮件</span>
                                <span>3. 请查看邮件是否被安全软件拦截</span>
                                <span>4. 可选择使用<Link href="/" className="text-blue">手机注册</Link></span>
                            </div>
                        </div>
                    </div>
                </CForm>
            )}
        </Formik>
    );
}