import React from 'react';
import router from 'umi/router';

export const ThemeContext = React.createContext({
    theme: 'dark',
    toggleTheme: () => { }
});
/**
 * 获取theme:
 * const theme = useContext(ThemeContext);
 */

export const AuthorizationContext = React.createContext({
    isLogin: false,
    goLoginPage: () => {
        router.push("/home")
    }
});