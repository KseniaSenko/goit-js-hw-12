import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconClose from '/img/icon-close.svg';
import axios from 'axios';
import { renderImage } from './render-functions';
import { smoothScroll } from './render-functions';
import { noImages } from './render-functions';
import { addLoadButton } from './render-functions';
import { endOfCollection } from './render-functions';
import { simpleLightbox } from './render-functions';

export const refs = {
  form: document.querySelector('.form-search'),
  galleryList: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadButton: document.querySelector('.load-btn'),
  formInput: document.querySelector('.form-value'),
};

let page = 1;
let inputSearch = '';
let perPage = 15;

export async function getImages() {
  refs.loader.classList.remove('hidden');
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '42112521-3ff4dfc201bab0977369cd2bc',
      q: `${inputSearch}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: perPage,
      page: page,
    },
  });
  const { hits, totalHits } = response.data;
  refs.loadButton.classList.add('hidden');
  return { hits, totalHits };
}
refs.loadButton.addEventListener('click', onLoadMoreButton);
refs.form.addEventListener('submit', onSearchButton);

async function onSearchButton(e) {
  e.preventDefault();
  inputSearch = refs.formInput.value.trim();
  refs.galleryList.innerHTML = '';

  if (inputSearch === '') {
    return iziToast.error({
      messageColor: '#FFF',
      color: '#EF4040',
      iconUrl: iconClose,
      position: 'topRight',
      message: 'Please,enter what do you want to find!',
    });
  }
  page = 1;
  try {
    const { hits, totalHits } = await getImages();
    noImages(hits);
    renderImage(hits);
    addLoadButton(totalHits, perPage);
  } catch (error) {
    iziToast.error({
      messageColor: '#FFF',
      color: '#EF4040',
      iconUrl: iconClose,
      position: 'topRight',
      message: `${error}`,
    });
  }
  simpleLightbox();
  refs.form.reset();
}

async function onLoadMoreButton() {
  page++;
  try {
    const { hits, totalHits } = await getImages();

    renderImage(hits);
    endOfCollection(page, totalHits, perPage);
  } catch (error) {
    console.log(error);
    iziToast.error({
      messageColor: '#FFF',
      color: '#EF4040',
      iconUrl: iconClose,
      position: 'topRight',
      message: `${error}`,
    });
  }
  smoothScroll();
  simpleLightbox();
}
