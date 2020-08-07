"use strict";
//Dropdown + autocomplete*/
function displayDropable() {
    var x = document.getElementById("dropdownSearchContent");  
    if (x.style.display === "none") {
        x.style.display = "block";
    } 
  }
     document.getElementById("search-bar-input-place").addEventListener('input', displayDropable);
     document.getElementById("search-bar-input-place").addEventListener('input', autocomplete);
     function autocomplete(){
      let auto = document.getElementsByClassName('auto'); 
      document.getElementById('example').style.display = "block";
      document.getElementById('example1').style.display = "block";
      document.getElementById('example2').style.display = "block";
      let keyword = document.getElementById('search-bar-input-place').value;
      let keywordClean = keyword.replace('','+')
      const apikey = 'IqeMD59NavOyu6it77HFJvw67npZMlvh'
      const urlauto = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apikey}&q=${keywordClean}&limit=6`  
      let autocompleteRes = fetch(urlauto);
      autocompleteRes
      .then(response => response.json())
      .then(datos => {
          for (let i=0; i< datos.data.length; i++){
              auto[i].innerHTML = datos.data[i].name;                     
          }
      })
  }
   document.getElementsByClassName('auto')[0].addEventListener('click',autoSearch);
   document.getElementsByClassName('auto')[1].addEventListener('click',autoSearch);
   document.getElementsByClassName('auto')[2].addEventListener('click',autoSearch);
   document.getElementsByClassName('auto')[3].addEventListener('click',autoSearch);
   document.getElementsByClassName('auto')[4].addEventListener('click',autoSearch);
   document.getElementsByClassName('auto')[5].addEventListener('click',autoSearch);
  
 
   
   function autoSearch(){
    document.getElementById('search-bar-input-place').value = this.innerHTML;
    search();       
    toggleDropdownSearchContent();
    displayHidden();
   
     }
     function toggleDropdownSearchContent(){
        document.getElementById('dropdownSearchContent').style.display = "none";
       
       
    }
   document.getElementsByClassName('auto').addEventListener('click', toggleDropdownSearchContent());
  
   

    