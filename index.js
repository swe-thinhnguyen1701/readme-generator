// import inquirer from 'inquirer';
// import fs from "fs";
const inquirer = require("inquirer");
const fs = require("fs");

const project = {
    title: "",
    description: "",
    installation: "",
    usage: "",
    contribution: "",
    test: "",
    questions: [],
    license: "",
};

inquirer.prompt([
    {
        type: "input",
        message: "Enter your project title",
        name: "projectTitle"
    },
    {
        type: "input",
        message: "Enter title description",
        name: "projectDescription"
    },
    {
        type: "input",
        message: "Enter installation: ",
        name: "projectInstallation"
    },
    {
        type: "input",
        message: "Enter usage information: ",
        name: "projectUsage"
    },
    {
        type: "input",
        message: "Enter contributions: ",
        name: "projectContribution"
    },
    {
        type: "input",
        message: "Enter test cases: ",
        name: "projectTest"
    },
    {
        type: "input",
        message: "Enter GitHub id: ",
        name: "projectGithub"
    },
    {
        type: "input",
        message: "Enter your email: ",
        name: "projectEmail"
    },
    {
        type: "list",
        message: "Select license: ",
        name: "projectLicense",
        choices: ["MIT", "GPL", "Apache", "None"]
    }
]).then(res => {
    project.title = `# ${res.projectTitle}`;
    project.description = `\n${res.projectDescription}`;
    project.installation = `\`${res.projectInstallation}\``;
    project.usage = res.projectUsage;
    project.contribution = res.projectContribution;
    project.test = res.projectTest;
    project.questions.push(res.projectGithub);
    project.questions.push(res.projectEmail);
    project.license = res.projectLicense !== "None" ? `![License: ${res.projectLicense}](https://img.shields.io/badge/license-${res.projectLicense}-blue)` : `None`;
    writeFile();
});

const getProjectData = () => {
    let data = "";
    const tableContent = `## Table Content\n- [Installation](#installation)\n- [Usage](#usage)\n- [Contribution](#contribution)\n- [Test](#test)\n- [Questions](#questions)\n`
    for (const key in project) {
        if(key === "license") break;
        if (key !== "title" && key !== "description") {
            data += "## " + capitalizeWord(key) + "\n";
        }
        if(key === "questions"){
            const githubID = `GitHub: https://github.com/${project.questions[0]}\n\n`;
            const email = `Email: ${project.questions[1]}\n\n`;
            const questionsIntro = "Contact me via following methods:\n\n";
            data += questionsIntro;
            data += githubID;
            data += email;
            continue;
        }
        data += (project[key] + "\n");
        if (key === "title" && project.license !== "None"){
            data += `${project.license}` + "\n\n";
        }
        if (key === "description") {
            data += tableContent;
        }
    }

    return data;
}

const writeFile = () => {
    fs.writeFile("./output/README.md", getProjectData(), (err) => {
        err ? console.error(err) : console.log("README is created!!!");
    })
}

const capitalizeWord = (word) => word.charAt(0).toUpperCase() + word.slice(1);