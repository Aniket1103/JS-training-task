let apiFn = require('./apiFile');
let readline = require('readline');
let https = require('https');
let fs = require('fs');
const url = "https://wizard-world-api.herokuapp.com/Spells";


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What is your choice? ', async (choice) => {
    console.log(`Your entered choice is ${choice}`);
      await options(Number(choice));
  
});



function options(choice){
    //console.log(choice);
    //apiFn.getData(url);
    switch(choice){
        case 1:
            //console.log("case1");
            rl.question('Enter a name to search ', async (searchName) => {
                //console.log(`your entered search is ${searchName}`);
                await apiFn.search(url, searchName);
                rl.close();
            });
            
            break;
        case 2:
            rl.question('Enter filter Details \nEnter key:', async (key) => {
                rl.question("Enter value: ", async (value) => {
                    await apiFn.getData(url, key, value);
                    rl.close();
                })
            })
            break;
        case 3:
            apiFn.showHistory();
            rl.close();
            break;
        case 4:
            
            
            break;

        default:console.log("default");rl.close();
            
    }
    

}