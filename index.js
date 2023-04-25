const inquirer = require("inquirer");
const fs = require("fs");
const generateHtml = require("./src/generateHtml");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const { create } = require("domain");

const team = []; // will store team member objects;

// handles prompting user for manager information
function createManager() {
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
            }
    ]).then(ans => {
        const manager = new Manager(ans.managerName, ans.managerId, ans.managerEmail, ans.managerOfficeNumber);
        team.push(manager); // add manager to team array

        addTeamMember(); // add engineers or interns to team
    })
}

// handles prompting user for additional team members
function addTeamMember() {
    inquirer
        .prompt([
            // asks user to choose what teammate to add, if any
            {
                type: "list",
                message: "Do you want to add an engineer or an intern?",
                choices: ["Engineer", "Intern", "Done"],
                name: "addTeamMember", 
            }
    ]).then(ans => {
        if(ans.addTeamMember === "Engineer") {
            addEngineer(); // add engineer to team
        }
        else if(ans.addTeamMember === "Intern") {
            addIntern();
        }
        // if user selected 'Done', we go in the else statement
        else {
            // TODO: call function in generateHtml to generate HTML page

            return; // end function call
        }

        addTeamMember(); // recursively call function to add more team members
    })
}

// handles prompting user for engineer information
function addEngineer() {

}

// handles prompting user for intern information
function addIntern() {

}

createManager(); // start by prompting user to add manager