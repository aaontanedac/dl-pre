// ==UserScript==
// @name        Formato ZC Duel Links
// @version     1.0.6
// @description Añade un contador de precios para duelinks meta
// @author      @aaontanedac
// @copyright   2023
// @license     MIT
// @namespace   zc
// @homepageURL https://gist.github.com/aaontanedac
// @match       https://www.duellinksmeta.com/*
// @grant       none
// @downloadURL https://raw.githubusercontent.com/aaontanedac/dl-pre/main/script.js
// @updateURL   https://raw.githubusercontent.com/aaontanedac/dl-pre/main/script.js
// @run-at      document-end

// ==/UserScript==
(function(){
    "usestric";
  
console.log("Estoy Aqui")
const deck = document.getElementsByClassName('deck-container svelte-z2tetq')[0]
const info = document.getElementsByClassName('info-container svelte-z2tetq')[0]
const zcoins = document.createElement("span");
var isVisibleZC = false;
  
function addZCtext(){ 
      let ZCtext =` <div class="is-flex is-justify-content-flex-start is-align-items-flex-end ">
                        <img src="https://raw.githubusercontent.com/aaontanedac/dl-pre/18f9df71d513018d8639f4d84b3f23921996e354/pngwing.com.png" alt="zefracoins" width=17 height=18 class="mr-2">
                        <span class="is-flex is-justify-content-flex-start is-align-items-flex-end mr-2" id="ZCtext"> 0 </span> 
                    </div>`
  info.insertAdjacentHTML('afterbegin', ZCtext)
}

deck.addEventListener("DOMNodeInserted", (e)=>{    
  
  if(e.target.parentNode.outerHTML.includes("card-container") || e.target.parentNode.outerHTML.includes("spinner-border") &&
       e.target.nodeType==1 ) {
  
            if(!isVisibleZC){
                isVisibleZC = true;
                addZCtext();      
            }        
           
      setTimeout( calcular_valor,0);
    }
  });
  

  
function calcular_valor(){
 
  var cartas = deck.getElementsByClassName('card svelte-1h71uu4');
  var allrarity = [];
  var valor = 0;
  
  
  for (var carta of cartas) {
    try {
      var rareza = carta
        .getElementsByClassName('rarity-image')[0]
        .getElementsByTagName('img')[0];
      allrarity.push(rareza.getAttribute('alt'));
    } catch (error) {}
  }

  for (var rar of allrarity) {
    switch (rar) {
      case 'N Rarity':
        valor += 25;
        break;
      case 'R Rarity':
        valor += 50;
        break;
      case 'SR Rarity':
        valor += 100;
        break;
      case 'UR Rarity':
        valor += 200;
        break;
      default:
        valor += 0;                         
        break;
    }
  }
  
  document.getElementById("ZCtext").innerHTML = valor + " ZC";
}
                                                    

  })();
