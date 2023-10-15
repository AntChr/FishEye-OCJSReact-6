const firstNameInput = document.querySelector('#first');
const lastNameInput = document.querySelector('#last');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');

// eslint-disable-next-line no-unused-vars
function displayModal() {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'block';
}

// eslint-disable-next-line no-unused-vars
function closeModal() {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'none';
}

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstNameValue = firstNameInput.value;
    const lastNameValue = lastNameInput.value;
    const emailValue = emailInput.value;
    const messageValue = messageInput.value;

    console.log('Prénom:', firstNameValue);
    console.log('Nom:', lastNameValue);
    console.log('Email:', emailValue);
    console.log('Message:', messageValue);
});
