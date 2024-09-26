import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Signup = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            fname: '',
            lname: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            fname: Yup.string().required('First name is required'),
            lname: Yup.string().required('Last name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const res = await createUserWithEmailAndPassword(auth, values.email, values.password);
                const user = res.user;

                await updateProfile(user, {
                    displayName: `${values.fname} ${values.lname}`
                });

                navigate('/main');
            } catch (error) {
                setErrors({ email: error.message });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="h-screen w-full flex justify-center items-center bg-gradient-to-r from-purple-600 to-purple-300">
            <div className="bg-white rounded-lg p-6 min-w-[400px]">
                <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
                
                <form onSubmit={formik.handleSubmit}>
                    {/* First Name Input */}
                    <div className="mb-4">
                        <label htmlFor="fname" className="block text-gray-700">First Name</label>
                        <input
                            type="text"
                            id="fname"
                            placeholder="Enter your First Name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fname}
                            className={`border rounded-md p-2 w-full ${formik.touched.fname && formik.errors.fname ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {formik.touched.fname && formik.errors.fname ? (
                            <p className="text-red-600 font-bold">{formik.errors.fname}</p>
                        ) : null}
                    </div>

                    {/* Last Name Input */}
                    <div className="mb-4">
                        <label htmlFor="lname" className="block text-gray-700">Last Name</label>
                        <input
                            type="text"
                            id="lname"
                            placeholder="Enter your Last Name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lname}
                            className={`border rounded-md p-2 w-full ${formik.touched.lname && formik.errors.lname ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {formik.touched.lname && formik.errors.lname ? (
                            <p className="text-red-600 font-bold">{formik.errors.lname}</p>
                        ) : null}
                    </div>

                    {/* Email Input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className={`border rounded-md p-2 w-full ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <p className="text-red-600 font-bold">{formik.errors.email}</p>
                        ) : null}
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className={`border rounded-md p-2 w-full ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <p className="text-red-600 font-bold">{formik.errors.password}</p>
                        ) : null}
                    </div>

                    <div className="flex flex-col gap-2.5">
                        <button
                            type="submit"
                            disabled={formik.isSubmitting}
                            className={`mt-3 bg-purple-600 text-white rounded-md py-2 px-4 font-bold text-lg w-full ${formik.isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'hover:bg-purple-700'}`}
                        >
                            Sign up
                        </button>
                        <p className="text-center">
                            Already have an account?{" "}
                            <span className="text-blue-600">
                                <Link to="/">login</Link>
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
