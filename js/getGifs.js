const searchInput = document.querySelector('#search-input')
const suggestionsList = document.querySelector('#suggestions-list')
const suggestionsDiv = document.querySelector('.suggestions-div')
const searchBtn = document.querySelector('#search-btn')
const cleanBtn = document.querySelector('#clean-btn')
const resultsSectionIndex = document.querySelector('#results')
const title = document.createElement("h2")
const trendingTerms = document.querySelector('.trending-terms')
const verMasBtn = document.querySelector('.vermas-btn')
const errorContainer = document.querySelector('.error-container')
let inputValue
let optionList


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
    catch {
        showError()
    }
}

const createList = (items) => {
    searchBtn.classList.add('not-displayed')
    cleanBtn.classList.add('is-displayed')
    suggestionsList.innerHTML = ''

    let resultsHTML =''

    items.map(item => {
        resultsHTML +=
        `<div class="option-list">
                <icon class="fa fa-search"></icon>
                <li class="term-list">${item}</li>
         </div>`
    })
    suggestionsList.innerHTML = resultsHTML
}

//Search by suggestion list
function getClickedOption (e) {
    if(e.target.classList.contains('term-list')) {
        inputValue = e.target.innerHTML
        displayResults(inputValue)
        console.log(inputValue)
    }
}

//Display results. Print the title and the gifs on grid

function displayResults () {
    cleanGrid ()
    printTitle(inputValue)
    getGifs(inputValue)    
}

//print Title
function printTitle (inputValue) {
    resultsSectionIndex.classList.add('is-displayed')
    title.innerHTML = ''
    title.innerHTML = inputValue
    resultsSectionIndex.appendChild(title)
}

//get gifs by input value
const getGifs = async (inputValue) => {
    let urlApi= `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${inputValue}&offset=0&rating=g&lang=en`    
    
    try {
        const response = await fetch(urlApi)
        const datos = await response.json()
        dataArray = datos.data

        showGifs(dataArray)
    }
    catch {
        showError()
    }

    if(dataArray == '') {
        showError()
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
    catch {
        showError()
    }
}
getTrends()

function printTrends (dataArray) {
    let resultsHTML = ''
    for (let i=0; i<5; i++){
        resultsHTML +=
            `<p class="term">${dataArray[i]}</p>
            <p> - </p>
            `
            
    }
    trendingTerms.innerHTML = resultsHTML
}
// <p class="term">~  </p>

function getclickedTrend (e) {
    if(e.target.classList.contains('term')) {
        clickedTrend = e.target
        inputValue = clickedTrend.innerHTML
    }
    cleanGrid ()
    getGifs(inputValue)
    printTitle(inputValue)
}

function seeMore(){
    pageNumber ++;
    showGifs(dataArray)
}

const showGifs = (_array) => {
    pagination = paginate(dataArray,pageSize,pageNumber);

    const gridResults = document.createElement("div")
    gridResults.setAttribute('class', 'grid-results') 
    resultsSectionIndex.appendChild(gridResults) 

    let resultsHTML = ''

    pagination.map(gifItem =>{
            resultsHTML +=
            `<div class="card">
                <div class="card-hover card-hover-off">
                    <div class="card-icons">
                        <div class="icons heart-icon"></div>
                        <div class="icons heart-icon-active"></div>    
                        <div class="icons download-icon"></div>
                        <div class="icons max-icon"></div>
                    </div>
                    <div class="card-txt">
                        <span>${gifItem.username !== '' ? gifItem.username: 'User' }</span> 
                        <span class="id-gif">${gifItem.id}</span>  
                        <h3>${gifItem.title}</h3>  
                    </div>
                </div> 
                <img class="card-img" src="${gifItem.images.fixed_width.url}" alt="${gifItem.title}">
            </div>`
        })    

    gridResults.innerHTML = resultsHTML
                 
    pageCont = Math.ceil(dataArray.length/pageSize)
    pageNumber < pageCont ? verMasBtn.classList.add('is-displayed') : null
    pageNumber >= pageCont ? verMasBtn.classList.remove('is-displayed') : null
}

//Clean the input, list, title and gifs results
function cleanList() {
    searchBtn.classList.remove('not-displayed')
    cleanBtn.classList.remove('is-displayed')
    verMasBtn.classList.remove('is-displayed')
    errorContainer.classList.remove('is-displayed')
    searchInput.value= ''
    suggestionsList.innerHTML = ''
}

function cleanGrid () {
    resultsSectionIndex.classList.remove('is-displayed')
    resultsSectionIndex.innerHTML = ''
}

//Show error if searching doesnt work
function showError () {
    resultsSectionIndex.classList.remove('is-displayed')
    errorContainer.classList.add('is-displayed')

    setTimeout(() => {
        errorContainer.remove()
    }, 5000)
}



