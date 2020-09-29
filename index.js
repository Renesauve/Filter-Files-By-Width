
const fs = require('fs');

const path = require('path')
const process = require("process");

const glob = require('glob');
const folderPath = "C:/Users/RenéS/Electron Metalworks Ltd/EMW HQ - __Website Cut Files"

// Loop through all the files in the temp directory
fs.readdir(folderPath, function (err, files) {

 files.forEach(function (file, index) {
    // Make one pass and make the file complete
    
    const newFolderPath = "C:/Users/RenéS/Electron Metalworks Ltd/EMW HQ - __Website Cut Files/" + file
    // glob(newFolderPath + '/**/*.svg', function (er, files) {
    // })
    fs.readdir(newFolderPath, function (err, subfiles) {
      if (subfiles == undefined) {
        console.log("poop")
      } else {
      subfiles.forEach(function (subfile, index) {
        function readContent(callback) {
          fs.readFile(`${newFolderPath}` + "/" + `${subfile}`,'utf8', function (err, content) {
              if (err) return callback(err)
              callback(null, content)
            
          })
      }

      readContent(function (err, content) {
        
 
      })

        
      })
    }

})


    

  });




});

