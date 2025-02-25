export async function loadFilms(apiKey) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
  const data = await response.json();
  return data.results;
}