const searchform = document.querySelector('form')
const moviecontainer = document.querySelector('.move-container')
const inputbox = document.querySelector('.inputbox')


const getmoveinfo = async (move) => {
    try{
          const apikey = '86180b88'
    const url = `http://www.omdbapi.com/?apikey=${apikey}&t=${move}`
   
   
    const respns = await  fetch(url);
    // if(!Response.ok){
    //     throw new Error("Unable to fetch movie data")
    // }
    const data = await respns.json();

    showmore(data)
    }
  catch{
    showErrMessage("No Movie Found!!!!!")
  }
}

const showmore = (data) => {

    moviecontainer.innerHTML = ""
    moviecontainer.classList.remove('noBackground')
    const {Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

    const movieElement = document.createElement('div')
    movieElement.classList.add("move-info")


    movieElement.innerHTML = `<h2>${Title}</h2>
                               <p><strong>Rating: &#11088</strong>${imdbRating}</p>`
     
     const moviegenreElement = document.createElement('div')

     moviegenreElement.classList.add("move-genre")
   
     Genre.split(",").forEach(element => {
         const p = document.createElement('p')
         p.innerText = element
         moviegenreElement.appendChild(p)
     });
 
     movieElement.appendChild(moviegenreElement)

     movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
                                <p><strong>Duration: </strong>${Runtime}</p>
                                <p><strong>Cast: </strong>${Actors}</p>
                               <p><strong>Plot: </strong>${Plot}</p>`

  const moveposter = document.createElement("div")  
  moveposter.classList.add("move-poster")
  moveposter.innerHTML = `<img src="${Poster}" />`
  
  moviecontainer.appendChild(moveposter)
moviecontainer.appendChild(movieElement)  

inputbox.value = ""
}

const showErrMessage = (message) => {
    moviecontainer.innerHTML = `<h2>${message}</h2>`
    moviecontainer.classList.add('noBackground')
}

const  handle = (e) => {
    e.preventDefault()
    const movename = inputbox.value.trim();
   if(movename !== ''){
    showErrMessage("Fetching Movie Information...")
    getmoveinfo(movename)
   }else{
   
showErrMessage("Enter movie name to get movie information")
   }
}

searchform.addEventListener('submit', handle)

