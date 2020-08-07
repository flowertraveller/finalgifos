/* BRING SEARCH RESULTS */
const searchForm = document.getElementById('search-bar-input') 
const searchInput = document.getElementById('search-bar-input-place')
const resultsEl = document.getElementById('results')
searchForm.addEventListener('submit', function(e) {
e.preventDefault()
const q = searchInput.value
search(q)
})
function search(q) {
  document.querySelector(".bringresults").style.display = "block";
  const apikey = 'IqeMD59NavOyu6it77HFJvw67npZMlvh'
  const path = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}&limit=100`
    fetch(path).then(function(res) { 
      return res.json()  
       }).then(data => {
        innerGifs = document.getElementById("results");
        innerGifs.innerHTML = "";
        for (var i = 0; i < 20; i++) {
          gifID = data.data[i].id;
          imgURL = data.data[i].images.original.url;
          gifDiv = document.createElement("div");
          gifDiv.className = "gif";
          innerGifs.appendChild(gifDiv);
          imgChild = document.createElement("img");
          imgChild.className = "item3";
          imgChild.src = imgURL;
          titleDiv = document.createElement("div");
          titleDiv.className = "headerSearch";
          titleDiv.id = `gif-${i + 1}`;
          gifDiv.append(imgChild, titleDiv);
          titulo_gif = data.data[i].title.trim().split(" ");
          titulo_gif = titulo_gif.filter(del => del !== "GIF");
          for (var j = 0; j <= 2; j++) {
            if (titulo_gif[j] !== undefined && titulo_gif[j] !== "") {
              spanChild = document.createElement("span");
              spanChild.innerHTML = `#${titulo_gif[j]}`;
              document.getElementById(`gif-${i + 1}`).appendChild(spanChild);
            }
         }
         document.querySelector(".suggested-bar").style.display = "none";
         document.querySelector(".trendings").style.display = "none";
         document.querySelector(".dropdownSearchContent").style.display = "none";
         
        }
        
      })
      .catch(error => {
        return error;
      })
  }
