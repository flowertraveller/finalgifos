"use strict";
/* SUGGESTED GIFOS WITH FIXED ARRAY */
let arreySug = ['fun', 'laugh', 'funny', 'smile', 'fall', 'lol', 'mock', 'trending', 'gif', 'today', 'animal', 'randome', 'fail', 'beach'];
let show = arreySug[Math.floor(Math.random() * arreySug.length)];
const suggested = document.getElementById('suggested-title')
const q = show
searchSug(q)
async function searchSug(q) {
    try { 
    const apikey = 'IqeMD59NavOyu6it77HFJvw67npZMlvh'
    const path = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}&limit=4`
    let data = await fetch(path).then(res => res.json()).then(data => data.data);    
    const suggested = document.getElementById('suggested-input')
    console.log(data)
                data.forEach(item => {
                const suggestedDiv = document.createElement('div');            
                suggestedDiv.classList.add('suggestedDiv');

                const header = document.createElement('div');   
                const button3 = document.createElement('img');  
                header.classList.add('headergif');
                button3.src = './assets/button3.svg';
                button3.classList.add('button3');

                let titleArr = item.title.split(("")[1]).map(word => `# ${word} `)
                titleArr.forEach(title => header.innerText+=`${title}`);

                const imageArr = document.createElement('img');
                imageArr.classList.add('item3');
                imageArr.setAttribute('src', item.images.original.url);
                imageArr.setAttribute('style', 'width: 100%')
                console.log( imageArr);

                const buttonArr = document.createElement("div")
                buttonArr.classList.add('suggested-button');
                buttonArr.innerHTML="Ver más";
                buttonArr.setAttribute('type','button');

                suggestedDiv.appendChild(header);
                suggestedDiv.appendChild(button3);
                suggestedDiv.appendChild(imageArr);
                suggestedDiv.appendChild(buttonArr);
                suggested.appendChild(suggestedDiv);
                })              
            }  
            catch (error) {
              console.log('failed', error);
        }
        let seemore = document.getElementById('suggested-input');
        seemore.addEventListener('click', function() {
        window.open('https://giphy.com/categories','_blank');
              })
}


 /* TRENDING GIFOS   */
 async function trending() {
  const apikey = 'IqeMD59NavOyu6it77HFJvw67npZMlvh'
  try {
      let path = (`https://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=17`);
      const data = await fetch(path).then(res => res.json()).then(data => data.data);  
              const trendingContainer = document.getElementById('bringtrending');

              data.forEach(item => {
              const trendingDiv = document.createElement('div');            
              trendingDiv.classList.add('trendingDiv');
              
              const trendingHover = document.createElement('div');   
              trendingHover.classList.add('headergifTrending');
              let titleArr = item.title.split(("")[1]).map(word => `# ${word} `);
              titleArr.forEach(title => trendingHover.innerText+=`${title}`);

              const trendingImage = document.createElement('img');
              trendingImage.classList.add('item2');
              trendingImage.setAttribute('src', item.images.fixed_height.url);
              trendingImage.setAttribute('style', 'width: 100%');
              trendingImage.setAttribute('style', 'height: 298px');
              console.log(trendingImage);
              trendingDiv.appendChild(trendingImage);                
              trendingDiv.appendChild(trendingHover);
              trendingContainer.appendChild(trendingDiv);
          })
          
      }
       catch (error) {
          console.log('failed', error);
  }
}
trending();





