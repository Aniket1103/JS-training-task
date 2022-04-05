let apiFn = require('./apiFile');
//import apiFn from './apiFile';
const url = "https://wizard-world-api.herokuapp.com/Spells";

try{
    apiFn.getData(url);
}
catch(err){
    console.log(err);
}