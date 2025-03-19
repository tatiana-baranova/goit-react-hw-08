import { Link, useLocation } from "react-router-dom";
import s from './NotFoundPage.module.css'
const NotFoundPage = () => {
    const location = useLocation();
    const backLink = location.state?.from ?? '/';
    return (
        <>
            <h1 className={s.title}> Not Found Page</h1>
            <Link to={backLink}>Go Back</Link>
        </>
    )
};

export default NotFoundPage;