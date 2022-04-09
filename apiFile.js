const https = require('https');
const fs = require('fs');

//
function printData(url){
    https.get(url, (response) => {
        let data = '';
        response.on('data', (d) => {
            data += (d.toString());
        })
        response.on('end', ()=>{
            data = JSON.parse(data.toString())[0].lines;
            
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

//searches the first occurence of the spells by it's name and logs it onto the console.
async function search(url, searchName){
    https.get(url, (response => {
        let data = '';
        response.on('data', (d) => {
            data += (d.toString());
        })

        response.on('end', ()=>{
            //console.log(JSON.parse(data.toString()));
            data = JSON.parse(data.toString());
            let flag = true;
            for(x of data){
                if(x.name === searchName){
                    console.log(x);
                    flag = false;
                    break;
                }
            }
            if(flag) console.log(`Couldn't find the searched spell, try with some other spell!`);

            fs.appendFile(`./history.txt`, 'Search: ' + searchName +'\n', function (err) {
                if (err) throw err;
            });
            
        })
    }))
}


//filter data on the basis of key and value provided by the user
const getData = function(url, key, val){
   
    https.get(url, (response) => {
        //https.responseType = 'json';
        let data = '';
        response.on('data', (d) => {
            data += (d.toString());
        })
        response.on('end', ()=>{
            let stringData = data.toString();
            data = JSON.parse(stringData);
            let filteredData = data.filter(item => {
                for(x in item){
                    if(x === key && item[x] === val){
                        return true;
                    }
                }
                return false;
            });


            fs.readFile('./filteredData/counter.txt', 'utf8' , (err, id) => {
                if (err) {
                  console.error(err)
                  return
                }
                //unique id to store the filtered data in an unique file everytime the filter operation is performed
                id = Number(id);
                let filePath = `./filteredData/file${id}_${key}_${val}.txt`;

                //new file is created to store the filtered data
                fs.writeFile(filePath, stringData, function (err) {
                    if (err) throw err;
                    console.log('Data Updated!');
                });
                //to maintain the history
                fs.appendFile(`./history.txt`, 'filter: ' + `${filePath}\n`, function (err) {
                    if (err) throw err;
                    //console.log('Data Updated!');
                });
                
                fs.writeFile('./filteredData/counter.txt', (id + 1).toString(), function (err) {
                    if (err) throw err;
                    console.log('Counter Updated!');
                })
            })
            console.table(filteredData);
            
        })
    })
};

function showHistory(){
    fs.readFile('history.txt', 'utf8' , (err, history) => {
        if (err) {
            console.error(err)
            return
          }
        console.log(history);
    })
}

module.exports.printData = printData;
module.exports.getData = getData;
module.exports.search = search;
module.exports.showHistory = showHistory;