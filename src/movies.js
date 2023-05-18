import moviesObj from './movies.json' assert {type: 'json'};

//preposition
const cutStrLength = function (str, length) {
    try {
        // let originStr = str;
        if (str.length > length) {
            let ar = str.split(' ');
            let acc = 0;
            let counter = 0;
            do {
                acc += ar[counter++].length;
            } while (acc <= length);
            ar.length = --counter;
            str = ar.join(' ') + `<div class ="more" href="#">...</div>`;
        }
        return str;
    } catch (e) {
        console.log(str);
    }
}

// fill images
let httpPrefix = moviesObj.httpPrefix;

let detailsContainer = (firstImg, firstDescr) => `<img src="${firstImg}" class="details-image">
<span class="details-title">${firstDescr}</span>
<button onclick="hideDetails()" class="hide-button">X</button>`;
document.getElementsByClassName('details-container').innerHTML = detailsContainer(httpPrefix + moviesObj.results[0].backdrop_path, moviesObj.results[0].overview ? cutStrLength(moviesObj.results[0].overview, 100) : '');

let lis = (detailsImg, description, thumbnailsImg, thumbnailsTitle) => `<li class="thumbnails-item">
<a href="#" class="thumbnails-anchor"
 data-details-image="${detailsImg}" data-details-text="${description}">
    <img src="${thumbnailsImg}" class="thumbnails-image">
    <span class="thumbnails-title">${thumbnailsTitle}</span>
</a>
</li>`;

let ul = moviesObj.results.map(obj => {
    let detailsImg =httpPrefix + obj.backdrop_path;
    let thumbnailsTitle = obj.title ? cutStrLength(obj.title, 7) : '';
    let description = obj.overview ? cutStrLength(obj.overview, 100) : '';
    return lis(detailsImg, description, detailsImg, thumbnailsTitle);
});

document.querySelector('.thumbnails-list').innerHTML = ul.join('');

//variables 
const detailsImageElement = document.querySelector(".details-image");
const detailsTitleElement = document.querySelector(".details-title");
const thumbnailsAnchors = document.querySelectorAll(".thumbnails-anchor");
const detailsSection = document.querySelector(".details-section");
const mainSection = document.querySelector("main");
const HIDDEN = "hidden";
const POINT = "is-point";


thumbnailsAnchors.forEach(anchor => anchor.addEventListener('click',
    setDetails.bind(undefined, anchor)))

function setDetails(anchor) {
    showDetails();
    detailsImageElement.src = anchor.getAttribute("data-details-image");
    detailsTitleElement.innerHTML = anchor.getAttribute("data-details-text");
}
function showDetails() {
    mainSection.classList.remove(HIDDEN);
    detailsSection.classList.add(POINT);
    setTimeout(function () {
        detailsSection.classList.remove(POINT);
    });
}
function hideDetails() {
    mainSection.classList.add(HIDDEN);
}

window.hideDetails = hideDetails;