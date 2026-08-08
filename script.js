import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";


/* =================================
   FIREBASE CONFIGURATION
================================= */

const firebaseConfig = {

    apiKey: "AIzaSyAbaiJswS_QUenyuAjhhAl5wn4PzImE0NQ",

    authDomain: "ajo-tracker-5588e.firebaseapp.com",

    projectId: "ajo-tracker-5588e",

    storageBucket: "ajo-tracker-5588e.firebasestorage.app",

    messagingSenderId: "73162480690",

    appId: "1:73162480690:web:c47cbf9b3fe8d22afd302b",

    measurementId: "G-1HXG6H3W4V"
};


/* =================================
   INITIALIZE FIREBASE
================================= */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


/* =================================
   HTML ELEMENTS
================================= */

const nameGroup =
    document.getElementById("nameGroup");

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const passwordToggle =
    document.getElementById("passwordToggle");

const authBtn =
    document.getElementById("authBtn");

const switchBtn =
    document.getElementById("switchBtn");

const switchText =
    document.getElementById("switchText");

const forgotPassword =
    document.getElementById("forgotPassword");

const message =
    document.getElementById("message");

const formEyebrow =
    document.getElementById("formEyebrow");

const formTitle =
    document.getElementById("formTitle");

const formDescription =
    document.getElementById("formDescription");


/* =================================
   APPLICATION STATE
================================= */

let isRegisterMode = false;


/* =================================
   MESSAGE FUNCTION
================================= */

function showMessage(text, type = "error") {

    message.textContent = text;

    message.className = `message ${type}`;

}


/* =================================
   CLEAR MESSAGE
================================= */

function clearMessage() {

    message.textContent = "";

    message.className = "message hidden";

}


/* =================================
   LOGIN / REGISTER MODE
================================= */

switchBtn.addEventListener("click", () => {

    isRegisterMode = !isRegisterMode;

    clearMessage();


    if (isRegisterMode) {

        nameGroup.classList.remove("hidden");

        formEyebrow.textContent =
            "GET STARTED";

        formTitle.textContent =
            "Create your account";

        formDescription.textContent =
            "Join your savings circles and start tracking contributions.";

        authBtn.textContent =
            "Create account";

        switchText.textContent =
            "Already have an account?";

        switchBtn.textContent =
            "Sign in";

        forgotPassword.classList.add("hidden");

    }

    else {

        nameGroup.classList.add("hidden");

        formEyebrow.textContent =
            "WELCOME BACK";

        formTitle.textContent =
            "Welcome back";

        formDescription.textContent =
            "Sign in to continue to your savings circles.";

        authBtn.textContent =
            "Sign in";

        switchText.textContent =
            "Don't have an account?";

        switchBtn.textContent =
            "Create account";

        forgotPassword.classList.remove("hidden");

    }

});


/* =================================
   PASSWORD VISIBILITY
================================= */

passwordToggle.addEventListener("click", () => {

    const isPassword =
        passwordInput.type === "password";

    passwordInput.type =
        isPassword ? "text" : "password";

    passwordToggle.textContent =
        isPassword ? "🙈" : "👁";

});


/* =================================
   AUTH BUTTON
================================= */

authBtn.addEventListener("click", async () => {

    clearMessage();


    const name =
        nameInput.value.trim();

    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value;


    /* ===============================
       VALIDATION
    =============================== */

    if (isRegisterMode && !name) {

        showMessage(
            "Please enter your full name."
        );

        return;
    }


    if (!email) {

        showMessage(
            "Please enter your email address."
        );

        return;
    }


    if (!password) {

        showMessage(
            "Please enter your password."
        );

        return;
    }


    if (password.length < 6) {

        showMessage(
            "Password must be at least 6 characters."
        );

        return;
    }


    /* ===============================
       LOADING
    =============================== */

    authBtn.disabled = true;

    authBtn.textContent =
        isRegisterMode
            ? "Creating account..."
            : "Signing in...";


    try {


        /* ===========================
           REGISTER
        =========================== */

        if (isRegisterMode) {

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            const user =
                userCredential.user;


            /* ===========================
               SAVE USER PROFILE
            =========================== */

            await setDoc(
                doc(db, "users", user.uid),
                {

                    uid: user.uid,

                    name: name,

                    email: user.email,

                    createdAt: serverTimestamp(),

                    avatarUrl: ""

                }
            );


            showMessage(
                "Account created successfully!",
                "success"
            );

        }


        /* ===========================
           LOGIN
        =========================== */

        else {

            const userCredential =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            showMessage(
                "Account created successfully!",
                "success"
            );

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 800);

        }

    }


    /* ===============================
       ERROR HANDLING
    =============================== */

    catch (error) {

        console.error(
            "Firebase Authentication Error:",
            error
        );


        switch (error.code) {


            case "auth/email-already-in-use":

                showMessage(
                    "An account already exists with this email."
                );

                break;


            case "auth/invalid-email":

                showMessage(
                    "Please enter a valid email address."
                );

                break;


            case "auth/invalid-credential":

                showMessage(
                    "Incorrect email or password."
                );

                break;


            case "auth/user-not-found":

                showMessage(
                    "No account was found with this email."
                );

                break;


            case "auth/wrong-password":

                showMessage(
                    "Incorrect password."
                );

                break;


            case "auth/too-many-requests":

                showMessage(
                    "Too many attempts. Please try again later."
                );

                break;


            case "auth/network-request-failed":

                showMessage(
                    "Network error. Check your internet connection."
                );

                break;


            default:

                showMessage(
                    error.message
                );

        }

    }


    /* ===============================
       RESTORE BUTTON
    =============================== */

    finally {

        authBtn.disabled = false;

        authBtn.textContent =
            isRegisterMode
                ? "Create account"
                : "Sign in";

    }

});


/* =================================
   FORGOT PASSWORD
================================= */

forgotPassword.addEventListener("click", async () => {

    clearMessage();


    const email =
        emailInput.value.trim();


    if (!email) {

        showMessage(
            "Enter your email address first."
        );

        emailInput.focus();

        return;
    }


    try {

        await sendPasswordResetEmail(
            auth,
            email
        );


        showMessage(
            "Password reset email sent. Check your inbox.",
            "success"
        );

    }


    catch (error) {

        console.error(error);

        showMessage(
            "Unable to send the password reset email."
        );

    }

});


/* =================================
   AUTH STATE
================================= */

onAuthStateChanged(
    auth,
    (user) => {

        if (user) {

            console.log(
                "Currently signed in:",
                user.email
            );

        }

        else {

            console.log(
                "No user is currently signed in."
            );

        }

    }
);
