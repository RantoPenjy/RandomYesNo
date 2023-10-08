import './public/style.css';
import customConfetti from './public/confetti';
import { translation } from './public/translation';
import $ from 'jquery';

const api_url = 'https://yesno.wtf/api';
let randomBtn = $('.random-button');
let currentLanguage = 'en';

$(document).ready(function () {
    function changeLanguage(lang) {
        currentLanguage = lang;
        $('.welcome-message').text(translation[lang]['Welcome']);
        $('.error-message').text(translation[lang]['Error']);
    }

    randomBtn.on('click', function () {
        let randomize = $(this).find('i.fa-refresh');
        let handIconRandomize = $('.button span');
        let welcome = $('.welcome-message');
        let errorMessage = $('.error-message');
        randomize.addClass('spin-animation');
        handIconRandomize.css('display', 'none');

        fetchData(api_url)
            .then(data => {
                randomize.removeClass('spin-animation');
                welcome.hide();
                errorMessage.html(translation[currentLanguage]['Error']);

                if (data.answer === 'yes') {
                    data.answer = translation[currentLanguage]['Yes'];
                    customConfetti();
                } else {
                    data.answer = translation[currentLanguage]['No'];
                }

                let answer = data.answer.toUpperCase();
                let imageAlt = 'Gif animation for "' + answer + '"';

                $('.card').html(`
                    <div class="answer">
                        <span class="animate__animated animate__shakeX animate__infinite">👉</span>
                        <b>${answer}</b>
                        <span class="animate__animated animate__shakeX animate__infinite">👈</span>
                    </div>
                    <div class="gif-animation">
                        <img src="${data.image}" alt="${imageAlt}">
                    </div>
                `);
            })
            .catch(error => {
                randomize.removeClass('spin-animation');
                errorMessage.html(translation[currentLanguage]['Error']).show();
                console.error('Error:', error);
            });
    });

    $('.translation-button').on('click', function () {
        if ($(this).data('lang') === 'en') {
            $(this).data('lang', 'fr');
            changeLanguage('fr');
            $(this).text('🇬🇧');
        } else {
            $(this).data('lang', 'en');
            changeLanguage('en');
            $(this).text('🇫🇷');
        }
    });
});

const fetchData = async (url) => {
    const response = await fetch(url);
    return response.json();
};
