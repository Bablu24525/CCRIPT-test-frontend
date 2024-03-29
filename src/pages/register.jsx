import { useFormik } from 'formik'
import React from 'react'
import Input from '../component/input';
import * as Yup from "yup";

export default function RegisterPage() {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: new Yup.ObjectSchema({
            email: Yup.string().email().required(),
            password: Yup.string().required()
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    })

    return (
        <main className='bg-white min-h-screen w-screen flex items-center justify-center'>
            <section className="max-w-xs mx-auto w-full px-4">
                {/* <img 
                src='/ccript-logo.png'
                alt='ccript'
                className='w-[150px] object-contain mx-auto'
            /> */}
                <form onSubmit={formik.handleSubmit} className='w-full mt-10 space-y-6'>
                    <Input
                        label='Email Address'
                        name={"email"}
                        type='email'
                        value={formik.values.email}
                        placeholder={"Enter Email Address"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && formik.errors.email ? formik.errors?.email : ""}
                    />
                    <Input
                        label='Password'
                        name={"password"}
                        type='password'
                        value={formik.values.password}
                        placeholder={"Enter Password"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && formik.errors.password ? formik.errors?.password : ""}
                    />

                    <button
                        type='submit'
                        className='bg-primary-500 text-white font-medium text-sm block w-full text-center px-6 py-2.5 rounded-lg'
                    >
                        Signin
                    </button>
                </form>

            </section>
        </main>
    )
}
