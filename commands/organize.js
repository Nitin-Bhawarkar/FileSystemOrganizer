let fs = require("fs");
let path = require("path");


function organizeFn(dirPath){

    //  console.log("Organize command implemented for", dirPath);
      // 1. input  ->  directory path given
      let destPath;
      if(dirPath == undefined){
      destPath = process.cwd();
          return;
      }else{
          let doesExist = fs.existsSync(dirPath);
  
          if(doesExist){
  
          // 2. create  ->  organized_files  -> directory
                 destPath = path.join(dirPath, "Organized_Files");
                 
                 if(fs.existsSync(destPath) == false){
                  fs.mkdirSync(destPath);
                 }
              
          } else{
              console.log("Kindly Enter the Correct Path");
              return;
          }
      }
  
      organizeHelper(dirPath, destPath);
    
      // 3. Identify categories of all files present in that input directory  ->  
      // 4. copy / cut files to that organized directory inside of any category folder
  
  }
  
  function organizeHelper(src, dest){
       // 3. Identify categories of all files present in that input directory  ->  
  
      let childNames = fs.readdirSync(src);
      // console.log(childNames);
  
      for(let i =0;i<childNames.length;i++){
          let childAddress = path.join(src,childNames[i]);
          let isFile = fs.lstatSync(childAddress).isFile();
          if(isFile){
              // console.log(childNames[i]);
  
              let category = getCategory(childNames[i]);
              console.log(childNames[i], "belongs to --> ", category);
  
   // 4. copy / cut files to that organized directory inside of any category folder
              
              sendFiles(childAddress, dest, category);
  
          }
      }
  }
  function sendFiles(srcFilePath, dest, category){
      let categoryPath = path.join(dest, category);
      if(fs.existsSync(categoryPath) == false){
          fs.mkdirSync(categoryPath);
      }
  
      let fileName = path.basename(srcFilePath);
      let destFilePath = path.join(categoryPath, fileName);
      fs.copyFileSync(srcFilePath,destFilePath);
      fs.unlinkSync(srcFilePath);
  
      console.log(fileName, " copied to ",category);
  
  
  }
  
  function getCategory(name){
      let ext =path.extname(name);
      ext = ext.slice(1);
      for(let type in types){
          let cTypeArr = types[type];
          for(let i=0;i<cTypeArr.length;i++){
              if(ext == cTypeArr[i]){
                  return type;
              }
          }
          
      }
      return "others";
  }
  

  module.exports = {
    organizeKey: organizeFn
}



