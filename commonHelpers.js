import{i as l,S as L,a as b}from"./assets/vendor-64b55ca9.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();const c="/goit-js-hw-12/assets/icon-close-e733eca7.svg";function h(e){const t=e.map(r=>F(r)).join("");i.galleryList.insertAdjacentHTML("beforeend",t)}function F({webformatURL:e,largeImageURL:t,tags:r,likes:a,views:o,comments:s,downloads:n}){return`
    <li class="gallery-item">
    <a class="gallery-link" href="${t}">
    <img class="gallery-image" src="${e}" alt="${r}" width="360"/></a>
    <ul class="gallery-img-caption">
    <li class="gallery-img-info">Likes ${a}</li>
    <li class="gallery-img-info">Views ${o}</li>
    <li class="gallery-img-info">Comments ${s}</li>
    <li class="gallery-img-info">Downloads ${n}</li>
    </ul>
    </li>`}function v(){const{height:e}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}function w(e){e.length===0&&l.error({messageColor:"#FFF",color:"#EF4040",iconUrl:c,position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"})}function C(e,t){Math.ceil(e/t)>1&&i.loadButton.classList.remove("hidden")}function S(e,t,r){i.loadButton.classList.remove("hidden"),Math.ceil(t/r)<=e?(m.observe(i.galleryList.lastChild),i.loadButton.classList.add("hidden")):m.unobserve(i.galleryList.lastChild)}const m=new IntersectionObserver(P);function P(e,t){e.forEach(r=>{r.isIntersecting&&l.info({position:"topRight",messageColor:"#fff",backgroundColor:"#6C8CFF",iconUrl:c,message:"We're sorry, but you've reached the end of search results"})})}let f=new L(".gallery a",{captionsData:"alt",captionDelay:250});function p(){f.on("show.simpleLightbox"),f.refresh()}const i={form:document.querySelector(".form-search"),galleryList:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadButton:document.querySelector(".load-btn"),formInput:document.querySelector(".form-value")};let u=1,g="",d=200;async function y(){i.loader.classList.remove("hidden");const e=await b.get("https://pixabay.com/api/",{params:{key:"42112521-3ff4dfc201bab0977369cd2bc",q:`${g}`,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:d,page:u}}),{hits:t,totalHits:r}=e.data;return i.loadButton.classList.add("hidden"),{hits:t,totalHits:r}}i.loadButton.addEventListener("click",$);i.form.addEventListener("submit",B);async function B(e){if(e.preventDefault(),g=i.formInput.value.trim(),i.galleryList.innerHTML="",g==="")return l.error({messageColor:"#FFF",color:"#EF4040",iconUrl:c,position:"topRight",message:"Please,enter what do you want to find!"});u=1;try{const{hits:t,totalHits:r}=await y();w(t),h(t),C(r,d)}catch(t){l.error({messageColor:"#FFF",color:"#EF4040",iconUrl:c,position:"topRight",message:`${t}`})}p(),i.form.reset()}async function $(){u++;try{const{hits:e,totalHits:t}=await y();h(e),S(u,t,d)}catch(e){console.log(e),l.error({messageColor:"#FFF",color:"#EF4040",iconUrl:c,position:"topRight",message:`${e}`})}v(),p()}
//# sourceMappingURL=commonHelpers.js.map
