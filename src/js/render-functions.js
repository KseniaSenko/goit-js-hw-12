import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconClose from '/img/icon-close.svg';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { refs } from './pixabay-api';

export function renderImage(images) {
  const markup = images.map(image => imagesTemplate(image)).join('');
  refs.galleryList.insertAdjacentHTML('beforeend', markup);
}
function imagesTemplate({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
    <li class="gallery-item">
    <a class="gallery-link" href="${largeImageURL}">
    <img class="gallery-image" src="${webformatURL}" alt="${tags}" width="360"/></a>
    <ul class="gallery-img-caption">
    <li class="gallery-img-info">Likes ${likes}</li>
    <li class="gallery-img-info">Views ${views}</li>
    <li class="gallery-img-info">Comments ${comments}</li>
    <li class="gallery-img-info">Downloads ${downloads}</li>
    </ul>
    </li>`;
}
export function smoothScroll() {
  const { height: itemHeight } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();
  window.scrollBy({
    top: itemHeight * 2,
    behavior: 'smooth',
  });
}

export function noImages(hits) {
  if (hits.length === 0) {
    iziToast.error({
      messageColor: '#FFF',
      color: '#EF4040',
      iconUrl: iconClose,
      position: 'topRight',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
  }
}

export function addLoadButton(totalHits, perPage) {
  const totalPages = Math.ceil(totalHits / perPage);
  if (totalPages > 1) {
    refs.loadButton.classList.remove('hidden');
  }
}

export function endOfCollection(page, totalHits, perPage) {
  refs.loadButton.classList.remove('hidden');
  const totalPages = Math.ceil(totalHits / perPage);
  if (totalPages <= page) {
    observer.observe(refs.galleryList.lastChild);
    refs.loadButton.classList.add('hidden');
  } else {
    observer.unobserve(refs.galleryList.lastChild);
  }
}

const observer = new IntersectionObserver(onLastPage);

function onLastPage(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      iziToast.info({
        position: 'topRight',
          messageColor: '#fff',
          backgroundColor: '#6C8CFF',
        iconUrl: iconClose,
        message: "We're sorry, but you've reached the end of search results",
      });
    }
  });
}

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
export function simpleLightbox() {
  gallery.on('show.simpleLightbox');
  gallery.refresh();
}
