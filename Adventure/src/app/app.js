// app.js
function startAdventure() {
    window.location.href = 'game.html';
}

function changeDescription(character, description) {
    var descriptionElement = document.getElementById('description');

    if (character && descriptionElement) {
        descriptionElement.innerHTML = '<h1 class="w-2/3 xl:text-xl 2xl:text-4xl mx-auto">' + description + '</h1>';
    }
}

function resetDescription() {
    var descriptionElement = document.getElementById('description');
    
    if (descriptionElement) {
        descriptionElement.innerHTML = '<h1 id="description bg-blue-500"></h1>';
    }
}

document.getElementById('warrior').addEventListener('mouseover', function() {
    changeDescription('warrior', 'Descripción del Guerrero.');
});

document.getElementById('archer').addEventListener('mouseover', function() {
    changeDescription('archer', 'Descripción del Arquero.');
});

document.getElementById('wizard').addEventListener('mouseover', function() {
    changeDescription('wizard', 'Descripción del Mago.');
});

document.getElementById('warrior').addEventListener('mouseleave', resetDescription);
document.getElementById('archer').addEventListener('mouseleave', resetDescription);
document.getElementById('wizard').addEventListener('mouseleave', resetDescription);


// Drag and drop----------------------------------------------

const warrior = document.querySelectorAll('.warrior');
const archer = document.querySelectorAll('.archer');
const wizard = document.querySelectorAll('.wizard');
const warriorContainer = document.querySelector('.warriorContainer');
const archerContainer = document.querySelector('.archerContainer');
const wizardContainer = document.querySelector('.wizardContainer');
const contenedor = document.querySelector('#contenedor');
let dragableID;

let containerFull = false;

// Event listeners para cuando se empieza a arrastrar un personaje
warrior.forEach(element =>  
  element.addEventListener('dragstart', function(event){
    document.getElementById('textoContenedor').innerHTML="";    
    dragableID = event.target;
  }));

archer.forEach(element =>  
  element.addEventListener('dragstart', function(event){
    document.getElementById('textoContenedor').innerHTML="";    
    dragableID = event.target;
  }));

wizard.forEach(element =>  
  element.addEventListener('dragstart', function(event){
    document.getElementById('textoContenedor').innerHTML="";    
    dragableID = event.target;
  }));

// Event listener para cuando se suelta el personaje en el contenedor
contenedor.addEventListener('drop', function(event){
  event.preventDefault(); // Evita el comportamiento por defecto del evento drop

  // Obtener el div de confirmación
  const confirmationDiv = document.querySelector('.confirmation-div');

  // Mostrar el div de confirmación
  confirmationDiv.classList.remove('hidden');

  // Event listener para el botón 'Sí'
  document.getElementById('confirm-yes').addEventListener('click', function() {
    // Si el usuario elige 'Sí', redirigir según el tipo de personaje
    if (dragableID.classList.contains('warrior')) {
      window.location.href = 'warrior.html';
    } else if (dragableID.classList.contains('archer')) {
      window.location.href = 'archer.html';
    } else if (dragableID.classList.contains('wizard')) {
      window.location.href = 'wizard.html';
    }
    // Ocultar la ventana de confirmación
    confirmationDiv.classList.add('hidden');
  });

  // Event listener para el botón 'No'
  document.getElementById('confirm-no').addEventListener('click', function() {
    // Si el usuario elige 'No', reiniciar la ventana
    resetearVentana();
    // Ocultar la ventana de confirmación
    confirmationDiv.classList.add('hidden');
  });
});



// Función para reiniciar la ventana
function resetearVentana() {
  // Aquí puedes agregar lógica para reiniciar la ventana si es necesario
}

// Event listeners para evitar comportamiento por defecto y permitir el drop
contenedor.addEventListener('dragleave', function(event){
  event.preventDefault();
});

contenedor.addEventListener('dragover', function(event){
  event.preventDefault(); 
});

// Event listeners para evitar comportamiento por defecto y permitir el drop
document.addEventListener('drop', function(event){
  event.preventDefault();
  event.target.appendChild(dragableID);
});

