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

    return { name, picture, getUserCardDOM };
}

function mediaTemplate (data) {
    const { title, photographerId, image, likes, date, price} = data;
    const imageUrl = `assets/photographers/${photographerId}/${image}`;

    function getMediaCardDOM() {
        const mediaContainer = document.createElement('div');
        mediaContainer.classList.add('card_media');

        const profilimage = document.createElement('div');
        profilimage.classList.add('media_image');

        const img = document.createElement('img');
        img.setAttribute("src", imageUrl);

        const mediadescription = document.createElement('div');
        mediadescription.classList.add('media_description');

        const likesnumber = document.createElement('div');
        likesnumber.classList.add('likes_number');

        const h2 = document.createElement('h2');
        h2.textContent = title;

        const span = document.createElement('span');
        span.textContent = likes;

        const spanlikes = document.createElement('i');
spanlikes.classList.add('fa', 'fa-solid', 'fa-heart');

        mediaContainer.appendChild(profilimage);
        mediaContainer.appendChild(mediadescription);
        profilimage.appendChild(img);
        mediadescription.appendChild(h2);
        mediadescription.appendChild(likesnumber);
        likesnumber.appendChild(span);
        likesnumber.appendChild(spanlikes);

        return mediaContainer
    }
    return { title, image, getMediaCardDOM };
}