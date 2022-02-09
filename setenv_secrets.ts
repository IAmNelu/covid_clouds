const { writeFile } = require('fs');
const { argv } = require('yargs');

// read environment variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';


const targetPath = isProduction
  ? `./src/environments/environment.prod.ts`
  : `./src/environments/environment.ts`;
// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
    production: ${isProduction},
    firebaseConfig: {
        apiKey: "${process.env.ANGULAR_API_KEY}",
        authDomain: "${process.env.ANGULAR_AUTH_DOMAIN}",
        databaseURL: "${process.env.ANGULAR_DATABASE_URL}",
        projectId: "${process.env.ANGULAR_PROJECT_ID}",
        storageBucket: "${process.env.ANGULAR_STORAGE_BUCKET}",
        messagingSenderId: "${process.env.ANGULAR_MESSAGING_SENDER_ID}",
        appId: "${process.env.ANGULAR_APP_ID}",
        measurementId: "${process.env.ANGULAR_MEASUREMENT_ID}"
    }
};
`;
// write the content to the respective file
console.log(environmentFileContent);
writeFile(targetPath, environmentFileContent, function (err) {
  if (err) {
    console.log(err);
  }

  console.log(`Wrote variables to ${targetPath}`);
});