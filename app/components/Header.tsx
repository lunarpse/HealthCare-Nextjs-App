import { cn } from '@/lib/utils'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='header'>
        <Link href="/" className='md:flex-1'>
        <Image src="/assets/icons/logo-full.svg" alt='Logo'
        height={32}
        width={120}
        className='hidden md:block'
        />
        <Image src='/assets/logo-icon.svg' alt='Logo' height={32} width={32} className='mr-2 md:hidden' />
         </Link>
         
    </div>
  )
}

export default Header