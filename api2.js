let apiFn = require('./apiFile');
let readline = require('readline');
let https = require('https');
let fs = require('fs');
const url = "https://wizard-world-api.herokuapp.com/Spells";

apiFn.getData(url);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(`What is your choice?\n 
1.Search\n
2.Filter\n
3.History\n
4.Delete
`, async (choice) => {
    console.log(`Your entered choice is ${choice}`);
      await options(Number(choice));
  
});

// let flag = true;

// async function proceed(){
//     return new Promise(async (resolve) => {
//         //while(flag){
            
//         //}
//         rl.question(`What is your choice?\n 
//             1.Search\n
//             2.Filter\n
//             3.History\n
//             4.Delete
//             `, async (choice) => {
//                 console.log(`Your entered choice is ${choice}`);
//                   await options(Number(choice));
//                   //await sleep(2000);
//                   console.log('proceed after to cont call');
//                   console.log('---');
//             await toContinue();
            
//             resolve();
//             });
            
//     })
// }
// //proceed();
// async function toContinue(){
//     console.log("toCon");
//     return new Promise(async (resolve) => {
//         rl.question('Do you want to continue ? (y/n): ', async (inp) => {
//             //await search(url, inp);
//             if(inp === 'n'){
//                 flag = false;
//                 rl.close();
//             }
//             else if(inp !== 'y'){
//                 console.log("Invalid input\nYou can only enter y/n\nTry again!");
//                 await toContinue();
//             }
//             else await proceed();
//             resolve();
//         });
//     })
    
// }
//options()
async function options(choice){
    //console.log(choice);
    //apiFn.getData(url);
    //return new Promise(async (resolve, reject) =>{
        //resolve();
        switch(choice){
            case 1:
                //console.log("case1");
                rl.question('Enter a name to search ', async (searchName) => {
                    //console.log(`your entered search is ${searchName}`);
                    await apiFn.search(url, searchName);
                    toCont();
                    //console.log('search comp')
                    
                    //rl.close();
                });
                
                break;
            case 2:
                rl.question('Enter filter Details \nEnter key:', async (key) => {
                    rl.question("Enter value: ", async (value) => {
                        await apiFn.filter(url, key, value);
                        //console.log('filter comp');
                        toCont();
                        //resolve();
                        //rl.close();
                    })
                })
                break;
            case 3:
                await apiFn.showHistory();
                toCont();
                //rl.close();
                break;
            case 4:
                rl.question('Enter name of the spell to Delete: ', async choice =>{
                    await apiFn.deleteSpell(choice);
                    toCont();
                })
                
                
                //rl.close();
                break;
    
            default:console.log("Invalid Input");
                    toCont();
            
        }
        //toCont();
        //resolve();
    //});
}

async function toCont(){
    return new Promise(async resolve => {
        rl.question('Do you want to continue(y/n)? ', async (choice) =>{
            if(choice === 'y'){
                    rl.question(`What is your choice?\n1.Search\n2.Filter\n3.History\n4.Delete
                `, async (choice) => {
                    console.log(`Your entered choice is ${choice}`);
                    await options(Number(choice));
                
                });
            }
            else if(choice === 'n'){
                rl.close();
            }
            else{
                console.log(`Invalid Input\nYou can only enter(y/n)`);
                await toCont();

            }
            resolve();
        })
    })
}

function sleep(time){
    return new Promise(resolve => {
         setTimeout(resolve, time);
         //resolve();
     });
 }
