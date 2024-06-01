import inquirer from 'inquirer';
import fs from "fs";

let data = {
    title: "#",
    desription: "",
};

inquirer.prompt([
    {
        type: "input",
        message: "Enter your project title",
        name: "projectTitle"
    },
    {
        tpye:"input",
        message:"Enter title description",
        name: "projectDescription"
    }
]).then(res => { 
    data.title += res.projectTitle;
    console.log(data.title);
    console.log(res.projectDescription);    
});
// console.log(projectTitle);
