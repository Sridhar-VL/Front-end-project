const ACCESS_TOKEN = "10223569763528853";
    const URL = `https://www.superheroapi.com/api.php/${ACCESS_TOKEN}`;

    const randomBtnElement = document.getElementById("js-btn");
    const divElement = document.getElementById("js-div");
    const searchInput= document.getElementById("search-input");
    const searchButton= document.getElementById("search-button");
    const showResults=(data)=>{
      let name=`<h1>${data.name}`;
      let img=`<img src="${data.image.url}" `;
      let powerstats=`<p>${data.powerstats.intelligence}`

    }

    // Generate a random hero ID
    const getRandom = () => {
      let count = 731;
      return Math.floor(Math.random() * count) + 1;
    };

    randomBtnElement.onclick = () => {
      let rand = getRandom();
      console.log("Random ID:", rand);

      fetch(`${URL}/${rand}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          divElement.innerHTML = `
            <h3>${data.name}</h3>
            <img src="${data.image.url}" width="200" height="200">
            <p><strong>Full Name:</strong> ${data.biography["full-name"]}</p>
            <p><strong>Power:</strong> ${data.powerstats.power}</p>
          `;
        })
    };

    searchButton.onclick=()=>{
      let search= searchInput.value;
      console.log("Search Name:",search);
      fetch(`${URL}/search/${search}`)
      .then((responsive) =>responsive.json())
      .then((data)=>{
        console.log(data);
        divElement.innerHTML=` <h3>${results(0).name}</h3>
            <img src="${results(0).image.url}" width="200" height="200">
            <p><strong>Full Name:</strong> ${results(0).biography["full-name"]}</p>
            <p><strong>Power:</strong> ${results(0).powerstats.power}</p>
          `;
      }
    )
    }