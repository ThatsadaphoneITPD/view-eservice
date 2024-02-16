"use client"
import React from 'react'
import { FormInterview } from './form-interview'
import { RegisterEVList } from './form-interview/register-user'

interface Props {

}

const page = (props: Props) => {
    return (
        <div className="px-2 pt-2 flex flex-col items-center relative md:mx-auto h-full">
            {/* <FormInterview /> */}
            <RegisterEVList />
        </div>
    )
}
export default page