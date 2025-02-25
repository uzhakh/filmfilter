const films = [
   { name: 'Titanic', rating: 9 },
   { name: 'Die hard', rating: 5 },
   { name: 'Matrix', rating: 8 },
   { name: 'Cinderella', rating: 2 },
   { name: 'HP', rating: 10 },
   { name: 'Prison break', rating: 6 },
   { name: 'Some bad film', rating: 4 },
   { name: 'Alladin', rating: 2 },
   { name: 'Breaking Bad', rating: 10 },
   { name: 'The Room', rating: 4 }
 ];

 const filmsFiltered = films.filter(i => i.rating >= 6);
 console.log(filmsFiltered);
 
 const filmsName = filmsFiltered.map(i => `${i.name} - ${i.rating}`);
 console.log(filmsName);
 
const filmsRating = films.every( i => i.rating > 0);
console.log(filmsRating);

const filmsSum = filmsFiltered.reduce((acc, i) => acc + i.rating, 0)
console.log(filmsSum);

const getHighestRating = (arr) => {
  return arr.reduce((acc, i) => (acc > i.rating ? acc : i.rating), 0);
}
console.log(getHighestRating(films));

let list = document.getElementById('film-list');
let button = document.getElementById('enter-btn');
let resetButton = document.getElementById('reset-btn');
let badButton = document.getElementById('filter-bad-btn');
let input = document.getElementById('rating-input');
let noResults = document.getElementById('not-results');
let bestMovies = document.getElementById('filter-btn');
// let fadeIn = document.getElementsByClassName('#film-list');

function setList(data) { 
   list.innerHTML= '';
   list.style.display = 'block';
   noResults.style.display = 'none';
   data.forEach((i) => {
      let li = document.createElement('li');
      li.textContent = `${i.name} - ${i.rating}`;
      list.appendChild(li); 
     });

     //Сбрасываем и запускаем анимацию
     list.style.animation = 'none';
     setTimeout(() => {
      list.style.animation = 'fadeIn 1s ease-in';
     }, 10);
     input.value = '';
   }

   button.addEventListener('click', () => {
      const minRating = Number(input.value);
      if (input.value === '') {
         setList(films);
      } else if (minRating > 0 && minRating <=10) {
         const filmsFilt = films.filter(i => i.rating >= minRating);
         if(filmsFilt === 0) {
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
      setList(films);
   })

   bestMovies.addEventListener('click', () => {
      const filmsBest = films.filter(i => i.rating >= 6)
         setList(filmsBest);
   })
   badButton.addEventListener('click', () => {
      const badFilms = films.filter(i => i.rating <= 5);
      setList(badFilms);
   })

setList(films);
