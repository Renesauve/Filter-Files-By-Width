const fs = require("fs");
// const {parse} = require("json2csv");
// const json2xls = require('json2xls');
const cheerio = require("cheerio");

const { json2excel, excel2json } = require('js2excel');

// const DxfParser = require("dxf-parser");
// const pcheerio = require('pseudo-cheerio');


const folderPath = "/Users/Student2/OneDrive - Electron Metalworks Ltd/Desktop/svgs/SVGS";
fs.readdir(folderPath, {encoding: "utf8", withFileTypes: true}, function (
  err,
  files
) {
  Promise.all(
    files.map(async (file, index) => {

      if (file.isFile()) {
        return new Promise((resolve, reject) => {
       
          function readContent(callback) {
            fs.readFile(
              `${folderPath}` + "/" + `${file.name}`,
              "utf8",
              function (err, content) {
                if (err) reject(err);
                callback(null, content);
             
              }
            );
          }
        
          readContent(function (err, content) {
            const $ = cheerio.load(content);
            
            const svg = $("svg");
            const fileData = {
              filename: file.name,
              width: svg.attr("width"),
              height: svg.attr("height"),
            };
            resolve(fileData);
          });
        });
      }
    })
  ).then((content) => 
      json2excel({
        content,
        name: content.filename,
        width: content.width,
        height: content.height   
    }
  ).catch(
    console.log("okay m8")
  ))
});

