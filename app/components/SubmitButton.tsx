import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
interface props{
    isLoading:boolean,
    className?:string,
    children:React.ReactNode
}
const SubmitButton = ({isLoading,className,children}:props) => {
  return (
    <Button type='submit' disabled={isLoading} className={className?? 'shad-primary-btn w-full'}>
        {isLoading?(
            <div className="flex items-center gap-4">
                <Image
                alt='button'
                src='/assets/icons/loader.svg'
                width={24}
                height={24}
                  className="animate-spin"
                />
                Loading ...
            </div>
        ):(
            children
        )}
    </Button>
  )
}

export default SubmitButton