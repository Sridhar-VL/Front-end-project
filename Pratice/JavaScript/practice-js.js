let array=["mark1","mark2","mark3"]

let div=document.getElementById('div');

div.innerHTML=`<p>Hello Friend </p>`

let html=``;
function loop(){
    html= ``;
for(let i=0;i<array.length;i++){
   
    html +=`<p>${array[i]}</p> <button onclick="array.splice(${i},1); loop(); class="delete-button">Delete</button>`
}
div.innerHTML = html;
}
loop();
 let gam=document.querySelector(".button1");
    function button1(){
        if(gam.innerText=="Gaming"){
            gam.innerText="Gamings";
            gam.classList.add("but1");
        }
        else{
             gam.innerText="Gaming";
            gam.classList.remove("but1");
        }
    }
    

    let tech=document.querySelector(".button2");
    function button2(){
        if(tech.innerText=="Tech"){
            tech.innerText="Techs";
            tech.classList.add("but1");
        }
        else{
             tech.innerText="Tech";
            tech.classList.remove("but1");
        }
    }



    let music=document.querySelector(".button3");
    function button3(){
        if(music.innerText=="Music"){
            music.innerText="Musics";
            music.classList.add("but1");
        }
        else{
             music.innerText="Music";
             music.classList.remove("but1");
        }
    }
  let a = 15;
setInterval(function() {
    document.querySelector('.count').innerText = a;
    a--;
    if (a < 0) a = 0;
}, 1000);
