import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import s from "./ContactForm.module.css"
// import { nanoid } from 'nanoid'
import { useDispatch } from 'react-redux';
import { addContact} from '../../redux/contactsOps'
import { useState } from 'react';
import Loader from '../Loader/Loader'

const validationSchema = Yup.object({
    name: Yup.string()
    .min(3, 'Name is too short!')
    .max(15, 'Name is too long!')
    .required('Name is required'),

    number: Yup.string()
    .max(12, 'Number is too long!')
    .required('Number is required'),
});

// const validationSchema = Yup.object({
//         name: Yup.string().min(3, 'Too Short!').max(15, 'Too Long!').required('Required'),
//         number: Yup.string().min(3, 'Too Short!').max(15, 'Too Long!').required('Required'),
//     });


const ContactForm = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [isValidated, setIsValidated] = useState(false);
    const initialValues = {
        name: '',
        number: '',
        // id: nanoid()
    };
    
    const dispatch = useDispatch();

    const handleSubmit = (values, { resetForm }) => {
        setIsClicked(true);
        dispatch(addContact(values))
            .unwrap()
            .then(() => {
                setTimeout(() => {
                    setIsClicked(false);
                    setIsValidated(true);
                    resetForm();
                    setTimeout(() => {
                        setIsValidated(false);
                    }, 2000);
                }, 2000);
            })
        .catch(() => setIsClicked(false));
    }


    return (
        <Formik 
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit} 
        >
            <Form className={s.container}>
                <div className={s.form}>
                    <label className={s.label} htmlFor='name'>Name</label>
                    <Field id="name" name="name" type="text" className={ s.input} />
                <ErrorMessage name="name" component="div" className={s.error} />
                </div>

                <div className={s.form}>
                    <label className={s.label} htmlFor="number">Number</label>
                <Field id="number" name="number" type="tel" placeholder="xxx-xx-xx" className={ s.input} />
                <ErrorMessage name="number" component="div" className={s.error} />
                </div>
                
                <button type="submit" className={s.btn} disabled={isClicked}>
                    {isClicked ? <Loader/> : "Add Contact"}
                </button>
            </Form>
        </Formik>
    )

}
export default ContactForm;