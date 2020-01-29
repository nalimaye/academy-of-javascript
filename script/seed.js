const { db, Campus, Student } = require('../server/db');
const { green, red } = require('chalk');

const seed = async () => {
  await db.sync({ force: true });

  // seeding the database "academy-of-javascript"
  const campuses = [
    {
      name: 'DOM Campus',
      imageUrl: '/campusDOM.jpg',
      address: '1100 Element Way, Eventsville, JS 51001',
      description:
        'HTML (HyperText Markup Language) is the most basic building block of the Web. It defines the meaning and structure of web content. Hypertext refers to links that connect web pages to one another, either within a single website or between websites. The Document interface represents any web page loaded in the browser and serves as an entry point into the web page content, which is the DOM tree. The DOM tree includes elements such as <head>, <body>, <input>, <form>, <table>, and many others. It provides functionality globally to the document. The DOM (Document Object Model) is an API that represents and interacts with any HTML or XML document. The DOM is a document model loaded in the browser and representing the document as a node tree, where each node represents part of the document (e.g. an element, text string, or comment). The DOM is one of the most-used APIs on the Web because it allows code running in a browser to access and interact with every node in the document. Nodes can be created, moved and changed. Event listeners can be added to nodes and triggered on occurrence of a given event. DOM Events are sent to notify code of interesting things that have taken place. Each event is represented by an object which is based on the Event interface, and may have additional custom fields and/or functions used to get additional information about what happened. Events can represent everything from basic user interactions to automated notifications of things happening in the rendering model. ',
    },
    {
      name: 'CSS Campus',
      imageUrl: '/campusCSS.jpg',
      address: '2200 Flexbox Ave, Styleford, JS 52002',
      description:
        'CSS (Cascading Style Sheets) is used to style and layout web pages — for example, to alter the font, colour, size and spacing of your content, split it into multiple columns, or add animations and other decorative features. There are a wide variety of CSS selectors available, allowing for fine-grained precision when selecting elements to style. Everything in CSS has a box around it, and understanding these boxes is key to being able to create layouts with CSS, or to align items with other items. In CSS we broadly have two types of box — block boxes and inline boxes. In recent years, CSS has evolved in order to better support different directionality of content, including right-to-left but also top-to-bottom content (such as Japanese) — these different directionalities are called writing modes. CSS page layout techniques allow us to take elements contained in a web page and control where they are positioned relative to their default position in normal layout flow, the other elements around them, their parent container, or the main viewport/window. ',
    },
    {
      name: 'Express Campus',
      imageUrl: '/campusExpress.jpg',
      address: '3300 Request Response Blvd, Routerville, JS 53003',
      description:
        'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. The app object conventionally denotes the Express application. Create it by calling the top-level express() function exported by the Express module. The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on. By convention, the object is always referred to as req (and the HTTP response is res) but its actual name is determined by the parameters to the callback function in which you’re working. The res object represents the HTTP response that an Express app sends when it gets an HTTP request. By convention, the object is always referred to as res (and the HTTP request is req) but its actual name is determined by the parameters to the callback function in which you’re working. Routing refers to how an application’s endpoints (URIs) respond to client requests. You define routing using methods of the Express app object that correspond to HTTP methods. These routing methods specify a callback function (sometimes called “handler functions”) called when the application receives a request to the specified route (endpoint) and HTTP method. In other words, the application “listens” for requests that match the specified route(s) and method(s) and when it detects a match, it calls the specified callback function.',
    },
    {
      name: 'Sequelize Campus',
      imageUrl: '/campusSequelize.jpg',
      address: '4400 Postgres Road, SQLfield, JS 54004',
      description:
        'Sequelize is a powerful library in Javascript that makes it easy to manage a SQL database. At its core, Sequelize is an Object-Relational Mapper – meaning that it maps an object syntax onto our database schemas. Sequelize uses Node.JS and Javascript object syntax to accomplish its mapping. Sequelize is easy to learn and has dozens of cool features like synchronization, association, validation, etc. It has support for PostgreSQL, MySQL, MariaDB, SQLite, and MSSQL databases.',
    },
    {
      name: 'React Campus',
      imageUrl: '/campusReact.jpg',
      address: '5500 Component Ave, Propsford, JS 55005',
      description:
        'React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called Components. We use Components to tell React what we want to see on the screen. When our data changes, React will efficiently update and re-render our components.',
    },
    {
      name: 'Redux Campus',
      imageUrl: '/campusRedux.jpg',
      address: '6600 Store Blvd, Thunkville, JS 56006',
      description:
        'Redux is a predictable state container for JavaScript apps. Redux is available as a package on NPM for use with a module bundler or in a Node application. The whole state of your app is stored in an object tree inside a single store. The only way to change the state tree is to emit an action, an object describing what happened. To specify how the actions transform the state tree, you write pure reducers. You can use Redux together with React, or with any other view library. Provider is a React component given to us by the “react-redux” library. It serves just one purpose : to “provide” the store to its child components. Now that we have “provided” the redux store to our application, we can now connect our components to it. This is precisely what "connect" does. Thunk middleware lets you dispatch thunk async actions as if they were actions!',
    },
  ];

  const students = [
    {
      firstName: 'Alexa',
      lastName: 'Allerton',
      email: 'alexaallerton@mhajs.com',
      imageUrl: '/AlexaAllerton.jpg',
      gpa: 4.0,
      campusId: 3,
    },
    {
      firstName: 'Bob',
      lastName: 'Baker',
      email: 'bobbaker@mhajs.com',
      imageUrl: '/BobBaker.jpg',
      gpa: 3.0,
      campusId: 6,
    },
    {
      firstName: 'Cory',
      lastName: 'Cantena',
      email: 'corycantena@mhajs.com',
      imageUrl: '/CoryCantena.jpg',
      gpa: 3.3,
      campusId: 3,
    },
    {
      firstName: 'David',
      lastName: 'Dunford',
      email: 'daviddunford@mhajs.com',
      imageUrl: '/DavidDunford.jpg',
      gpa: 3.5,
      campusId: 5,
    },
    {
      firstName: 'Fiona',
      lastName: 'Fox',
      email: 'fionafox@mhajs.com',
      imageUrl: '/FionaFox.jpg',
      gpa: 3.9,
      campusId: 3,
    },
    {
      firstName: 'Gina',
      lastName: 'Gifford',
      email: 'ginagifford@mhajs.com',
      imageUrl: '/GinaGifford.jpg',
      gpa: 4.0,
      campusId: 1,
    },
    {
      firstName: 'Harry',
      lastName: 'Haley',
      email: 'harryhaley@mhajs.com',
      imageUrl: '/HarryHaley.jpg',
      gpa: 3.2,
      campusId: 4,
    },
    {
      firstName: 'Ian',
      lastName: 'Inova',
      email: 'ianinova@mhajs.com',
      imageUrl: '/IanInova.jpg',
      gpa: 3.4,
      campusId: 4,
    },
    {
      firstName: 'Luana',
      lastName: 'Luther',
      email: 'luanaluther@mhajs.com',
      imageUrl: '/LuanaLuther.jpg',
      gpa: 4.0,
      campusId: 6,
    },
    {
      firstName: 'Mary',
      lastName: 'Mathai',
      email: 'marymathai@mhajs.com',
      imageUrl: '/MaryMathai.jpg',
      gpa: 3.7,
      campusId: 6,
    },
    {
      firstName: 'Nancy',
      lastName: 'Nadler',
      email: 'nancynadler@mhajs.com',
      imageUrl: '/NancyNadler.jpg',
      gpa: 3.0,
      campusId: 6,
    },
    {
      firstName: 'Olivia',
      lastName: 'Ortega',
      email: 'oliverortega@mhajs.com',
      imageUrl: '/OliviaOrtega.jpg',
      gpa: 4.0,
      campusId: 6,
    },
  ];

  await Promise.all(
    campuses.map(campus => {
      return Campus.create(campus);
    })
  );

  await Promise.all(
    students.map(student => {
      return Student.create(student);
    })
  );

  console.log(green('Seeding success!'));
  db.close();
};

seed().catch(err => {
  console.error(red('Oh noes! Something went wrong!'));
  console.error(err);
  db.close();
});
