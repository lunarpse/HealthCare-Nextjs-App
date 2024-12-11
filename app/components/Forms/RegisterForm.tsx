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

import { createUser, registerpatient } from '@/lib/actions/patient.actions'
import { useRouter } from 'next/navigation'
import { Formfieldtype } from './PatientForm'

import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from '@/constants'
import { Label } from '../ui/label'
import { RadioGroup,RadioGroupItem  } from '../ui/radio-group'

import Image from 'next/image'
import { SelectItem } from '../ui/select'
import {FileUploader} from '../FileUploader'
import { PatientFormValidation } from '@/lib/form_validator'
import { blob } from 'stream/consumers'
import { Birthstone } from 'next/font/google'







const RegisterForm = ({user}:{user:User}) => {
    const router=useRouter();
    const [isLoading,setloading]=useState(false)
    const form = useForm<z.infer<typeof PatientFormValidation>>({
        resolver: zodResolver(PatientFormValidation),
        defaultValues: {
          ...PatientFormDefaultValues,
          name: "",
          email:"",
          phone:""
        },
      })

    const onsubmit=async(values:z.infer<typeof PatientFormValidation>)=>{
        
        console.log(values.identificationDocument)
        let formdata;
        if(values.identificationDocument && values.identificationDocument.length>0){
          const blobFile = new Blob([values.identificationDocument[0]], {
            type: values.identificationDocument[0].type,
          });

          formdata=new FormData();
        formdata.append('blobFile',blobFile)
        formdata.append('filename',values.identificationDocument[0].name)
        }
        
        try {
          const patient = {
            userId: user.$id,
            name: values.name,
            email: values.email,
            phone: values.phone,
            birthDate: new Date(values.birthDate),
            gender: values.gender,
            address: values.address,
            occupation: values.occupation,
            emergencyContactName: values.emergencyContactName,
            emergencyContactNumber: values.emergencyContactNumber,
            primaryPhysician: values.primaryPhysician,
            insuranceProvider: values.insuranceProvider,
            insurancePolicyNumber: values.insurancePolicyNumber,
            allergies: values.allergies,
            currentMedication: values.currentMedication,
            familyMedicalHistory: values.familyMedicalHistory,
            pastMedicalHistory: values.pastMedicalHistory,
            identificationType: values.identificationType,
            identificationNumber: values.identificationNumber,
            identificationDocument: values.identificationDocument
              ? formdata
              : undefined,
            privacyConsent: values.privacyConsent,
            treatmentConsent:values.treatmentConsent,
            userConsent:values.disclosureConsent
          };
          //@ts-ignore
         
          const newpatient=await registerpatient(patient)
          console.log("iiii")
          console.log(newpatient)
          if(newpatient){
            router.push(`/patients/${user.$id}/new-appointment`)
          }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Form {...form}>

    <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8 flex-1">
        <section className=" space-y-12 flex-1">
            <h1 className="header">Welcome 👋</h1>
            <p className="text-dark-700">Let us know more about yourself</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>


   <Customformfield 
          control={form.control}
          name="name"
          label="Full Name"
          fieldType={Formfieldtype.INPUT}
          placeholder='Enter Your Name'
          iconSrc='/assets/icons/user.svg'
          iconAlt='user'    />

   <div className="flex flex-col gap-6 xl:flex-row">
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
   </div>

   <div className="flex flex-col gap-6 xl:flex-row">
       
<Customformfield 
   control={form.control}
   name="birthDate"
   fieldType={Formfieldtype.DATE_PICKER}
   label='Date Of Birth'
   
   />
      
{/* <Customformfield 
   control={form.control}
   name="gender"
   fieldType={Formfieldtype.SKELETON}
   label='Gender'
   renderSkeleton={(field)=>(
    <FormControl>
      <RadioGroup className='flex h-11 gap-6 xl:justify-between' onValueChange={field.onChange} defaultValue={field.value}>
        {Genders.map(option=>(
          <div className="radio-group" key={option}>
            <RadioGroupItem
            value={option}
            id={option}
            />
            <Label htmlFor={option} className='cursor-pointer' >{option}</Label>
          </div>
        ))}
      </RadioGroup>
    </FormControl>
   )}
   

   /> */}
   
   <Customformfield
              fieldType={Formfieldtype.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
   </div>

   <div className="flex flex-col gap-6 xl:flex-row">
   <Customformfield 
   control={form.control}
   name="address"
   fieldType={Formfieldtype.INPUT}
   label='Address'
   placeholder='Enter Your Address'
   

   />
   <Customformfield 
   control={form.control}
   name="occupation"
   fieldType={Formfieldtype.INPUT}
   label='Occupation'
   placeholder='Enter Your Occupation'
  

   />
   </div>

<div className="flex flex-col gap-6 xl:flex-row">
<Customformfield 
   control={form.control}
   name="emergencyContactName"
   fieldType={Formfieldtype.INPUT}
   label='Emergency Contact Name'
   placeholder='Enter Guardian"s Name'
   

   />

<Customformfield 
   control={form.control}
   name="emergencyContactNumber"
   fieldType={Formfieldtype.PHONE_INPUT}
   label='Emergency Contact Number'
   placeholder='Enter Emergency Contact No.'
  

   />
</div>

<section className="space-y-6">
  <div className="mb-9 space-y-1">
    <h2 className="sub-header">Medical Information</h2>
  </div>
</section>


<Customformfield 
   control={form.control}
   name="primaryPhysician"
   fieldType={Formfieldtype.SELECT}
   label='Primary Physician'
   placeholder='Select a physician'
>
  {Doctors.map(doctor=>(
    <SelectItem value={doctor.name} key={doctor.name}>
       <div className="flex cursor-pointer items-center gap-2">
      <Image
      src={doctor.image}
      alt={doctor.name}
      className='rounded-full border border-dark-500'
      width={32}
      height={32}
      />
      <p>{doctor.name}</p>
      </div>
    </SelectItem>
  ))}
</Customformfield>

<div className="flex flex-col xl:flex-row gap-6">
<Customformfield 
   control={form.control}
   name="insuranceProvider"
   fieldType={Formfieldtype.INPUT}
   label='Insurance Provider'
   placeholder='Enter Insurance Provider'
   

   />
   <Customformfield 
   control={form.control}
   name="insurancePolicyNumber"
   fieldType={Formfieldtype.INPUT}
   label='Insurance Policy Number'
   placeholder='Enter Insurance Policy Number'
   

   />


</div>

<div className="flex flex-col xl:flex-row gap-6">
<Customformfield 
   control={form.control}
   name="allergies"
   fieldType={Formfieldtype.TEXTAREA}
   label='Allergies (if any)'
   placeholder='Enter Allergies'
   />

<Customformfield 
   control={form.control}
   name="currentMedication"
   fieldType={Formfieldtype.TEXTAREA}
   label='Current Medication'
   placeholder='Enter Medications'
  
   />
   </div>
   
   <div className="flex flex-col xl:flex-row gap-6">
<Customformfield 
   control={form.control}
   name="familyMedicalHistory"
   fieldType={Formfieldtype.TEXTAREA}
   label='Family Medical History'
   placeholder='Family Medical History'
   />

<Customformfield 
   control={form.control}
   name="pastMedicalHistory"
   fieldType={Formfieldtype.TEXTAREA}
   label='Past Medical History'
   placeholder='Past Medical History'
  
   />
   </div>

   <section className="space-y-6">
  <div className="mb-9 space-y-1">
    <h2 className="sub-header">Identification and verification</h2>
  </div>
</section>

   <Customformfield 
   control={form.control}
   name="identificationType"
   fieldType={Formfieldtype.SELECT}
   label='Identification Type'
   placeholder='Select Identification Type'
>
  {IdentificationTypes.map(type=>(
    <SelectItem value={type} key={type}>
       {type}
    </SelectItem>
  ))}
</Customformfield>
<Customformfield 
   control={form.control}
   name="identificationNumber"
   fieldType={Formfieldtype.INPUT}
   label='Identification Number'
   placeholder='Enter Identification Number'
   

   />

<Customformfield
              fieldType={Formfieldtype.SKELETON}
              control={form.control}
              name="identificationDocument"
              label="Scanned copy of identification document"
              renderSkeleton={(field) => (
                <FormControl>
               <FileUploader files={field.value} onChange={field.onChange}/>
                </FormControl>
              )}
            />

<section className="space-y-6">
  <div className="mb-9 space-y-1">
    <h2 className="sub-header">Consent and Privacy</h2>
  </div>
</section>

<Customformfield
name='treatmentConsent'
label='I give consent for treatment'
fieldType={Formfieldtype.CHECKBOX}
control={form.control}
/>

<Customformfield
name='disclosureConsent'
label='I give consent for disclosure of treatment'
fieldType={Formfieldtype.CHECKBOX}
control={form.control}
/>
<Customformfield
name='privacyConsent'
label='I give consent for privacy'
fieldType={Formfieldtype.CHECKBOX}
control={form.control}
/>


      <SubmitButton isLoading={isLoading} >Get Started</SubmitButton>
    </form>
  </Form>
  )
}

export default RegisterForm