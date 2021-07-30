const apiKey = 'Fqq38oja6ND6fh0e1eu6njn1coTJ6pBd'

const mainCont = document.querySelector('.main-search')
const resultDiv = document.querySelector('.result')
const form = document.querySelector('#form')
const searchInput = document.querySelector('#searchIn')
const searchButton = document.querySelector('#searchBtn')
const errorContainer = document.querySelector('.error-container')
const gridSection = document.querySelector('.grid-gifs')
const gridContainer = document.querySelector('.grid-container')
const trendsContainer = document.querySelector('#trends')

window.addEventListener('load', ()=> {
    form.addEventListener('submit', getGifs)
    searchButton.addEventListener('click', getGifs)
})

trendsContainer.addEventListener('click', getclickedTerm)

function getGifs  (e) {
    e.preventDefault()
    let input = document.querySelector('#searchIn').value   

    if(input === '') {
        showError()
        return
    }

    function showError () {
        errorContainer.style.display = 'flex'
    }

    setTimeout(() => {
        errorContainer.remove()
    }, 5000)

    APIConsult(input)
    printTitle(input)
}

async function APIConsult (input) {
    const urlApi= `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${input}&limit=12&offset=0&rating=g&lang=en`    
    const response = await fetch(urlApi)
    const datos = await response.json()
    const dataArray = datos.data
    printGifs(dataArray)
}

function printTitle (input) {
    cleanGrid ()
    const title = document.createElement("h2")
    title.innerHTML = input
    gridContainer.appendChild(title)
}

function printGifs(dataArray) {  
        gridSection.style.display = 'flex'
        for (let i=0; i<dataArray.length; i++){
        const imageGif = dataArray[i].images.fixed_width_downsampled.url
        const image = document.createElement("img")
        const title = document.createElement("h2")
        image.setAttribute('src', imageGif)
        title.setAttribute('id', 'grid-title')
        gridContainer.appendChild(image)
    }
}

function cleanGrid () {
    gridContainer.innerHTML = ''
}

async function getTerms(){
    let urlApi = `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`    
    const response = await fetch(urlApi)
    const datos = await response.json()
    const dataArray = datos.data 
    printTerms(dataArray)
}
getTerms()

function printTerms (dataArray) {
    for (let i=0; i<5; i++){
        const word=document.createElement("span")
        const coma=document.createElement("span")
        word.setAttribute('class', 'word-terms' )
        word.innerHTML=dataArray[i]
        coma.innerHTML=', '
        trendsContainer.appendChild(word)
        trendsContainer.appendChild(coma)
    }
}

function getclickedTerm (e) {
    if(e.target.classList.contains('word-terms')) {
        selectedTerm = e.target
        input = selectedTerm.innerHTML
    }
    APIConsult(input)
    printTitle(input)
}
        











    


    














