export { fetchImages };
// const key = 31282203 - 7ea8db37884084c288d3f697d;
    async function fetchImages(value, page) {
        return await fetch(`https://pixabay.com/api/?key=31282203-7ea8db37884084c288d3f697d&q=${value}&image_type=photo&orientation=horizontal&
    safesearch=true&page=${page}&per_page=40`)
            .then(async response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        return;
                    }
                    throw new Error(response.status);
                }
                return await response.json();
            })
            .catch(error => {
                console.error(error);
            });
};
    
