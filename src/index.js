const axios = require('axios');
import { fetchImages } from './fetchImages';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector(".search-form");
const input = document.querySelector(".search-form__input");
const button = document.querySelector(".search-form__btn");
const gallery = document.querySelector(".gallery");
const btnLoad = document.querySelector(".load-more");

let page = 1;
let galleryLightbox = new SimpleLightbox('.gallery a', {
    captionsData: "alt",
    captionDelay: 250,
});

button.addEventListener('click', event => {
    event.preventDefault();
    const value = input.value.trim();
    if (value !== '') {
        fetchImages(value, page).then(data => {
            if (data.hits.length === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.'
        );
            } else {
                imgRender(data.hits);
                Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`
                );
              
              button.style.display = 'block';
              galleryLightbox.refresh();
        }
        })
    }
})
function imgRender(images) {
    const markup = images.map(image => {
        console.log(image);
        return `<div class="photo-card">
  <a href="${image.webformatURL}">
  <img class="image" src="${image.largeImageURL}" alt="${image.tags}" loading="lazy"/>
  </a>
  <div class="info">
    <p class="info-item">${image.likes}
      <b>Likes</b>
    </p>
    <p class="info-item">${image.views}
      <b>Views</b>
    </p>
    <p class="info-item">${image.comments}
      <b>Comments</b>
    </p>
    <p class="info-item">${image.downloads}
      <b>Downloads</b>
    </p>
  </div>
</div>`;
    }).join('');
    gallery.innerHTML += markup;
}
btnLoad.addEventListener('click', () => {
    
  const value = input.value.trim();
  btnLoad.style.display = ' none';
  page++;
  fetchImages(value, page).then(data => {
    if (data.hits.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      imgRender(data.hits);
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`
      );
      btnLoad.style.display = 'block';
    }
  });
});

// function imageBody() {
//   document.body.classList.remove("background");
// }