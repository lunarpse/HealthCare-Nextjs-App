import Statcard from '@/components/Statcard'
import { columns } from '@/components/table/Column'
import { Datatable } from '@/components/table/Datatable'
import { getallappointments } from '@/lib/actions/appointment.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AdminPage = async() => {
 const countdata=await getallappointments();

  return (
    <div className="mx-auto flex flex-col space-y-14 max-w-7xl">
        <header className="admin-header">
            <Link href="/" className='cursor-pointer'>
            <Image
            src="/assets/icons/logo-full.svg"
            alt='logo'
            width={162}
            height={32}
            className='h-8 w-fit'
            />

            </Link>
            <p className="text-16-semibold">Admin Dashboard</p>
        </header>
        <main className="admin-main">
            <section className="w-full space-y-4">
            <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
            </section>


            <section className="admin-stat">
                
                <Statcard
                //@ts-ignore
                type="appointments"
                count={countdata.schedulecount}
                label='Scheduled Appointments '
                icon={'/assets/icons/appointments.svg'}
                />
                <Statcard
                type='pending'
                count={countdata.pendingcount}
                label='Pending Appointments'
                icon={"/assets/icons/pending.svg"}
                />
                 <Statcard
            type="cancelled"
            count={countdata.cancelledcount}
            label="Cancelled Appointments"
            icon={"/assets/icons/cancelled.svg"}
          />

            </section>
            <Datatable columns={columns} data={countdata.documents}/>
        </main>
    </div>
  )
}

export default AdminPage