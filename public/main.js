

document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.querySelector("#searchBtn");
  const placeHolder = document.querySelector("#definition-info");
  const inputField = document.querySelector("#searchTerm");
  const dropdown = document.querySelector("#top-definitions");
  const toggle = document.getElementById("modeToggle");


  // Set default mode to dark
  document.body.classList.remove("light-mode");

  toggle.addEventListener("change", () => {
    document.body.classList.toggle("light-mode");
  });

    //   dark/light mode toggle
  toggle.addEventListener("change", function () {
    document.body.classList.toggle("dark-mode");
  });
    
  //   api key
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4733d8479fmsh1ffe398224e4658p15d1c9jsnc5c8c3e94a0f',
      'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
    }
  };
  //   search bar functionality
  async function getDefinition() {
    const term = inputField.value.trim();
    if (!term) {
      placeHolder.innerHTML = "Please enter a word.";
      return;
    }

    placeHolder.innerHTML = "Searching...";

    // dynamic api link search
    try {
      const res = await fetch(`https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${term}`, options);
      const data = await res.json();

      if (data.list.length === 0) {
        placeHolder.innerHTML = `<p>No definition found for "${term}".</p>`;
        inputField.value = "";
        return;
      }

     //   definition + Example display
      const { definition, example } = data.list[0];

      placeHolder.innerHTML = `
        <h2>Definition of "${term}"</h2>
        <p>${definition}</p>
        <p><strong>Example:</strong> ${example}</p>
      `;
      inputField.value = "";
    } catch (err) {
      console.error(err);
      placeHolder.innerHTML = `<p>Error fetching definition.</p>`;
      inputField.value = "";
    }
  }

    //   Dropdown menu functionality
  searchBtn.addEventListener("click", getDefinition);

  inputField.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      getDefinition();
    }
  });

  
  dropdown.addEventListener("change", function () {
    const selectedWord = dropdown.value;
    inputField.value = selectedWord;
    getDefinition();

    setTimeout(() => {
      dropdown.selectedIndex = 0;
    }, 300);
  });
});
