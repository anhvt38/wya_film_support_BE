"use client"

import "./styles.scss";
import { CCol, CPlaceholder, CRow } from "@coreui/react";


export const CommonTableSkeleton = (props) => {

    return (
        <CRow>
            <CCol xs="6" sm="4" md="3">
                <CPlaceholder className='py-1' as="div" animation="glow">
                    <CPlaceholder xs={12} />
                </CPlaceholder>
                <CPlaceholder className='py-1' as="div" animation="glow">
                    <CPlaceholder xs={12} />
                </CPlaceholder>
                <CPlaceholder className='py-1' as="div" animation="glow">
                    <CPlaceholder xs={12} />
                </CPlaceholder>
                <CPlaceholder className='py-1' as="div" animation="glow">
                    <CPlaceholder xs={12} />
                </CPlaceholder>
                <CPlaceholder className='py-1' as="div" animation="glow">
                    <CPlaceholder xs={12} />
                </CPlaceholder>
                <CPlaceholder className='py-1' as="div" animation="glow">
                    <CPlaceholder xs={12} />
                </CPlaceholder>
            </CCol>
            <CCol xs="6" sm="4" md="6">
                <CPlaceholder className='py-1' as="div" animation="glow">
                    <CPlaceholder xs={12} />
                </CPlaceholder>
                <CPlaceholder className='py-1' as="div" animation="glow">
                    <CPlaceholder xs={12} />
                </CPlaceholder>
                <CPlaceholder className='py-1' as="div" animation="glow">
                    <CPlaceholder xs={12} />
                </CPlaceholder>
                <CPlaceholder className='py-1' as="div" animation="glow">
                    <CPlaceholder xs={12} />
                </CPlaceholder>
                <CPlaceholder className='py-1' as="div" animation="glow">
                    <CPlaceholder xs={12} />
                </CPlaceholder>
                <CPlaceholder className='py-1' as="div" animation="glow">
                    <CPlaceholder xs={12} />
                </CPlaceholder>
            </CCol>
            <CCol xs="6" sm="4" md="3" className="d-none d-sm-block">
                <CPlaceholder className='py-1' as="div" animation="glow">
                    <CPlaceholder xs={12} />
                </CPlaceholder>
                <CPlaceholder className='py-1' as="div" animation="glow">
                    <CPlaceholder xs={12} />
                </CPlaceholder>
                <CPlaceholder className='py-1' as="div" animation="glow">
                    <CPlaceholder xs={12} />
                </CPlaceholder>
                <CPlaceholder className='py-1' as="div" animation="glow">
                    <CPlaceholder xs={12} />
                </CPlaceholder>
                <CPlaceholder className='py-1' as="div" animation="glow">
                    <CPlaceholder xs={12} />
                </CPlaceholder>
                <CPlaceholder className='py-1' as="div" animation="glow">
                    <CPlaceholder xs={12} />
                </CPlaceholder>
            </CCol>
        </CRow>
    );
}