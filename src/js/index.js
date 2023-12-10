import './utils/firebase';
import 'regenerator-runtime';

import '../scss/vendors-extensions/main.scss';

import * as bootstrap from 'bootstrap';
// import * as firebase from 'firebase/app';
import './components';
import Dashboard from './pages/dashboard';
import Add from './pages/add';
import Edit from './pages/edit';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import CheckUserAuth from './pages/auth/check-auth-user';

const routes = {
    '/': Dashboard,
    '/transactions/add.html': Add,
    '/transactions/edit.html': Edit,
    '/auth/login.html': Login,
    '/auth/register.html': Register
};

const detectRoute = () => routes[window.location.pathname];

const initPages = () => {
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');

    if (header && main && footer) {
        main.style.minHeight = `calc(100vh - ${header.clientHeight + footer.clientHeight}px)`;
    }
};

window.addEventListener('DOMContentLoaded', async () => {
    initPages();

    CheckUserAuth.checkLoginState(async () => {
        const route = detectRoute();
        await route.init();
    });
});