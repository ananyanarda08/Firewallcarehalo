import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './UserReducer';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Define validation schema using Yup
const validationSchema = Yup.object({
    name: Yup.string()
        .required('Please input your name!'),
    email: Yup.string()
        .email('Please enter a valid email!')
        .required('Please input your email!')
});

const Update = () => {
    const { id } = useParams();
    const users = useSelector((state) => state.users);
    const user = users.find(a => a.id === Number(id));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        dispatch(updateUser({
            id: Number(id),
            name: values.name,
            email: values.email
        }));
        navigate('/main');
    };

    return (
        // <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div>
            <h2>Edit here</h2>
            
            <Formik
                initialValues={{ name: user.name, email: user.email }}
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

export default Update;
