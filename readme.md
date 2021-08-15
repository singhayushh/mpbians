<p align="center"> 
  <img src="views/img/mpb_transparent.png" alt="Email Logo.png" width="80px" height="80px">
</p>
<h1 align="center">MPBians</h1>
<h3 align="center"> Prototype of alumni web platform </h3>

<p align="center"> 
<img src="https://user-images.githubusercontent.com/52620158/124359989-f61e4d80-dc44-11eb-9529-ca870eb20d71.PNG" alt="Animated gif pacman game" height="382px">
</p>

<h2> :memo: Quick Description</h2>
<p>This project is about a working prototype for alumni web platform for different schools and universities in general, and my school - MPB in particular. 
The platform currently allows school admins to create a user database by adding just the roll numbers and names of their students. 
The students will then have to register to the platform using their roll numbers and create their public profiles.</p>

<h2> :mag: Overview</h2>

<p>This platform includes 2 roles: Admins & Alumni</p>
<h4>Admins:</h4>
<p>
  The main role of the admin is to add all the students to the database, who they want to register to the platform. It is a prerequisite that for each student, the admin should have:
  <li><b>Name</b> - Full name of the student. Students will have the option to edit their display names later</li>
  <li><b>Year of passing</b> - Year in which the student passed the school</li>
  <li><b>Unique student id</b> - Either roll number or registration number of any other unique identification number that is known to the student as well as school.</li>

To add new user to the database, the admin should log in to the website using admin credentials and go to `/user/add` page which looks like the following:
<br/><br/>

  <p align="center"> 
  <img src="https://user-images.githubusercontent.com/52620158/124360787-4ac3c780-dc49-11eb-9c54-95a9e687547e.PNG" height="382px">
  </p>

</p>

<h4>Alumni:</h4>

The school alumni should first register themselves to the website by clicking on the register button from the home page or going to the `/register` endpoint.
In this page, you need to enter your full name and the school id (user id) to be able to proceed with the registration flow.
You will then be directed to a page to create a password for your account followed by adding your profile details. Make sure you add all the fields correctly and hit submit!

  <p align="center">
  <img src="https://user-images.githubusercontent.com/52620158/124361170-587a4c80-dc4b-11eb-97c7-976afd93bd1b.PNG" height="382px">
  </p>

Note that if you are unable to register and are receiving the **"Invalid User ID or Name"**, the admin might have not added you to the database yet.
If you are receiving the error message **"This account has already been registered to the platform"**, it means that someone else has falsely registered to the platform using your name and id.
In either case, feel free to contact the school or the developer (using the contact page available at `/contact`) to get your account back.

<h4>After logging in:</h4>
<ul>
  <li><b>View list of alumni</b> - the <code>/alumni</code> endpoint will present you a list of years to choose from. Clicking any of these will enlist all registered alumni from that batch</li>
  <li><b>View individual alumni</b> - Either by clicking the name of any alumni or using the <code>/{school_id}</code> endpoint will take you to the profile page of the user.</li>
</ul>

 <p align="center">
<img src="https://user-images.githubusercontent.com/52620158/124361341-42b95700-dc4c-11eb-8d60-c86b6c27736c.PNG" height="382px"/>
 </p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2> :statue_of_liberty: Development</h2>

<p>I have used nodejs, with the express framework for writing the server side code. 
MongoDB is used as the database and the frontend work has been done in EJS (which is HTML with advanced JS support) and a lot of CSS. 
All stylings are custom and no external css libraries have been used.

<p>There are just two models in the database as of now (03/07/2021). <br>One is a user model and the other is the profile model. 
The user model has just 5 properties - including the mongo object id, school id, default name, role and password. 
Apart from that, there is a token property that can be used in forgot password routes and a profile property that maps the profile document to the user. 
All the user's personal data like designation, about, website etc etc and a display name go under the profile model.</p>

<p>The project development was started roughly in the evening of 1st July 2021 and it's initial release is rolled out on the 4th of July, with around 20 hours of rigorous work.</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2> :clipboard: Project Structure</h2>
Rather, destructure.

Instead of the MVC model, I have divided the backend code into several components (individual directories).
Each of these directories have separate files for routes, controllers, services and the models.

```
/
  ├── main/               routes and handlers for the endpoints exposed at "/"
  ├── profile/            routes, handlers, services and models for the profile
  ├── support/            auth middleware and utility functions go here
  ├── user/               routes, handlers, services and models for the user
  ├── routes/             routes or endpoint definitions go here, routes make calls to controllers
  ├── views/              frontend code go here - ejs, css and client side js
  ├── .env                environment variables used in the project, not pushed to github
  ├── .gitignore          stores files and directories to be ignored by git
  ├── .prettierignore     stores files and directories to be ignored by prettier
  ├── .prettierrc         configuration for prettier to help maintain a common code formatting
  ├── package.json        metadata of the project
  ├── package-lock.json   stores version of every package used in the project
  ├── readme.md           details and instructions about the project go here
  └── server.js           entry point for our project
```

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2> :books: Steps to install and run locally</h2>
<ul>
  <li><p>Create a github account and clone the repo</p>
      <p>How to: <a href="https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository" target="_blank">Official documentation</a></p>
  </li>
  <li><p>Install node and npm</p>
      <p>How to: <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm" target="_blank">Offical Documentation</a></p>
  </li>
  <li><p>Open the project folder and create a .env file</p>
      <p>Contents of this file: <a href="https://github.com/singhayushh/mpbians/wiki/Contents-of-.env" target="_blank">Wiki link</a></p>
  </li>
  <li><p>Open terminal in the project folder and type <code>npm install</code>.</p>
      <p>This is just a one-time thing that installs all packages used in the project</p>
  </li>
  <li><p>In the terminal, type <code>npm start</code></p>
      <p>In return, you should see a message mentioning the link to the website running locally.</p>
  </li>
  <li><p>To stop the website open the terminal and use CTRL+C command to stop</p>
  </li>
</ul>

For any problems or issues with any of the above steps, feel free to eat my head by writing to coding.ayush@gmail.com

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- CREDITS -->
<h2 id="credits"> :scroll: Credits</h2>

-   https://storyset.com/ - for wonderful illustrations
-   https://github.com/ma-shamshiri - for the github template to start writing from
