function displayErrorMsg (title){

  const tableCard = document.getElementById('main');
  const container = document.createElement('div');
  tableCard.appendChild(container);
  container.className = 'title';

  const message = document.createElement('h2');

  message.innerHTML = ` !! Error ! ${title}`;
  
  message.className = 'title__h2';

  container.appendChild(message);

  setTimeout( ()=> {
    window.location.reload();
  },2000);
}

const loadCards = async (e) =>{

  //OBTENEMOS LA CANTIDAD DE ELEMENTOS A DESPLEGAR DEL INPUT
  const quantity= document.getElementById('number_card').value;

  const searchText = document.getElementById('search_text').value;

  //TRAEMOS EL TABLERO PARA AGREGAR ELEMENTOS
  const tableCard = document.getElementById('main');

    try{

      let response = '';
      let titles= '';

      //RESETEAMOS EL TABLERO
      tableCard.innerHTML = '';
      //console.log(titles);

      if (searchText){

        response = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchText}`, {params: { limit: 10 }});

        titles = response.data;

        if (titles.length === 0){
          tableCard.className = 'error__class';
          displayErrorMsg(`Sin archivos en la busqueda`);
        }

        for (const title of titles){
          //CREAMOS EL CONTENEDOR DE CADA SERIE
  
          const container = document.createElement('div');
  
          //AGREGAMOS EL CONTENEDOR DEL ARTICULO  
          tableCard.appendChild(container);
          container.className = 'title';
          
          //AGREGAMOS IMAGEN Y DATOS DEL TITULO
          const img = document.createElement('img');
          img.src = title.show.image.medium;
          img.className = 'title__img'; 
  
          const name = document.createElement('a');
          name.href= `episode.html?id=${title.id}`;
          name.innerHTML = title.show.name;
          name.className = 'title__h1';
  
          const rating = document.createElement('h2');
          rating.innerHTML = `Promedio -> ${title.show.rating.average}`;
          rating.className = 'title__h2';
       
          const oficialSite = document.createElement('p');
          oficialSite.innerHTML = `Fecha Estreno: ${title.show.premiered}`;
          oficialSite.className = `title__p`;
  
          //AGREGAMOS LOS ELEMENTOS AL CONTENEDOR
          container.appendChild(img);
          container.appendChild(name);
          container.appendChild(rating);
          container.appendChild(oficialSite);
        }

      } else {

        response = await axios.get('https://api.tvmaze.com/shows', {params: { limit: 10 }});
        titles = response.data.slice(0,quantity);

        for (const title of titles){
          //CREAMOS EL CONTENEDOR DE CADA SERIE
  
          const container = document.createElement('div');
  
          //AGREGAMOS EL CONTENEDOR DEL ARTICULO  
          tableCard.appendChild(container);
          container.className = 'title';
          
          //AGREGAMOS IMAGEN Y DATOS DEL TITULO
          const img = document.createElement('img');
          img.src = title.image.medium;
          img.className = 'title__img'; 
  
          const name = document.createElement('a');
          name.href= `episode.html?id=${title.id}`;
          name.innerHTML = title.name;
          name.className = 'title__a';
  
          const rating = document.createElement('h2');
          rating.innerHTML = `Promedio -> ${title.rating.average}`;
          rating.className = 'title__h2';
       
          const oficialSite = document.createElement('p');
          oficialSite.innerHTML = `Fecha Estreno: ${title.premiered}`;
          oficialSite.className = `title__p`;
  
          //AGREGAMOS LOS ELEMENTOS AL CONTENEDOR
          container.appendChild(img);
          container.appendChild(name);
          container.appendChild(rating);
          container.appendChild(oficialSite);
        }
      }
      
    } catch (error) {
      
      displayErrorMsg(`API no encontrada`)
      console.log(error.message);

    }
}

const quantity= document.getElementById('number_card');

quantity.addEventListener('change', loadCards);

document.addEventListener('DOMContentLoaded',loadCards);

const searchText = '';
const searchButton = document.getElementById('search_button');
searchButton.addEventListener('click', ()=> {
  const searchText = document.getElementById('search_text').value;
  console.log(`https://api.tvmaze.com/search/shows?q=${searchText}`);
  loadCards();
});
