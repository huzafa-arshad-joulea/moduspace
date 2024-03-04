#!/usr/bin/env node

var stdin = process.openStdin();
var data = "";

const getCommitId = () => {
  const commitId = require("child_process")
    .execSync("git rev-parse --short HEAD")
    .toString()
    .trim();
  return commitId;
};

stdin.on("data", (chunk) => {
  data += chunk;
});

stdin.on("end", () => {
  //assume data is in env format XXX_KEY=XXX
  const parts = data.trimEnd().split("=");
  if (parts.length < 2) {
    console.log(`error :: failed to replace env ${data}`);
    return;
  }

  const key = parts[0];

  const fs = require("fs");
  const path = require("path");

  console.log(`:: Reading .env.${process.argv[2]}`);
  const envFile = path.join(__dirname, `.env.${process.argv[2]}`);

  // current data
  const fileData = fs.readFileSync(envFile, { encoding: "utf8", flag: "r" });
  const envlist = fileData.split("\n");

  let newEnvData = "";

  for (let i = 0; i < envlist.length; i++) {
    const env = envlist[i];
    if (env.startsWith(key)) {
      console.log(`:: update env: `, data);
      newEnvData = newEnvData + data.trimEnd() + "\n";
    } else if (env.startsWith("REACT_APP_BUILD_COMMID")) {
      console.log(`:: update env: `, "REACT_APP_BUILD_COMMID=" + getCommitId());
      newEnvData =
        newEnvData + "REACT_APP_BUILD_COMMID=" + getCommitId() + "\n";
    } else {
      newEnvData = newEnvData + env.trimEnd() + "\n";
    }
  }

  fs.writeFileSync(envFile, newEnvData);
});
