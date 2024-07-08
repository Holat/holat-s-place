import fs from "fs";

export default function log(file, data) {
  if (!file && !data) return;
  fs.appendFile(
    file,
    `${data}\n=============================================================================================`,
    function (err) {
      if (err) {
        console.log("Error appending");
        return;
      }
      console.log('The "data to append" was appended to file!');
    }
  );
}
