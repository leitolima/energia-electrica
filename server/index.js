const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

//Initialization
const app = express();

//Settings
app.set('port', process.env.PORT || 3001);
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.use(requiere('./routes'));

//Server
app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`)
});