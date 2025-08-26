"use client";
import Providers from "@/utils/provider";
import { SessionProvider } from "next-auth/react";
import { Suspense, createContext, useEffect, useMemo, useRef, useState } from "react";
import ConfirmModal from "@/components/confirm-modal";
import { Loading } from "@/components/loading";
import { Toast } from "@/components/toast";
import WrapperHeader from "@/components/wrapper-header";
import { CCol, CContainer } from "@coreui/react";
import Footer from "@/components/footer";
import { BottomRightToolbar } from "@/components/bottom-right-toolbar";
import "./styles.scss";
import AuthModal from "@/components/auth-modal";
import LoginNotiModal from "@/components/login-noti-modal";
import MainNoti from "@/components/main-noti";
import DiscoveryListModal from "@/components/discovery-list-modal";
import UploadFileModal from "@/components/upload-file-modal";
import UpgradetoVIPModal from "@/components/upgrade-to-VIP-modal";
import NotifiUpgradeVipModal from "@/components/notifi-upgrade-vip-modal";
import ResetPasswordModal from "@/components/reset-password-modal";
import { set } from "date-fns";
import ModifyInfoUserModal from "@/components/modify-info-user-modal";

export const MainContext = createContext({

    toast: {},
    setToast: () => { },
    confirmModal: {},
    setConfirmModal: () => { },
    isShowLoading: false,
    setIsShowLoading: () => { },
    isOpenAuthModal: false,
    setIsOpenAuthModal: () => { },
    loginNotiModal: false,
    setLoginNotiModal: () => { },
    mainNoti: false,
    setMainNoti: () => { },
    searchDataTotal: 0,
    setSearchDataTotal: () => { },
    partSearchTotal: {},
    setPartSearchTotal: () => { },
    isOpenFollowedLocalModal: false,
    setIsOpenFollowedLocalModal: () => { },
    isOpenUploadFileModal: false,
    setIsOpenUploadFileModal: () => { },
    isOpenUpgradetoVIPModal: false,
    setIsOpenUpgradetoVIPModal: () => { },
    isOpenNotifiUpgradeVipModal: false,
    setIsOpenNotifiUpgradeVipModal: () => { },
    isOpenResetPasswordModal: false,
    setIsOpenResetPasswordModal: () => { },
    privateKey: "",
    setPrivateKey: () => { },
    publicKey: "",
    setPublicKey: () => { },
    isOpenModifyInfoUserModal: false,
    setIsOpenModifyInfoUserModal: () => { },
})




export default function MainLayout({ children }) {
    const [conversationId, setConversationId] = useState(null);
    const [isShowAdminSidebar, setIsShowAdminSidebar] = useState(null);
    const [userInfo, setUserInfo] = useState({});
    const [personalInfo, setPersonalInfo] = useState({});
    const [diagramLists, setDiagramLists] = useState([]);
    const [toast, setToast] = useState({});
    const [confirmModal, setConfirmModal] = useState({});
    const [isShowLoading, setIsShowLoading] = useState(false);
    const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
    const [loginNotiModal, setLoginNotiModal] = useState(false);
    const [mainNoti, setMainNoti] = useState(false);
    const [isTop, setIsTop] = useState(true);
    const [searchDataTotal, setSearchDataTotal] = useState(0);
    const [partSearchTotal, setPartSearchTotal] = useState({});
    const [isOpenFollowedLocalModal, setIsOpenFollowedLocalModal] = useState(false);
    const [isOpenUploadFileModal, setIsOpenUploadFileModal] = useState(false);
    const [isOpenUpgradetoVIPModal, setIsOpenUpgradetoVIPModal] = useState(false);
    const [isOpenNotifiUpgradeVipModal, setIsOpenNotifiUpgradeVipModal] = useState(false);
    const [isOpenResetPasswordModal, setIsOpenResetPasswordModal] = useState(false);
    const [privateKey, setPrivateKey] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [isOpenModifyInfoUserModal, setIsOpenModifyInfoUserModal] = useState(false);

    const ref = useRef(null)
    const [height, setHeight] = useState(0)
    const value = useMemo(
        () => ({
            conversationId,
            setConversationId,
            isShowAdminSidebar,
            setIsShowAdminSidebar,
            userInfo,
            setUserInfo,
            diagramLists,
            setDiagramLists,
            personalInfo,
            setPersonalInfo,
            toast,
            setToast,
            confirmModal,
            setConfirmModal,
            isShowLoading,
            setIsShowLoading,
            isOpenAuthModal,
            setIsOpenAuthModal,
            loginNotiModal,
            setLoginNotiModal,
            mainNoti,
            setMainNoti,
            searchDataTotal,
            setSearchDataTotal,
            partSearchTotal,
            setPartSearchTotal,
            isOpenFollowedLocalModal,
            setIsOpenFollowedLocalModal,
            isOpenUploadFileModal,
            setIsOpenUploadFileModal,
            isOpenUpgradetoVIPModal,
            setIsOpenUpgradetoVIPModal,
            isOpenNotifiUpgradeVipModal,
            setIsOpenNotifiUpgradeVipModal,
            isOpenResetPasswordModal,
            setIsOpenResetPasswordModal,
            privateKey,
            setPrivateKey,
            publicKey,
            setPublicKey,
            isOpenModifyInfoUserModal,
            setIsOpenModifyInfoUserModal
        }),
        [
            conversationId,
            isShowAdminSidebar,
            userInfo,
            diagramLists,
            personalInfo,
            toast,
            confirmModal,
            height,
            isShowLoading,
            isOpenAuthModal,
            loginNotiModal,
            mainNoti,
            searchDataTotal,
            partSearchTotal,
            isOpenFollowedLocalModal,
            isOpenUploadFileModal,
            isOpenUpgradetoVIPModal,
            isOpenNotifiUpgradeVipModal,
            isOpenResetPasswordModal,
            privateKey,
            publicKey,
            isOpenResetPasswordModal,
            isOpenModifyInfoUserModal
        ]
    );

    useEffect(() => {

        const h = document.querySelector('#header');
        setHeight(h?.offsetHeight)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const atTop = window.scrollY === 0;
            setIsTop(atTop);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (ref.current) {
            ref.current.style.background = isTop ? 'transparent' : '#1d1d1dfa';
        }
    }, [isTop]);


    return (
        <MainContext.Provider value={value}>
            {/* {useMemo(() => ( */}
                <SessionProvider >
                    <div>
                        <Providers>
                            <CContainer fluid className="p-0">
                                <CCol sm={'auto'} className=" h-full-screen d-flex flex-column">
                                    <Suspense>
                                        <div
                                            ref={ref}
                                            id='header'
                                        >
                                            <WrapperHeader />
                                        </div>
                                    </Suspense>
                                    <div className=" px-2 container mx-auto mt-5">
                                        {children}
                                    </div>
                                    <Suspense>
                                        <Footer />
                                    </Suspense>

                                    <AuthModal
                                        isOpen={isOpenAuthModal}
                                        onClose={() => setIsOpenAuthModal(false)}
                                    />

                                    <DiscoveryListModal
                                        isOpen={isOpenFollowedLocalModal}
                                        onClose={() => setIsOpenFollowedLocalModal(false)}
                                    />

                                    <UploadFileModal
                                        isOpen={isOpenUploadFileModal}
                                        onClose={() => setIsOpenUploadFileModal(false)}
                                    />

                                    <ConfirmModal
                                        title={confirmModal.title}
                                        content={confirmModal.content}
                                        toggle={() => setConfirmModal({})}
                                        action={confirmModal.action}
                                    />

                                    <LoginNotiModal
                                        content={loginNotiModal.content}
                                        acceptText={loginNotiModal.acceptText}
                                        toggle={() => setLoginNotiModal({})}
                                        action={loginNotiModal.action}
                                    />

                                    <MainNoti
                                        content={mainNoti.content}
                                        toggle={() => setMainNoti({})}
                                        action={mainNoti.action}
                                    />

                                    <UpgradetoVIPModal
                                        isOpen={isOpenUpgradetoVIPModal}
                                        onClose={() => setIsOpenUpgradetoVIPModal(false)}
                                    />

                                    <NotifiUpgradeVipModal
                                        isOpen={isOpenNotifiUpgradeVipModal}
                                        onClose={() => setIsOpenNotifiUpgradeVipModal(false)}
                                    />

                                    {/* <ResetPasswordModal
                                        isOpen={isOpenResetPasswordModal}
                                        onClose={() => setIsOpenResetPasswordModal(false)}
                                    />

                                    <ModifyInfoUserModal
                                        isOpen={isOpenModifyInfoUserModal}
                                        onClose={() => setIsOpenModifyInfoUserModal(false)}
                                    /> */}

                                </CCol>
                            </CContainer>
                        </Providers>
                    </div>

                    <Toast
                        message={toast.message}
                        toggle={() => setToast({})}
                        className={toast.className}
                    />

                    {
                        isShowLoading &&
                        <Loading />
                    }

                    <BottomRightToolbar />

                </SessionProvider>
            {/* ), [toast, confirmModal, height, isShowLoading, isOpenAuthModal, loginNotiModal, mainNoti, searchDataTotal, partSearchTotal, isOpenFollowedLocalModal, isOpenUploadFileModal, isOpenUpgradetoVIPModal, isOpenNotifiUpgradeVipModal, isOpenResetPasswordModal, privateKey, publicKey, isOpenModifyInfoUserModal])} */}
        </MainContext.Provider>

    )
}
