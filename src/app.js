/* eslint-disable no-console */
'use strict';

import fs from 'fs';

function copyFile() {
  if (process.argv.slice(2).length !== 2) {
    console.error('length is less');

    return;
  }

  const [entryFile, copyTo] = process.argv.slice(2);

  if (!entryFile || !copyTo) {
    console.error('One or two param is undefined');

    return;
  }

  if (entryFile === copyTo) {
    return;
  }

  if (!fs.existsSync(entryFile)) {
    console.error('Non-existent source file');

    return;
  }

  const entryStats = fs.statSync(entryFile);

  if (entryStats.isDirectory()) {
    console.error('Source is a directory');

    return;
  }

  if (fs.existsSync(copyTo)) {
    const destStats = fs.statSync(copyTo);

    if (destStats.isDirectory()) {
      console.error('Destination is a directory');

      return;
    }
  }

  try {
    fs.copyFileSync(entryFile, copyTo);
  } catch (err) {
    console.error(err);
  }
}

copyFile();

export default copyFile();
