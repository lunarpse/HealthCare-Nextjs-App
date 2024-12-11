'use server'
import { ID, Query } from "node-appwrite"
import { databases } from "../appwrite.config"
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const createappointment=async(appointment:CreateAppointmentParams)=>{
    console.log("hereeeeeeee")
    try {
        const newappointment=await databases.createDocument(
            process.env.DATABSE as string,
            process.env.APPOINTMENT_COLLECTION_ID as string,
            ID.unique(),
            appointment
        )
        return parseStringify(newappointment);
    } catch (error) {
        console.log("An error occurred while creating a new appointment:", error)
    }
}


export const getappointment=async(appointmentid:string)=>{
    try {
        const appointment=await databases.getDocument(
            process.env.DATABSE as string,
            process.env.APPOINTMENT_COLLECTION_ID as string,
            appointmentid
        )
        return parseStringify(appointment)
    } catch (error) {
        console.log(`error while fetching appointment  ${error}`)
        
    }
}

export const getallappointments=async()=>{
    try {
        const appointments=await databases.listDocuments(
            process.env.DATABSE as string,
            process.env.APPOINTMENT_COLLECTION_ID as string,
            [
                Query.orderDesc('$createdAt')
            ]
        )

        const initialcounts={
            schedulecount:0,
            pendingcount:0,
            cancelledcount:0
        }

        const counts=(appointments.documents as Appointment[]).reduce((acc,appointment)=>{
            if(appointment.status==="scheduled"){
                acc.schedulecount+=1
            }
            else if(appointment.status==="pending"){
                acc.pendingcount+=1
            }
            else if(appointment.status==="cancelled"){
                acc.cancelledcount+=1
            }
            return acc;
        },initialcounts)

        const data={
            totalCount:appointments.total,
            documents:appointments.documents,
            ...counts
        }



        return parseStringify(data)
    } catch (error) {
        console.log(error)
    }
}


export const updateAppointment=async({
    appointmentId,
    userId,
    appointment,
    type,
  }: UpdateAppointmentParams)=>{

    try {
        const updateddoc=await databases.updateDocument(
            process.env.DATABSE as string,
            process.env.APPOINTMENT_COLLECTION_ID as string,
            appointmentId,
            appointment
        )
        if(!updateddoc){
            throw Error;
        }

        revalidatePath('/admin')
        return parseStringify(updateddoc)
    } catch (error) {
        console.error("An error occurred while scheduling an appointment:", error);
    }
}