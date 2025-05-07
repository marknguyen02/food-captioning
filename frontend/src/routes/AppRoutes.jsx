import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser, deleteState } from "../redux/appSlice";
import { readUser, logout, refresh } from '../services/authService';
import UserRoutes from './UserRoutes';
import IntroRoutes from './IntroRoutes';
import AdminRoutes from './AdminRoutes';
import Loader from "../components/Loader";

function AppRoutes() {
    const user = useSelector((state) => state.app.user);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [authChecked, setAuthChecked] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await logout();
            localStorage.removeItem('at');
            localStorage.removeItem('hasLoggedIn');
            dispatch(deleteState());
            navigate('/');
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefresh = async () => {
        try {
            setIsLoading(true);
            const accessToken = await refresh();
            localStorage.setItem("at", accessToken);
            localStorage.setItem("hasLoggedIn", "true");
            const userData = await readUser(accessToken);
            dispatch(setUser(userData));
            return true;
        } catch (err) {
            console.error(err);
            if (localStorage.getItem("hasLoggedIn")) {
                await handleLogout();
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const loadUserData = async () => {
        try {
            setIsLoading(true);
            const accessToken = localStorage.getItem('at');
            const hasLoggedIn = localStorage.getItem('hasLoggedIn');
            
            if (accessToken) {
                try {
                    const userInfo = await readUser(accessToken);
                    dispatch(setUser(userInfo));
                    localStorage.setItem("hasLoggedIn", "true");
                } catch (error) {
                    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                        if (hasLoggedIn) {
                            await handleRefresh();
                        } else {
                            localStorage.removeItem('at');
                        }
                    } else {
                        throw error;
                    }
                }
            } else if (hasLoggedIn) {
                await handleRefresh();
            }
        } catch (err) {
            console.error("Error loading user data:", err);
            if (localStorage.getItem("hasLoggedIn")) {
                await handleLogout();
            }
        } finally {
            setIsLoading(false);
            setAuthChecked(true);
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (localStorage.getItem("at") && localStorage.getItem("hasLoggedIn")) {
                handleRefresh();
            }
        }, 30 * 60 * 1000);
        
        return () => clearInterval(intervalId);
    }, []);

    if (isLoading && !authChecked) {
        return <Loader />;
    }

    if (user) {
        return user.role === 'admin' ? <AdminRoutes /> : <UserRoutes />;
    } else {
        return <IntroRoutes />;
    }
}

export default AppRoutes;