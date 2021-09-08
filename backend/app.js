const db = require('./database');
db.Initiate();
const http = require('http');
const express = require('express');
const passport = require('passport');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// cors
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// parse application/json
app.use(express.json());

////////////////////

// app.use(Middlewares.ipInfoMiddleware)
// app.use((req, res, next) => {
//     console.log(req.headers);
//     next();
// });
app.use(passport.initialize());
app.use(passport.session());

const {PassportModule} = require('./src/modules');
PassportModule.Initiate(passport);

//routes
const routes = require('./src/routes');
app.use('/api', routes);

const PORT = process.env.PORT || 8081;

const WebSocket = require('./websocket');
const main = async () => {
    WebSocket.Initiate(server);
    app.get('/', (req, res) => {
        res.json({foo: 'bar'});
    });

    server.listen(PORT, () => {
        console.log(`[HTTP SERVER] Server listening on : ${PORT}`);
    });
};
main();
