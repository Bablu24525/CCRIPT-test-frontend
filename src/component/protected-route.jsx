import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuth, setIsAuth] = useState(false);
    const _token = parseCookies();


    useEffect(() => {
        if (!_token["access_token"]) {
            setIsAuth(false);
            navigate("/login");
        } else {
            setIsAuth(true);
        }
    }, [_token, location.pathname]);

    if (isAuth) {
        return (
            <>
                {children}
            </>
        )
    } else {
        return (
            <p className='text-center h-screen w-screen flex items-center justify-center'>Loading...</p>
        )
    }

}
