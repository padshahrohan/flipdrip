const { writeFile } = require('fs');
const targetPath = './src/environments/environment.ts';

const environmentFileContent = `
export const environment = {
   production: false,
   contractAddress: '0x6Cd74B6b85720Bfa8f0747A8198F013cA44DBA84'
};`;

writeFile(targetPath, environmentFileContent, function (err: any) {
   if (err) {
      console.log(err);
   }
   console.log(`Wrote variables to ${targetPath}`);
});