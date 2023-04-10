// Help Function

function helpFn(dirPath){
    console.log(`
        List of All Commands : 

            node main.js tree "directoryPath"
               node main.js organize "directoryPath"
                    node main.js help      
        `);
}

module.exports={
    helpKey: helpFn
}
