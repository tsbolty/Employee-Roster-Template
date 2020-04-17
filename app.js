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


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)



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
    const manager = new Manager(answers.name, answers.email, answers.id, answers.officeNumber)
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
    const engineer = new Engineer(answers.name, answers.email, answers.id, answers.github)
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
    const intern = new Intern(answers.name, answers.email, answers.id, answers.school)
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


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
