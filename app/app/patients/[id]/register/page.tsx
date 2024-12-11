import RegisterForm from '@/components/Forms/RegisterForm'
import { getUSer } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const RegisterPage= async({params:{id}}:SearchParamProps) => {
    const userId=id;
    const user=await getUSer(userId)
    console.log(user)

  return (
    <div className="flex min-h-screen h-screen">
     
    <section className="remove-scrollbar container ">
     
      <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
        <Image alt="patient" src='/assets/icons/logo-full.png'
        width={1000}
        height={1000}
         className="mb-12 h-10 w-fit"/>
         <RegisterForm user={user}/>

         <div className="text-14-regular mt-20 flex justify-between">
          <p className="justify-items-end text-dark-600 xl:text-left">
          © 2024 HealthCare
          </p>
          <Link href='/?admin=true' className="text-green-500">Admin</Link>
         </div>
      </div>
    </section>
    <Image src='/assets/images/register-img.png' alt="patient" width={1000} height={1000} className="side-img max-w-[390px]"/>
  </div>
  )
}

export default RegisterPage
