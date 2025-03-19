import Navigation from "../Navigation/Navigation";
import UserMenu from '../UserMenu/UserMenu';
import AuthNav from '../AuthNav/AuthNav';
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import s from './AppBar.module.css';

const AppBar = () => {
    const isLogin = useSelector(selectIsLoggedIn);

    return (
        <nav className={s.nav}>
            <Navigation />
            {isLogin ? <UserMenu /> : <AuthNav />}
        </nav>
    )
};

export default AppBar;