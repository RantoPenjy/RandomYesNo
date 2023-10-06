import './public/style.css'
import customConfetis from "./public/confetis.js"
import 'animate.css'
import $ from 'jquery'

const api_url = 'https://yesno.wtf/api'
let randomBtn = $('.random-button')

$(document).ready(function () {
    randomBtn.on('click', function () {
        const randomize = $(this).find('i.fa-refresh')
        const handIconRandomize = $('.button h1')
        const welcome = $('.welcome-message')
        randomize.addClass('spin-animation')
        handIconRandomize.css('display', 'none')

        fetchData(api_url)
            .then(data => {
                randomize.removeClass('spin-animation')
                welcome.css('display', 'none')

                const answer = data.answer.toUpperCase()
                const imageAlt =
                    answer + ' GIF ANIMATION'

                if (data.answer == 'yes'){
                    customConfetis()
                }

                $('.card').html(`
                  <span>
                    <span class="animate__animated animate__shakeX animate__infinite">👉</span>
                        <b>${answer}</b>
                    <span class="animate__animated animate__shakeX animate__infinite">👈</span>
                  </span>
                  <div class="gif-animation">
                    <img src="${data.image}" alt="${imageAlt}">
                  </div>
                `)
            })
            .catch(error => {
                console.error('Error:', error);
            });

    })
})

const fetchData = async (url) => {
    let response = await fetch(url)
    return response.json()
}