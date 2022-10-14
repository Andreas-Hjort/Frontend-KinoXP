//const URL = "https://kinoxp.azurewebsites.net/shows/"
const URL = "http://localhost:8080/shows/"

import { sanitizeStringWithTableRows } from "../../utils.js"
import { fetchMovieToEdit } from "../movies/movies.js"

export function initShows() {
    fetchAllShows()
    document.getElementById("tbl-body").onclick = editTarget
    document.getElementById("add-show").onclick = addShow
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
        <td>${show.movie.runningTime}</td>
        <td>${show.showingTime}</td>
        <td>${show.date}
        <td>
        <button id="${show.id}-column-id-edit" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>  
        </td>
        <td>
        <button id="${show.id}-column-id-delete" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modal-delete-show">Delete</button>  
        </td>
        </tr>`)

    const tableRowsString = tableRows.join("\n")
    document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsString)
}

function addShow() {
    const htmlId = "-add"
    optionsForDropdown(htmlId)
    document.getElementById("bnt-submit-show").onclick = makeNewShow
}

function makeNewShow() {
    const newShow = {}
    newShow.theater = document.getElementById("select-theater").value
    newShow.showingTime = document.getElementById("select-time-add").value
    newShow.movieID = document.getElementById("movie-select-add").value
    newShow.date = document.getElementById("select-date-add").value

    const options = {}
    options.method = "POST"
    options.headers = { "Content-type": "application/json" }
    options.body = JSON.stringify(newShow)

    fetch(URL, options)
        .then(r => r.json())
        .then(addedshow => document.getElementById("returned-new-show").innerText = JSON.stringify(addedshow, null, 2)
        )
}


function submitEditedShow() {
    const editedShow = {}
    editedShow.id = document.getElementById("id-editshow").value
    editedShow.theater = document.getElementById("select-theater-edit").value
    editedShow.showingTime = document.getElementById("select-date-edit").value
    editedShow.movieID = document.getElementById("movie-select-edit").value


    const options = {}
    options.method = "PUT"
    options.headers = { "Content-type": "application/json" }
    options.body = JSON.stringify(editedShow)
 
    fetch(URL + editedShow.id + "/" + editedShow.theater + "/" + editedShow.showingTime + "/" + editedShow.movieID, options)
        .then(r => {
            console.log("No Data returned from the server")
            alert("Show was succesfully edited - Not the right way to report this")
        })
}

function deleteShow() {
    document.getElementById("btn-submit-delete").onclick
    const showToDelete = document.getElementById("id-to-delete").value
    const options = {}
    options.method = "DELETE"
    options.headers = { "Content-type": "application/json" }
    options.body = JSON.stringify(showToDelete)
    fetch(URL + showToDelete, options).then(r => {
        console.log("No Data returned from the server")
        console.log(showToDelete)
        alert("Show was succesfully deleted - Not the right way to report this")
    })
    fetchAllShows;
}



function editTarget(evt) {
    const target = evt.target
    const htmlIdDelete ="-delete"
    const htmlIdEdit ="-edit"

    if (target.id.includes("-column-id-delete")) {
        const id = target.id.replace("-column-id-delete", "")
        document.getElementById("id-to-delete").value = id
        renderShow(id, htmlIdDelete)
        document.getElementById("btn-submit-delete").onclick = deleteShow
    }
     if(target.id.includes("-column-id-edit")){
        const id = target.id.replace("-column-id-edit", "")
        document.getElementById("id-editshow").value = id
        optionsForDropdown(htmlIdEdit)
        renderShow(id, htmlIdEdit)
        document.getElementById("btn-edited-submit").onclick = submitEditedShow
    }

}

async function optionsForDropdown(htmlId) {
    const showsValuesForDropdown = await fetch(URL).then(res => res.json())
    //selectTheaterDropdown(showsValuesForDropdown)
    selectDateOptions(showsValuesForDropdown, htmlId)
    selectTimeOptions(showsValuesForDropdown, htmlId)
    fetchMovieToEdit(htmlId)
}



function selectDateOptions(data, htmlId) {
    const optionsRows = data.map(show => `
    <option value="${show.date}">${show.date}</option>
`)
    document.getElementById("select-date" + htmlId).innerHTML = optionsRows

}

function selectTimeOptions(data, htmlId) {
    const optionsRows = data.map(show => `
    <option value="${show.showingTime}">${show.showingTime}</option>
`)
    document.getElementById("select-time" + htmlId).innerHTML = optionsRows

}

async function renderShow(id, htmlId) {
    try {
        const show = await fetch(URL + id).then(res => res.json())
        //jsonplaceholder returns an empty object for users not found, NOT an error
        if (Object.keys(show).length === 0) {  //checks for an empty object = {}
            throw new Error("No user found for id:" + id)
        }
        document.getElementById("show-title" + htmlId).innerText = "Movie title: " + show.movie.title;
        document.getElementById("show-genre" + htmlId).innerText = "Genre: " + "" + show.movie.genre;
        document.getElementById("show-theater" + htmlId).innerText = "Theater: " + "" + show.theater;
        document.getElementById("show-date" + htmlId).innerText = "Date: " + "" + show.date;

    } catch (err) {
        document.getElementById("error").innerText = err
    }
}














