const detailsImageElement = document.querySelector(".details-image");
const detailsTitleElement = document.querySelector(".details-title");
const thumbnailsAnchors = document.querySelectorAll(".thumbnails-anchor");
const detailsSection = document.querySelector(".details-section");
const mainSection = document.querySelector("main");
const HIDDEN = "hidden";
const POINT = "is-point";
for (let i = 0; i < thumbnailsAnchors.length; i++){
    thumbnailsAnchors[i].addEventListener("click", function(){
        setDetails(thumbnailsAnchors[i]);
    });
}

function setDetails(anchor){
    showDetails();
    detailsImageElement.src = anchor.getAttribute("data-details-image");
    detailsTitleElement.innerHTML = anchor.getAttribute("data-details-text");
}
function showDetails(){
    mainSection.classList.remove(HIDDEN);
    detailsSection.classList.add(POINT);
    setTimeout(function(){
        detailsSection.classList.remove(POINT);
    });
}
function hideDetails(){
    mainSection.classList.add(HIDDEN);
}