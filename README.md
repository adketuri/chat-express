# chat-express
I decided to play with websockets and build a small chat app.

The initial application was built using [this fullstacklabs tutorial](https://www.fullstacklabs.co/blog/chat-application-react-express-socket-io) as a starting point with a few changes:
* Functional components instead of class components
* Typescript support
* [Chakra UI](https://chakra-ui.com/) for styling
* Newer versions of express/socket.io
* Modern es6 modules (`import` instead of `require`)

# Running the server
`yarn server` inside the `chat-server` folder. It should listen on 8080.

# Running the client
`yarn start` inside the `chat-client` folder. This should launch http://localhost:3000 in your browser.
