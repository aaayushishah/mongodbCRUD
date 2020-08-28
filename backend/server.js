const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
const jwt = require('./helper/jwt');
const indexroute = require('./routes/index');
const corsOptions = {
    origin: '*',
};
const port = 3000;
app.use(jwt());
app.use(cors(corsOptions));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use('/', indexroute);
app.listen(port, function() {
    console.log('Server is running on port ' + port);
});