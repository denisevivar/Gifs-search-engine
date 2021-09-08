document.addEventListener('mouseover', cardMouseover)

function cardMouseover (e) {
    if(e.target.classList.contains('card')) {

        function setMouseover (pagination) {

            let card = document.querySelector('.card')

            console.log(pagination)

            // for (let i=0; i<gifsDataArray.length; i++){
            // //     // let imageGif = dataArray[i].images.original.url
            //     let title = gifsDataArray[i].title
            //     let username = gifsDataArray[i].username
            // //     // let divSlider = document.getElementById('slider')
            // //     // let divCard = document.createElement('div')
            //     let cardMouseOv = document.createElement('div')
            // //     // let image2 = document.createElement('img')
            //     let spanUser = document.createElement('span')
            //     let titleCard = document.createElement('h3')
            // //     let descCard = document.createElement('p')
            // //     let cardIcons = document.createElement('div')
            // //     let heartIcon = document.createElement('div')
            // //     let downloadIcon = document.createElement('div')
            // //     let maxIcon = document.createElement('div')
            // //     // divCard.setAttribute('class', 'card' )
            // //     // image2.setAttribute('src', imageGif)
            // //     // image2.setAttribute('class', 'card-img')
            // //     // image2.setAttribute('alt', imageTitle)
            // //     cardMouseOv.setAttribute('class','card-mouseover card-mouseover-off')
            // //     cardIcons.setAttribute('class','card-icons')
            // //     heartIcon.setAttribute('class', 'icons heart-icon')
            // //     heartIcon.setAttribute('id', 'heartIcon')
            // //     downloadIcon.setAttribute('class', 'icons download-icon')
            // //     downloadIcon.setAttribute('id', 'downloadIcon')
            // //     maxIcon.setAttribute('class', 'icons max-icon')
            // //     maxIcon.setAttribute('id', 'maxIcon')
            // //     // divSlider.appendChild(divCard)
            // //     // divCard.appendChild(image2)
        
            //         // card.appendChild(spanUser) 
            //     card.appendChild(cardMouseOv)
            // //     cardMouseOv.appendChild(cardIcons)
            // //     cardIcons.appendChild(heartIcon)
            // //     cardIcons.appendChild(downloadIcon)
            // //     cardIcons.appendChild(maxIcon)
            //     cardMouseOv.appendChild(spanUser)
            //     cardMouseOv.appendChild(titleCard)
            //     spanUser.innerHTML = username
            // //     // descCard.innerHTML = username
            //     titleCard.innerHTML = title
            // }
        
        
        }
        setMouseover (pagination)
    }
    
}

