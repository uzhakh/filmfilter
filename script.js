import { loadFilms } from './api.js';

let list = document.getElementById('film-list');
let button = document.getElementById('enter-btn');
let resetButton = document.getElementById('reset-btn');
let badButton = document.getElementById('filter-bad-btn');
let input = document.getElementById('rating-input');
let noResults = document.getElementById('not-results');
let bestMovies = document.getElementById('filter-btn');
let films; 
let maxRating;
let minRating;
// let apiKey = '${window.API_KEY}';

function setList(data) { 
   list.innerHTML= '';
   list.style.display = 'block';
   noResults.style.display = 'none';
   data.forEach((i) => {
      let li = document.createElement('li');
      li.textContent = `${i.title} - ${i.vote_average}`;
      list.appendChild(li); 
     });

   //Сбрасываем и запускаем анимацию
   list.style.animation = 'none';
   setTimeout(() => {
   list.style.animation = 'fadeIn 1s ease-in';
   noResults.style.animation = 'fadeIn 1s ease-in';
   }, 5);
   input.value = '';

   }

   noResults.textContent = 'Loading...';
   noResults.style.display = 'block';
   loadFilms(window.API_KEY).then((data) => {
     films = data;
     maxRating = Math.max(...films.map(film => film.vote_average));
     minRating = Math.min(...films.map(film => film.vote_average));
     setList(films);
   }) .catch((error) => {
      console.log('Error loading:', error);
      noResults.textContent = 'Error loading movies';
      noResults.style.display = 'block';
      list.style.display = 'none';
      
   })

   button.addEventListener('click', () => {
      const numRating = Number(input.value);
      if (!films) return;
      if (input.value === '') {
         setList(films);
      } else if (numRating >= minRating && numRating <= maxRating) {
         const filmsFilt = films.filter(i => i.vote_average >= numRating);
         console.log('Input:', numRating);
    console.log('Filtered:', filmsFilt.map(f => f.vote_average));
         if(filmsFilt.length === 0) {
            noResults.textContent = 'Nothing found';
            noResults.style.display = 'block';
            list.style.display = 'none';
            input.value = '';
         } else {
            setList(filmsFilt);
         }
      } else {
         noResults.textContent = `Please enter a rating between ${minRating} and ${maxRating}`;
         noResults.style.display = 'block';
         list.style.display = 'none';
         input.value = '';
      }
   })
   
   input.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        button.click();
      }
    });

   resetButton.addEventListener('click', () => {
      if (!films) return;
      setList(films);
   })

   bestMovies.addEventListener('click', () => {
      if (!films) return;
      const filmsBest = films.filter(i => i.vote_average >= 6)
         setList(filmsBest);
   })
   badButton.addEventListener('click', () => {
      if (!films) return;
      const badFilms = films.filter(i => i.vote_average <= 5);
      setList(badFilms);
   })

