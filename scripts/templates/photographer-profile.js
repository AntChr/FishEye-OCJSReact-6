function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('photograph_card');

        const profildescription = document.createElement('div');
        profildescription.classList.add('photograph_description');

        const profilimage = document.createElement('div');
        profilimage.classList.add('format-image');

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute('alt', `${name} profil picture`);

        const h2 = document.createElement('h2');
        h2.textContent = name;

        const locationcontainer = document.createElement('div');
        locationcontainer.classList.add('format-location');

        const h3 = document.createElement('h3');
        h3.textContent = city;

        const comma = document.createElement('span');
        comma.classList.add('comma')
        comma.textContent = ',';

        const h3b = document.createElement('h3');
        h3b.textContent = country;

        const p = document.createElement('p');
        p.textContent = tagline;

        const contactButton = document.createElement('button');
        contactButton.classList.add('contact_button');
        contactButton.textContent = 'Contactez-moi';
        contactButton.onclick = displayModal;

        const likespriceContainer = document.querySelector('.likes_price')
        const priceContainer = document.createElement('div')
        priceContainer.classList.add('price_container')
        const spanPrice = document.createElement('span')
        spanPrice.textContent = price + " €/jour"
        priceContainer.appendChild(spanPrice)
        likespriceContainer.appendChild(priceContainer)

        const modalHeader = document.querySelector('.modal_header');

        const contactNameSpan = document.createElement('span');
        contactNameSpan.textContent = name;

        modalHeader.appendChild(contactNameSpan);

        profilimage.appendChild(img);
        profildescription.appendChild(h2);
        profildescription.appendChild(locationcontainer)
        locationcontainer.appendChild(h3);
        locationcontainer.appendChild(comma);
        locationcontainer.appendChild(h3b);
        profildescription.appendChild(p);

        cardContainer.appendChild(profilimage);
        cardContainer.appendChild(contactButton);
        cardContainer.appendChild(profildescription);

        return cardContainer;
    }

    return { name, picture, getUserCardDOM, displayTotalLikes };
}
let totalLikes = 0;
const likesArray = [];

function displayTotalLikes() {
    let totalLikes = 0;
    const likes = document.querySelectorAll('.likes')
    likes.forEach(like => totalLikes += parseInt(like.textContent))
    const likespriceContainer = document.querySelector('.likes_price')
    let likesContainer
    if (document.querySelector('.likes_container')) {
        likesContainer = document.querySelector('.likes_container')
        likesContainer.innerHTML = ''
    } else {
        likesContainer = document.createElement('div')
        likesContainer.classList.add('likes_container')
    }

    const spanLikes = document.createElement('span')
    spanLikes.classList.add('number')
    spanLikes.textContent = totalLikes
    const spanhearts = document.createElement('i');
    spanhearts.classList.add('fa', 'fa-solid', 'fa-heart');
    likesContainer.appendChild(spanLikes)
    spanLikes.appendChild(spanhearts)
    likespriceContainer.appendChild(likesContainer);
}
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownOptions = document.querySelector('.dropdown-options');
const arrow = document.querySelector('.arrow');
const options = document.querySelectorAll('.dropdown-options li');

options.forEach((option) => {
  option.addEventListener('click', () => {
    const selectedText = option.textContent;
    document.querySelector('.selected-option').textContent = selectedText;
    dropdownOptions.classList.remove('show');
    arrow.style.transform = 'rotate(0deg)';
    filter(selectedText)
  });
});

dropdownToggle.addEventListener('click', () => {
  dropdownOptions.classList.toggle('show');
  arrow.style.transform = dropdownOptions.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
});

document.addEventListener('click', (event) => {
  if (!dropdownToggle.contains(event.target) && !dropdownOptions.contains(event.target)) {
    dropdownOptions.classList.remove('show');
    arrow.style.transform = 'rotate(0deg)';
  }
});

function mediaTemplate(data) {
    const { title, photographerId, image, video, likes, date } = data;
    const imageUrl = `assets/photographers/${photographerId}/${image}`;
    const videoUrl = `assets/photographers/${photographerId}/${video}`;
    const isVideo = video !== undefined;
    let currentSlideIndex = 1;
    const mediaCards = document.querySelectorAll('.card_media');
    const numberOfMediaCards = mediaCards.length;
    for (i = 0; i < numberOfMediaCards; i++) {
        currentSlideIndex++
    }

    function getMediaCardDOM() {
        const mediaContainer = document.createElement('div');
        mediaContainer.classList.add('card_media');

        const profilimage = document.createElement('div');
        profilimage.classList.add('media_image');

        if (isVideo) {
            const video = document.createElement('video');
            video.setAttribute('src', videoUrl);
            video.setAttribute('alt', `${title}`);
            video.setAttribute('controls', '');
            video.setAttribute('autoplay', '');
            video.setAttribute('onClick', `openLightbox(); currentSlide(${currentSlideIndex});`);
            profilimage.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.setAttribute('src', imageUrl);
            img.setAttribute('alt', `${title}`);
            img.setAttribute('onClick', `openLightbox(); currentSlide(${currentSlideIndex});`);
            profilimage.appendChild(img);
        }
        
        const mediadescription = document.createElement('div');
        mediadescription.classList.add('media_description');

        const likesnumber = document.createElement('div');
        likesnumber.classList.add('likes_number');

        const h2 = document.createElement('h2');
        h2.classList.add('title')
        h2.textContent = title;

        const span = document.createElement('span');
        span.setAttribute('class', 'likes')
        span.textContent = likes;

        const spanhearts = document.createElement('i');
        spanhearts.classList.add('fa', 'fa-solid', 'fa-heart');
        mediaContainer.appendChild(profilimage);
        mediaContainer.appendChild(mediadescription);
        mediadescription.appendChild(h2);
        mediadescription.appendChild(likesnumber);
        likesnumber.appendChild(span);
        likesnumber.appendChild(spanhearts);


        const mediaContent = document.querySelector(".media-content")
        const lightboxContainer = document.createElement('div')
        lightboxContainer.classList.add('img-slides')
        mediaContent.appendChild(lightboxContainer)

        if (isVideo) {
            const video = document.createElement('video');
            video.setAttribute('src', videoUrl);
            video.setAttribute('alt', `${title}`);
            video.setAttribute('controls', '');
            video.setAttribute('autoplay', '');
            lightboxContainer.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.setAttribute('src', imageUrl);
            img.setAttribute('alt', `${title}`);
            lightboxContainer.appendChild(img);
        }

        const lightboxTitle = document.createElement('h2')
        lightboxTitle.textContent = title

        lightboxContainer.appendChild(lightboxTitle)
        return mediaContainer;
    }


    return { title, image, video, getMediaCardDOM };
}


document.addEventListener('click', function (event) {
    if (event.target.classList.contains('fa-heart')) {
        const span = event.target.parentElement.querySelector('span');

        const isLiked = span.getAttribute('data-liked') === 'true';

        if (isLiked) {
            span.setAttribute('data-liked', 'false');
            span.textContent = parseInt(span.textContent) - 1;
        } else {
            span.setAttribute('data-liked', 'true');
            span.textContent = parseInt(span.textContent) + 1;
        }
        displayTotalLikes();
    }
});

function openLightbox() {
    slideIndex = 1;
    document.getElementById('lightbox').style.display = "block";
}
function closeLightbox() {
    document.getElementById('lightbox').style.display = "none";
}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
  let i
    let slides = document.getElementsByClassName('img-slides')

    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}