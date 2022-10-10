const URL = "http://localhost:8080/shows"
import { sanitizeStringWithTableRows } from "../../utils.js"

export function initShows(){
    document.getElementById("tbl-body").onclick = showAllShows
    fetchAllShows()
    addOne()
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



function addOne() {
    document.getElementById("bnt-submit-show").onclick = makeNewShow
    function makeNewShow() {
      const newShow = {}
      newShow.theater = document.getElementById("input-theater").value
      newShow.showingTime = document.getElementById("input-showingtime").value
      newShow.movieID = document.getElementById("input-movie").value
      

      //Now newshow contains all required fields (MUST match the DTO on the backend) and their values

      //Build the options object requred for a POST
      const options = {}
      options.method = "POST"
      options.headers = { "Content-type": "application/json" }
      options.body = JSON.stringify(newShow)

      fetch(URL, options)
        .then(r => r.json())
        .then(addedshow => document.getElementById("returned-new-show").innerText = JSON.stringify(addedshow, null, 2)
        )
    }
  }