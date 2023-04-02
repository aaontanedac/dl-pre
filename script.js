// ==UserScript==
// @name        Formato ZC Duel Links
// @version     1.0.9
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
  

const deck = document.getElementsByClassName('deck-container svelte-z2tetq')[0]
const info = document.getElementsByClassName('info-container svelte-z2tetq')[0]
const zcoins = document.createElement("span");
var isVisibleZC = false;
var price_list={};
const fixed_prices_url = 'https://raw.githubusercontent.com/aaontanedac/dl-pre/main/fixed_prices.json'

fetch(fixed_prices_url)
  .then(res => res.json())
  .then(out =>
    price_list = out)
  .catch(err => { throw err });

 //Esta funcion recupera la lista de precios cambiados 
   
function addZCtext(){ 
      let ZCtext =` <div class="is-flex is-justify-content-flex-start is-align-items-flex-end ">
                        <img src="https://raw.githubusercontent.com/aaontanedac/dl-pre/18f9df71d513018d8639f4d84b3f23921996e354/pngwing.com.png" alt="zefracoins" width=17 height=18 class="mr-2">
                        <span class="is-flex is-justify-content-flex-start is-align-items-flex-end mr-2" id="ZCtext"> 0 </span> 
                    </div>`
  info.insertAdjacentHTML('afterbegin', ZCtext)
}
  
  //End of funcion, añade texto de las ZC

deck.addEventListener("DOMNodeInserted", (e)=>{    
  
  if((e.target.parentNode.outerHTML.includes("card-container") || e.target.parentNode.outerHTML.includes("spinner-border")) &&
       e.target.nodeType==1 ) {
  
            if(!isVisibleZC){
                isVisibleZC = true;
                addZCtext();      
            }        
           
      setTimeout( calcular_valor,0);
    }
  });
 //End of event, insercion de objetos 
  

  
function calcular_valor(){
  
  console.log("Hola, estoy calculando")

  let cartas = deck.getElementsByClassName('card svelte-1h71uu4');
  let carta_desc = [];
  let valor = 0;
  let islisted= false; 
  
  for (var carta of cartas) {
    try {
      
      let carta_info = {
        'rareza':
         carta
        .getElementsByClassName('rarity-image')[0]
        .getElementsByTagName('img')[0]
        .getAttribute('alt'),
        'codigo':
        carta.getElementsByClassName('card-img')[0]
        .getAttribute('alt')
      }    
     carta_desc.push(carta_info)
      
    } catch (error) {}
  }

   for (var carta of carta_desc) {
    
      for(var carta_fixed of price_list.cartas){
          if(carta_fixed.codigo == carta.codigo){
            islisted=true;
          break;
          } 
      }
      
      if(islisted){
         valor+= carta_fixed.valor
         islisted=false;
       }else{
          switch (carta.rareza) {
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
    }  
  document.getElementById("ZCtext").innerHTML = valor;
}
// End of function "calcular_valor"                                                    

 })();
