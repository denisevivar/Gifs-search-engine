const slider = document.getElementById('slider')
const prevBtn = document.getElementById('sliderbtn-prev')
const nextBtn = document.getElementById('sliderbtn-next')

async function getTrendings(){
    let urlApi= `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25&rating=g`   
    const response = await fetch(urlApi)
    const datos = await response.json()
    const dataArray = datos.data 
    printTrendingCards(dataArray)
}
getTrendings()

function printTrendingCards(dataArray) {  
    for (let i=0; i<dataArray.length; i++){
        let imageGif = dataArray[i].images.original.url
        let imageTitle = dataArray[i].title
        let username = dataArray[i].username
        let divSlider = document.getElementById('slider')
        let divCard = document.createElement('div')
        let cardMouseOv = document.createElement('div')
        let image2 = document.createElement('img')
        let spanTitle = document.createElement('span')
        let titleCard = document.createElement('h3')
        let descCard = document.createElement('p')
        let cardIcons = document.createElement('div')
        let heartIcon = document.createElement('div')
        let downloadIcon = document.createElement('div')
        let maxIcon = document.createElement('div')
        divCard.setAttribute('class', 'slider-card' )
        image2.setAttribute('src', imageGif)
        image2.setAttribute('class', 'card-img')
        image2.setAttribute('alt', imageTitle)
        cardMouseOv.setAttribute('class','card-mouseover card-mouseover-off')
        cardIcons.setAttribute('class','card-icons')
        heartIcon.setAttribute('class', 'icons heart-icon')
        heartIcon.setAttribute('id', 'heartIcon')
        downloadIcon.setAttribute('class', 'icons download-icon')
        downloadIcon.setAttribute('id', 'downloadIcon')
        maxIcon.setAttribute('class', 'icons max-icon')
        maxIcon.setAttribute('id', 'maxIcon')
        divSlider.appendChild(divCard)
        divCard.appendChild(image2)
        divCard.appendChild(spanTitle) 
        divCard.appendChild(cardMouseOv)
        cardMouseOv.appendChild(cardIcons)
        cardIcons.appendChild(heartIcon)
        cardIcons.appendChild(downloadIcon)
        cardIcons.appendChild(maxIcon)
        cardMouseOv.appendChild(descCard)
        cardMouseOv.appendChild(titleCard)
        spanTitle.innerHTML = username
        descCard.innerHTML = username
        titleCard.innerHTML = imageTitle

        // divCard.addEventListener('mouseover',() => { 
        //     cardMouseOv.classList.toggle('card-mouseover-off')
        // })

        // divCard.addEventListener('mouseout',() => {
        //     cardMouseOv.classList.toggle('card-mouseover-off')   
        // })

        heartIcon.addEventListener('click', () => {
            heartIcon.classList.toggle('heart-icon-filled')
        })      
    }
}




prevBtn.addEventListener('click',(e)=>{
    slider.scrollBy(-300,0)
}) 

nextBtn.addEventListener('click',(e)=>{
    slider.scrollBy(300,0)
})






