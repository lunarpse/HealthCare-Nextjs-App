'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { Dispatch, SetStateAction, useState } from 'react'
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
import { getAppointmentSchema, ScheduleAppointmentSchema, UserFormValidation } from '@/lib/form_validator'
import { createUser } from '@/lib/actions/patient.actions'
import { useRouter } from 'next/navigation'
import { Formfieldtype } from './PatientForm'
import Image from 'next/image'
import { SelectItem } from '../ui/select'
import { Doctors } from '@/constants'
import { createappointment, updateAppointment } from '@/lib/actions/appointment.actions'
import { Appointment } from '@/types/appwrite.types'






const AppointmentForm = ({type,userId,patientId,appointment,setOpen}:{
    userId:string,
    patientId:string,
    type:"create"|"schedule"|"cancel",
    appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>
}) => {

    const Appointmentschema=getAppointmentSchema(type)
    const router=useRouter();
    const [isLoading,setloading]=useState(false)
    const form = useForm<z.infer<typeof Appointmentschema>>({
        resolver: zodResolver(Appointmentschema),
        defaultValues: {
            primaryPhysician: appointment ? appointment.primaryPhysician:"",
            schedule:appointment?new Date(appointment.schedule):new Date(),
            reason: appointment?appointment.reason:"",
            note: appointment?appointment.note:"",
            cancellationReason:appointment?.cancellationReason||"",
        },
      })

    const onsubmit=async(values:z.infer<typeof Appointmentschema>)=>{
        let status;
        setloading(true)
        switch (type) {
            case "schedule":
              status = "scheduled";
              break;
            case "cancel":
              status = "cancelled";
              break;
            default:
              status = "pending";
          }
        try {
          if(type==='create' && patientId){
            const appointment={
                userId,
                patient:patientId,
                primaryPhysician:values.primaryPhysician,
                schedule:new Date(values.schedule),
                reason: values.reason!,
                status: status as Status,
                note: values.note
            }

            const newappointment=await createappointment(appointment);
            if(newappointment){
                form.reset();
                router.push(`/patients/${userId}/new-appointment/success?appointmentId=${newappointment.$id}`)
            }
          }else{
            const updateddata={
              userId,
              appointmentId:appointment?.$id!,
              appointment:{
                primaryPhysician: values.primaryPhysician,
                schedule: new Date(values.schedule),
                status: status as Status,
                cancellationReason: values.cancellationReason,
              },
              type
            }
            const updatedappointment=await updateAppointment(updateddata)
            if(updatedappointment){
              setOpen && setOpen(false)
              form.reset();
            }
  
          }

        



        } catch (error) {
            console.log(error)
        }
        setloading(false)
    }

    let btnlabel;
    switch(type){
     
        case "schedule":
            btnlabel="Schedule Appointment"
        case "cancel":
            btnlabel="Cancel Appointment"
        default:
            btnlabel="Submit Appointment"
    }
  return (
    <Form {...form}>

    <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8 flex-1">
       
       {type==="create" &&(
         <section className="mb-12 space-y-4">
         <h1 className="header">New Appointment</h1>
         <p className="text-dark-700">Reuest a new appointment</p>
     </section>
       )}

      {type!=="cancel" &&(
        <>
          <Customformfield 
   control={form.control}
   name="primaryPhysician"
   fieldType={Formfieldtype.SELECT}
   label='Primary Doctor'
   placeholder='Select a Doctor'
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

<Customformfield 
   control={form.control}
   name="schedule"
   fieldType={Formfieldtype.DATE_PICKER}
   label='Expected Appointment Date'
   showTimeSelect
   dateFormat="MM/dd/yyyy  -  h:mm aa"
   />
      
<div className={`${type==="create" && 'xl:flex-row'} flex flex-col gap-6`}>
<Customformfield 
   control={form.control}
   name="reason"
   fieldType={Formfieldtype.TEXTAREA}
   label='Appointment Reason'
   placeholder='Enter Appointment Reason'
   disabled={type==='schedule'}
   />

<Customformfield
                fieldType={Formfieldtype.TEXTAREA}
                control={form.control}
                name="note"
                label="Comments/notes"
                placeholder="Enter Notes"
                disabled={type === "schedule"}
              />
</div>



        </>
      )}


      {type==='cancel'&&(
        <Customformfield 
        control={form.control}
        name="cancellationReason"
        fieldType={Formfieldtype.TEXTAREA}
        label='Reason for cancellation'
        placeholder='Enter Cancellation Reason'
        />
      )}


 


   



      <SubmitButton isLoading={isLoading} className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`} >
        {btnlabel}
      </SubmitButton>
    </form>
  </Form>
  )
}

export default AppointmentForm 