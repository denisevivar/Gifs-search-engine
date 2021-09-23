//Print slider cards 
const divSlider = document.getElementById('slider')
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
    let resultsHTML = ''
    dataArray.map(gif =>{    
        resultsHTML +=
        `<div class="slider-card">
            <div class="card-hover card-hover-off">
                <div class="card-icons">
                    <div class="icons heart-icon"></div>
                    <div class="icons heart-icon-active"></div>
                    <div class="icons download-icon"></div>
                    <div class="icons max-icon"></div>
                </div>
                <div class="card-txt">
                    <span>${gif.username !== '' ? gif.username : 'User' }</span>
                    <span class="id-gif">${gif.id}</span>
                    <h3>${gif.title}</h3>  
                </div>    
            </div> 
            <img class= "card-img" src="${gif.images.fixed_width.url}" alt="${gif.title}">
        </div>`
    })
        divSlider.innerHTML = resultsHTML
}

//handle slider prev & back buttons
prevBtn.addEventListener('click',(e)=>{ 
    slider.scrollBy(-300,0)
}) 

nextBtn.addEventListener('click',(e)=>{
    slider.scrollBy(300,0)   
})












