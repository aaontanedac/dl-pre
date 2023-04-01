// ==UserScript==
// @name        Formato ZC Duel Links
// @version     1.0.3
// @description Añade un contador de precios para duelinks meta
// @author      @aaontanedac
// @copyright   2023
// @license     MIT
// @namespace   zc
// @homepageURL https://gist.github.com/aaontanedac
// @include     https://www.duellinksmeta.com/deck-tester
// @grant       none
// @downloadURL https://raw.githubusercontent.com/aaontanedac/dl-pre/main/script.js
// @updateURL   https://raw.githubusercontent.com/aaontanedac/dl-pre/main/script.js

// ==/UserScript==


function calcular_valor(){
  var deck = document.getElementsByClassName('deck-container svelte-z2tetq')[0];
  var cartas = deck.getElementsByClassName('card svelte-1h71uu4');
  var allrarity = [];
  var valor = 0;
  
  console.log(cartas.lenght);
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
}
