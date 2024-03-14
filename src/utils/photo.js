import fs from "fs";

const fetch = (...args) =>
  // eslint-disable-next-line import/prefer-default-export
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

/**
 * @see https://github.com/classdojo/photo-collage/blob/master/index.js#L19
 */
// eslint-disable-next-line import/prefer-default-export
export function getPhoto(src) {
  if (src instanceof Buffer) {
    return src;
  }
  if (typeof src === "string") {
    if (/^http/.test(src) || /^ftp/.test(src)) {
      return fetch(src).catch(() => {
        throw new Error(`Could not download url source: ${src}`);
      });
    }
    return fs.promises.readFile(src).catch(() => {
      throw new Error(`Could not load file source: ${src}`);
    });
  }
  throw new Error(`Unsupported source type: ${src}`);
}
