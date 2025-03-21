import s from './HomePage.module.css';

const HomePage = () => {
    return (
        <div className={s.wrap}>
            <h1 className={s.title}>Welcome to Phonebook</h1>
            <p className={s.text}>This application provides the ability to conveniently manage your
        contacts and have access to your phone book.</p>
        </div>
    )
}
export default HomePage;