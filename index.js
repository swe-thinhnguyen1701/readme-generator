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
        type: "list",
        message: "Select license: ",
        name: "projectLicense",
        choices: ["MIT", "GPL-3.0", "Apache-2.0", "None"]
    }
]).then(res => {
    project.title = `# ${res.projectTitle}`;
    project.description = res.projectDescription;
    project.installation = `\`${res.projectInstallation}\``;
    project.usage = res.projectUsage;
    project.contribution = res.projectContribution;
    project.test = res.projectTest;
    project.license = res.projectLicense !== "None" ? `![License:${res.projectLicense}](https://img.shields.io/badge/license-${encodeURIComponent(res.projectLicense)}-blue)` : `N/A`;
    writeFile();
});


// console.log(projectTitle);

const getProjectData = () => {
    let data = "";
    const tableContent = `## Table Content\n- [Installation](#istallation)\n- [Usage](#usage)\n- [Contribution](#contribution)\n- [Test](#test)\n`
    for (const key in project) {
        if(key === "license") break;
        if (key !== "title" && key !== "description") {
            data += "## " + capitalizeWord(key) + "\n";
        }
        data += (project[key] + "\n");
        if (key === "title"){
            data += `${project.license}\n`;
        }
        if (key === "description") {
            data += tableContent;
        }
    }

    return data;
}

const writeFile = () => {
    fs.writeFile("README.md", getProjectData(), (err) => {
        err ? console.error(err) : console.log("README is created!!!");
    })
}

const capitalizeWord = (word) => word.charAt(0).toUpperCase() + word.slice(1);