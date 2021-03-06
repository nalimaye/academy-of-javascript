# Academy of JavaScript

### Try it out at :
https://academy-of-javascript.herokuapp.com/

## The Premise

This is a RESTful web platform that allows the CTO of the Margaret Hamilton Academy of JavaScript to manage the Students and Campuses of that Academy.

## Utilized

- Express : to handle HTTP requests.

- PostgreSQL : to maintain database of the Students & Campuses data.

- Sequelize : to interface with a PostgreSQL database.

- React : to build the Components that display/modify the Students & Campuses data.

- Redux : to manage all important state (i.e. Students & Campuses data) in the Redux store.

- React-Redux : to connect the React Components that display/mofify the Students & Campuses data to the Redux store.

- Redux-Thunk : for handling Redux side effects logic that needs access to the Redux store, including the asynchronous logic to handle all the CRUD (Create, Read, Update & Delete) actions to be performed on the Students & Campuses data.

Add New Campus          |    Update A Campus
:-------------------------:|:-------------------------:
<img src="media/CampusAddNewAndUpdate_Part1.gif"> | <img src="media/CampusAddNewAndUpdate_Part2.gif">

Add Student To Campus          |    Remove Student From Campus
:-------------------------:|:-------------------------:
<img src="media/CampusAddRemoveStudents_Part1.gif"> | <img src="media/CampusAddRemoveStudents_Part2.gif">

Add New Student          |    Update A Student
:-------------------------:|:-------------------------:
<img src="media/StudentAddNewAndUpdate_Part1.gif"> | <img src="media/StudentAddNewAndUpdate_Part2.gif">

Add Student To Campus          |    Remove Student From Campus
:-------------------------:|:-------------------------:
<img src="media/StudentAddRemoveFromCampus_Part2.gif"> | <img src="media/StudentAddRemoveFromCampus_Part1.gif">
