const URL = "https://kinoxp.azurewebsites.net/shows/"
import { sanitizeStringWithTableRows } from "../../utils.js"

export function initShows() {
    fetchAllShows()
    addOne() 
    document.getElementById("tbl-body").onclick = editTarget
}


export async function fetchAllShows() {
    const showsFromServer = await fetch(URL).then(res => res.json())
    showAllShows(showsFromServer)
}

function showAllShows(data) {
    const tableRows = data.map(show => `
        <tr>
        <td>${show.movie.title}</td>
        <td>${show.movie.genre}</td>
        <td>${show.theater}</td>
        <td>${show.showingTime}</td>
        <td>${show.movie.runningTime}</td>
        <td>
        <button id="${show.id}-column-id" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>  
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
        options.method = "PUT"
        options.headers = { "Content-type": "application/json" }
        options.body = JSON.stringify(newShow)

        fetch(URL, options)
            .then(r => r.json())
            .then(addedshow => document.getElementById("returned-new-show").innerText = JSON.stringify(addedshow, null, 2)
            )
    }
}


function submitEditedShow(id) { 
    const editedShow = {}
    editedShow.id = id
    editedShow.theater = document.getElementById("modal-input-theater").value
    editedShow.showingTime = document.getElementById("modal-input-showingTime").value
    editedShow.movieID = document.getElementById("modal-input-movie").value
    //Now newShow contains all required fields (mathces the DTO on the backend) and values

    //Build the options object requred for a PUT 

    const options = {}
    options.method = "PUT"
    options.headers = { "Content-type": "application/json",
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'}
    options.body = JSON.stringify(editedShow)
    //Observe, id is added to the URL
    fetch(URL + editedShow.id, options)
        .then(r => {
            console.log("No Data returned from the server")
            alert("Show was succesfully edited - Not the right way to report this")
        })

    }



/**function editOne(evt) {
    document.getElementById("btn-submit-changes").onclick = submitEditedShow
    const target = evt.target
    const id = target.id.replace("-column-id", "")
    function findShow() {
        const showToEditId = document.getElementById(id).value
        document.getElementById = editTarget
        const show = fetch(URL + showToEditId)
            .then(r => r.json())
            .then(show => {
                editedCar.id = document.getElementById("edit-show-id").innerText
                document.getElementById("edit-input-theater").value = show.theater
                document.getElementById("edit-input-showingTime").value = show.showingTime
                document.getElementById("edit-input-movie").value = show.movieID
            })
    }
}
 */

function editTarget(evt){
    const target = evt.target
    if (!target.id.includes("-column-id")) {
    return
    }
    else {
    const id = target.id.replace("-column-id", "")
    document.getElementById("button-edited-submit").onclick = submitEditedShow(id)
    evt.stopPropagation(); 
  }  
}






  


