// /hooks/useAuth.ts
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/authSlice';
import { useMemo } from 'react';

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const { user, isAppLoading, token } = useAppSelector((state: { auth: any }) => state.auth);

    const authState = useMemo(() => {
        const role = user?.role ?? null;
        const isAuthenticated = !!user && !!token;

        return {
            role,
            isAuthenticated,
        };
    }, [user, token]);

    const handleLogout = () => {
        dispatch(logout());
    };

    return {
        user,
        token,
        isAppLoading,
        logout: handleLogout,
        ...authState,
    };
};
