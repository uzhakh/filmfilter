
let list = document.getElementById('film-list');
let button = document.getElementById('enter-btn');
let resetButton = document.getElementById('reset-btn');
let badButton = document.getElementById('filter-bad-btn');
let input = document.getElementById('rating-input');
let noResults = document.getElementById('not-results');
let bestMovies = document.getElementById('filter-btn');
let films; 

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
     }, 10);
     input.value = '';
   }

   noResults.textContent = 'Loading...';
   noResults.style.display = 'block';

   fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${window.API_KEY}`)
   .then((response) => response.json())
   .then((data) => {
      films = data.results;
      setList(films);
   })
   .catch((error) => {
      console.log('Error loading:', error);
      noResults.style.display = 'block'; // Показываем ошибку
    list.style.display = 'none';
   })

   button.addEventListener('click', () => {
      const minRating = Number(input.value);
      if (!films) return;
      if (input.value === '') {
         setList(films);
      } else if (minRating > 0 && minRating <=10) {
         const filmsFilt = films.filter(i => i.vote_average >= minRating);
         if(filmsFilt.length === 0) {
            noResults.style.display = 'block';
            list.style.display = 'none';
            input.value = '';
         } else {
            setList(filmsFilt);
         }
      } else {
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

