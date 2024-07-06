// Funktion zum Laden der gespeicherten Bilder und Beschreibungen 
function loadImages() { 
    const imageGallery = document.getElementById('imageGallery'); 
    const images = JSON.parse(localStorage.getItem('images')) || []; 

    images.forEach(image => { 
        const div = document.createElement('div'); 
        div.classList.add('image-item', 'col-md-4'); 
        div.innerHTML = `<div class="card"><img src="${image.src}" alt="Uploaded Image" class="card-img-top"><div class="card-body"><p class="card-text">${image.description}</p></div></div>`; 
        imageGallery.appendChild(div); 
    }); 
} 

// Funktion zum Speichern der Bilder und Beschreibungen im lokalen Speicher 
function saveImage(src, description) { 
    const images = JSON.parse(localStorage.getItem('images')) || []; 
    images.push({ src, description }); 
    localStorage.setItem('images', JSON.stringify(images)); 
} 

document.getElementById('uploadButton').addEventListener('click', function() { 
    const imageUpload = document.getElementById('imageUpload'); 
    const imageDescription = document.getElementById('imageDescription').value; 
    
    if (imageUpload.files.length > 0) { 
        const reader = new FileReader(); 
        reader.onload = function(e) { 
            const imageGallery = document.getElementById('imageGallery'); 
            const div = document.createElement('div'); 
            div.classList.add('image-item', 'col-md-4'); 
            div.innerHTML = `<div class="card"><img src="${e.target.result}" alt="Uploaded Image" class="card-img-top"><div class="card-body"><p class="card-text">${imageDescription}</p></div></div>`; 
            imageGallery.appendChild(div); 
            saveImage(e.target.result, imageDescription); 
        } 
        reader.readAsDataURL(imageUpload.files[0]); 
    } else { 
        alert('Bitte ein Bild auswählen'); 
    } 
}); 

document.getElementById('commentButton').addEventListener('click', function() { 
    const commentInput = document.getElementById('commentInput').value; 
    
    if (commentInput) { 
        const commentSection = document.getElementById('commentSection'); 
        const div = document.createElement('div'); 
        div.classList.add('comment', 'card', 'col-md-4'); 
        div.innerHTML = `<div class="card-body"><p class="card-text">${commentInput}</p></div>`; 
        commentSection.appendChild(div); 
        document.getElementById('commentInput').value = ''; 
    } else { 
        alert('Bitte einen Kommentar eingeben'); 
    } 
}); 

// Lade Bilder und Beschreibungen beim Start der Seite 
loadImages();