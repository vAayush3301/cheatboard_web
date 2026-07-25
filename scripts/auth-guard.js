import { auth }
from "./firebase.js";

import {
    onAuthStateChanged
} from "firebase/auth";


export function requireAuth(callback) {

    onAuthStateChanged(
        auth,

        async (user) => {

            if (!user) {

                window.location.href = "/";
                return;
            }

            callback(user);
        }
    );
}