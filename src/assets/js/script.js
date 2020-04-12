function isSet(element) {
    return element.length !== 0;
};

$(document).ready(function () {
    const hamburger = $('.hamburger');
    hamburger.on('click', function () {
        $(this).toggleClass('is-active').css({
            outline:'none'
        });
        $('body').toggleClass(function () {
            if (hamburger.is('.is-active')){
                return 'overflow_hidden'
            }
            else{
                return false;
            }
        });
    });
    if(isSet($('.portfolio'))){
        var mySwiper = new Swiper ('.portfolio__slider', {
            // Optional parameters
            slidesPerView: 1,
            spaceBetween: 0,
            direction: 'horizontal',
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 37,
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                }
            }
        })
    }
});