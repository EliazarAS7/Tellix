# Proyecto Tellix (React y SpringBoot con hibernate(API))

# Tabla de contenidos

- [Proyecto Tellix]
- [Tabla de contenidos](#tabla-de-contenidos)
  - [Parte 1: Aplicación Web](#parte-1:-aplicación-web)
      - [Descripción](#descripción)
      - [Diagramas](#diagramas)
      - [Estructura Gneral]
  - [Parte 2: API](#parte-2:-api)
      - [EndPoints de la API](#endpoints-de-la-api)
      - [Requisitos Previos](#requisitos-previo)

# Parte 1: Aplicación Web
   

## Descripción

Tellix es una plataforma de entretenimiento digital innovadora, diseñada para ofrecer una experiencia de usuario superior y adaptativa, siguiendo las últimas tendencias y tecnologías en el sector. Inspirada en plataformas líderes como Netflix, Tellix se centra en proporcionar contenido de alta calidad a través de una interfaz intuitiva y accesible en múltiples dispositivos. La plataforma aprovecha la tecnología digital para facilitar la creación, distribución y consumo de contenido, permitiendo a los usuarios disfrutar de una amplia variedad de opciones de entretenimiento en cualquier momento y lugar. Con un enfoque en la personalización y la seguridad, Tellix busca transformar la forma en que consumimos entretenimiento, ofreciendo una experiencia única y envolvente.

## Diagramas

### Diagrama de casos de uso

![CasosUsoChillFlix](https://hackmd.io/_uploads/B1ppzJ_Q0.png)

### Diagrama UML

![UMLChillFlix](https://hackmd.io/_uploads/rkSymy_mC.png)

### Diagrama de entidad-relación

![DiagramaER](https://hackmd.io/_uploads/rytRzJOQR.png)

### Estructura general

### Public

Aqui esta el index.html que es en donde se renderiza toda la aplicación, y la carpeta icons e img que es en donde esta todas las imagenes que utilizanos durante el proyecto.

### src

- Components: Aqui es donde se hace todos los componentes de la aplicación como el header o el footer, en nuestro caso solo tenemos hecho el header que es el menu de navegación.
- Css: En esta carpeta es donde tenemos todos los css de las vistas de la aplicación.
- Img: Carpeta en donde estan todas las imagenes de la aplicación, todas las imagenes de las peliculas y todas las imagenes de la series.
- Views: Aqui es donde se ponene todas las vistas de la aplicacion y en donde se maneja cada una de ellas.
- Index.js: Es en donde esta conectado el archivo router y todas las vistas de la aplicación
- Route.jsx: Es donde se maneja todas las rutas de la aplicacion con todas las vistas del proyecto.

# Parte 2: API

### EndPoints de la API

### Capitulos
  - getAll: http://194.164.170.62:5001/api/tellix/capitulos/
  - getAll Paged: http://194.164.170.62:5001/api/tellix/capitulos/paged?page=0&size=3&sort=id,asc
  - getOne: http://194.164.170.62:5001/api/tellix/capitulos/2
  - create: http://194.164.170.62:5001/api/tellix/capitulos/
  - delete: http://194.164.170.62:5001/api/tellix/capitulos/1
  - update: http://194.164.170.62:5001/api/tellix/capitulos/1
    
### Categorias
  - getAll: http://194.164.170.62:5001/api/tellix/categorias/
  - getAll Paged: http://194.164.170.62:5001/api/tellix/categorias/paged?page=0&size=2&sort=id,asc
  - getOne: http://194.164.170.62:5001/api/tellix/categorias/2
  - create: http://194.164.170.62:5001/api/tellix/categorias/
  - delete: http://194.164.170.62:5001/api/tellix/categorias/12
  - update: http://194.164.170.62:5001/api/tellix/categorias/1
  - Search By Name: http://194.164.170.62:5001/api/tellix/categorias/search?name=Accion
  - Search By Name Paged: http://194.164.170.62:5000/api/tellix/categorias/search/paged?name=Accion&page=0&size=5&sort=id,asc

### Peliculas
  - getAll: http://194.164.170.62:5001/api/tellix/peliculas/
  - getAll Paged: http://194.164.170.62:5001/api/tellix/peliculas/paged?page=0&size=21&sort=id,asc
  - getOne: http://194.164.170.62:5001/api/tellix/peliculas/2
  - create: http://194.164.170.62:5001/api/tellix/peliculas/
  - delete: http://194.164.170.62:5001/api/tellix/peliculas/1
  - update: http://194.164.170.62:5001/api/tellix/peliculas/12
  - Search by category: http://194.164.170.62:5001/api/tellix/peliculas/searchCat?catID=2
  - Search by category paged: http://194.164.170.62:5001/api/tellix/peliculas/searchCat/paged?catID=2&page=0&size=2&sort=id,asc
  - Search by name: http://194.164.170.62:5001/api/tellix/peliculas/search?name=C
  - Search by name paged: http://194.164.170.62:5001/api/tellix/peliculas/search/paged?name=C&page=0&size=2&sort=id,asc
  - addCategory: http://194.164.170.62:5001/api/tellix/peliculas/addCat?peliculaID&catID
  - Add Family: http://194.164.170.62:5001/api/tellix/peliculas/addFam?peliculaID&famID

### Perfil
  - getAll: http://194.164.170.62:5001/api/tellix/perfiles/
  - getAll paged: http://194.164.170.62:5001/api/tellix/perfiles/paged?page=0&size=5&sort=id,asc
  - getOne: http://194.164.170.62:5001/api/tellix/perfiles/3
  - create: http://194.164.170.62:5001/api/tellix/perfiles/
  - delete: http://194.164.170.62:5001/api/tellix/perfiles/5
  - update: http://194.164.170.62:5001/api/tellix/perfiles/2
  - getAll by usuarios: http://194.164.170.62:5001/api/tellix/perfiles/profiles?usuID=4
  - add series: http://194.164.170.62:5001/api/tellix/perfiles/watchList/add/serie?perfilID=3&serieID=2
  - remove series: http://194.164.170.62:5001/api/tellix/perfiles/watchList/delete/serie?perfilID=22&serieID=2
  - add film: http://194.164.170.62:5001/api/tellix/perfiles/watchList/add/film?perfilID=3&peliculaID=1
  - remove film: http://194.164.170.62:5001/api/tellix/perfiles/watchList/delete/film?perfilID=22&peliculaID=1

### Series
  - getAll: http://194.164.170.62:5001/api/tellix/series/
  - getAll Page: http://194.164.170.62:5001/api/tellix/series/paged?page=0&size=10&sort=id,asc
  - getOne: http://194.164.170.62:5001/api/tellix/series/2
  - create: http://194.164.170.62:5001/api/tellix/series/
  - Delete: http://194.164.170.62:5001/api/tellix/series/1
  - update: http://194.164.170.62:5001/api/tellix/series/1
  - Search by Category: http://194.164.170.62:5001/api/tellix/series/searchCat?catID=1
  - Search by category paged: http://194.164.170.62:5001/api/tellix/series/searchCat/paged?catID=1&page=0&size=5&sort=id,asc
  - Search by name: http://194.164.170.62:5001/api/tellix/series/search?name=C
  - Search by name Paged: http://194.164.170.62:5001/api/tellix/series/search/paged?name=da&page=0&size=5&sort=id,asc
  - Count seasons: http://194.164.170.62:5001/api/tellix/series/temp?id=1
  - Add Category: http://194.164.170.62:5001/api/tellix/series/addCat?serieID&catID
  - Add Season: http://194.164.170.62:5001/api/tellix/series/addTemp?serieID=&temporadaID=
  - Add family: http://194.164.170.62:5001/api/tellix/series/addFam?serieID&famID

### Temporadas
  - getAll: http://194.164.170.62:5001/api/tellix/temporadas/
  - getAll paged: http://194.164.170.62:5001/api/tellix/temporadas/paged?page=0&size=5&sort=id,asc
  - getOne: http://194.164.170.62:5001/api/tellix/temporadas/2
  - create: http://194.164.170.62:5001/api/tellix/temporadas/paged?page=0&size=5&sort=id,asc
  - delete: http://194.164.170.62:5001/api/tellix/temporadas/1
  - update: http://194.164.170.62:5001/api/tellix/temporadas/6
  - count chapter: http://194.164.170.62:5001/api/tellix/temporadas/cap?id=1
  - add chapter: http://194.164.170.62:5001/api/tellix/temporadas/addChapter?temporadaID&capituloID

### Usuarios
  - getAll: http://194.164.170.62:5001/api/tellix/usuarios/
  - getAll paged: http://194.164.170.62:5001/api/tellix/usuarios/paged?page=0&size=5&sort=id,desc
  - getOne: http://194.164.170.62:5001/api/tellix/usuarios/2
  - create: http://194.164.170.62:5001/api/tellix/usuarios/
  - delete: http://194.164.170.62:5001/api/tellix/usuarios/1
  - update: http://194.164.170.62:5001/api/tellix/usuarios/1
  - login: http://194.164.170.62:5001/api/tellix/usuarios/login?mail=acurrosolla@gmail.com&password=1234
  - add perfil: http://194.164.170.62:5001/api/tellix/usuarios/addPerfil?usuID=6&perfilID=36
  - remove perfil: http://194.164.170.62:5001/api/tellix/usuarios/removePerfil?perfilID=34
  - bloq: http://194.164.170.62:5001/api/tellix/usuarios/bloq?usuID=11&bloqStatus=true
  - suscription: http://194.164.170.62:5001/api/tellix/usuarios/suscription?usuID=2&susStatus=true

### Family
  - getAll: http://194.164.170.62:5001/api/tellix/familias/
  - getAll paged: http://194.164.170.62:5001/api/tellix/familias/paged?page=0&size=2&sort=id,asc
  - getOne: http://194.164.170.62:5001/api/tellix/familias/2
  - Search by film ID: http://194.164.170.62:5001/api/tellix/familias/search/film/2
  - Search by serie ID: http://194.164.170.62:5001/api/tellix/familias/search/serie/2
  - create: http://194.164.170.62:5001/api/tellix/familias/
  - delete: http://194.164.170.62:5001/api/tellix/familias/1
  - update: http://194.164.170.62:5001/api/tellix/familias/1
  - Search by name: http://194.164.170.62:5001/api/tellix/familias/search?name=Accion
  - Search by name paged: http://194.164.170.62:5001/api/tellix/familias/search/paged?name=Accion&page=0&size=5&sort=id,asc

### Requisitos Previos:
- Cuando te instales el proyecto te tendras que descargar todos los package, para eso en la consola tendras que poner: npm i, y automaticamente se te instala todos los paquetes
- Para arrancar el proyecto localmente tienes que poner en la consola npm run start y se te pondra en el puerto 3000 automaticamente.

## Autoría

Este proyecto fue desarrollado por @acurro9 y @EliazarAS7

## Licencia

Proyecto elaborado para fines educativos para el proyecto final del Ciclo Formativo de Grado Superior de Desarrollo de Aplicaciones Web.
