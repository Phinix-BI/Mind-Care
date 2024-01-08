export const checkUserToken = () => {
    const userToken = localStorage.getItem('token');
    return userToken && userToken !== 'undefined';
};

export const setLoginStatus = (setIsLoggedIn) => {
    const status = checkUserToken();
    setIsLoggedIn(status);
};