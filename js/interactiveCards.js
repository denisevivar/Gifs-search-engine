const body = document.body
const closeBtn = document.querySelector('.close-modal')
const modalContainer = document.querySelector('.modal-container')
const modalContent = document.querySelector('.modal-content')
let modalCard   
let gifsArray = []
const resultsSectionFav = document.querySelector('#results-fav')
const verMasFav = document.querySelector('.vermas-btn')
const errorContainerFav = document.querySelector('.error-container-fav')

// Show modal ( max button click)
body.addEventListener('click', showModal)

function showModal (e) {
    if(e.target.classList.contains('max-icon')) {
        e.preventDefault()
        // e.stopPropagation()
        modalContainer.style.display= 'flex'
        modalContainer.style.position= 'fixed'
        selectedCard = e.target.parentElement.parentElement.parentElement
        let {image, title, username} = readData(selectedCard)
        modalHtml (image, title, username)
    }
}

function modalHtml (image, title, username) {
    let resultsHTML = ''
    resultsHTML +=
        `<div>
            <img src="${image}">  
            <div>
                <div>
                    <span>${username !== '' ? username: 'Usuario' }</span>  
                    <h3>${title}</h3>  
                </div>
            </div> 
        </div>`
        modalContent.innerHTML = resultsHTML
}

modalContainer.addEventListener('click', closeModal)
function closeModal(e) {
    e.preventDefault()
    // e.stopPropagation()
        modalContainer.style.display= 'none'
        modalContainer.style.position= 'static'
    cleanModal()
}

function cleanModal () {
    modalCard = []
    modalContent.innerHTML = ''
}

//handle card hover effect
body.addEventListener('click', (e)=>{
    if(e.target.classList.contains('card-img')) {
        coverhover = e.target.parentElement.childNodes[1].classList.toggle('card-hover-off') 
    }
})

body.addEventListener('click', (e)=>{
    if(e.target.classList.contains('card-hover')) {
        coverhover = e.target.parentElement.childNodes[1].classList.toggle('card-hover-off')
    }
})

// download image (download btn)
body.addEventListener('click', downloadImage)

function downloadImage (e) {
    if(e.target.classList.contains('download-icon')) {
        e.preventDefault()
        selectedBtn = e.target
        const link = document.createElement('a')
        selectedBtn.appendChild(link)
        selectedCard = e.target.parentElement.parentElement.parentElement

        let gifInfo = readData(selectedCard)
        let gifSrc = gifInfo.image
        let gifTitle = gifInfo.title
    
        async function downloadImage() {
            try {
                const response = await fetch(gifSrc)
                const blob = await response.blob()
                const imageURL = window.URL.createObjectURL(blob)

                link.href = imageURL
                link.download = gifTitle
                link.click()
                selectedBtn.removeChild(link)
            }
            catch (err) {
                console.log(err.message)
            }
        }
        downloadImage(gifSrc, gifTitle)
    }
}

//Save in Favs (heart button click) & set in local storage

body.addEventListener('click', saveInFavs)

function saveInFavs (e) {
    if(e.target.classList.contains('heart-icon')) {
        e.preventDefault()
        e.target.style.display= 'none'
        e.target.parentElement.childNodes[3].style.display= 'block'
        selectedCard = e.target.parentElement.parentElement.parentElement
        let gifInfo = readData(selectedCard)
        gifsArray = [...gifsArray, gifInfo]

        setInLocalStorage()
    }
}



function setInLocalStorage () {
    localStorage.setItem('gifs', JSON.stringify(gifsArray))
}

//remove gif from favs & LS
body.addEventListener('click', removeFromFavs)

function removeFromFavs (e) {
    if(e.target.classList.contains('heart-icon-active')) {
        e.target.style.display= 'none'
        e.target.parentElement.childNodes[1].style.display= 'block'
        let gifInfo = readData(selectedCard)
        let gifId = gifInfo.idGif
        gifsArray = gifsArray.filter(gif => gif.idGif !== gifId)
        
        setInLocalStorage()
    }
}


//show gifs in favs
document.addEventListener('DOMContentLoaded', ()=>{
    gifsArray = JSON.parse(localStorage.getItem('gifs')) || []

    gifsArray == '' ? showErrorFav() : showFavs(gifsArray)
})

const showFavs = (_array) => {
    pagination = paginate(gifsArray,pageSize,pageNumber)

    const gridResults = document.createElement("div")
    gridResults.setAttribute('class', 'grid-results') 
    resultsSectionFav.appendChild(gridResults) 

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
                <img class="card-img" src="${gifItem.image}" alt="${gifItem.title}">
            </div>`
        })    
    gridResults.innerHTML = resultsHTML
                 
    pageCont = Math.ceil(gifsArray.length/pageSize)
    pageNumber < pageCont ? verMasFav.classList.add('is-displayed') : null
    pageNumber >= pageCont ? verMasFav.classList.remove('is-displayed') : null
}

function showErrorFav() {
    errorContainerFav.classList.add('is-displayed')
}

function seeMore(){
    pageNumber ++;
    showGifs(gifsArray)
}





