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
