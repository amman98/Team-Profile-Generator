const inquirer = require("inquirer");
const fs = require("fs");
const generateHtml = require("./src/generateHtml");
const Manager = require("./lib/Manager");
const { create } = require("domain");

const team = []; // will store team member objects;

// TODO: Prompt user for information about employees on a software engineering team
function createTeam() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the manager's name?",
                name: "managerName",
            },
            {
                type: "input",
                message: "What is the manager's id?",
                name: "managerId",
            },
            {
                type: "input",
                message: "What is the manager's email address?",
                name: "managerEmail",
            },
            {
                type: "input",
                message: "What is the manager's office number?",
                name: "managerOfficeNumber",
            },
            {
                type: "list",
                message: "Do you want to add an engineer or an intern?",
                choices: ["Engineer", "Intern", "Done"],
                name: "addTeamMember", 
            },
    ]).then(ans => {
        const manager = new Manager(ans.managerName, ans.managerId, ans.managerEmail, ans.managerOfficeNumber);
        team.push(manager); // add manager to team array
    })
}

createTeam();