'use client'
import React, { useEffect, useState } from 'react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
  import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "@/components/ui/input-otp";
  import { decryptKey, encryptKey } from "@/lib/utils";
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';



const Passkeymodal = () => {
    const [passkey,setpasskey]=useState('')
    const [open,setopen]=useState(false)
    const [error,seterror]=useState('')
    const router=useRouter()
    const path=usePathname()

    const encryptedkey=typeof window!=='undefined'?window.localStorage.getItem('accesskey'):null     
    console.log(encryptedkey)                                                                   
    useEffect(()=>{
        const accesskey=encryptedkey && decryptKey(encryptedkey)
        if(path){
            if(accesskey===process.env.NEXT_PUBLIC_ADMIN_KEY){
                setopen(false)
                console.log("verified")
                router.push('/admin')
            }else{
                setopen(true)
            }
        }
    },[encryptedkey])

    const validatepasskey=(e:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
        e.preventDefault();
        if(passkey===process.env.NEXT_PUBLIC_ADMIN_KEY){
            console.log("verified")
            const encryptedKey=encryptKey(passkey)
            localStorage.setItem('accesskey',encryptedKey)
            setopen(false)
        }else{
            seterror('Invalid Pass key')
        }

    }

    const closeModal=()=>{
        setopen(false)
        router.push('/')
    }

  return (
    <AlertDialog open={open} onOpenChange={setopen}>
    <AlertDialogContent className="shad-alert-dialog">
      <AlertDialogHeader>
        <AlertDialogTitle className="flex items-start justify-between">
          Admin Access Verification
          <Image
            src="/assets/icons/close.svg"
            alt="close"
            width={20}
            height={20}
            onClick={() => closeModal()}
            className="cursor-pointer"
          />
        </AlertDialogTitle>
        <AlertDialogDescription>
          To access the admin page, please enter the passkey.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div>
        <InputOTP
          maxLength={6}
          value={passkey}
          onChange={(value) => setpasskey(value)}
        >
          <InputOTPGroup className="shad-otp">
            <InputOTPSlot className="shad-otp-slot" index={0} />
            <InputOTPSlot className="shad-otp-slot" index={1} />
            <InputOTPSlot className="shad-otp-slot" index={2} />
            <InputOTPSlot className="shad-otp-slot" index={3} />
            <InputOTPSlot className="shad-otp-slot" index={4} />
            <InputOTPSlot className="shad-otp-slot" index={5} />
          </InputOTPGroup>
        </InputOTP>

        {error && (
          <p className="shad-error text-14-regular mt-4 flex justify-center">
            {error}
          </p>
        )}
      </div>
      <AlertDialogFooter>
        <AlertDialogAction
          onClick={(e) => validatepasskey(e)}
          className="shad-primary-btn w-full"
        >
          Enter Admin Passkey
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default Passkeymodal