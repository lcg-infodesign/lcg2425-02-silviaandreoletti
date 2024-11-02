function preload() {
  // put preload code here
}

let elementSize = 50; // Dimensione fissa degli elementi
let distance = 50; // Distanza tra i glifi
let margin = 10; // Margine fisso per evitare che i glifi tocchino i bordi

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop(); // Disegna solo una volta
}

function draw() {
  background(255); // Sfondo bianco
  drawElements(); // Disegna gli elementi
}

function drawElements() {
  // Calcola il numero di colonne e righe in base alla dimensione della finestra
  let cols = floor((windowWidth - 2 * margin) / (elementSize + distance));
  let rows = floor((windowHeight - 2 * margin) / (elementSize + distance));

  // Calcola l'offset per centrare la griglia nella finestra
  let totalWidth = cols * (elementSize + distance) - distance; // Larghezza totale della griglia
  let totalHeight = rows * (elementSize + distance) - distance; // Altezza totale della griglia

  let startX = (windowWidth - totalWidth) / 1.5; // Offset orizzontale
  let startY = (windowHeight - totalHeight) / 1.5; // Offset verticale

  // Ciclo attraverso righe e colonne
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = startX + j * (elementSize + distance);
      let y = startY + i * (elementSize + distance);

      // Genera un elemento grafico
      drawGlyph(x, y, elementSize);
    }
  }
}

function drawGlyph(x, y, size) {
  push(); // Salva lo stato corrente
  translate(x, y); // Trasla il sistema di coordinate

  // Applica una rotazione casuale
  let angle = random(TWO_PI);
  rotate(angle);

  strokeWeight(2); // Spessore della linea
  stroke(0); // Colore del tratto (nero)
  noFill(); // Nessun riempimento per i glifi

  // Disegna un glifo composto da curve con più punti di controllo
  let numCurves = floor(random(4, 6)); // Numero di curve
  for (let i = 0; i < numCurves; i++) { 
    let startX = random(-size / 2, size / 2);
    let startY = random(-size / 2, size / 2);

    // Aggiungi più punti di controllo per curve più complesse
    let cp1X = startX + random(-size / 2, size / 2);
    let cp1Y = startY + random(-size / 2, size / 2);
    let cp2X = random(-size / 2, size / 2); // Secondo punto di controllo
    let cp2Y = random(-size / 2, size / 2); // Secondo punto di controllo
    let endX = random(-size / 2, size / 2); // Punto finale
    let endY = random(-size / 2, size / 2); // Punto finale

    // Disegna una curva
    beginShape();
    vertex(startX, startY);
    bezierVertex(cp1X, cp1Y, cp2X, cp2Y, endX, endY); // Usa bezierVertex per curve più morbide
    endShape();
  }

  pop(); // Ripristina lo stato precedente
}
