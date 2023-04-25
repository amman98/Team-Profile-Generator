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
            fs.writeFile("./dist/index.html", generateHtml(team), (err) => err ? console.error(err) : console.log("Success!"));
            return; // end function call
        }
    })

}

// handles prompting user for engineer information
function addEngineer() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the engineer's name?",
                name: "engineerName",
            },
            {
                type: "input",
                message: "What is the engineer's id?",
                name: "engineerId",
            },
            {
                type: "input",
                message: "What is the engineer's email?",
                name: "engineerEmail",
            },
            {
                type: "input",
                message: "What is the engineer's github username?",
                name: "engineerGithub",
            },
    ]).then(ans => {
        const engineer = new Engineer(ans.engineerName, ans.engineerId, ans.engineerEmail, ans.engineerGithub);
        team.push(engineer); // add engineer to team array
        addTeamMember(); // recursively call function to add more team members
    })
}

// handles prompting user for intern information
function addIntern() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the intern's name?",
                name: "internName",
            },
            {
                type: "input",
                message: "What is the intern's id?",
                name: "internId",
            },
            {
                type: "input",
                message: "What is the intern's email?",
                name: "internEmail",
            },
            {
                type: "input",
                message: "What is the intern's school?",
                name: "internSchool",
            },
    ]).then(ans => {
        const intern = new Intern(ans.internName, ans.internId, ans.internEmail, ans.internSchool);
        team.push(intern); // add intern to team array
        addTeamMember(); // recursively call function to add more team members
    })
}

createManager(); // start by prompting user to add manager