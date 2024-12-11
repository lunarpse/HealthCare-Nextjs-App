'use client';
import { Appointment } from "@/types/appwrite.types";
import { ColumnDef } from "@tanstack/react-table";
import Statusbadge from "../Statusbadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";
import Image from "next/image";
import Appointmentmodal from "../Appointmentmodal";

export const columns:ColumnDef<Appointment>[]=[
{
    header:"#",
    cell:({row})=>{
        return <p className="text-14-medium">{row.index+1}</p>
    }
},
{
    accessorKey:"patient",
    header:"Patient",
    cell:({row})=>{

        return <p className="text-14-medium">{row.original.patient.name}</p>
    }
},
{
    accessorKey:"status",
    header:"Status",
    cell:({row})=>{
        const status=row.original.status;
        return (
            <div className="min-w-[115px]">
                <Statusbadge status={status}/>
            </div>
        )
    }
},
{
    accessorKey:"schedule",
    header:"Appointment Date",
    cell:({row})=>{
        const date=row.original.schedule
        return (
            <p className="text-14-regular min-w-[100px]">
                {formatDateTime(date).dateTime}
            </p>
        )
    }
},

{
    accessorKey:"primaryPhysician",
    header:"Doctor",
    cell:({row})=>{
        const name=row.original.primaryPhysician;
        const doctor=Doctors.find(doctor=>doctor.name===name);
        return (
            <div className="flex gap-3 items-center">
                <Image
                src={doctor?.image!}
                width={100}
                height={100}
                alt="doctor"
                className="size-8"
                />
                <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
            </div>
        )

    }
},

{
    id:"actions",
    header:()=><div className="pl-4">Actions</div>,
    cell:({row})=>{
        const data=row.original;
        return (
            <div className="flex gap-1">
                <Appointmentmodal
                type="schedule"
                patientId={data.patient.$id}
                userId={data.userId}
                appointment={data}
                title="Schedule Appointment"
                description="Please confirm the following details to schedule."
                
                />


                <Appointmentmodal
                type="cancel"
                patientId={data.patient.$id}
                userId={data.userId}
                appointment={data}
                   title="Cancel Appointment"
            description="Are you sure you want to cancel your appointment?"
                />
            </div>
        )
    }
}
]