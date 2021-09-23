const apiKey = 'Fqq38oja6ND6fh0e1eu6njn1coTJ6pBd'

let pageNumber=1 
let pageSize=12  
let pagination 
let pageCont 

//pagination
function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

//Reutilizable fn
function readData(card) {
    let  cardInfo = {
        image: card.querySelector('img').src,
        title: card.querySelector('img').alt,
        username: card.querySelector('span').innerText,
        idGif:card.querySelector('.id-gif').innerText
    }
        return cardInfo
}
