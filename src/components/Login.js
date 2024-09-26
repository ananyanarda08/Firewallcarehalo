import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { auth } from '../Firebase'

const Login = () => {
  
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((res) => {
        const user = res;
        sessionStorage.setItem('authUser', JSON.stringify(user));
        window.location.href = "/main";
      })
      .catch((err) => {
        setErrors(err.message);
      })
      setSubmitting(false)
      // .finally(() => setSubmitting(false));
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gradient-to-r from-purple-600 to-purple-300">
      <div className="bg-white rounded-lg p-6 min-w-[400px]">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form className="flex flex-col gap-3">
              
             
              <div>
                <label htmlFor="email" className="block font-semibold">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="mt-1 p-2 border rounded-md w-full"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 font-bold mt-1"
                />
              </div>
             
              <div>
                <label htmlFor="password" className="block font-semibold">Password</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="mt-1 p-2 border rounded-md w-full"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 font-bold mt-1"
                />
              </div>

              {errors.general && <div className="text-red-600 font-bold mt-2">{errors.general}</div>}

          
              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-3 bg-purple-600 text-white rounded-md py-2 px-4 font-bold text-lg w-full ${
                  isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'hover:bg-purple-700'
                }`}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>

              <p className="text-center font-bold text-black mt-2">
                Don’t have an account?{" "}
                <span className="text-blue-600">
                  <Link to="/signup">Sign up</Link>
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;