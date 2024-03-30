import axios from "axios";

export async function fetchImages(query, page) {
    
    const url = 'https://pixabay.com/api/';

    const response = await axios.get(url, {
        params: {
            key: "43047953-84179c8300fd9f33658a206cf",
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: "true",
            page,
            per_page: 15,
        }
    })
    const searchResult = response.data;
    return searchResult;
}








