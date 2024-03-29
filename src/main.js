
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImages } from "./js/pixabay-api.js";
import { renderImages } from "./js/render-functions.js";



export let page = 1;

const galleryList = document.querySelector(".gallery");
let query;
const input = document.querySelector("input");
const form = document.querySelector("form");
const loader = document.querySelector('.loader');
const perPage = 15;
let images;
const fetchImagesBtn = document.querySelector(".fetch-images-btn");
fetchImagesBtn.style.display = 'none';


// ------ loader functions -------
function showLoader() {
    loader.classList.remove("is-hidden");
}
function hideLoader() {
    loader.classList.add("is-hidden");
}

// ------- input event listener -----
input.addEventListener("input", (event) => {
    event.preventDefault();
    query = input.value.trim();
});


// -------form submit event listener ------
form.addEventListener("submit", async event => {
    event.preventDefault();

    showLoader();

    // ------- prevent empty query -------
    if (query === "") {
        iziToast.error({
            color: 'yellow',
            message: ` Please fill in the field for search`,
            position: 'topRight',
        });
    }
    // -------- load images set by query --
    try {
        images = await fetchImages();

        if (!images.length) {
            iziToast.error({
                title: 'Error',
                message: `❌ Sorry, there are no images matching your search query. Please, try again!`,
                position: 'topRight',
            })
        }

        if (perPage <= images.length) {
        fetchImagesBtn.style.display = "block";
}
else {
        iziToast.error({
            color: "blue",
            title: 'Error',
            message: `❌ Sorry, there are no more images to show`,
            position: 'topRight',
        });
    }
        renderImages(images);   
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: `❌ Sorry, error occured!`,
            position: 'topRight',
        });
    } finally {
    hideLoader()
    }    
});

// --------- add page ------

fetchImagesBtn.addEventListener("click", async event => {
    event.preventDefault();
    page += 1;

    showLoader()

    try {
        images = await fetchImages();
        if (perPage > images.length) {
            iziToast.error({
                color: "blue",
                title: 'Error',
                message: `❌ Sorry, there are no more images to show`,
                position: 'topRight',
            });
            fetchImagesBtn.style.display = 'none';
            return;
        }
        renderImages(images);
    } catch (error) {
        console.log(error)
        iziToast.error({
            title: 'Error',
            message: `❌ Sorry, error occured!`,
            position: 'topRight',
        });
    } finally {
        hideLoader();
    }

})


