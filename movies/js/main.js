window.addEventListener("DOMContentLoaded", function(event) {
    let allMoviesContainer = document.getElementById("allMovies");
    let page = 1;
    let loading = "<div id='loading'><img src='./assets/img/loading.gif'></img><p class='center'>Chargement des films en cours...</p></div>";
    function showAllMovies(){
        let baseUrl = "https://api.themoviedb.org/3/movie/popular"
        let query = `?api_key=3f951fde1f94ff23e3aebbd24b292474&language=fr-FR&page=${page}`
        let url = baseUrl+query;
        fetch(url)
        .then(response => response.json())
        .then(response => {
            allMoviesContainer.innerHTML = allMoviesContainer.innerHTML+loading
            response.results.forEach(element => {
                let movieImg = document.createElement("img");
                let movieTitle = document.createElement("h2");
                let movieDesc = document.createElement("p");
                let newMovie = document.createElement("div");

                movieImg.setAttribute("src","https://image.tmdb.org/t/p/w500/"+element.backdrop_path);
                movieTitle.innerText = element.title;
                movieDesc.innerText = element.overview;
                newMovie.classList.add("movieCard")
                movieDesc.classList.add("movieDesc")

                newMovie.appendChild(movieImg);
                newMovie.appendChild(movieTitle);
                newMovie.appendChild(movieDesc);

                allMoviesContainer.appendChild(newMovie);
            });
        }).then(()=>{
            document.getElementById("loading").remove();
        })
        .catch(e => {
            console.error(e);
            allMoviesContainer.innerHTML = "<p>Erreur lors du chargement, impossible de charger les films...</p>";
        })
    }
    
    window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            page++;
            showAllMovies()
        }
    };
    showAllMovies()
});