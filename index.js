const fs = require("fs");
const {parse} = require("json2csv");

// const path = require("path");
// const process = require("process");

// const glob = require("glob");
// Loop through all the files in the temp directory
const cheerio = require("cheerio");

const folderPath = "C:/Users/rdasa/Desktop/coins/";

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
            // console.log(file);

            const svg = $(`svg`);
            const fileData = {
              filename: file.name,
              width: svg.attr("width"),
              height: svg.attr("height"),
              docname: svg.attr("sodipodi:docname"),
            };
            resolve(fileData);

            // allFilesData.push(fileData);
          });
        });
      }
    })
  ).then((allFilesData) => {
    const fields = ["field1", "field2", "field3", "field4"];
    const csv = parse(allFilesData, {fields});

    console.log(csv);
  });
});
// // console.log(allFilesData);
