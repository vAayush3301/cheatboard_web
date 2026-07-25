const SAMPLE_CODE = "AB1234";

const retrieveBtn = document.getElementById("retrieveBtn");
const dialog = document.getElementById("retrieveDialog");

const cancelBtn = document.getElementById("cancelBtn");
const retrieveCodeBtn = document.getElementById("retrieveCodeBtn");

const shareCodeInput = document.getElementById("shareCode");

const resultSection = document.getElementById("resultSection");
const retrievedText = document.getElementById("retrievedText");

const copyBtn = document.getElementById("copyBtn");

const uploadBtn = document.getElementById("uploadBtn");
const uploadDialog = document.getElementById("uploadDialog");

const uploadText = document.getElementById("uploadText");

const uploadSubmitBtn =
    document.getElementById("uploadSubmitBtn");

const uploadCancelBtn =
    document.getElementById("uploadCancelBtn");

const uploadResult =
    document.getElementById("uploadResult");

const generatedCode =
    document.getElementById("generatedCode");

const copyCodeBtn =
    document.getElementById("copyCodeBtn");

const expiryCountdown =
    document.getElementById("expiryCountdown");

const expiryDate =
    document.getElementById("expiryDate");

const expiresAt =
    Date.now() + 24 * 60 * 60 * 1000;

expiryDate.textContent =
    "📅 " +
    new Date(expiresAt).toLocaleString();

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

uploadBtn.addEventListener("click", () => {

    uploadText.value = "";

    uploadResult.hidden = true;

    uploadDialog.showModal();

});

uploadCancelBtn.addEventListener("click", () => {

    uploadDialog.close();

});

uploadSubmitBtn.addEventListener("click", () => {

    if (!uploadText.value.trim()) {

        alert("Enter some text first.");
        return;

    }

    generatedCode.value = "AB1234";

    uploadResult.hidden = false;

});

copyCodeBtn.addEventListener("click", async () => {

    await navigator.clipboard.writeText(
        generatedCode.value
    );

    copyCodeBtn.textContent = "✓ Copied";

    setTimeout(() => {

        copyCodeBtn.textContent = "📋 Copy Code";

    }, 1500);

});

function updateCountdown() {

    const remaining =
        expiresAt - Date.now();

    if (remaining <= 0) {

        expiryCountdown.textContent =
            "🔴 Expired";

        return;
    }

    const h =
        Math.floor(remaining / 3600000);

    const m =
        Math.floor((remaining % 3600000) / 60000);

    expiryCountdown.textContent =
        `⏳ Expires in ${h}h ${m}m`;
}

updateCountdown();
setInterval(updateCountdown, 60000);