"use client";
import Providers from "@/utils/provider";
import { SessionProvider } from "next-auth/react";
import { usePathname } from 'next/navigation';
import { createContext, useEffect, useMemo, useState } from "react";
import { CContainer } from "@coreui/react";

import ConfirmModal from "@/components/confirm-modal";
import { Toast } from "@/components/toast";

export const AuthContext = createContext({
    

    userInfo: {},
    setUserInfo: () => {},
    toast: {},
    setToast: () => {},
    confirmModal: {},
    setConfirmModal: () => {},
  })
  



export default function AuthLayout({ children }) {
    const [toast, setToast] = useState({});
    const [confirmModal, setConfirmModal] = useState({});
    const [userInfo, setUserInfo] = useState({});
    
    const pathname = usePathname();

    const value = useMemo(
        () => ({ 
            toast,
            setToast,
            confirmModal,
            setConfirmModal,
            userInfo, 
            setUserInfo 
        }), 
        [userInfo, toast, confirmModal,]
    );

    useEffect(() => {
        localStorage.setItem('currentTitle', document.title);
    }, [])

    return (
        <AuthContext.Provider value={value}>
            {useMemo(() => (
                <SessionProvider >
                    <div>
                        <Providers>
                            <CContainer fluid>
                                {children}
                            </CContainer>
                        </Providers>
                    </div>

                    <Toast
                        message={toast.message}
                        toggle={() => setToast({})} 
                        className={toast.className}
                    />

                    <ConfirmModal
                        title={confirmModal.title}
                        content={confirmModal.content}
                        toggle={() => setConfirmModal({})} 
                        action={confirmModal.action}
                    />
                </SessionProvider>
            ), [toast, confirmModal,])}
        </AuthContext.Provider>
    )
}
