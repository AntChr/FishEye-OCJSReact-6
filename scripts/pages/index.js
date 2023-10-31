async function getPhotographers() {
    try {
        const response = await fetch('../../data/photographers.json');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const photographers = await response.json();
        return photographers;
    } catch (error) {
        console.error(error);
        return { photographers: [] };
    }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector('.photographer_section');

    photographers.forEach((photographer) => {
        // eslint-disable-next-line no-undef
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
}
init();
