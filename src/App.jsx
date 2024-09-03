import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './Routes';
import AppPage from './components/AppPage';
import "./App.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from './components/Page.jsx/Loading'
import { getDetails } from './Services/ApiServices';
const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  useEffect(() => {
    setIsLoading(true)
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          const details = await getDetails(accessToken);
          setUserDetails(details);
        }
      } catch (err) {
        console.error('Failed to fetch user details', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
    setIsLoading(false)
  }, [])
  return (
    <div className='container bg-white dark:bg-gray-900 dark:text-white duration-200'>
      <Loading isLoading={isLoading}>
        {/* {error ? (
          <div>Error loading user data. Please try again later.</div>
        ) : ( */}
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page
              const Layout = route.isShowHeader ? AppPage : Fragment
              return (
                <Route key={route.path} path={route.path} element={
                  <Layout>
                    <Page />
                  </Layout>
                } />
              )
            })}
          </Routes>
        </Router>
        {/* )} */}
      </Loading>
    </div>
  )
}

export default App