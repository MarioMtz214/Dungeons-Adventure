document.getElementById("confirm-no").addEventListener("click", function () {
  // Oculta el div con la clase "confirmation-div"
  document.querySelector(".confirmation-div").style.display = "none";
});

// Drag and drop----------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const spells = document.querySelectorAll('.flex img[draggable="true"]');
  const containerAttack = document.getElementById("containerAttack");

  spells.forEach((spell) => {
    spell.addEventListener("dragstart", dragStart);
  });

  containerAttack.addEventListener("dragover", dragOver);
  containerAttack.addEventListener("drop", drop);
});

function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

function dragOver(event) {
  event.preventDefault();
}

// Función para manejar el evento de soltar un hechizo
function drop(event) {
    event.preventDefault();
    const spellId = event.dataTransfer.getData('text/plain');
    const spellElement = document.getElementById(spellId);
    const containerAttack = event.target;

    // Si el contenedor ya está ocupado, no se puede soltar nada más
    if (containerAttack.children.length > 0) {
        return;
    }

    containerAttack.appendChild(spellElement);

    // Verificar el tipo de elemento soltado
    const elementType = spellElement.id;

    // Crear el elemento div con los estilos proporcionados
    const confirmationDiv = document.createElement('div');
    confirmationDiv.classList.add('confirmation-div', 'flex', 'absolute', 'justify-center', 'items-center', 'h-screen', 'w-screen', 'bg-black/80', 'backdrop-blur-sm');

    const storyBox = document.createElement('div');
    storyBox.classList.add('flex', 'flex-col', 'justify-center', 'story-box', 'w-[50%]', 'text-amber-500', 'xl:text-xl', '2xl:text-3xl', 'border-2', 'border-amber-500', 'p-8', 'justify-center', 'items-center'); 

    const paragraph = document.createElement('p');
    paragraph.classList.add('flex', 'xl:text-lg', '2xl:text-4xl', 'text-justify');
    paragraph.textContent = obtenerTextoDesarrollo(elementType);

    const button = document.createElement('button');
    button.id = 'confirm-no';
    button.classList.add('golden-text', 'golden-button', 'text-xl', 'w-32', 'text-black');
    button.textContent = 'Siguiente';

    storyBox.appendChild(paragraph);
    storyBox.appendChild(button);
    confirmationDiv.appendChild(storyBox);

    // Agregar el nuevo elemento al cuerpo del documento
    document.body.appendChild(confirmationDiv);

    // Event listener para el botón 'Siguiente'
    button.addEventListener('click', function() {
        // Ocultar el div de confirmación
        confirmationDiv.remove();

        // Si el ataque es de tipo "water" y el enemigo muere, redirigir a continue.html
        if (elementType === "water" && enemyIsDeath) {
            window.location.href = 'continue.html';
        } else {
            // Si enemyIsDeath es false, crear otro div con el mensaje "You lose..."
            if (!enemyIsDeath) {
                const loseConfirmationDiv = document.createElement('div');
                loseConfirmationDiv.classList.add('confirmation-div', 'flex', 'absolute', 'justify-center', 'items-center', 'h-screen', 'w-screen', 'bg-black/80', 'backdrop-blur-sm');

                const loseStoryBox = document.createElement('div');
                loseStoryBox.classList.add('flex', 'flex-col', 'justify-center', 'story-box', 'w-[50%]', 'text-amber-500', 'xl:text-xl', '2xl:text-3xl', 'border-2', 'border-amber-500', 'p-8', 'justify-center', 'items-center'); 

                const loseParagraph = document.createElement('p');
                loseParagraph.classList.add('flex', 'xl:text-lg', '2xl:text-4xl', 'text-justify', 'pb-4');
                loseParagraph.textContent = "You lose...";

                const loseButton = document.createElement('button');
                loseButton.id = 'confirm-no';
                loseButton.classList.add('golden-text', 'golden-button', 'text-xl', 'w-32', 'text-black');
                loseButton.textContent = 'Siguiente';

                loseStoryBox.appendChild(loseParagraph);
                loseStoryBox.appendChild(loseButton);
                loseConfirmationDiv.appendChild(loseStoryBox);

                // Agregar el nuevo elemento al cuerpo del documento
                document.body.appendChild(loseConfirmationDiv);

                // Event listener para el botón 'Siguiente' en caso de perder
                loseButton.addEventListener('click', function() {
                    // Redirigir a index.html
                    window.location.href = 'index.html';
                });
            }
        }
    });
}

// Variable para controlar si el enemigo está muerto o no
let enemyIsDeath = false;

// Función para obtener el texto de desarrollo según el tipo de ataque
function obtenerTextoDesarrollo(elementType) {
    switch (elementType) {
        case "fire":
            enemyIsDeath = false;
            return "A pesar de sus intentos, el hechizo de fuego no hizo más que fortalecer al demonio de fuego. El enemigo aprovechó los ataques, fortaleciéndose. Finalmente, el demonio lanzó un contraataque devastador que dejó al mago derrotado, asegurándose la victoria y sembrando la oscuridad en el bosque";
        case "water":
            // Establecer enemyIsDeath como true para el caso de agua
            enemyIsDeath = true;
            return "Eldric concentró su poder mágico y desató un torrente de agua que envolvió al demonio de fuego, extinguiendo sus llamas y debilitándolo hasta que desapareció en un remolino de vapor, asegurando la victoria del mago en su lucha contra las fuerzas del mal.";
        case "ice":
            enemyIsDeath = false;
            return "A pesar de sus intentos, el hechizo de hielo resultó ineficaz contra el demonio de fuego. El enemigo resistió los ataques, fortaleciéndose con cada intento fallido de Eldric. Finalmente, el demonio lanzó un contraataque devastador que dejó al mago derrotado, asegurándose la victoria y sembrando la oscuridad en el bosque";
        case "wind":
            enemyIsDeath = false;
            return "A pesar de sus intentos, el hechizo de viento no hizo más que fortalecer al demonio de fuego. El enemigo aprovechó los ataques, fortaleciéndose. Finalmente, el demonio lanzó un contraataque devastador que dejó al mago derrotado, asegurándose la victoria y sembrando la oscuridad en el bosque";
        default:
            return "¡Has invocado un poder misterioso!";
    }
}


document.addEventListener("DOMContentLoaded", function () {
  // Contenido del párrafo
  const paragraphContent = `Al adentrarse en el Bosque de las Sombras, Eldric sintió un ambiente turbio y siniestro, extrañamente cálido, como si lo vigilaran en cada paso que daba. Sin importar lo extraño de la situación, Eldric siguió su camino con determinación, consciente de la importancia de su misión.<br><br>Sin embargo, su avance fue interrumpido por una visión aterradora: una llamarada gigante se alzaba ante él, dando paso a la manifestación de un demonio con cuernos ardientes y armadura infernal, como si hubiera sido forjado en el mismísimo infierno.<br><br>Ante esta amenaza abrumadora, Eldric se vio obligado a tomar una decisión crucial. Conocedor de las artes arcanas, sabía que debía elegir sabiamente su hechizo si quería tener alguna esperanza de salir victorioso.`;

  // Contenido de la imagen
  const imageSrc = "../assets/images/firedemon4.jpg";

  // Seleccionar los contenedores
  const storyContainer = document.querySelector(".story-container");
  const imgContainer = document.querySelector(".img-container");

  // Crear elementos para el párrafo y la imagen
  const paragraphElement = document.createElement("p");
  const imageElement = document.createElement("img");

  // Agregar clases de Tailwind CSS a los elementos creados
  paragraphElement.classList.add(
    "text-amber-500",
    "lg:text-xs",
    "xl:text-sm",
    "2xl:text-xl",
    "3xl:text-2xl",
    "text-justify"
  );
  imageElement.classList.add("border-2", "border-amber-500", "h-full", "fire-enemy");

  // Asignar el contenido y la fuente de la imagen
  paragraphElement.innerHTML = paragraphContent;
  imageElement.src = imageSrc;

  // Agregar los elementos al DOM
  storyContainer.appendChild(paragraphElement);
  imgContainer.appendChild(imageElement);
});
