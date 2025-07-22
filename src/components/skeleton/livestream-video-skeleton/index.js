"use client"

import "./styles.scss";
import { CCol, CPlaceholder, CRow } from "@coreui/react";


export const LivestreamVideoSkeleton = (props) => {

    return (
        <CRow className='px-2'>
            <CCol xs="12">
                <CPlaceholder className='py-1' as="div" animation="glow">
                    <CPlaceholder style={{ height: '180px'}} xs={12} />
                </CPlaceholder>
            </CCol>
        </CRow>
    );
}