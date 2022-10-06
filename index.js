import "https://unpkg.com/navigo"  


import {
  setActiveLink, adjustForMissingHash, renderTemplate, loadTemplate
} from "./utils.js"

import { initMovies } from "./pages/movies/movies.js"
import { initShows } from "./pages/shows/shows.js"

window.addEventListener("load", async () => {

  const templateMovies = await loadTemplate("./pages/movies/movies.html")
  const templateShows = await loadTemplate("./pages/shows/shows.html")
  const templateNotFound = await loadTemplate("./pages/notFound/notFound.html")

  adjustForMissingHash()

  const router = new Navigo("/", { hash: true });
 
  window.router = router

  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url)
        done()
      }
    })
    .on({
      "/": () => document.getElementById("content").innerHTML =
        `<h2></h2>
      <p style='margin-top:2em'>
      This is the content of the Home Route
      </p>
     `,
  
      "/movies": () => {
        renderTemplate(templateMovies, "content")
        initMovies()
      },

      "/shows": () => {
        renderTemplate(templateShows, "content")
        //initShows()
      },
    })
    .notFound(() => {
      renderTemplate(templateNotFound, "content")
    })
    .resolve()
});


window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
    + ' Column: ' + column + ' StackTrace: ' + errorObj);
}