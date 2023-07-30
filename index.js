const inquirer = require("inquirer");
const fs = require('fs');
const { generateSvg } = require('./lib/generateSvg');
const { makeShape } = require('./lib/makeShape');

inquirer
  .prompt([
    {
      type: 'input',
      name: 'logoName',
      message: 'Please enter text, must not be more than 3 letters',
    },
    {
      type: 'input',
      name: 'textColor',
      message: `Please enter text color keyword or a hexcode for the logo's test color`,
    },
    {
      type: 'input',
      name: 'logoColor',
      message: `Please enter a color keyword or a hexcode number for the logo's background color`,
    },
    {
      type: 'list',
      name: 'logoShape',
      message: `Please choose logo shape`,
      choices: ['triangle', 'circle', 'square'],
    },
  ])
  .then((data) => {
    const svgPath = './dist/logo.svg';
    const finalLogo = makeShape(data);

    fs.writeFile(svgPath, generateSvg(finalLogo), (err) =>
      err ? console.error(err) : console.log('Generated logo.svg')
    );
  })
  .catch((err) => console.error(err));