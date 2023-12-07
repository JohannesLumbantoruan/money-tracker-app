import Auth from "../../network/auth";
import CheckUserAuth from "./check-auth-user";
import Utils from "../../utils/utils";
import Config from "../../config/config";

const Login = {
    async init() {
        CheckUserAuth.checkLoginState();

        this._initialListener();
    },

    _initialListener() {
        const loginForm = document.querySelector('#loginForm');

        loginForm.addEventListener(
            'submit',
            async (event) => {
                event.preventDefault();
                event.stopPropagation();

                loginForm.classList.add('was-validated');

                await this._getLogged();
            },
            false
        );
    },

    async _getLogged() {
        const formData = this._getFormData();

        if (this._validateFormData({ ...formData })) {
            console.log('formData');
            console.log(formData);

            try {
                const response = await Auth.login({
                    email: formData.email,
                    password: formData.password
                });

                Utils.setUserToken(Config.USER_TOKEN_KEY, response.data.results.token);

                sessionStorage.response = JSON.stringify(response.data);

                this._goToDashboardPage();
            } catch (error) {
                const { status } = error.response;

                console.error(status);

                if (status === 401) {
                    const alert = document.createElement('div');
                    alert.classList.add('alert', 'alert-danger', 'text-center', 'alert-dismissible', 'fade', 'show');
                    alert.setAttribute('role', 'alert');
                    alert.innerHTML = 'Wrong credentials <button class="btn-close" data-bs-dismiss="alert"></button>';

                    const parent = document.querySelector('#loginForm').parentElement;
                    parent.insertBefore(alert, parent.children[0]);
                }

                return;
            }
        }
    },

    _getFormData() {
        const email = document.querySelector('#validationCustomRecordEmail');
        const password = document.querySelector('#validationCustomPassword');

        return {
            email: email.value,
            password: password.value
        };
    },

    _validateFormData(formData) {
        const formDataFiltered = Object.values(formData).filter((item) => item === '');

        return formDataFiltered.length === 0;
    },

    _goToDashboardPage() {
        window.location.href = '/';
    }
};

export default Login;