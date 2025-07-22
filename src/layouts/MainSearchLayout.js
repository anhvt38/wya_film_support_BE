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
    setMainNoti: () => { }
})




export default function MainSearchLayout({ children }) {
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
            setMainNoti
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
            mainNoti
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
            {useMemo(() => (
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
                                    <div className="container mx-auto">
                                        {children}
                                    </div>
                                    <Suspense>
                                        <Footer />
                                    </Suspense>

                                    <AuthModal
                                        isOpen={isOpenAuthModal}
                                        onClose={() => setIsOpenAuthModal(false)}
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
            ), [toast, confirmModal, height, isShowLoading, isOpenAuthModal, loginNotiModal, mainNoti])}
        </MainContext.Provider>

    )
}
