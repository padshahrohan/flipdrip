const { writeFile } = require('fs');
const targetPath = './src/environments/environment.ts';

const environmentFileContent = `
export const environment = {
   production: false,
   contractAddress: '0xf8A31C5D8680C4e848f720491F9d01e7817d1050'
};`;

writeFile(targetPath, environmentFileContent, function (err: any) {
   if (err) {
      console.log(err);
   }
   console.log(`Wrote variables to ${targetPath}`);
});