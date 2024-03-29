import React from 'react'

export default function Input({
    containerClass,
    label="", 
    labelClass, 
    inputClass,
    type="text", 
    value="", 
    name="", 
    onChange, 
    onBlur, 
    placeholder,
    error,
    otherProps
}) {
  return (
    <div className={`flex flex-col gap-2 w-full ${containerClass}`}>
        <label className={`${labelClass}`}>{label}</label>
        <input 
           type={type} 
           value={value}
           name={name}
           onChange={onChange}
           onBlur={onBlur}
           className={`border-b-2 w-full p-2 focus-within:outline-none focus-within:shadow-inner text-sm ${inputClass} ${error ? "border-b-red-500 focus:shadow-red-500" : "border-b-primary-500 focus:shadow-green-500"}`}
           placeholder={placeholder}
           {...otherProps}
        />
    </div>
  )
}
