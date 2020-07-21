(function (sliderOptions) {
  window.addEventListener("load", function () {
    const slider = document.querySelector(`${sliderOptions.slider}`);
    const control = slider.querySelector(`${sliderOptions.control}`);
    const btnPrev = control.querySelector(
      `${sliderOptions.control} ${sliderOptions.btnPrev}`
    );
    const btnNext = control.querySelector(
      `${sliderOptions.control} ${sliderOptions.btnNext}`
    );
    const slideList = slider.querySelector(`${sliderOptions.slideList}`);
    const slide = slideList.firstElementChild;
    const slideCount = slideList.querySelectorAll(`${sliderOptions.slide}`)
      .length;
    let beginOfSlider =
      slideList.querySelector(`${sliderOptions.activeSlide}`).dataset
        .slideIndex === 1;
    let endOfSlider =
      slideList.querySelector(`${sliderOptions.activeSlide}`).dataset
        .slideIndex === slideCount;
    let slideListTranslate = 0;
    btnNext.onclick = function (event) {
      event.preventDefault();
      if (!endOfSlider) {
        slideList.style.transform = `translateX(${
          slideListTranslate - slide.offsetWidth
        }px)`;
        slideListTranslate -= slide.offsetWidth;

        // Disable prev slide
        const prevSlide = slideList.querySelector(
          `${sliderOptions.activeSlide}`
        );
        prevSlide.classList.remove("slide-active", "js-slide-active");

        // Enable next slide
        const nextSlide = prevSlide.nextElementSibling;
        nextSlide.classList.add("slide-active", "js-slide-active");
        beginOfSlider = nextSlide.dataset.slideIndex == 1;
        endOfSlider = nextSlide.dataset.slideIndex == slideCount;
      }
    };
    btnPrev.onclick = function (event) {
      event.preventDefault();
      if (!beginOfSlider) {
        slideList.style.transform = `translateX(${
          slideListTranslate + slide.offsetWidth
        }px)`;
        slideListTranslate += slide.offsetWidth;

        // Disable prev slide
        const prevSlide = slideList.querySelector(
          `${sliderOptions.activeSlide}`
        );
        prevSlide.classList.remove("slide-active", "js-slide-active");

        // Enable next slide
        const nextSlide = prevSlide.previousElementSibling;
        nextSlide.classList.add("slide-active", "js-slide-active");
        beginOfSlider = nextSlide.dataset.slideIndex == 1;
        endOfSlider = nextSlide.dataset.slideIndex == slideCount;
      }
    };
    slideList.ondrag = function (event) {
      event.preventDefault();
    };
  });
})({
  slider: ".js-slider-promo",
  slideList: ".js-slide-list",
  activeSlide: ".js-slide-active",
  slide: ".js-slide",
  control: ".js-slider-control",
  btnPrev: ".js-btn-prev",
  btnNext: ".js-btn-next",
});
