'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Customformfield from '../Customformfield'
import SubmitButton from '../SubmitButton'
import { UserFormValidation } from '@/lib/form_validator'
import { createUser } from '@/lib/actions/patient.actions'
import { useRouter } from 'next/navigation'



export enum Formfieldtype{
    INPUT='input',
    TEXTAREA="textarea",
    PHONE_INPUT='phoneInput',
    CHECKBOX='checkbox',
    DATE_PICKER='datePicker',
    SELECT='select',
    SKELETON='skeleton'
}



const PatientForm = () => {
    const router=useRouter();
    const [isLoading,setloading]=useState(false)
    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
          name: "",
          email:"",
          phone:""
        },
      })

    const onsubmit=async(values:z.infer<typeof UserFormValidation>)=>{
        
        try {
            const userdata={name:values.name,email:values.email,phone:values.phone};
            console.log(userdata)

            const user=await createUser(userdata)
            console.log(user)
            if(user){
                router.push(`/patients/${user.$id}/register`)
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Form {...form}>

    <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Hi there 👋</h1>
            <p className="text-dark-700">Schedule Your First Appointment</p>
        </section>


   <Customformfield 
   control={form.control}
   name="name"
   fieldType={Formfieldtype.INPUT}
   label='Full Name'
   placeholder='Enter Your Name'
   iconSrc='/assets/icons/user.svg'
   iconAlt='user'
   />

<Customformfield 
   control={form.control}
   name="email"
   fieldType={Formfieldtype.INPUT}
   label='Email'
   placeholder='Enter Your Email'
   iconSrc='/assets/icons/email.svg'
   iconAlt='email'

   />
   
<Customformfield 
   control={form.control}
   name="phone"
   fieldType={Formfieldtype.PHONE_INPUT}
   label='Phone'
   placeholder='91XXX-XXXXX'
   iconSrc='/assets/icons/email.svg'
   iconAlt='email'

   />


      <SubmitButton isLoading={isLoading} >Get Started</SubmitButton>
    </form>
  </Form>
  )
}

export default PatientForm