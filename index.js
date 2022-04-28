'use strict'

var app = require('./app');
var port = 3900;

app.listen(port, () => {
    console.log('Servidor corriendo en HTTP://LOCALHOST:' + port);
})