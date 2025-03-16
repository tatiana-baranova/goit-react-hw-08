import s from "./ContactsList.module.css"
import Contact from "../Contact/Contact"
import { useSelector } from "react-redux"
import { selectFilteredContacts } from '../../redux/selectors'

const ContactList = () => {
    const filterContactList = useSelector(selectFilteredContacts);
    return (
        <ul className={s.container}>
            {filterContactList.map(contact => (
                <li className={s.contactsList} key={contact.id}>
                    <Contact
                        id={contact.id}
                        name={contact.name}
                        number={contact.number} />
                </li>
            ))}
        </ul>
    )
}

export default ContactList;