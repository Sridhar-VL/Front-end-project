const images=['./Image/IMG-20250626-WA0001.jpg','./Image/IMG-20250626-WA0002.jpg','./Image/IMG-20250626-WA0003.jpg','./Image/IMG-20250626-WA0004.jpg','./Image/IMG-20250626-WA0005.jpg','./Image/IMG-20250626-WA0006.jpg'];
let imageindex=0;
const imageElement=document.getElementById('image');
function showimage(index){
    imageElement.src=images[index];
}
setInterval(()=>{
    imageindex=(imageindex+1)%images.length;
    showimage(imageindex);
},7000);
function right(){
    imageindex=(imageindex + 1) % images.length;
    showimage(imageindex);
}
function left(){
    imageindex=(imageindex - 1 + images.length)%images.length;
    showimage(imageindex);
}