const apiKey = 'Fqq38oja6ND6fh0e1eu6njn1coTJ6pBd'
const searchInput = document.querySelector('#search-input')
const suggestionsList = document.querySelector('#suggestions-list')
const suggestionsDiv = document.querySelector('.suggestions-div')
const searchBtn = document.querySelector('#search-btn')
const cleanBtn = document.querySelector('#clean-btn')
const resultsSection = document.querySelector('#results')
const title = document.createElement("h2")
const trendingTerms = document.querySelector('.trending-terms')
const verMasBtn = document.querySelector('#vermas-btn')
let gifs
let inputValue
let optionList
let pageNumber=1 
let pageSize=12  
let pagination 
let pageCont 


//Event suggestions list (input)
searchInput.addEventListener('keyup', (e) => {
    inputValue = e.target.value
    getTerms(inputValue)
})

//Event search gifs by suggestion list
suggestionsList.addEventListener('click', getClickedOption)

//Event search term by input (enter)
searchInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
    //   e.preventDefault();
        displayResults(inputValue)
    }
})

//Event search by clicked trend
trendingTerms.addEventListener('click', getclickedTrend)

//Event see more btn (pagination)
verMasBtn.addEventListener ('click', seeMore)

//Event CLEAN ICON. 
cleanBtn.addEventListener('click', cleanList) 
cleanBtn.addEventListener('click',cleanGrid) 


//SUGGESTIONS LIST
const getTerms = async (inputValue) => {
    let urlApi = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${inputValue}&limit=5&offset=0&rating=g&lang=es`

    try {
        const response = await fetch(urlApi)
        const datos = await response.json()
        const dataArray = datos.data

        let items = dataArray.map(item => item.name)

        createList(items)
    }
    catch(error) {
        console.log(error)
    }
}

const createList = (items) => {
    searchBtn.classList.add('not-displayed')
    cleanBtn.classList.add('is-displayed')
    suggestionsList.innerHTML = ''

    items.map(item => {
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

//Search by suggestion list
function getClickedOption (e) {
    if(e.target.classList.contains('term-list')) {
        inputValue = e.target.innerHTML
        displayResults(inputValue)
    }
}


//Display results. Print the title and the gifs on grid

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

//print Title
function printTitle (inputValue) {
    resultsSection.classList.add('is-displayed')
    title.innerHTML = ''
    title.innerHTML = inputValue
    resultsSection.appendChild(title)
}

//get gifs by input value
const getGifs = async (inputValue) => {
    let urlApi= `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${inputValue}&offset=0&rating=g&lang=en`    
    
    try {
        const response = await fetch(urlApi)
        const datos = await response.json()
        const dataArray = datos.data

        gifs = dataArray.map(gif => gif.images.fixed_width_downsampled.url)
        showGifs(gifs)
    }

    catch(error) {
        console.log(error)
    }
}

//TRENDING TERMS
const getTrends = async () => {
    let urlApi = `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`

    try {
        const response = await fetch(urlApi)
        const datos = await response.json()
        const dataArray = datos.data 
        printTrends(dataArray)
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

function getclickedTrend (e) {
    if(e.target.classList.contains('term')) {
        clickedTrend = e.target
        inputValue = clickedTrend.innerHTML
    }
    cleanGrid ()
    getGifs(inputValue)
    printTitle(inputValue)
}


//pagination
function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

function seeMore(){
    pageNumber ++;
    showGifs(gifs)
}

const showGifs = (gifs) => {
    pagination = paginate(gifs,pageSize,pageNumber);

    const gridResults = document.createElement("div")
    gridResults.setAttribute('class', 'grid-results') 
    resultsSection.appendChild(gridResults)

    pagination.map((gif) => {
        const card = document.createElement("div")
        card.setAttribute('class', 'card')
        const image = document.createElement("img")
        image.setAttribute('src', gif)
        gridResults.appendChild(card)
        card.appendChild(image)
    })
    pageCont = Math.ceil(gifs.length/pageSize)

    pageNumber < pageCont ? verMasBtn.classList.add('is-displayed') : null
    pageNumber >= pageCont ? verMasBtn.classList.remove('is-displayed') : null
}

//Clean the input, list, title and gifs results
function cleanList() {
    searchBtn.classList.remove('not-displayed')
    cleanBtn.classList.remove('is-displayed')
    searchInput.value= ''
    suggestionsList.innerHTML = ''
}

function cleanGrid () {
    resultsSection.classList.remove('is-displayed')
    resultsSection.innerHTML = ''
}


