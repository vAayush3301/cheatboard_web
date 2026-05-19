import { auth }
from "./firebase.js";

import {
    requireAuth
}
from "./auth-guard.js";

import {
    onAuthStateChanged,
    signOut
} from "firebase/auth";

requireAuth(async (user) => {

    console.log(user.email);
});

const nameElement =
    document.getElementById("name");

const logoutBtn =
    document.getElementById("logoutBtn");


onAuthStateChanged(
    auth,

    async (user) => {

        if (!user) {
            window.location.href =
                "/";

            return;
        }

        try {
            const token =
                await user.getIdToken();

            const response =
                await fetch(
                    "https://blink-g8w4.onrender.com/users/me",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            const data =
                await response.json();

            nameElement.textContent =
                data.name;

        } catch (error) {

            console.error(error);
        }
    }
);

logoutBtn.addEventListener(
    "click",

    async () => {

        await signOut(auth);

        window.location.href =
            "/";
    }
);

const data = [
    {
        title: "Blink Chat",
        subtitle: "Realtime messaging app",
        meta: "Updated 2 min ago"
    },
    {
        title: "Task Manager",
        subtitle: "Organize daily tasks",
        meta: "Pending sync"
    },
    {
        title: "Weather App",
        subtitle: "Live weather data",
        meta: "Stable build"
    }
];

const itemList = document.getElementById("itemList");

data.forEach(item => {

    const li = document.createElement("li");
    li.className = "list-item";

    li.innerHTML = `
        <div class="title">${item.title}</div>

        <div class="subtitle">
            <div class="message">${item.subtitle}</div>
            <div class="meta">${item.meta}</div>
        </div>
    `;

    itemList.appendChild(li);
});