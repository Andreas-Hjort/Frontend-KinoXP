const URL = "https://kinoxp.azurewebsites.net/movies/"
import { sanitizeStringWithTableRows } from "../../utils.js"

export function initMovies(){
    document.getElementById("tbl-body").onclick = showAllMovies
    fetchAllMovies()
    addOne()
}

export async function fetchAllMovies(){
    const moviesFromServer = await fetch(URL).then(res => res.json())
    showAllMovies(moviesFromServer)
}

function showAllMovies(data){
    const tableRows = data.map(movie => `
        <tr>
        <td>${movie.title}</td>
        <td>${movie.genre}</td>
        <td>${movie.ageLimit}</td>
        <td>${movie.productionYear}</td>
        <td>${movie.runningTime}</td>
        <td>${movie.created}</td>
        <td>${movie.edited}</td>
    
        </tr>`)

        const tableRowsString = tableRows.join("\n")
        document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsString)
}

function addOne() {
    document.getElementById("bnt-submit-movie").onclick = makeNewMovie
    function makeNewMovie() {
      const newMovie = {}
      newMovie.title = document.getElementById("input-title").value
      newMovie.genre = document.getElementById("input-genre").value
      newMovie.ageLimit = document.getElementById("input-ageLimit").value
      newMovie.productionYear = document.getElementById("input-productionYear").value
      newMovie.runningTime = document.getElementById("input-runningTime").value


      //Now newshow contains all required fields (MUST match the DTO on the backend) and their values

      //Build the options object requred for a POST
      const options = {}
      options.method = "POST"
      options.headers = { "Content-type": "application/json" }
      options.body = JSON.stringify(newMovie)

      fetch(URL, options)
        .then(r => r.json())
        .then(addedmovie => document.getElementById("returned-new-movie").innerText = JSON.stringify(addedmovie, null, 2)
        )
    }
  }

//  <td>
//<--!<button> id="${movie.id}-column-id" type="button" skal lige færdigøres-->
//</td>