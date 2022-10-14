//const URL = "https://kinoxp.azurewebsites.net/movies/"
const URL = "http://localhost:8080/movies/"
import { sanitizeStringWithTableRows } from "../../utils.js"

export function initMovies() {
  fetchAllMovies()
  addOne()
  document.getElementById("tbl-body").onclick = targetMovieId
}

export async function fetchAllMovies() {
  const moviesFromServer = await fetch(URL).then(res => res.json())
  showAllMovies(moviesFromServer)
}


function showAllMovies(data) {
  const tableRows = data.map(movie => `
        <tr>
        <td>${movie.title}</td>
        <td>${movie.genre}</td>
        <td>${movie.ageLimit}</td>
        <td>${movie.productionYear}</td>
        <td>${movie.runningTime}</td>
        <td>
        <button id="${movie.id}-column-id" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modal-delete-movie">Delete</button>  
        </td>
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
  }
}

function deleteMovie() {
  document.getElementById("btn-delete-movie").oneclick
  const movieToDelete = document.getElementById("id-to-delete").value

  const options = {}
  options.method = "DELETE"
  options.headers = { "Content-type": "application/json" }
  options.body = JSON.stringify(movieToDelete)
  fetch(URL + movieToDelete, options).then(r => {
    console.log("No Data returned from the server")
    console.log(movieToDelete)
    alert("Show was succesfully deleted - Not the right way to report this")
  })
  fetchAllMovies;
}

function targetMovieId(evt) {
  const target = evt.target
  if (!target.id.includes("-column-id")) {
    return
  }
  else {
    const id = target.id.replace("-column-id", "")
    document.getElementById("id-to-delete").value = id
    document.getElementById("btn-delete-movie").onclick = deleteMovie
  }
}

export async function fetchMovieToEdit(htmlId){

  const showsValuesForDropdown = await fetch(URL).then(res => res.json())
  editMovieDropdown(showsValuesForDropdown, htmlId)

}

export function editMovieDropdown(data, htmlId){
  const optionsRows = data.map(movie =>  `
      <option value="${movie.id}">${movie.title}</option>
  `)
  document.getElementById("movie-select" + htmlId).innerHTML = optionsRows
}




//  <td>
//<--!<button> id="${movie.id}-column-id" type="button" skal lige færdigøres-->
//</td>