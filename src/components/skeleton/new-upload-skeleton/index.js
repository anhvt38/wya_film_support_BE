"use client"

import "./styles.scss";
import { CCol, CPlaceholder, CRow } from "@coreui/react";


export const NewUploadSkeleton = (props) => {

    return (
        <CRow className='px-2'>
            <CCol xs="12">
                <CPlaceholder className='py-1' as="div" animation="glow">
                    <CPlaceholder style={{ height: '180px'}} xs={12} />
                </CPlaceholder>
            </CCol>
            <CCol xs="12">
                <CPlaceholder className='py-1' as="div" animation="glow">
                    <CPlaceholder style={{ height: '20px'}} xs={12} />
                </CPlaceholder>
                <CRow className="justify-content-between">
                    <CCol xs="4">
                        <CPlaceholder className='py-1' as="div" animation="glow">
                            <CPlaceholder style={{ height: '20px'}} xs={12} />
                        </CPlaceholder>
                    </CCol>
                    <CCol xs="4">
                        <CPlaceholder className='py-1' as="div" animation="glow">
                            <CPlaceholder style={{ height: '20px'}} xs={12} />
                        </CPlaceholder>
                    </CCol>
                </CRow>
            </CCol>
        </CRow>
    );
}