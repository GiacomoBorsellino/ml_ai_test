// Seleziona l'immagine e il risultato
const imageInput = document.getElementById('imageInput');
const img = document.getElementById('image');
const result = document.getElementById('result');

// Carica il modello MobileNet
const classifier = ml5.imageClassifier('MobileNet', modelLoaded);

// Funzione chiamata quando il modello è caricato
function modelLoaded() {
  console.log('Model Loaded!');
}

// Evento di caricamento dell'immagine
imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  // Quando l'immagine viene caricata, visualizzala e classificala
  reader.onload = function (e) {
    img.src = e.target.result;
    img.onload = function () {
      classifyImage();
    }
  }
  reader.readAsDataURL(file);
});

// Funzione per classificare l'immagine
function classifyImage() {
  classifier.classify(img, (results, error) => {    
    if (error) {
      console.error(error);
      result.textContent = 'Error in classification';
    } else {
      console.log(results);
      result.textContent = `Label: ${results[0].label}, Confidence: ${results[0].confidence.toFixed(4)}`;
    }
  });
}
