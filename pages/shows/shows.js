const URL = ""
import { sanitizeStringWithTableRows } from "../../utils.js"

export function initShows(){
    document.getElementById("tbl-body").onclick = showAllShows
    fetchAllShows
}

export async function fetchAllShows(){
    const showsFromServer = await fetch(URL).then(res => res.json())
    showAllShows(showsFromServer)
}

function showAllShows(data){
    const tableRows = data.map(show => `
        <tr>
        <td>${show.id}</td>
        </tr>`)

        const tableRowsString = tableRows.join("\n")
        document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsString)
}