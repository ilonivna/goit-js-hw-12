import axios from "axios";

import { page } from "../main.js";


const input = document.querySelector("input");
const query = input.value.trim();
const encodedQuery = encodeURIComponent(query);


export async function fetchImages(query) {
    const response = await axios.get("https://pixabay.com/api/", {
        params: {
            key: "43047953-84179c8300fd9f33658a206cf",
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: "true",
            page: page,
            per_page: 15,
        }
    })
    // totalPages = Math.ceil(response.data.totalHits / perPage);
    
    return response.data;
    }


