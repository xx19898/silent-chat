1. Create a simple chat app, where user has to choose his name first, after which he can search after users to chat with
   1. Create a mock db, which can add and delete users **DONE**
   2. Create an DAO object separating UI from the actual data, write tests for it
      1. Containerize the app, create 1) dev db 2) test db, connect sequelize to it, start planning the scheme, implementing the data-access api. **DONE**
      1. Get hotreaload working **DONE**
      1. Bring postgres-dev-db, postgres-test-db to the docker-compose file \*\*DONE
         1. Install sequelize **DONE**
         2. Connect and test connection to the sequelize programmatically. (maybe write test for it too) **DONE**
      1. Write and test the database layer functionality **HEAD**
         1. Plan and implement the schemes
            1. Figure out how the scheme implementing works in Sequelize
            2. Implement the schemes in the chatApp
      1. Figure out how to test socket communication
   3. Write the "endpoints" for socket.io and connect them to the io object in the server.js file
   4. Write the UI code for the register/login => see the list of all => choose user to chat with => start conversation => chat with the chosen user workflow
      1. Write the UI code for the register/login,add gsap support to the app
