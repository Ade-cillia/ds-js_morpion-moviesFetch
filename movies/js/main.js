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
                let bottomMovie = document.createElement("div");
                movieImg.setAttribute("src","https://image.tmdb.org/t/p/w500/"+element.backdrop_path);
                movieImg.setAttribute("alt",element.original_title);
                movieImg.onerror= (e) => {
                    movieImg.setAttribute("src","./assets/img/default.png");
                    movieImg.style.width="100%";
                };
                movieTitle.innerText = element.original_title!=""?element.original_title:"'Aucun Titre disponible pour ce film'";
                movieDesc.innerText = element.overview!=""?element.overview:"'Aucune Description disponible pour ce film'";
                newMovie.classList.add("movieCard");
                movieDesc.classList.add("movieDesc");

                bottomMovie.innerHTML=`
                    <div class="voteCountContainer" >
                        <div class="flex center">
                            <p id='voteCount'>${element.vote_count!=""?element.vote_count:"?"}</p>
                            <img src='./assets/img/thumb_down_static.png' class='litle reverse thumbUp'></img>
                        </div>
                        <div>
                            <p>${element.vote_average!=""?element.vote_average:"?"}/10</p>
                        </div>
                    </div>
    
                `;


                newMovie.appendChild(movieImg);
                newMovie.appendChild(movieTitle);
                newMovie.appendChild(movieDesc);
                newMovie.appendChild(bottomMovie);

                allMoviesContainer.appendChild(newMovie);
            });
        }).then(()=>{
            document.getElementById("loading").remove();
            let allMovieCard = document.querySelectorAll(".movieCard")
            for (let i = 0; i < allMovieCard.length; i++) {
                allMovieCard[i].addEventListener("mouseenter",(ev)=>{
                    el = ev.target
                    el.querySelector('.thumbUp').setAttribute("src","./assets/img/thumb_down.gif")
                });
                allMovieCard[i].addEventListener("mouseleave",(ev)=>{
                    el = ev.target
                    el.querySelector('.thumbUp').setAttribute("src","./assets/img/thumb_down_static.png")
                });
            }
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