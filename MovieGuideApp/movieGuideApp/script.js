let searchForm = document.getElementById("form")
let searchBtn = document.getElementById('submitbtn');
let inputBox = document.getElementById("searchInput")
let container = document.querySelector(".container")
let b = document.querySelector("b")
let poster = document.getElementById("poster")
let content = document.getElementById("content")

const getMovieInfo = async (movie) => {
    const myAPIKey = "226c1eb7"
    let url = `http://www.omdbapi.com/?apikey=${myAPIKey}&t=${movie}`
    let response = await fetch(url)
    let data = await response.json()
    return data;
}

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let movie = inputBox.value.trim()

    if (movie != "") {
        if (poster.innerHTML != "" && content.innerHTML != "") {
            poster.innerHTML = ""
            content.innerHTML = ""
            b.innerText = ""
            inputBox.value = ""
        }
        b.innerText = ""
        let movieData = await getMovieInfo(movie);
        console.log(movieData)
        if (movieData.Error) {
            poster.innerHTML = ""
            content.innerHTML = ""
            b.innerText = ""
            inputBox.value = ""
            b.innerHTML = `<b>Movie not found!</b>`
        } else {
            console.log(movieData.Error)
            let moviePoster = document.createElement("div")
            moviePoster.innerHTML = `<img src=${movieData.Poster} alt="Movie Poster N/A">`
            moviePoster.classList.add("movie-poster")
            poster.appendChild(moviePoster)
            let movieInfo = document.createElement("div")
            movieInfo.innerHTML = `<h2>${movieData.Title}</h2>
        <p>Rating: <strong>&#11088;</strong>${movieData.imdbRating}</p>`
            movieInfo.classList.add("movie-info")
            let movieGenre = document.createElement("div")
            movieData.Genre.split(',').forEach((e) => {
                let p = document.createElement("p")
                p.innerHTML = e
                p.classList.add("movie-genre-p")
                movieGenre.appendChild(p)
            });
            movieGenre.classList.add("movie-genre")
            let movieContent = document.createElement("div")
            movieContent.innerHTML = `<p><b>Released Date:</b>${movieData.Released}</p>
                                  <p><b>Duration:</b> ${movieData.Runtime}</p>
                                  <p><b>Director:</b> ${movieData.Director}</p>
                                  <p><b>Cast:</b> ${movieData.Actors}</p>
                                  <p id="moviePlot"><b>Plaot:</b> ${movieData.Plot}</p>`
            movieContent.classList.add("movie-content")
            content.appendChild(movieInfo)
            content.appendChild(movieGenre)
            content.appendChild(movieContent)
        }
    }
    else {
        container.innerHTML = `<b>Please Enter a Valid Movie Name!</b>`
    }
})