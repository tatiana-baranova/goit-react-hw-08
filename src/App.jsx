import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import ContactForm from './components/ContactForm/ContactForm'
import ContactList from './components/ContactList/ContactList'
import SearchBox from './components/SearchBox/SearchBox'
import { useEffect } from 'react'
import { fetchContacts } from './redux/contactsOps'
import { selectLoading, selectError} from './redux/selectors'
function App() {

  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <h1 className="title">Phonebook</h1>
        <ContactForm/>
        <SearchBox />
        <ContactList/>
      </div>
    </>
  )
}

export default App
