const URL = "http://localhost:8080/movies/"

export function initBookings{
    fetchAllBookings()
    
}


export async function fetchAllBookings(){
    const bookingsFromServer = await fetch(URL).then(res => res.json())
    showAllBookings(bookingsFromServer)
}

function showAllBookings(data){
    const tableRows = data.map(bookings =>
        `
        <tr>
        <td>${bookings.movie.title}</td>
        <td>${bookings.availabe.seats}</td>
        <td>${bookings.movie.ageLimit}</td>
        <td>${bookings.date}</td>
        <td>${bookings.time}</td>
        <td>
        <button id="${bookings.id}-column-id" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modal-details-bookings">Delete</button>  
        </td>
        </tr>`
        )
}




