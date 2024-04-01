
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImages } from "./js/pixabay-api.js";
import { renderImages } from "./js/render-functions.js";


// ======================================
const backToTop = document.querySelector(".back-to-top");
const galleryList = document.querySelector(".gallery");
const form = document.querySelector("form");
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector(".load-more-btn");


let page = 1;
let query;
let totalPages;
let perPage = 15;

// ==========================================

function showLoader() {
    loader.classList.remove("is-hidden");
}

function hideLoader() {
    loader.classList.add("is-hidden");
}

function showLoadMore() {
    loadMoreBtn.classList.remove("is-hidden");
}

function hideLoadMore() {
    loadMoreBtn.classList.add("is-hidden");
}

function checkBtnStatus() {
    if (page >= totalPages) {
        hideLoadMore();
    } else {
        showLoadMore();
    }
}
function scroll() {
    const height = galleryList.firstElementChild.getBoundingClientRect().height;
    scrollBy({
        top: height,
        behavior: 'smooth',
    });
}

// ========================================


form.addEventListener("submit", onFormSubmit);

loadMoreBtn.addEventListener("click", onLoadMoreClick);

async function onFormSubmit(event) {
    event.preventDefault();

    query = event.target.elements.query.value.trim();
    galleryList.innerHTML = "";
    page = 1;

    if (!query) {
        iziToast.error({
            color: 'yellow',
            message: ` Please fill in the field for search`,
            position: 'topRight',
        });
        return;
    } 

    try {
        showLoader();
        const data = await fetchImages(query, page);
        totalPages = Math.ceil(data.totalHits / perPage);
        renderImages(data.hits);
    } catch (err) {
        console.log(err);
        iziToast.error({
                    title: 'Error',
                    message: `❌ Sorry, error occurred. Please, try again!`,
                    position: 'topRight',
                })
    }

    hideLoader();
    checkBtnStatus();
    event.target.reset();
}

async function onLoadMoreClick() {
    page += 1;
    showLoader();
    try {
        const data = await fetchImages(query, page);
        renderImages(data.hits);
        if (page >= totalPages) {
            hideLoadMore();
            const thankYouMarkup = `<p class="thank-you-text">Thank you for <br> using our website!</p>`;
            backToTop.insertAdjacentHTML("beforeend", thankYouMarkup);

            iziToast.warning({
                title: 'End of collection',
                color: "blue",
            message: ` Sorry, there are no more images matching your query `,
            position: 'topRight',
            })
        }
    } catch (err) {
        console.log(err);
        iziToast.error({
            title: 'Error',
            message: `❌ Sorry, error occurred`,
            position: 'topRight',
                })
    }

    
    scroll();
    checkBtnStatus();
    hideLoader();
}

