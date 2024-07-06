import fs from "fs";

export default function log(file, data) {
  if (!file && !data) return;
  fs.appendFile(file, data, function (err) {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });
}
