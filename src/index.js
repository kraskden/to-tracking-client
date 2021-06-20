import React from 'react';
import ReactDOM from 'react-dom';

import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import './css/style.css'

require("dotenv").config()
console.log(process.env)

ReactDOM.render(<App />, document.getElementById("root"))
