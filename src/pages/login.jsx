import { useFormik } from 'formik'
import React from 'react'
import Input from '../component/input';
import * as Yup from "yup";
import { PublicInstance } from '../config/axios';
import { useNavigate } from 'react-router-dom';
import nookies from "nookies";
import toast from 'react-hot-toast';

export default function LoginPage() {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: new Yup.ObjectSchema({
            username: Yup.string().required(),
            password: Yup.string().required()
        }),
        onSubmit: (values) => {
            console.log(values);
            loginUser({
                user_name: values.username,
                password: values.password
            });
        }
    })

    const loginUser = async (payload) => {
        let res = await PublicInstance({
            url: "/auth/log-in",
            method: "POST",
            data: payload
        });
        console.log("--- ", res);
        if (res.data.success) {
            toast.success(res.data.message);
            nookies.set(null, `access_token`, res.data.access_token, { path: "/" });
            nookies.set(null, `refresh_token`, res.data.refresh_token, { path: "/" });
            formik.resetForm();
            navigate("/");
        } else {
            toast.error("Something Went Wrong While tryig login");
        }
    }

    return (
        <main className='bg-white min-h-screen w-screen flex items-center justify-center'>
            <section className="max-w-xs mx-auto w-full px-4">
                <img 
                src='/ccript-logo.png'
                alt='ccript'
                className='w-[150px] object-contain mx-auto'
            />
                <form onSubmit={formik.handleSubmit} className='w-full mt-10 space-y-6'>
                    <Input
                        label='Username'
                        name={"username"}
                        value={formik.values.username}
                        placeholder={"Enter Username"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && formik.errors.username ? formik.errors?.username : ""}
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
