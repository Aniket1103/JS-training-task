const https = require('https');
const apiFn = require('./apiFile');
let url = "https://poetrydb.org/title/Ozymandias/lines.json";



apiFn.printData(url);
