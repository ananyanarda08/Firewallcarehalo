import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './UserReducer';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object({
    name: Yup.string()
        .required('Please input your name!'),
    email: Yup.string()
        .email('Please enter a valid email!')
        .required('Please input your email!')
});

const Create = () => {
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        dispatch(addUser({
            id: users[users.length - 1]?.id + 1 || 1,  
            name: values.name,
            email: values.email
        }));
        navigate('/main');
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2>Your details</h2>
            
            <Formik
                initialValues={{ name: '', email: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        
                        <div>
                            <label htmlFor="name">Name</label>
                            <Field 
                                name="name" 
                                placeholder="Your name" 
                            />
                            <ErrorMessage 
                                name="name" 
                                component="div" 
                                style={{ color: 'red' }} 
                            />
                        </div>

                      
                        <div>
                            <label htmlFor="email">Email</label>
                            <Field 
                                name="email" 
                                type="email" 
                                placeholder="Your email" 
                            />
                            <ErrorMessage 
                                name="email" 
                                component="div" 
                                style={{ color: 'red' }} 
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Create;
