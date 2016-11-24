# spring-boot-websocket
Spring boot

Real time communication using websockets, stomp over SockJS, Spring boot, angularjs.
Send messages to anonymous users without logging in. 
Do not broadcast events.

Help Building this came from [ModernWeb072714](https://github.com/igor-baiborodine/ModernWeb072714.git)
and [Sergi Almar's Blog](http://www.sergialmar.com/)

Next Steps,
Connect upon request (if not already connected), 
once and end event is received, disconnect

## Steps in building The Application

Ensure angular-cli is installed. It can be downloaded and installed from the following [angular-cli](https://github.com/angular/angular-cli)

Run `./gradlew clean build -x test` to build the java application.

Open a new terminal, then change into the client directory. Then update the npm modules as follows
`npm install`

After updating the node modules, run the angular application with the command `ng build --watch`.
This will automatically build the angular ui anytime there are changes and put the compiled/transpiled
code into the `src/main/resources/static/app` directory.

Then go back to the previous tab, serve the Java application using spring boot with the command
`./gradlew bootRun`
