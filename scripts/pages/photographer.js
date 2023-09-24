//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographerById(id) {
    try {
        const response = await fetch('../../data/photographers.json');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const photographersData = await response.json();
        const photographers = photographersData.photographers;
        const photographermedia = photographersData.media;
        const photographer = photographers.find(photographer => photographer.id === id);
        const media = photographermedia.filter(item => item.photographerId === id);
        console.log('Médias récupérés:', media);
        return {photographer, media };
        
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function displayPhotographer(photographer) {
    if (!photographer) {
        return;
    }

    const headerSection = document.querySelector(".photograph-header");
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    headerSection.appendChild(userCardDOM);
}
async function displayPhotographerMedia(media) {
    if (!media) {
        return;
    }
    
    const mediaSection = document.querySelector(".photograph-media");

    for (const mediaData of media) {
        const mediaModel = mediaTemplate(mediaData);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDOM);
    }
}
async function init() {
    // Extraire l'ID de l'URL
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get("id");

    if (!id) {
        // Gérer le cas où l'ID n'est pas présent dans l'URL
        return;
    }

    // Récupérer le photographe par ID
    const { photographer, media } = await getPhotographerById(parseInt(id, 10));
    console.log('Médias récupérés dans init:', media);
    if (photographer) {
        // Afficher le photographe sur la page
        displayPhotographer(photographer);

        // Afficher les médias du photographe sur la page en passant 'media' en paramètre
        displayPhotographerMedia(media);
    }
}

init();
