import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function log(file, data) {
  if (!file || !data) return;
  const absolutePath = path.resolve(__dirname, file);
  const divider = `\n${"-".repeat(80)}\n`;
  const offset = 1;
  const datetime = new Date(new Date().getTime() + offset * 3600 * 1000)
    .toUTCString()
    .replace(/ GMT$/, "");

  fs.appendFile(
    absolutePath,
    `${datetime} info: ${data}${divider}`,
    function (err) {
      if (err) {
        console.log("Error appending", err);
        return;
      }
    }
  );
}
