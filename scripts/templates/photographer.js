function photographerTemplate(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const photographerLink = document.createElement('a');
        photographerLink.href = `/photographer.html?id=${id}`;

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('format-image');

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const h2 = document.createElement( 'h2' );
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

        const span = document.createElement('span');
        span.textContent = price;

        const priceperday = document.createElement('span');
        priceperday.textContent='€/jour'
        
        imageContainer.appendChild(img);
        article.appendChild(photographerLink);
        photographerLink.appendChild(imageContainer);
        article.appendChild(h2);
        article.appendChild(locationcontainer);
        locationcontainer.appendChild(h3);
        locationcontainer.appendChild(comma);
        locationcontainer.appendChild(h3b);
        article.appendChild(p);
        article.appendChild(span);
        span.appendChild(priceperday);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}