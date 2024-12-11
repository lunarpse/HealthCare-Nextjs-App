import { Appointment } from '@/types/appwrite.types';

import React, { useState } from 'react'
import { Button } from './ui/button';
import AppointmentForm from './Forms/Appointmentform';
import { DialogHeader , Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './ui/dialog';

const Appointmentmodal = ({
    patientId,
    userId,
    appointment,
    type,
  }: {
    patientId: string;
    userId: string;
    appointment?: Appointment;
    type: "schedule" | "cancel";
    title: string;
    description: string;
  }) => {
    const [open,setopen]=useState(false)
  return (
    <Dialog onOpenChange={setopen} open={open}>

        <DialogTrigger asChild>
            <Button
             variant="ghost"
             className={`capitalize ${type === "schedule" && "text-green-500"}`}
            >{type}</Button>
        </DialogTrigger>
        <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
          <DialogDescription>
            Please fill in the following details to {type} appointment
          </DialogDescription>
        </DialogHeader>

        <AppointmentForm
          userId={userId}
          patientId={patientId}
          type={type}
          appointment={appointment}
          setOpen={setopen}
        />
      </DialogContent>
    </Dialog>
  )
}

export default Appointmentmodal