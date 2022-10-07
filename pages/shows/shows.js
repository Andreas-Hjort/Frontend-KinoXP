const URL = "http://localhost:8080/shows"
import { sanitizeStringWithTableRows } from "../../utils.js"

export function initShows(){
    document.getElementById("tbl-body").onclick = showAllShows
    fetchAllShows()
}

export async function fetchAllShows(){
    const showsFromServer = await fetch(URL).then(res => res.json())
    showAllShows(showsFromServer)
}

function showAllShows(data){
    const tableRows = data.map(show => `
        <tr>
        <td>${show.movie.title}</td>
        <td>${show.movie.genre}</td>
        <td>${show.theater}</td>
        <td>${show.showingTime}</td>
        <td>${show.movie.runningTime}</td>
        <td>
        <button id="${show.id}-column-id" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button> 
        </td>
        </tr>`)

        const tableRowsString = tableRows.join("\n")
        document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsString)
}