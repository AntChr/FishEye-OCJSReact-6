let media = [];
async function getPhotographerById(id) {
    try {
        const response = await fetch('../../data/photographers.json');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const photographersData = await response.json();
        const { photographers } = photographersData;
        const photographermedia = photographersData.media;
        const photographer = photographers.find((el) => el.id === id);
        media = photographermedia.filter((item) => item.photographerId === id);

        return { photographer, media };
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function displayPhotographer(photographer) {
    if (!photographer) {
        return;
    }

    const headerSection = document.querySelector('.photograph-header');
    // eslint-disable-next-line no-undef
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    headerSection.appendChild(userCardDOM);
}
async function displayPhotographerMedia(mediadata, photographer) {
    if (!media) {
        return;
    }
    const mediaSection = document.querySelector('.photograph-media');

    // eslint-disable-next-line no-restricted-syntax
    for (const mediaData of media) {
        // eslint-disable-next-line no-undef
        const mediaModel = mediaTemplate(mediaData);
        const mediaCardDOM = mediaModel.getMediaCardDOM();

        if (mediaData.video) {
            mediaCardDOM.querySelector('video').setAttribute('src', `assets/photographers/${mediaData.photographerId}/${mediaData.video}`);
        }

        mediaSection.appendChild(mediaCardDOM);
    }

    // eslint-disable-next-line no-undef
    const photographerModel = photographerTemplate(photographer);
    photographerModel.displayTotalLikes();
}

async function display(photographer, mediadata) {
    displayPhotographer(photographer);
    displayPhotographerMedia(mediadata, photographer);
}
// eslint-disable-next-line no-unused-vars
function filter(option) {
    let sortedMedia = [];
    if (option === 'Popularité') {
        sortedMedia = media.sort((a, b) => b.likes - a.likes);
    } else if (option === 'Date') {
        sortedMedia = media.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (option === 'Titre') {
        sortedMedia = media.sort((a, b) => a.title.localeCompare(b.title));
    }
    const mediaSection = document.querySelector('.photograph-media');

    mediaSection.innerHTML = '';

    displayPhotographerMedia(sortedMedia);
}
async function init() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get('id');

    if (!id) {
        return;
    }

    const { photographer, mediadata } = await getPhotographerById(parseInt(id, 10));
    if (photographer) {
        // displayPhotographer(photographer);

        // displayPhotographerMedia(media);
        display(photographer, mediadata);
    }
}

init();
