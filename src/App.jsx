import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { lazy, Suspense, useEffect } from 'react';
import { refreshUser } from './redux/auth/operations';
import { selectIsRefreshing } from './redux/auth/selectors';
import Loader from './components/Loader/Loader';
import './App.css'
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import RestrictedRoute from './components/RestrictedRoute/RestrictedRoute';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage/RegistrationPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const isRefreshing = useSelector(selectIsRefreshing);
  return isRefreshing ? (
    <Loader/>
  ) : (
      <Suspense>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<HomePage />}></Route>
            <Route
              path={"register"}
              element={
                <RestrictedRoute component={<RegistrationPage/>}
                  redirectTo="/contacts" />}>
            </Route>
            <Route path="login"
              element={
                <RestrictedRoute component={<LoginPage/>} redirectTo="/contacts" />}>
            </Route>
            <Route
              path="contacts"
              element={
                <PrivateRoute component={<ContactsPage/>} redirectTo="/login" />}>
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage/>}></Route>
        </Routes>
      </Suspense>
  )
}

export default App;
