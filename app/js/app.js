// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

import AOS from "aos";

import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

document.addEventListener("DOMContentLoaded", () => {
  // Custom JS
  AOS.init({ once: true });

  function hoverProcessItems() {
    let items = document.querySelectorAll(".process__item");
    let visualItems = document.querySelectorAll(".process-visual__item");
    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener("mouseover", function (e) {
        visualItems[i].classList.add("active");
      });
      items[i].addEventListener("mouseout", function (e) {
        visualItems[i].classList.remove("active");
      });
    }
  }

  hoverProcessItems();

  function toggleMenu() {
    let btn = document.querySelector(".header__btn");
    let menu = document.querySelector(".header-mob");

    btn.addEventListener("click", function (e) {
      menu.style.display = "block";
      setTimeout(function () {
        menu.classList.add("header-mob--open");
      }, 100);
    });

    menu.addEventListener("click", function (e) {
      if (
        e.target.classList.contains("header-mob__close") ||
        e.target === e.currentTarget
      ) {
        menu.classList.remove("header-mob--open");
        setTimeout(function () {
          menu.style.display = "none";
        }, 400);
      } else if (e.target.classList.contains("menu__link")) {
        menu.classList.remove("header-mob--open");
        setTimeout(function () {
          menu.style.display = "none";
        }, 400);
      }
    });
  }

  toggleMenu();


  callback();

  function callback() {
    let callback = document.querySelector(".callback");
    let callbackForm = document.querySelector(".callback__form");
    let callbackAnswer = document.querySelector(".callback__answer");
    let form = document.querySelector(".callback-form");

    function openCallback() {
      let buttons = document.querySelectorAll(".js-open-callback");
      
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
          callbackForm.classList.add('active')
          callbackAnswer.classList.remove('active')
          callbackAnswer.innerHTML = ''
          callback.classList.add("active");
        });
      }
    }

    openCallback();
    closeCallback();
    function closeCallback () {
      callback.addEventListener('click', function (e) {
        if (e.target === e.currentTarget || e.target.classList.contains('callback__close')) {
          callback.classList.remove("active");
        }
      })
    }



    function submitRequest() {
      form.addEventListener("submit", async function (e) {
        e.preventDefault();

        let formData = new FormData(e.target)
        let work = []
        for (let [key, value] of formData.entries()) {
          if (key === 'work') {
            work.push(value)
          }
      }
      formData.set('work', work.join('; '))
        try {
          let response = await fetch('/telegram.php', {
            method: 'POST',
            body: formData
          })
          let answer = await response.json()
          callbackAnswer.innerHTML = answer.message
          callbackForm.classList.remove('active')
          callbackAnswer.classList.add('active')
          setTimeout(function () {
            callback.classList.remove("active");
          }, 3000)
        } catch (e) {
          console.log(e.message)
        }

        form.reset();
      });
    }

    submitRequest();
  }
});

function appendIframe () {
  const iframeContainer = document.querySelector('.iframe')
  const iframeSrc = "https://www.google.com/maps/d/u/0/embed?mid=1Ez-vnNog1IFlCt8MnD96GeeCcufE-EU&ehbc=2E312F&noprof=1"
  const iframe = document.createElement('iframe')
  iframe.setAttribute('src', iframeSrc)
  iframeContainer.appendChild(iframe)
}

function works() {
  var swiper = new Swiper(".works-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    navigation: {
      nextEl: ".works__button--next",
      prevEl: ".works__button--prev",
    },
    modules: [Navigation, Pagination],
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1440: {
        slidesPerView: 4,
      },
    },
  });
}

function reviews() {
  var swiper = new Swiper(".reviews-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    autoHeight: true,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    navigation: {
      nextEl: ".reviews__button--next",
      prevEl: ".reviews__button--prev",
    },
    modules: [Navigation, Pagination],
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      },
  });
}

window.addEventListener('load', function () {
  hideLoader();
  // paralax ()
})


if (document.documentElement.clientWidth < 480) {
  window.addEventListener('scroll',
    function () {
      return setTimeout(main, 1000)
    }, {
      once: true,
      passive: true
    });
} else {
  main();

};

function main () {
  // appendIframe();
  reviews();
  works();
}

function hideLoader() {
  let loader = document.querySelector(".loader-wrap");
  loader.style.display = "none";
  document.body.classList.add("animate");
}


function paralax () {
  let items = document.querySelectorAll('.cleaner-animation')
  let coef = 0.1
  document.addEventListener('scroll', function () {

      for(let i = 0; i < items.length; i++) {
          let coord = items[i].parentElement.getBoundingClientRect().top * coef
          items[i].style.setProperty('--coord', `${coord}px`);
      }
  })
}