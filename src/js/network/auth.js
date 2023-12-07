import axios from "axios";
import ApiEndPoint from '../config/api-endpoint';

const Auth = {
    async register({ name, email, password }) {
        return await axios.post(ApiEndPoint.REGISTER, { name, email, password });
    },

    async login({ email, password }) {
        return await axios.post(ApiEndPoint.LOGIN, { email, password });
    }
};

export default Auth;