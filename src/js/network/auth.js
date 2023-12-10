// import axios from "axios";
// import ApiEndPoint from '../config/api-endpoint';

// const Auth = {
//     async register({ name, email, password }) {
//         return await axios.post(ApiEndPoint.REGISTER, { name, email, password });
//     },

//     async login({ email, password }) {
//         return await axios.post(ApiEndPoint.LOGIN, { email, password });
//     }
// };

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth';

import { auth } from '../utils/firebase.js';

const Auth = {
    async register({ email, password }) {
        return await createUserWithEmailAndPassword(auth, email, password);
    },

    async login({ email, password}) {
        return await signInWithEmailAndPassword(auth, email, password);
    },

    async logout() {
        return await signOut(auth);
    },

    async updateProfile(user, { displayName = null } = {}) {
        return await updateProfile(user, {
            displayName
        });
    }
};

export default Auth;