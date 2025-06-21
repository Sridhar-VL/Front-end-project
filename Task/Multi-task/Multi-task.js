//flipcoin
function flipCoin() {
  const value = Math.floor(Math.random() * 2); 
  let result;

  switch (value) {
    case 0:
      result = "Heads";
      break;
    case 1:
      result = "Tails";
      break;
  }

  document.getElementById("coinResult").textContent = "Result: " + result;
}


    // 2. Welcome Name
    function showWelcome() {
      const name = document.getElementById('nameInput').value;
      document.getElementById('welcomeMsg').textContent = name ? "Welcome " + name : "";
    }

    // 3. Live Search
    function showSearch() {
      const query = document.getElementById('searchInput').value;
      document.getElementById('searchOutput').textContent = query ? "You typed: " + query : "";
    }

    // 4. Counter
    let count = 0;

    function changeCount(val) {
      count += val;
      updateCounter();
    }

    function resetCount() {
      count = 0;
      updateCounter();
    }

    function updateCounter() {
      document.getElementById('counterValue').textContent = "Value: " + count;
    }