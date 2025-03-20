import { Link } from "react-router-dom";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import s from './RegistrationPage.module.css'

const RegistrationPage = () => {
    return (
        <div className={s.wrap}>
            <p className={s.text}>
                Your data is safe with us. We value your privacy. Please fill out the
                form below to register for Phonebook.
            </p>
            <RegistrationForm />

        </div>
    )
};

export default RegistrationPage;