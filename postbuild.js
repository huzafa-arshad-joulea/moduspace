#!/usr/bin/env node

var stdin = process.openStdin();

var data = '';

stdin.on('data', function (chunk) {
  data += chunk;
});

stdin.on('end', function () {
  console.log(`:: Writing build id as: ${data}`);
  const fs = require('fs');
  const path = require('path');
  let commitIdFile;
  commitIdFile = path.join(__dirname, 'build/commitid');
  fs.writeFileSync(commitIdFile, data);
});
