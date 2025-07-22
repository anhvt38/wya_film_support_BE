"use client"


import { useSession } from "next-auth/react";
import "./styles.scss";
import Header from "../header";



export default function WrapperHeader() {
 

  const { data: session, status } = useSession();
  const { user } = session || {};
  
  return (
    <Header role={user?.roleId} />
  );
}