import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { Navigate } from "react-router-dom";
import s from './LoginForm.module.css';

const LoginForm = () => {

    const initialValues = {
        email: '',
        password: '',
    };

    const dispatch = useDispatch();
    const isLogin = useSelector(selectIsLoggedIn);

    if (isLogin) {
        return <Navigate to="/" />
    }
    
    const FeedbackSchema = Yup.object().shape({
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
    
    const handleSubmit = (values, action) => {
        dispatch(logIn(values));
        action.resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={FeedbackSchema}
        >
            <Form>
                <div className={s.wrapInput}>
                    <Field
                        className={s.input}
                        type="email"
                        name="email"
                        placeholder="Email"
                    />
                    <ErrorMessage className={s.formError} name="email" component="span" />
                </div>
                <div className={s.wrapInput}>
                    <Field
                        className={s.input}
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                    <ErrorMessage className={s.formError}name="password" component="span"
                    />
                </div>
                <button type="submit" className={s.btnLog}> 
                    Login
                </button>
            </Form>
        </Formik>
    )
};

export default LoginForm;