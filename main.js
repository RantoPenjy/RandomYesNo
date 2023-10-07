import './public/style.css';
import customConfetti from './public/confetti.js';
import $ from 'jquery';

const api_url = 'https://yesno.wtf/api';
let randomBtn = $('.random-button');

$(document).ready(function () {
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
                errorMessage.html('');

                let answer = data.answer.toUpperCase();
                let imageAlt =
                    'Gif animation for "' + answer + '"';

                if (data.answer === 'yes'){
                    customConfetti();
                }

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
              errorMessage.html('Error when fetching resources, please check your internet connection');
              console.error('Error:', error);
            });
    });
});

const fetchData = async (url) => {
    const response = await fetch(url);
    return response.json();
}