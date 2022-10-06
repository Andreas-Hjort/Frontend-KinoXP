const URL = "http://localhost:8080/movies"
import { sanitizeStringWithTableRows } from "../../utils.js"

export function initMovies(){
    document.getElementById("tbl-body").onclick = showAllMovies
    fetchAllMovies()
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
        <td>
        </tr>`)

        const tableRowsString = tableRows.join("\n")
        document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsString)
}

//  <td>
//<--!<button> id="${movie.id}-column-id" type="button" skal lige færdigøres-->
//</td>