const https = require('https');

function printData(url){
    https.get(url, (response) => {
        let data = '';
        response.on('data', (d) => {
            data += (d.toString());
        })
        response.on('end', ()=>{
            //console.log(JSON.parse(data.toString()));
            data = JSON.parse(data.toString())[0].lines;
            //console.log(data);
            
            function itrFn(data){
                let i = 0;
                return function print(){
                    console.log(data[i]);
                    i++;
                    i %= data.length;
                }
            }
            
            let inter = setInterval(itrFn(data), 3000);
            
            setTimeout(()=>{
                clearInterval(inter);
            }, 15 * 60000);
        })
    })
}


const getData = function(url){
    // const xhr = new window.XMLHttpRequest();
    // xhr.open('GET', url, true);

    // //xhr.responseType = 'json';

    // xhr.onload = () => {
    //     const data = JSON.parse(xhr.response);

    //     let filteredData = data.filter(item => item.type === 'Charm' && item.light === 'Blue');
        
    //     console.table(filteredData);

    // };
    // xhr.send();
    //console.log(fetch(url));
    https.get(url, (response) => {
        //https.responseType = 'json';
        let data = '';
        response.on('data', (d) => {
            data += (d.toString());
            //console.log(data);
        })
        response.on('end', ()=>{
            //console.log(JSON.parse(data.toString()));
            data = JSON.parse(data.toString());
            let filteredData = data.filter(item => item.type === 'Charm' && item.light === 'Blue');
        
            console.table(filteredData);
        })
    })
};

module.exports.printData = printData;
module.exports.getData = getData;