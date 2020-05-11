const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = []



function managerQuestions(){ inquirer.prompt([
    {
        name: "name",
        message: "What is your name?",
        type: "input"

    },
    {
        name: "id",
        message: "What is your ID number?",
        type: "input"
    },
    {
        name: "email",
        message: "What is your Email?",
        type: "input"
    },
    {
        name: "officeNumber",
        message: "What is your office number?",
        type: "input"
    }
]).then(function(answers){
    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
    teamMembers.push(manager)
    createTeam()
})
}

function createTeam(){
    inquirer.prompt([
        {
            name: "choice",
            message: "Which type of team member would you like to add?",
            type: "list",
            choices: ["Engineer", "Intern", "I don't want to add any more team members"]
        }
    ]).then(function(answer){
        switch (answer.choice){
            case "Engineer":
                engineerQuestions()
            break;
            case "Intern":
                internQuestions()
            break;
            default:
                builtTeam()
        }

    })
}

function engineerQuestions(){ inquirer.prompt([
    {
        name: "name",
        message: "What is your name?",
        type: "input"

    },
    {
        name: "id",
        message: "What is your ID number?",
        type: "input"
    },
    {
        name: "email",
        message: "What is your Email?",
        type: "input"
    },
    {
        name: "github",
        message: "What is your GitHub username?",
        type: "input"
    }
]).then(function(answers){
    const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
    teamMembers.push(engineer)
    createTeam()
})
}

function internQuestions(){ inquirer.prompt([
    {
        name: "name",
        message: "What is your name?",
        type: "input"

    },
    {
        name: "id",
        message: "What is your ID number?",
        type: "input"
    },
    {
        name: "email",
        message: "What is your Email?",
        type: "input"
    },
    {
        name: "school",
        message: "Where did you go to school?",
        type: "input"
    }
]).then(function(answers){
    const intern = new Intern(answers.name, answers.id, answers.email, answers.school)
    teamMembers.push(intern)
    createTeam()
})
}

function builtTeam(){
    if (!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8")
}

managerQuestions()
