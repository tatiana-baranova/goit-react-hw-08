import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../../components/Loader/Loader';
import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import SearchBox from '../../components/SearchBox/SearchBox';
import { fetchContacts } from "../../redux/contacts/operations";
import { selectError, selectLoading } from "../../redux/contacts/selectors";
import s from './ContactsPage.module.css'

const ContactsPage = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectLoading);
    const isError = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <div className={s.wrapper}>
            <h1 className={s.title}>Phonebook</h1>
            <ContactForm />
            <SearchBox />
            {isLoading && !isError && <Loader />}
            <ContactList/>
        </div>
    )
};

export default ContactsPage;