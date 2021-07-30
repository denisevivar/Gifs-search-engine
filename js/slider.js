const slider = document.getElementById('slider')
const prevBtn = document.getElementById('sliderbtn-prev')
const nextBtn = document.getElementById('sliderbtn-next')

prevBtn.addEventListener('click',(e)=>{
    slider.scrollBy(-300,0)
}) 

nextBtn.addEventListener('click',(e)=>{
    slider.scrollBy(300,0)
})
