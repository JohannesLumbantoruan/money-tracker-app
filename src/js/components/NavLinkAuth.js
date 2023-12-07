import { html } from "lit";
import LitWithoutShadowDom from "./base/LitWithoutShadowDom";
import Utils from '../utils/utils';
import Config from '../config/config';
import CheckUserAuth from '../pages/auth/check-auth-user';

class NavLinkAuth extends LitWithoutShadowDom {
    render() {
        return html`
            <li class="nav-item dropdown">
                <a
                    href="#"
                    class="nav-link dropdown-toggletext-nowrap"
                    role="button"
                    data-bs-toggle="dropdown"
                >
                    <div class="me-2 d-inline-block">
                        <img
                            src="https://ui-avatars.com/api/?name=User%20Namebackground=random"
                            alt="User Name"
                            id="imgUserLogged"
                            style="width: 30px; height: 30px"
                            class="img-fluid rounded-pill"
                        >
                    </div>
                    <span id="nameUserLogged"></span>
                </a>
                <ul class="dropdown-menu">
                    <a href="" class="dropdown-item" id="userLogOut" @click=${this._userLogOut}>
                        Log Out
                    </a>
                </ul>
            </li>
        `;
    }

    _userLogOut(event) {
        event.preventDefault();
        Utils.destroyUserToken(Config.USER_TOKEN_KEY);

        CheckUserAuth.checkLoginState();
    }}

customElements.define('nav-link-auth', NavLinkAuth);