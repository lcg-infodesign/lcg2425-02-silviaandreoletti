function preload() {
  // put preload code here
}

let elementSize = 50; // Dimensione elementi
let distance = 50; // Distanza tra glifi
let margin = 10; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop(); 
}

function draw() {
  background(255); 
  drawElements(); // Disegna gli elementi
}

// Funzione per calcolare la posizione e disegnare la griglia di elementi
function drawElements() {
  // Calcola numero massimo colonne e righe in base alla dimensione della finestra
  let columns = floor((windowWidth - 2 * margin) / (elementSize + distance));
  let rows = floor((windowHeight - 2 * margin) / (elementSize + distance));

  // Calcola largezza e altezza totale griglia
  let totalWidth = columns * (elementSize + distance) - distance; 
  let totalHeight = rows * (elementSize + distance) - distance; 
  // Calcola offset orizzontale e verticale per centrare griglia nella finestra
  let startX = (windowWidth - totalWidth) / 1.5; 
  let startY = (windowHeight - totalHeight) / 1.5; 
  // Utilizzo 1.5 e non 2 per calcolare posizione griglia poiché miglior risultato visivo nella disposizione elementi 
  // -> centra griglia in modo equilibrato, mentre 2 tende a portare griglia troppo vicino al bordo della finestra 

  // Cicloche calcola coordinate x e y di ogni elemento 
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      let x = startX + j * (elementSize + distance);
      let y = startY + i * (elementSize + distance);

      // Genera un elemento grafico
      drawGlyph(x, y, elementSize);
    }
  }
}

// Funzione che disegna ogni glifo in una posizione specifica
function drawGlyph(x, y, size) {
  push(); // Salva lo stato corrente trasformazione
  // Utilizzo valore randomico per determinare di quanto spostare glifo rispetto alla sua posizione base x, y
  let variationX = random(-5, 5); 
  let variationY = random(-5, 5); 
  translate(x + variationX, y + variationY); // Trasla sistema di coordinate
  

  // Applica una rotazione casuale
  let angle = random(TWO_PI) * 1.5; // Genera angolo casuale tra 0 e 360° * 1.5
  rotate(angle); // Applica rotazione casuale generata ruotando contenuto del disegno intorno all'origine del sistema di coordinate che è stata traslata 

  strokeWeight(2); 
  stroke(0); 
  noFill(); 

  // Disegna un glifo composto da curve con diversi punti di controllo
  let numCurves = floor(random(4, 7)); // Numero di curve
  for (let i = 0; i < numCurves; i++) { 
    let startX = random(-size / 2, size / 2);
    let startY = random(-size / 2, size / 2);

    // Punti di controllo 
    let cp1X = startX + random(-size / 2, size / 2);
    let cp1Y = startY + random(-size / 2, size / 2);
    let cp2X = random(-size / 2, size / 2); // Secondo punto di controllo
    let cp2Y = random(-size / 2, size / 2); 
    let endX = random(-size / 2, size / 2); // Punto finale
    let endY = random(-size / 2, size / 2); 

    // Disegna una curva di Bézier 
    beginShape();
    vertex(startX, startY); // Imposta punto iniziale
    bezierVertex(cp1X, cp1Y, cp2X, cp2Y, endX, endY); // Definisce curva con i punti di controllo e il punto finale
    endShape(); // Chiude curva 
  }

  pop(); // Ripristina lo stato precedente in modo che prossimo glifo non sia influenzato da trasformazioni 
}
