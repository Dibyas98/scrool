window.onload=function()
{
document.getElementById('loader').style.display='none'
}
const imageContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");

let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const count = 10;
const apikey = "vwz4k4wxmi5z3i895878qOuF_AtLh0vfzlSA3hR89jU";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

function setAttribute(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
    }
}

function displayPhotos() {
    totalImages = photosArray.length;

    imagesLoaded = 0;

    photosArray.forEach((photo) => {
        const item = document.createElement("a");
        const photoD=document.createElement('div');
        photoD.classList.add('photo')

        
        setAttribute(item, {
            href: photo.links.html,
            target: "_blank",
        });

        const img = document.createElement("img");
        setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        img.addEventListener('load', imageLoaded);

        item.append(img);
        photoD.appendChild(item);

        imageContainer.append(photoD);
    });
}


async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        imageContainer.innerText="error TryAgain"
    }
}

window.addEventListener("scroll", () =>{
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight && ready){
        ready = false;
        getPhotos();
    }
});

getPhotos();
