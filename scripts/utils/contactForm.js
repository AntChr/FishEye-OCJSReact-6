const firstNameInput = document.querySelector("#first");
const lastNameInput = document.querySelector("#last");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const formRegister = document.querySelector('.send_button')



function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


const form = document.querySelector('form'); // Sélectionnez le formulaire

form.addEventListener("submit", (e) => {
    e.preventDefault(); // Empêche la soumission par défaut du formulaire

    const firstNameValue = firstNameInput.value;
    const lastNameValue = lastNameInput.value;
    const emailValue = emailInput.value;
    const messageValue = messageInput.value;

    console.log("Prénom:", firstNameValue);
    console.log("Nom:", lastNameValue);
    console.log("Email:", emailValue);
    console.log("Message:", messageValue);
});