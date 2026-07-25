const retrieveBtn = document.getElementById("retrieveBtn");
const dialog = document.getElementById("retrieveDialog");

const retrieveForm = document.getElementById("retrieveForm");
const retrieveSuccess = document.getElementById("retrieveSuccess");

const cancelBtn = document.getElementById("cancelBtn");
const retrieveCodeBtn = document.getElementById("retrieveCodeBtn");
const closeRetrieveBtn = document.getElementById("closeRetrieveBtn");

const shareCodeInput = document.getElementById("shareCode");

const retrievedText = document.getElementById("retrievedText");
const copyBtn = document.getElementById("copyBtn");

const expiryCountdown = document.getElementById("expiryCountdown");
const expiryDate = document.getElementById("expiryDate");

let expiryInterval = null;

const uploadBtn = document.getElementById("uploadBtn");
const uploadDialog = document.getElementById("uploadDialog");

const uploadForm = document.getElementById("uploadForm");
const uploadSuccess = document.getElementById("uploadSuccess");

const uploadText = document.getElementById("uploadText");

const uploadSubmitBtn =
    document.getElementById("uploadSubmitBtn");

const uploadCancelBtn =
    document.getElementById("uploadCancelBtn");

const generatedCode =
    document.getElementById("generatedCode");

const copyCodeBtn =
    document.getElementById("copyCodeBtn");

const doneBtn =
    document.getElementById("doneBtn");

retrieveBtn.addEventListener("click", () => {

    retrieveForm.hidden = false;
    retrieveSuccess.hidden = true;

    shareCodeInput.value = "";
    retrievedText.value = "";

    dialog.showModal();

    setTimeout(() => shareCodeInput.focus(), 50);

});

cancelBtn.addEventListener("click", () => dialog.close());

closeRetrieveBtn.addEventListener("click", () => dialog.close());

shareCodeInput.addEventListener("input", () => {

    shareCodeInput.value = shareCodeInput.value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .slice(0, 6);

});

shareCodeInput.addEventListener("keydown", e => {

    if (e.key === "Enter")
        retrieveCodeBtn.click();

});

retrieveCodeBtn.addEventListener("click", async () => {

    const code = shareCodeInput.value.trim();

    if (!/^[A-Z]{2}\d{4}$/.test(code)) {
        alert("Share code must be in the format AB1234.");
        return;
    }

    retrieveCodeBtn.disabled = true;
    retrieveCodeBtn.textContent = "Retrieving...";

    try {

        const response = await fetch(
            `https://blink-g8w4.onrender.com/retrieve/${code}`
        );

        if (!response.ok) {

            const error = await response.json();

            throw new Error(
                error.message || "Failed to retrieve text."
            );

        }

        const upload = await response.json();

        retrievedText.value = upload.text;

        expiryDate.textContent =
            "📅 " +
            new Date(upload.expiryTime).toLocaleString();

        startCountdown(upload.expiryTime);

        retrieveForm.hidden = true;
        retrieveSuccess.hidden = false;

    } catch (error) {

        alert(error.message);

    } finally {

        retrieveCodeBtn.disabled = false;
        retrieveCodeBtn.textContent = "Retrieve";

    }

});

dialog.addEventListener("cancel", e => {

    e.preventDefault();
    dialog.close();

});

copyBtn.addEventListener("click", async () => {

    await navigator.clipboard.writeText(
        retrievedText.value
    );

    copyBtn.textContent = "✓ Copied";

    setTimeout(() => {

        copyBtn.textContent = "📋 Copy";

    }, 1500);

});

uploadBtn.addEventListener("click", () => {

    uploadForm.hidden = false;
    uploadSuccess.hidden = true;

    uploadText.value = "";

    uploadDialog.showModal();

});

uploadCancelBtn.addEventListener("click", () => {

    uploadDialog.close();

});

doneBtn.addEventListener("click", () => {

    uploadDialog.close();

});

uploadSubmitBtn.addEventListener("click", async () => {

    const text = uploadText.value.trim();

    if (!text) {

        alert("Please enter some text.");
        return;

    }

    uploadSubmitBtn.disabled = true;
    uploadSubmitBtn.textContent = "Creating...";

    try {

        const response = await fetch(
            "https://blink-g8w4.onrender.com/publish",
            {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain"
                },
                body: text
            }
        );

        if (!response.ok)
            throw new Error();

        const code =
            await response.text();

        generatedCode.value = code;

        uploadForm.hidden = true;
        uploadSuccess.hidden = false;

    }
    catch (error) {

        console.error(error);

        alert("Failed to upload.");

    }
    finally {

        uploadSubmitBtn.disabled = false;
        uploadSubmitBtn.textContent =
            "Create Share Code";

    }

});

copyCodeBtn.addEventListener("click", async () => {

    await navigator.clipboard.writeText(
        generatedCode.value
    );

    copyCodeBtn.textContent = "✓ Copied";

    setTimeout(() => {

        copyCodeBtn.textContent =
            "📋 Copy Code";

    }, 1500);

});

function startCountdown(expiryTime) {

    clearInterval(expiryInterval);

    function update() {

        const remaining = expiryTime - Date.now();

        if (remaining <= 0) {

            expiryCountdown.textContent = "🔴 Expired";

            clearInterval(expiryInterval);
            return;

        }

        const h = Math.floor(remaining / 3600000);
        const m = Math.floor((remaining % 3600000) / 60000);

        expiryCountdown.textContent =
            `⏳ Expires in ${h}h ${m}m`;

    }

    update();

    expiryInterval = setInterval(update, 60000);

}