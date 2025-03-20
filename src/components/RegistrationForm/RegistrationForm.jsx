import { Field, Form, Formik, ErrorMessage} from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/auth/operations';
import * as Yup from 'yup';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { Navigate } from 'react-router-dom';
import s from './RegistrationForm.module.css';

const RegistrationForm = () => {
    const initialValues = {
        name: '',
        email: '',
        password: '',
    };
    const dispatch = useDispatch();
    const isLogin = useSelector(selectIsLoggedIn);

    if (isLogin) {
        return <Navigate to="/" />;
    }
    const handleSubmit = (values, action) => {
        dispatch(register(values));
        action.resetForm();
    };

    const FeedbackSchema = Yup.object().shape({
        name: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('Required'),
        email: Yup.string()
            .email('Must be a valid email!')
            .required('Required'),
        password: Yup.string()
            .min(4, 'Password must be at least 4 characters long')
            .matches(/.*[a-z].*/, 'Password must contain at least 1 lowercase letter')
            .matches(/.*\d.*/, 'Password must contain at least 1 number')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least 1 special character')
            .required('Required'),
    })

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={FeedbackSchema}
        >
            <Form className={s.form}>
                <div className={s.inputWrap}>
                <Field
                    className={s.input}
                    type="text"
                    name="name"
                    placeholder="Name"
                    />
                    <ErrorMessage className={s.formError} name="name" component="span" />
                </div>
                <div className={s.inputWrap}>
                    <Field
                        className={s.input}
                        type="email"
                        name="email"
                        placeholder="Email"
                    />
                    <ErrorMessage className={s.formError} name="email" component="span" />
                    </div>
                    <div className={s.inputWrap}>
                    <Field
                        className={s.input}
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                    <ErrorMessage className={s.formError} name="password" component="span" />
                </div>
                <button className={s.btn} type="submit">
                    Register
                </button>
            </Form>
        </Formik>
    )

}

export default RegistrationForm;