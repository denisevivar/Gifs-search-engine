const apiKey = 'Fqq38oja6ND6fh0e1eu6njn1coTJ6pBd'
// const searchContainer = document.querySelector('.search-container')
const searchInput = document.querySelector('#search-input')
const suggestionsList = document.querySelector('#suggestions-list')
const suggestionsDiv = document.querySelector('.suggestions-div')
const searchBtn = document.querySelector('#search-btn')
const cleanBtn = document.querySelector('#clean-btn')
const resultsSection = document.querySelector('#results')
const trendingTerms = document.querySelector('.trending-terms')
const pagesRecord = 12
let inputValue
let optionList
let totalPages

///Events SUGGESTIONS LIST (input)

searchInput.addEventListener('keyup', (e) => {
    // let inputValue = e.target.value
    inputValue = e.target.value
    getTerms(inputValue)
})

///Section SEARCH (GET TERMS BY ENDPOINT AND PRINT A LIST)

const getTerms = async (inputValue) => {
    let urlApi = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${inputValue}&limit=5&offset=0&rating=g&lang=es`

    try {
        const response = await fetch(urlApi)
        const datos = await response.json()
        const dataArray = datos.data

        createList(dataArray.map((item) => {
            return item.name
        }))
    }
    catch(error) {
        console.log(error)
    }
}

const createList = (items) => {
    // console.log(items)
    searchBtn.classList.add('not-displayed')
    cleanBtn.classList.add('is-displayed')
    suggestionsList.innerHTML = ''

    items.map((item) => {
        optionList = document.createElement("div")
        let icon = document.createElement("icon")
        let term = document.createElement("li")
        optionList.setAttribute('class','option-list')
        icon.setAttribute('class','fa fa-search')
        term.setAttribute('class', 'term-list')
        term.innerHTML = item
        suggestionsList.appendChild(optionList)
        optionList.appendChild(icon)
        optionList.appendChild(term)
        
    })
}

/////////////////////////////////////////

searchInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
    //   e.preventDefault();
        displayResults(inputValue)
    }
})

suggestionsList.addEventListener('click', getClickedOption)

function getClickedOption (e) {
    if(e.target.classList.contains('term-list')) {
        inputValue = e.target.innerHTML
        displayResults(inputValue)
    }
}


///Section RESULTS. Print the title and the gifs on grid

function displayResults (e) {
    // e.preventDefault()
 
    // if(inputValue === '') {
    //     showError()
    //     return
    // }

    // function showError () {
    //     errorContainer.style.display = 'flex'
    // }

    // setTimeout(() => {
    //     errorContainer.remove()
    // }, 5000)

    // suggestionsList.classList.toggle('not-displayed')

    cleanGrid ()
    printTitle(inputValue)
    getGifs(inputValue)    
}

const title = document.createElement("h2")

function printTitle (inputValue) {
    resultsSection.classList.add('is-displayed')
    title.innerHTML = ''
    title.innerHTML = inputValue
    resultsSection.appendChild(title)
}

const getGifs = async (inputValue) => {
    let urlApi= `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${inputValue}&offset=0&rating=g&lang=en`    
    
    try {
        const response = await fetch(urlApi)
        const datos = await response.json()
        const dataArray = datos.data
        // console.log(dataArray)

        createGrid(dataArray.map((gif) => {
            return gif.images.fixed_width_downsampled.url
        }))

        totalPages = calculatePage(50)
        console.log(totalPages)
    }

    catch(error) {
        console.log(error)
    }
}

const createGrid = (gifs) => {
    console.log(gifs)
    const gridResults = document.createElement("div")
    gridResults.setAttribute('class', 'grid-results') 
    resultsSection.appendChild(gridResults)

    gifs.map((gif) => {
        const card = document.createElement("div")
        const image = document.createElement("img")
        image.setAttribute('src', gif)
        gridResults.appendChild(card)
        card.appendChild(image)
        
    })
}


///GENERADOR DE paginas

function calculatePage (total) {
    return parseInt(Math.ceil(total/pagesRecord))
}




////////////////////////////////////////////////////////////////
//Events CLEAN ICON. Clean the input, list, title and gifs results

cleanBtn.addEventListener('click', cleanList)  


function cleanList() {
    searchBtn.classList.remove('not-displayed')
    cleanBtn.classList.remove('is-displayed')
    searchInput.value= ''
    suggestionsList.innerHTML = ''
}

cleanBtn.addEventListener('click',cleanGrid)

function cleanGrid () {
    resultsSection.classList.remove('is-displayed')
    resultsSection.innerHTML = ''
}


///TRENDING TERMS



const getTrends = async () => {
    let urlApi = `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`

    try {
        const response = await fetch(urlApi)
        const datos = await response.json()
        const dataArray = datos.data 
        printTrends(dataArray)
        // console.log(dataArray)
    }

    catch(error) {
        console.log(error)
    }
}
getTrends()

function printTrends (dataArray) {
    
    for (let i=0; i<5; i++){
        const word=document.createElement("p")
        const coma=document.createElement("p")
        word.setAttribute('class', 'term' )
        word.innerHTML=dataArray[i]
        coma.innerHTML=',  '
        trendingTerms.appendChild(word)
        trendingTerms.appendChild(coma)
    }
}

trendingTerms.addEventListener('click', getclickedTrend)

function getclickedTrend (e) {
    if(e.target.classList.contains('term')) {
        clickedTrend = e.target
        inputValue = clickedTrend.innerHTML
    }
    cleanGrid ()
    getGifs(inputValue)
    printTitle(inputValue)
}
