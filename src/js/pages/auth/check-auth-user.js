import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../utils/firebase';

// import Utils from "../../utils/utils";
// import Config from '../../config/config';

const CheckUserAuth = {
    // excludeRedirectPage: ['login.html', 'register.html'],

    // checkLoginState() {
    //     const userToken = Utils.getUserToken(Config.USER_TOKEN_KEY);
    //     const isUserSignedIn = Boolean(userToken);
    //     const isUserOnAuthPage = this._isUserOnAuthPage(this.excludeRedirectPage);


    //     if (isUserSignedIn) {
    //         if (isUserOnAuthPage) {
    //             window.location.href = '/';
    //         } else {
    //             this._showLoginMenuOrUserLogMenu(isUserSignedIn);
    //         }
    //     } else {
    //         if (!isUserOnAuthPage) {
    //             window.location.href = '/auth/login.html';
    //         }
    //     }
    // },
    excludeRedirectPage: ['login.html', 'register.html'],

    checkLoginState(finallyCallback) {
        if (typeof finallyCallback !== 'object') {
            if (typeof finallyCallback !== 'function') {
                throw new Error('Parameter finallyCallback should be a callback function');
            }
        }

        const isUserOnAuthPage = this._isUserOnAuthPage(this.excludeRedirectPage);

        onAuthStateChanged(auth, (user) => {
            const isUserSignedIn = Boolean(user);

            if (isUserSignedIn) {
                if (isUserOnAuthPage) {
                    window.location.href = '/';
                } else {
                    this._showLoginMenuOrUserLogMenu(isUserSignedIn);
                }
            } else {
                if (!isUserOnAuthPage) {
                    window.location.replace('/auth/login.html');
                }
            }

            finallyCallback();
        });
    },

    _showLoginMenuOrUserLogMenu(userLoginState) {
        const loginMenu = document.querySelector('#loginMenu');
        const userLoggedMenu = document.querySelector('#userLoggedMenu');

        if (!userLoginState) {
            loginMenu?.classList.add('d-block');
            userLoggedMenu?.classList.add('d-none');

            loginMenu?.classList.remove('d-none');
            userLoggedMenu?.classList.remove('d-block');

            return;
        }

        loginMenu?.classList.add('d-none');
        userLoggedMenu?.classList.add('d-block');

        loginMenu?.classList.remove('d-block');
        userLoggedMenu?.classList.remove('d-none');
    },

    _isUserOnAuthPage(pages) {
        const filteredPages = pages.filter((page) => window.location.pathname.endsWith(page));

        return Boolean(filteredPages.length);
    }
};

export default CheckUserAuth;