const closeBtn = document.querySelector('.close-modal')
const cardsList = document.querySelector('#slider')
const modalContainer = document.querySelector('.modal-container')
const modalContent = document.querySelector('.modal-content')
let modalCard   

cardsList.addEventListener('click', showModal)
closeBtn.addEventListener('click', closeModal)

function showModal (e) {
    if(e.target.classList.contains('max-icon')) {
        modalContainer.style.visibility = 'visible'
        selectedCard = e.target.parentElement.parentElement.parentElement
        readData(selectedCard)
    }
}

function readData(card) {
    const cardInfo = {
        image: card.querySelector('img').src,
        title: card.querySelector('img').alt,
        subtitle: card.querySelector('span').innerText    
    }
    modalCard = cardInfo
    modalHtml()
}

function modalHtml () {
    const img = document.createElement('img')
    const h4 = document.createElement('h4')
    const h3 = document.createElement('h3')
    const icons = document.createElement('div')
    const icon1 = document.createElement('div')
    const icon2 = document.createElement('div')
    icons.classList = ('card-icons')
    img.src = `${modalCard.image}`
    h4.innerHTML = `${modalCard.subtitle}`
    h3.innerHTML = `${modalCard.title}`
    icon1.classList = ('icons heart-icon')
    icon2.classList = ('icons download-icon')
    modalContent.appendChild(img)
    icons.appendChild(icon1)
    icons.appendChild(icon2)
    modalContent.appendChild(icons)
    modalContent.appendChild(h4)
    modalContent.appendChild(h3)
}
   
function closeModal() {
    modalContainer.style.visibility = 'hidden'
    cleanModal()
}

function cleanModal () {
    modalCard = []
    modalContent.innerHTML = ''
}


