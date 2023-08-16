// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of your project:',
      },
      {
        type: 'input',
        name: 'installation',
        message: 'How do you install your project?',
      },
      {
        type: 'input',
        name: 'usage',
        message: 'How do you use your project?',
      },
      {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your project:',
        choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'ISC', 'None'],
      },
      {
        type: 'input',
        name: 'contributing',
        message: 'How can others contribute to your project?',
      },
      {
        type: 'input',
        name: 'tests',
        message: 'How do you test your project?',
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username:',
      },
      {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:',
      },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, data, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('README file has been generated!');
        }
    });
}

function renderLicenseBadge(license) {
    if (license) {
      return `![License](https://img.shields.io/badge/license-${license}-brightgreen)`;
    }
    return '';
  }
  
  function renderLicenseLink(license) {
    if (license) {
      return `* [License](#license)\n`;
    }
    return '';
  }
  
  function renderLicenseSection(license) {
    if (license) {
      return `## License
  This project is licensed under the ${license} License - see the [LICENSE](LICENSE) file for details.\n`;
    }
    return '';
  }
  
  function generateMarkdown(data) {
    return `# ${data.title}

    ${renderLicenseBadge(data.license)}

## Description
${data.description}

## Table of Contents
${renderLicenseLink(data.license)}
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Installation
${data.installation}

${renderLicenseSection(data.license)}

## Usage
${data.usage}

## Contributing
${data.contributing}

## Tests
${data.tests}

## Questions
If you have any questions, please contact me at ${data.email}.
`;
  }

// TODO: Create a function to initialize app
async function init() {
    try {
        const answers = await inquirer.prompt(questions);
        const readmeContent = generateMarkdown(answers);
        writeToFile('README.md', readmeContent);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Function call to initialize app
init();
