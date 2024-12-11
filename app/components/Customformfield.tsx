import React from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control } from 'react-hook-form'
import { Formfieldtype } from './Forms/PatientForm'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from "libphonenumber-js/core";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Select ,SelectContent, SelectTrigger, SelectValue} from './ui/select'
import { Textarea } from './ui/textarea'
import { Checkbox } from './ui/checkbox'

interface CustomProps{control:Control<any>,name:string,label:string,fieldType:Formfieldtype,placeholder?:string,iconSrc?:string,iconAlt?:string,disabled?:boolean,dateFormat?:string,
    showTimeSelect?:boolean,children?:React.ReactNode,
    renderSkeleton?:(field:any)=>React.ReactNode}

const RenderField=({field,props}:{field:any,props:CustomProps})=>{
    const {control,fieldType,name,label,renderSkeleton,placeholder,iconAlt,iconSrc,showTimeSelect,dateFormat}=props;
    switch(props.fieldType){
        case Formfieldtype.INPUT:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {props.iconSrc && (
                        <Image src={props.iconSrc} alt={props.iconAlt ||'Icon'}
                        width={24}
                        height={24}
                        className='ml-2'
                        />
                    )}
                    <FormControl>
                        <Input {...field} className='shad-input border-0' 
                        placeholder={props.placeholder}
                        />
                    </FormControl>
                </div>
            )
        case Formfieldtype.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput
                    defaultCountry='IN'
                    value={field.value as E164Number | undefined}
                    placeholder={placeholder}
                   international
                   withCountryCallingCode
                   
                    onChange={field.onChange} 
                    className='input-phone' />
                </FormControl>
            )
        case Formfieldtype.DATE_PICKER:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    <Image 
                    className='ml-2'
                    alt='calendar'
                    src='/assets/icons/calendar.svg'
                    width={24}
                    height={24}
                    />
                    <FormControl>
                        <DatePicker
                        selected={field.value}
                        onChange={date=>field.onChange(date)}
                        timeInputLabel="Time:"
                        dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
                        wrapperClassName="date-picker"
                        showTimeSelect={showTimeSelect ?? false}
                        />
                    </FormControl>
                </div>
            )
        case Formfieldtype.SKELETON:
            return renderSkeleton?renderSkeleton(field):null;
        
        case Formfieldtype.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl >
                            <SelectTrigger className='shad-select-trigger'>
                                <SelectValue placeholder={props.placeholder}/>
                            </SelectTrigger>
                            
                        </FormControl>
                        <SelectContent className='shad-select-content'>
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>                                                                                   
            )
        case Formfieldtype.TEXTAREA:
            return (
                <FormControl>
                    <Textarea
                    placeholder={placeholder}
                    {...field}
                    className='shad-textArea'
                    disabled={props.disabled}
                    />

                </FormControl>
            )
        case Formfieldtype.CHECKBOX:
            return (
                <FormControl>
                    <div className="flex items-center gap-4">
                        <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id={props.name}
                        />
                        <label htmlFor={props.name} className="checkbox-label">
                            {props.label}
                        </label>
                    </div>
                </FormControl>
            )
        }
}

const Customformfield = (props:CustomProps) => {
    const {control,fieldType,name,label}=props;
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className='flex-1'>
        {fieldType!==Formfieldtype.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
        )}
        <RenderField field={field} props={props} />
        <FormMessage className='shad-error' />
       
       
      </FormItem>
    )}
  />
  )
}

export default Customformfield