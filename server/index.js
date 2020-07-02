const express = require('express');
const morgan = require('morgan');

//Initialization
const app = express();

//Settings
app.set('port', process.env.PORT || 3001);
app.use(morgan('dev'));

//Routes

//Server
app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`)
});