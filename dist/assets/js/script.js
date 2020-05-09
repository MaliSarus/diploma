function isSet(element) {
    return element.length !== 0;
};


$(document).ready(function () {
    const hamburger = $('.hamburger');
    hamburger.on('click', function () {
        $(this).toggleClass('is-active').css({
            outline: 'none'
        });
        $('body').toggleClass(function () {
            if (hamburger.is('.is-active')) {
                return 'overflow_hidden'
            } else {
                return false;
            }
        });
    });
    if (isSet($('.portfolio'))) {
        var mySwiper = new Swiper('.portfolio__slider', {
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

    const modalForm = $('.modal-form');
    const callButton = $('.call-button');
    const detailsButton = $('.details-button');
    const phoneInput = $('[name="phone"]');
    const nameInput = $('[name="fio"]');
    const submit =  $('form button[type="submit"]');
    const namePattern = /^[а-я]+\s[а-я]+\s[а-я]+$/i;

    nameInput.on('input', function () {
        $(this).val($(this).val().replace(/[0-9a-z]/, ''));

        if ($(this).is(':valid') && ($(this).val().search(namePattern) == 0)) {
            $(this).removeClass('invalid').addClass('valid');
        } else {
            $(this).removeClass('valid').addClass('invalid');
        }
    });

    phoneInput.on('input', function () {
        if (!(Inputmask.isValid($(this).val(), "+7-(999)-999-9999"))) {
            $(this).removeClass('valid').addClass('invalid');
        } else {
            $(this).removeClass('invalid').addClass('valid');
        }
    });

    phoneInput.on('focus', function () {
        phoneInput.inputmask({
            "mask": "+7-(999)-999-9999",
            showMaskOnHover: false,
            showMaskOnFocus: true,
            'onincomplete': function () {
                phoneInput.inputmask("remove")
            },
            "oncomplete": function () {
                $(this).removeClass('invalid').addClass('valid');
            }
        });
    });
    phoneInput.on('blur', function () {
        if (!(Inputmask.isValid($(this).val(), "+7-(999)-999-9999"))) {
            $(this).removeClass('valid').addClass('invalid');
        } else {
            $(this).removeClass('invalid').addClass('valid');
        }
    });

    callButton.on('click', function (event) {
        event.preventDefault();
        modalForm.addClass('modal-form_active');
        $('body').css({
            overflow: 'hidden'
        });
        modalForm.find('[type="email"]').css({
            display: 'none'
        }).addClass('valid');
    });
    detailsButton.on('click', function (event) {
        event.preventDefault();
        modalForm.addClass('modal-form_active');
        $('body').css({
            overflow: 'hidden'
        });
        const mailInput = modalForm.find('[type="email"]');
        const pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
        modalForm.find('[type="email"]').removeAttr('style').attr('required','required').removeClass('valid');
        mailInput.on('input', function () {
            if ($(this).val().search(pattern) == 0) {
                $(this).removeClass('invalid').addClass('valid');
            } else {
                $(this).removeClass('valid').addClass('invalid');
                $(this).siblings('label').removeClass('valid').addClass('invalid');
            }
        });
        mailInput.on('blur', function () {
            if ($(this).val() !== '') {
                if ($(this).val().search(pattern) == 0) {
                    $(this).removeClass('invalid').addClass('valid');
                } else {
                    $(this).removeClass('valid').addClass('invalid');
                }
            }
        });
    });

    submit.on('click', function (event) {
        let failFlag = 0;
        const inputs = $('form input');
        inputs.each(function () {
            if ($(this).hasClass('invalid')) {
                failFlag = 1
            }
        });
        if (failFlag == 1) {
            event.preventDefault();
        }
    });

    modalForm.on('click', function (event) {
        if (!($(this).children().is(event.target)) && $(this).children().has(event.target).length === 0) {
            $(this).removeClass('modal-form_active');
            $('body').removeAttr('style');
        }
    });

    $('.header__nav-link').on('click',function (e) {
        e.preventDefault();
        const destination = $(this).attr('href');
        hamburger.removeClass('is-active');
        $('body').removeClass('overflow_hidden');
        $('html,body').animate({
            scrollTop: destination.position().top
        }, 700);
    })

});