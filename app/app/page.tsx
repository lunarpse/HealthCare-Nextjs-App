'use client'
import PatientForm from "@/components/Forms/PatientForm";
import Passkeymodal from "@/components/Passkeymodal";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Home({searchParams}:SearchParamProps) {
  const isadmin=searchParams.admin==='true';
  const path=usePathname()
  console.log(path)
  return (
    <div className="flex min-h-screen h-screen">
     {isadmin && <Passkeymodal/>}
      <section className="remove-scrollbar container my-auto">
       
        <div className="sub-container max-w-[496px]">
          <Image alt="patient" src='/assets/icons/logo-full.svg'
          width={1000}
          height={1000}
           className="mb-12 h-10 w-fit"/>
           
           <PatientForm/>

           <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
            © 2024 HealthCare
            </p>
            <Link href='/?admin=true' className="text-green-500">Admin</Link>
           </div>
        </div>
      </section>
      <Image src='/assets/images/onboarding-img.png' alt="patient" width={1000} height={1000} className="side-img max-w-[50%]"/>
    </div>
  )}