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
          if (elementType === "light" && enemyIsDeath) {
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
              return "Ymir desata su habilidad de fuego, lanzando flechas ardientes que parecen no tener efecto sobre el Rey Muerto. La oscuridad que lo envuelve parece absorber las llamas, y el enemigo permanece indemne. Antes de que Ymir pueda reaccionar, el Rey Muerto lanza un contraataque que deja a la arquera desorientada y derrotada, extendiendo su reinado de terror en el Bosque Muerto.";
          case "ice":
              // Establecer enemyIsDeath como true para el caso de agua
              enemyIsDeath = false;
              return "Ymir concentra su magia en una flecha, infundiéndola con un aliento gélido. Al disparar, la flecha atraviesa el corazón oscuro del Rey Muerto, pero para su sorpresa, descubre que el corazón del enemigo había dejado de latir hace mucho tiempo. A pesar de haber alcanzado su objetivo, la ausencia de vida en el Rey Muerto hace que el efecto de la flecha de hielo sea mínimo. El enemigo, logra recuperarse rápidamente y contraatacar con una ferocidad renovada, dejando a Ymir desorientada y derrotada, extendiendo su reinado de terror en el Bosque Muerto.";
          case "light":
              enemyIsDeath = true;
              return "Ymir invoca su poder más preciado, el poder de la luz. Con determinación, dispara flechas de luz que impactan al Rey Muerto a toda velocidad, envolviéndolo en una luz cegadora. La oscuridad que lo rodea se disipa ante la intensidad de la luz, debilitando al enemigo hasta su desaparición en un destello resplandeciente. Ymir contempla con satisfacción cómo regresa la luz al Bosque Muerto, devolviéndole su esplendor perdido";
          case "lightning":
              enemyIsDeath = false;
              return " Ymir invoca el poder del trueno en sus flechas, pero el Rey Muerto parece inmune a su poder. Las descargas eléctricas solo sirven para avivar su maldad y confianza, fortaleciéndolo aún más. Antes de que Ymir pueda reaccionar, el Rey Muerto lanza un contraataque que la arquera desorientada y derrotada, extendiendo su reinado de terror en el Bosque Muerto";
          default:
              return "¡Has invocado un poder misterioso!";
      }
  }
  
  
  document.addEventListener("DOMContentLoaded", function () {
    // Contenido del párrafo
    const paragraphContent = `Mientras Ymir se adentraba en el Bosque Muerto, no tardó en notar que todo a su alrededor se volvía más gris, como si los colores desaparecieran y el olor a muerte se intensificara con cada paso. Pronto, se encontró inmersa en un mundo blanco y negro, donde la desolación reinaba en cada rincón.
    <br><br>

    Más adelante, una sombra imponente se alzaba ante ella, coronada con oscuridad. Era nada más y nada menos que el Rey de los Muertos. Ymir no vaciló y lanzó una flecha hacia su enemigo, pero esta atravesó al rey muerto sin causar daño alguno. Fue entonces que comprendió que para salir de ese lugar tendría que emplear sus mejores ataques`;
  
    // Contenido de la imagen
    const imageSrc = "../assets/images/deadKing.jpg";
  
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
  