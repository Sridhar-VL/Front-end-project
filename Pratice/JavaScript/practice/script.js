//Function for creating A Subscrided Button
function Subscribe(){
    let value=document.querySelector(".js-subscribe-btn");
    if(value.innerText==="Subscribe 🔔"){
        value.innerText="Unsubscribe 🔕";
    }
    else{
         value.innerText = "Subscribe 🔔";

    }
}

function calculateShippingCharge(){
    let value=document.querySelector(".js.input").value;
    console.log(value);
    let cost=Number(value);
    if(value>=1000){
        cost=value;
    }
    else{
        cost+=10;
    }
     let result = document.querySelector(".js-result");
  result.innerHTML = `$${cost}`;
}

function handleKey(event) {
  let key = event.key;

  if (key === "Enter") {
    calculateShippingCharge();
 }

}
 //GetElementbyId
    function valid(){
    let value=document.querySelector('#js-follow-btn');
    if(value.innerText==="Follow"){
        value.innerText="Unfollow";
    }
    else{
        value.innerText="Follow";
    }
    
}
//GetElementbyclass
function valclass(){
    let value=document.querySelector('.js-follow-btn');
    if(value.innerText==="Follow"){
        value.innerText="Unfollow";
    }
    else{
        value.innerText="Follow";
    }
    
}
//element set attribute
const imageElement = document.querySelector('img'); // Select the image element
if (imageElement) { // Check if the element was found
    imageElement.setAttribute("src","../images/Lamborghini.webp");
} else {
    console.error("Image element not found.");
}
//dog random img
const URL = "https://dog.ceo/api/breeds/image/random";
const buttonElement = document.getElementById('btn-get-img'); 


    buttonElement.addEventListener('click', function() {
        fetch(URL)
            .then((response) => response.json())
            .then((json) => console.log(json.message));
    });

   