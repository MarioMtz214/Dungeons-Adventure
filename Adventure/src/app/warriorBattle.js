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
          if (elementType === "thunder" || "fire" && enemyIsDeath) {
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
              enemyIsDeath = true;
              return "Con decisión, Varik desenvaina la Espada de Fuego y se lanza al ataque contra la criatura, sabiendo que su naturaleza helada la hace vulnerable al calor abrasador de la hoja. Cada golpe de la espada envía ondas de calor que derriten el hielo que cubre a la criatura, dejando al descubierto su forma demoníaca. Las llamas danzan en torno a la espada, envolviendo a la criatura en un torbellino de fuego que consume su esencia helada. Varik lucha con valentía, sintiendo cómo cada golpe debilita a la criatura y la hace retroceder ante el poder ardiente de su espada.";
          case "thunder":
              // Establecer enemyIsDeath como true para el caso de agua
              enemyIsDeath = true;
              return "Varik empuña con firmeza el Martillo del Trueno, sintiendo cómo la electricidad recorre su cuerpo mientras se prepara para atacar. Con un grito desafiante, se lanza hacia su enemigo y descarga todo el poder del martillo sobre él. Los relámpagos estallan con furia, iluminando la noche y desgarrando la helada oscuridad que envuelve a la criatura. Los impactos del martillo provocan que el hielo que lo rodea se resquebraje y deshinterando la mitad de su cuerpo.";
          case "dark":
              enemyIsDeath = false;
              return "A pesar de la determinación de Varik, la Espada Oscura parece encontrarse con una resistencia sobrenatural al enfrentarse a la criatura, que contiene elementos de hielo y demoníacos. Cada golpe de la espada es repelido por una barrera de frío y oscuridad, que absorbe la energía de la hoja y la convierte en nada más que un eco oscuro. Varik lucha con todas sus fuerzas, pero cada embate de la espada parece ser absorbido por la criatura, fortaleciéndola en lugar de debilitarla. Pronto se da cuenta de que su arma ha sido ineficaz contra esta abominación, dejándolo vulnerable ante su feroz contraataque.";
              
        case "celestial":
              enemyIsDeath = false;
              return " Al desenvainar la Espada Celestial, Varik confía en que su luz divina pueda purificar incluso a las criaturas más oscuras, incluyendo a la criatura con elementos de hielo y demoníacos. Sin embargo, al enfrentarse a ella, descubre con sorpresa que su luz apenas parece afectarla. La criatura avanza imperturbable, desafiando los intentos de Varik por repelerla con la Espada Celestial. Varik se siente desesperado, dándose cuenta de que su arma sagrada ha sido incapaz de detener a esta abominación, dejándolo en una posición peligrosa ante su poder desenfrenado.";
          default:
              return "¡Has invocado un poder misterioso!";
      }
  }
  
  
  document.addEventListener("DOMContentLoaded", function () {
    // Contenido del párrafo
    const paragraphContent = `Bajo el manto de la luna llena, Varik emprende su viaje hacia lo desconocido, con su corazón templado por la determinación y sus pasos marcados por la valentía. En medio de la penumbra, entre los susurros del viento gélido, se topa con una criatura que desafía toda explicación.
    <br><br>
    Una figura emerge de las sombras, mitad demonio y mitad bestia, con la cabeza y los cuernos de un reno. Se dice que esta abominación ha estado acechando los pueblos cercanos y a los viajeros, sembrando el terror a su paso. Su delgada silueta apenas refleja la inimaginable fuerza que yace oculta en su interior.
    <br><br>
    Varik enfrenta a esta criatura con la mirada firme y la espada en mano, preparado para defender a los inocentes y enfrentar cualquier desafío que se interponga en su camino. Con un grito de guerra resonando en la oscuridad, se prepara para el combate, sabiendo que la victoria no será fácil,`;
  
    // Contenido de la imagen
    const imageSrc = "../assets/images/iceDemon2.jpg";
  
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
  