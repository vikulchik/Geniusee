const cart = document.querySelector('.cart');
const overlay = document.querySelector('.overlay');
const popupCart = document.querySelector('.popup-cart');
const formCart = document.querySelector('.form-cart');
const escKeyCode = 27;

cart.addEventListener('click', (e) => {
  e.preventDefault();
  popupCart.classList.add('show');
  overlay.classList.add('show');
});

formCart.addEventListener('submit', (e) => {
  e.preventDefault();
  popupCart.classList.remove('show');
  overlay.classList.remove('show');
});

document.addEventListener('keydown', function(e) {
  if (e.keyCode === escKeyCode) {
    popupCart.classList.remove('show');
    overlay.classList.remove('show');
  }
});

if (overlay) {
  overlay.addEventListener('click', function(event) {
    event.preventDefault();
    overlay.classList.remove('show');
    popupCart.classList.remove('show');
  });
}

new window.Swiper('.swiper-container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
