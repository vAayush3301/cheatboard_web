import { auth } from "./firebase.js";
import { redirectIfLoggedIn } from "./auth-guard.js";

import {
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";

redirectIfLoggedIn();

/* -----------------------------
   Google Authentication
----------------------------- */

const provider = new GoogleAuthProvider();

const loginBtn = document.getElementById("loginBtn");

loginBtn?.addEventListener("click", async () => {

    try {

        const result = await signInWithPopup(
            auth,
            provider
        );

        const user = result.user;

        const token = await user.getIdToken();

        const response = await fetch(
            "https://blink-g8w4.onrender.com/users/me",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!response.ok) {
            throw new Error("Backend auth failed");
        }

        window.location.reload();

    } catch (error) {
        console.error(error);
    }

});

/* -----------------------------
   Retrieve Dialog
----------------------------- */

const SAMPLE_CODE = "AB1234";

const retrieveBtn = document.getElementById("retrieveBtn");
const dialog = document.getElementById("retrieveDialog");

const cancelBtn = document.getElementById("cancelBtn");
const retrieveCodeBtn = document.getElementById("retrieveCodeBtn");

const shareCodeInput = document.getElementById("shareCode");

const resultSection = document.getElementById("resultSection");
const retrievedText = document.getElementById("retrievedText");

const copyBtn = document.getElementById("copyBtn");

retrieveBtn?.addEventListener("click", () => {

    shareCodeInput.value = "";

    resultSection.hidden = true;
    retrievedText.value = "";

    dialog.showModal();

    setTimeout(() => shareCodeInput.focus(), 50);

});


cancelBtn?.addEventListener("click", () => {

    dialog.close();

});


shareCodeInput?.addEventListener("input", () => {

    shareCodeInput.value = shareCodeInput.value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .slice(0, 6);

});


shareCodeInput?.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        retrieveCodeBtn.click();
    }

});


retrieveCodeBtn?.addEventListener("click", async () => {

    const code = shareCodeInput.value.trim();

    if (!/^[A-Z]{2}\d{4}$/.test(code)) {

        alert("Share code must be in the format AB1234.");
        return;

    }

    if (code !== SAMPLE_CODE) {

        alert("Share code not found.");
        return;

    }

    // Later this section will fetch from Firebase RTDB.

    retrievedText.value =
            `🎉 Congratulations!

            You successfully retrieved the sample message.

            Share Code: AB1234

            This is where your shared text will appear once Firebase is connected.

            For now, this is just placeholder content.`;

    resultSection.hidden = false;

});


dialog?.addEventListener("cancel", (event) => {

    event.preventDefault();
    dialog.close();

});

copyBtn?.addEventListener("click", async () => {

    try {

        await navigator.clipboard.writeText(
            retrievedText.value
        );

        copyBtn.textContent = "✓ Copied";

        setTimeout(() => {

            copyBtn.textContent = "📋 Copy";

        }, 1500);

    } catch (error) {

        retrievedText.select();
        document.execCommand("copy");

    }

});