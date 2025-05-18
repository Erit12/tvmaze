const loadCards = async (e) =>{

  //OBTENEMOS LA CANTIDAD DE ELEMENTOS A DESPLEGAR DEL INPUT
  const quantity= document.getElementById('number_card').value;

  //TRAEMOS EL TABLERO PARA AGREGAR ELEMENTOS
  const tableCard = document.getElementById('main');

    try{
      
      // Obtener la URL actual
      const urlString = window.location.href; 

      // Usando el objeto URL (para mayor robustez y apoyo a diversas URL)
      const url = new URL(urlString);

      let id = '';
      if (url.search) {
        const params = new URLSearchParams(url.search);
        if (params.has("id")) {
          id = params.get("id");
          console.log("ID (Consulta):", id);
        }
      }

      const response = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes?specials=1`, {params: { limit: 10 }});

      /*NOTA::::  EL LIMIT EN EL AXIO NO OPERO, POR ESO OPTE POR UTILIZAR EL SLICE*/
      
      //DECLARAMOS CONTANTE CON EL ELEMENTO 
      const titles = response.data.slice(0,quantity);

      //RESETEAMOS EL TABLERO
      tableCard.innerHTML = '';

      for (const title of titles){
        //CREAMOS EL CONTENEDOR DE CADA SERIE

        const container = document.createElement('div');

        //AGREGAMOS EL CONTENEDOR DEL ARTICULO  
        tableCard.appendChild(container);
        container.className = 'title';
        
        //AGREGAMOS IMAGEN Y DATOS DEL TITULO
        const img = document.createElement('img');
        img.src = title.image.original;
        img.className = 'title__img'; 

        const name = document.createElement('h1');
        name.href= `episode.html?id=${title.id}`;
        name.innerHTML = title.name;
        name.className = 'title__h1';

        const season = document.createElement('h2');
        season.innerHTML = `Temporada ${title.season}`;
        season.className = 'title__h2';

        const chapter = document.createElement('p');
        chapter.innerHTML = `Capitulo: ${title.number}`;
        chapter.className = `title__p`;
     
        //AGREGAMOS LOS ELEMENTOS AL CONTENEDOR
        container.appendChild(img);
        container.appendChild(name);
        container.appendChild(season);
        container.appendChild(chapter);

      }
    } catch (error) {

      console.log(error.message);
    }
}

document.addEventListener('DOMContentLoaded',loadCards);


