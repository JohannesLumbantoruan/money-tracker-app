import Auth from "../../network/auth";
import CheckUserAuth from "./check-auth-user";

const Register = {
    async init() {
        // CheckUserAuth.checkLoginState();
        
        this._initialListener();
    },

    _initialListener() {
        const registerForm = document.querySelector('#registerForm');

        registerForm.addEventListener(
            'submit',
            async (event) => {
                event.preventDefault();
                event.stopPropagation();

                registerForm.classList.add('was-validated');
                await this._getRegistered();
            },
            false
        );
    },

    async _getRegistered() {
        const formData = this._getFormData();

        if (this._validateFormData(formData)) {
            console.log('formData');
            console.log(formData);

            try {
                const response = await Auth.register({
                    email: formData.email,
                    password: formData.password
                });

                await Auth.updateProfile(response.user, {
                    displayName: formData.name
                });

                sessionStorage.register = JSON.stringify(response);

                this._goToLogInPage();
            } catch (error) {
                console.error(error);
            }
        }
    },

    _getFormData() {
        const name = document.querySelector('#validationCustomRecordName');
        const email = document.querySelector('#validationCustomEmail');
        const password = document.querySelector('#validationCustomPassword');

        return {
            name: name.value,
            email: email.value,
            password: password.value
        };
    },

    _validateFormData(formData) {
        const formDataFiltered = Object.values(formData).filter((item) => item === '');

        return formDataFiltered.length === 0;
    },

    _goToLogInPage() {
        window.location.href = '/auth/login.html';
    }
};

export default Register;