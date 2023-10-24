function displayTotalLikes() {
    let totalLikes = 0;
    const likes = document.querySelectorAll('.likes');
    // eslint-disable-next-line no-return-assign
    likes.forEach((like) => totalLikes += parseInt(like.textContent, 10));
    const likespriceContainer = document.querySelector('.likes_price');
    let likesContainer;
    if (document.querySelector('.likes_container')) {
        likesContainer = document.querySelector('.likes_container');
        likesContainer.innerHTML = '';
    } else {
        likesContainer = document.createElement('div');
        likesContainer.classList.add('likes_container');
    }

    const spanLikes = document.createElement('span');
    spanLikes.classList.add('number');
    spanLikes.textContent = totalLikes;
    const spanhearts = document.createElement('i');
    spanhearts.classList.add('fa', 'fa-solid', 'fa-heart');
    likesContainer.appendChild(spanLikes);
    spanLikes.appendChild(spanhearts);
    likespriceContainer.appendChild(likesContainer);
}
// eslint-disable-next-line no-unused-vars
function photographerTemplate(data) {
    if (!data) {
        return;
    }
    const {
        name, portrait, city, country, tagline, price,
    } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('photograph_card');

        const profildescription = document.createElement('div');
        profildescription.classList.add('photograph_description');

        const profilimage = document.createElement('div');
        profilimage.classList.add('format-image');

        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', `${name} profil picture`);

        const h2 = document.createElement('h2');
        h2.textContent = name;

        const locationcontainer = document.createElement('div');
        locationcontainer.classList.add('format-location');

        const h3 = document.createElement('h3');
        h3.textContent = city;

        const comma = document.createElement('span');
        comma.classList.add('comma');
        comma.textContent = ',';

        const h3b = document.createElement('h3');
        h3b.textContent = country;

        const p = document.createElement('p');
        p.textContent = tagline;

        const contactButton = document.createElement('button');
        contactButton.setAttribute('tabindex', '0');
        contactButton.classList.add('contact_button');
        contactButton.textContent = 'Contactez-moi';
        // eslint-disable-next-line no-undef
        contactButton.onclick = displayModal;

        const likespriceContainer = document.querySelector('.likes_price');
        const priceContainer = document.createElement('div');
        priceContainer.classList.add('price_container');
        const spanPrice = document.createElement('span');
        spanPrice.textContent = `${price} €/jour`;
        priceContainer.appendChild(spanPrice);
        likespriceContainer.appendChild(priceContainer);

        const modalHeader = document.querySelector('.modal_header');

        const contactNameSpan = document.createElement('span');
        contactNameSpan.textContent = name;

        modalHeader.appendChild(contactNameSpan);

        profilimage.appendChild(img);
        profildescription.appendChild(h2);
        profildescription.appendChild(locationcontainer);
        locationcontainer.appendChild(h3);
        locationcontainer.appendChild(comma);
        locationcontainer.appendChild(h3b);
        profildescription.appendChild(p);

        cardContainer.appendChild(profilimage);
        cardContainer.appendChild(contactButton);
        cardContainer.appendChild(profildescription);

        return cardContainer;
    }

    // eslint-disable-next-line consistent-return
    return {
        name, picture, getUserCardDOM, displayTotalLikes,
    };
}

const selectDropdown = document.querySelector('.dropdown');

selectDropdown.addEventListener('change', (event) => {
    const selectedOption = event.target.value;
    // eslint-disable-next-line no-undef
    filter(selectedOption);
});

let slideIndex = 1;
function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName('img-slides');

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    // eslint-disable-next-line no-plusplus
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = 'block';
    }
}
const closebutton = document.querySelector('.close');
const prevbutton = document.querySelector('.prev');
const nextbutton = document.querySelector('.next');

function openLightbox() {
    slideIndex = 1;
    document.getElementById('lightbox').style.display = 'block';
    prevbutton.focus();
}
// eslint-disable-next-line no-unused-vars
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

showSlides(slideIndex);

// eslint-disable-next-line no-unused-vars
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

closebutton.setAttribute('tabindex', '0');
prevbutton.setAttribute('tabindex', '0');
nextbutton.setAttribute('tabindex', '0');

closebutton.addEventListener('click', () => {
    closeLightbox();
});
closebutton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        closeLightbox();
    }
});
prevbutton.addEventListener('click', () => {
    plusSlides(-1);
});
prevbutton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        plusSlides(-1);
    }
});
nextbutton.addEventListener('click', () => {
    plusSlides(1);
});
nextbutton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        plusSlides(1);
    }
});
// eslint-disable-next-line no-unused-vars
function mediaTemplate(data) {
    const {
        title, photographerId, image, video, likes,
    } = data;
    const mediaContainer = document.createElement('div');
    mediaContainer.classList.add('card_media');
    mediaContainer.setAttribute('tabindex', '0');

    const mediaContent = document.querySelector('.media-content');

    const imageUrl = `assets/photographers/${photographerId}/${image}`;
    const videoUrl = `assets/photographers/${photographerId}/${video}`;
    const isVideo = video !== undefined;

    let currentSlideIndex = 1;
    const mediaCards = document.querySelectorAll('.card_media');
    const numberOfMediaCards = mediaCards.length;
    for (let i = 0; i < numberOfMediaCards; i++) {
        currentSlideIndex++;
    }

    function createMediaElement() {
        const mediaElement = isVideo ? document.createElement('video') : document.createElement('img');
        mediaElement.setAttribute('src', isVideo ? videoUrl : imageUrl);
        mediaElement.setAttribute('alt', isVideo ? (`${title} video`) : (`${title} image`));
        mediaElement.setAttribute('tabindex', '0');
        mediaElement.setAttribute('onClick', `openLightbox(); currentSlide(${currentSlideIndex});`);

        mediaElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                openLightbox();
                currentSlide(currentSlideIndex);
            }
        });

        if (isVideo) {
            mediaElement.setAttribute('autoplay', '');
        }

        mediaElement.addEventListener('click', openLightbox);
        mediaContainer.addEventListener('click', () => currentSlide(currentSlideIndex));
        mediaContainer.appendChild(mediaElement);
        return mediaElement;
    }

    const mediaElement = createMediaElement();

    const mediaDescription = document.createElement('div');
    mediaDescription.classList.add('media_description');

    const likesNumber = document.createElement('div');
    likesNumber.classList.add('likes_number');

    const h2 = document.createElement('h2');
    h2.classList.add('title');
    h2.textContent = title;

    const span = document.createElement('span');
    span.setAttribute('class', 'likes');
    span.textContent = likes;

    const spanHearts = document.createElement('i');
    spanHearts.classList.add('fa', 'fa-solid', 'fa-heart');
    spanHearts.setAttribute('tabindex', '0');

    likesNumber.appendChild(span);
    likesNumber.appendChild(spanHearts);
    mediaDescription.appendChild(h2);
    mediaDescription.appendChild(likesNumber);
    mediaContainer.appendChild(mediaElement);
    mediaContainer.appendChild(mediaDescription);

    const lightboxContainer = document.createElement('div');
    lightboxContainer.classList.add('img-slides');
    lightboxContainer.setAttribute('tabindex', '0');
    mediaContent.appendChild(lightboxContainer);

    lightboxContainer.appendChild(createMediaElement());

    const lightboxTitle = document.createElement('h2');
    lightboxTitle.textContent = title;
    lightboxContainer.appendChild(lightboxTitle);

    return {
        title, image, video, getMediaCardDOM: () => mediaContainer,
    };
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('fa-heart')) {
        const span = event.target.parentElement.querySelector('span');

        const isLiked = span.getAttribute('data-liked') === 'true';

        if (isLiked) {
            span.setAttribute('data-liked', 'false');
            span.textContent = parseInt(span.textContent, 10) - 1;
        } else {
            span.setAttribute('data-liked', 'true');
            span.textContent = parseInt(span.textContent, 10) + 1;
        }
        displayTotalLikes();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        if (event.target.classList.contains('fa-heart')) {
            const span = event.target.parentElement.querySelector('span');

            const isLiked = span.getAttribute('data-liked') === 'true';

            if (isLiked) {
                span.setAttribute('data-liked', 'false');
                span.textContent = parseInt(span.textContent, 10) - 1;
            } else {
                span.setAttribute('data-liked', 'true');
                span.textContent = parseInt(span.textContent, 10) + 1;
            }
            displayTotalLikes();
        }
    }
});
