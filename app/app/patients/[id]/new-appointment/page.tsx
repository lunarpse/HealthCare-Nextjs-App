import AppointmentForm from "@/components/Forms/Appointmentform";
import Appointmentform from "@/components/Forms/Appointmentform";
import PatientForm from "@/components/Forms/PatientForm";
import { getpatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";

export default async function Page({params:{id}}:SearchParamProps) {
  const userId=id;
  console.log(userId)
  const patient=await getpatient(userId)
  
  const patientId=patient.documents[0].$id;
  return (
    <div className="flex min-h-screen h-screen">
     
      <section className="remove-scrollbar container my-auto">
       
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image alt="patient" src='/assets/icons/logo-full.svgg'
          width={1000}
          height={1000}
           className="mb-12 h-10 w-fit"/>
           
           <AppointmentForm
           type="create"
           userId={userId}
           patientId={patientId}
           />
           
           

          
            <p className="justify-items-end text-dark-600 xl:text-left">
            © 2024 HealthCare
            </p>
           
        </div>
      </section>
      <Image src='/assets/images/appointment-img.png' alt="appointment" width={1000} height={1000} className="side-img max-w-[390px] bg-bottom"/>
    </div>
  )}