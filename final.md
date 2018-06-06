###### Team Members
Alex Tov: I focused on creating and designing the front end for this app. I wanted the app to look clean, simple, and with relatively easy going colors. I coded the css pages we used for the overall design of the app, but not the stylings required for our visualizations. I also helped to create markdown files, test our application, and did a lot of the earlier work on our first prototypes, before we moved into firebase and the last.fm API.

Brandon Nguyen: I focused on looking for bugs/issues in functionality and design. I did some work on the design of the app, but it was mostly minor details and not the overall look. I also helped to program a couple of the backend functions of the site. Additionally, I helped to create the markdown files, did a lot of testing, and tried to manage the project as best as I could by updating the group on the status of our project, and what still needed to be done.

Jason Trieu: I programmed, most of the backend functionality of our site. That includes all the firebase interactions and the API interactions. I also coded the visualization functions. I focused on the backend while the rest of my team developed the frontend, linked frontend areas to backend functions, and managed the rest of the project.

Vanna Luu: I was the one to initially link the firebase to our application. I also helped in testing of our application.

##### Source Code Files

### HTML FILES

# index.html
This page is the landing page for our web app. It is just a sign in page that features our app name, login fields, and an option to create a new account.

# home.html
This page is the home page for our app. It features our main functionality which is the ability to visualize your music listening habits as a result of last.fm in addition to viewing a friend's music habits. It also allows you to view compatibility with said friend based off the music you both listen to.

# people.html
This page is similar to a profile page for a user. It currently features an option to view your friends list (in-app friends, not last.fm friends), and to add new in app friends.

# settings.html
This page is a simple settings page. It allows users to update their account credentials or change their last.fm usernames.

# signup.html
This page is a new user creation page. It features text fields that allows users to create new profiles on our app. 

### JS Files

# chart.js
This file features the methods for data visualization that one our team members (Jason) wrote. It also uses some methods in the c3 js file that we did not compile ourselves.

# firebase.js
This file contains the methods we wrote to interact with our firebase data in the backend in combination with frontend inputs.

# hash.js
This file contains a single method to create a unique hash for each user to make them unique in the database.

# lastfm.js
This file contains the methods we used that incorporated the last.fm API in order to pull data from their servers.

# profile.js
This file contains the methods we used to turn the data from last.fm into visualizations. In conjunction with the c3.js and chart.js files, this file was used in the creation of our two visualizations.

# sessionstorage.js
This file allowed our app to remember important details about the user's session such as their username, userID, which allowed for more efficient interaction with our database and the last.fm API

# server.js
This file allowed our entire app to run. It created and linked all dependencies and allowed us to interact between the frontend and backend of our app due to the links it created.

# index.js
This file allowed our site to be viewable.

### CSS Files

# main.css
This file contains the styling we used throughout our app. We also pulled some elements from bootstrap, and the stylings for our visualization came from the c3.css file.

## Files we used but did not create ourselves:

All the bootstrap files, the c3 and d3 js/css files, jquery files, and anything under the node_modules subfolder.

##### Link to Demo Video

https://tinyurl.com/cogs121abjv


