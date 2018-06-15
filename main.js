var BasicCard=require("./BasicCard.js");
var ClozeCard=require("./ClozeCard.js");
var inquirer=require("inquirer");
var basicFlashcards=[];
var clozeFlashcards=[];
var score;
var x=0;
var i=0;

//Basic flashcards
basicFlashcards.push(new BasicCard(
	"What is Captain America's shield made out of?", "Vibranium"));

basicFlashcards.push(new BasicCard(
	"What is the name of the technology that keeps Tony Stark alive?", "The Arc Reactor"));

basicFlashcards.push(new BasicCard(
	"What is the name of Thor's Hammer?", "Mjolnir"));

basicFlashcards.push(new BasicCard(
	"Who brings the Avengers together?", "Nick Fury"));

basicFlashcards.push(new BasicCard(
    "Who is the Winter Soldier?", "Bucky Barnes"));
    
basicFlashcards.push(new BasicCard(
    "What caused Bruce Banners change into the Hulk?", "Gamma Radiation"));

//Cloze flashcards
clozeFlashcards.push(new ClozeCard(
	"Captain America's shield is made out of Vibranium", "Vibranium"));

clozeFlashcards.push(new ClozeCard(
	"The Arc Reactor is the name of the technology that keeps Tony Stark alive.", "The Arc Reactor"));

clozeFlashcards.push(new ClozeCard(
	"Mjolnir is the name of Thor's Hammer.", "Mjolnir"));

clozeFlashcards.push(new ClozeCard(
	"Nick Fury brings the Avengers together.", "Nick Fury"));

clozeFlashcards.push(new ClozeCard(
	"Bucky Barnes is the winter soldier", "Bucky Barnes"));

clozeFlashcards.push(new ClozeCard(
	"Gamma Radiation caused Bruce Banners change into the Hulk.", "Gamma Radiation"));


function startSession(){
	score=0;
	
	console.log("------------------ Avengers Flashcards ------------------");
	console.log("");

	inquirer.prompt([
	{	
		type: "list",
		name: "cardType",
		message: "Please choose type of flashcards:",
		choices: ["Basic Cards", "Cloze Cards"]
	}
	]).then(function(choice){
		if (choice.cardType === "Basic Cards"){
			playBasic(0);
		}
		else {
				console.log("Fill in the blanks:")
				playCloze(0);
			};
		});
	};

function playBasic() {
	
	if (i < 6) {
			inquirer.prompt([
			{	
				type: "input",
				name: "card",
				message: basicFlashcards[i].front		
			}
			]).then(function(response) {

					if (response.card === basicFlashcards[i].back) {
						console.log("Right!");
						i++;
						score++;
						playBasic();
					}
					else {
						console.log("Nope!");
						console.log("The answer is " + basicFlashcards[i].back);
						i++;
						
						playBasic();	
					}
			});	
	}
	else {
		
		console.log("You Scored: " + score + "/6");
		console.log("");

		inquirer.prompt([
		{
			type: "list",
			name: "newGame",
			message: "Try Again?",
			choices: ["Yes", "No"]
		}
		]).then(function(response) {
			if (response.newGame === "Yes") {
				startSession();
				score = 0;
				x = 0;
				i = 0;
			}		 
		});	
	};
};

function playCloze() {
	
	if (x < 6) {
			inquirer.prompt([
			{	
				type: "input",
				name: "card",
				message: clozeFlashcards[x].partial		
			}
			]).then(function(response) {

					if (response.card === clozeFlashcards[x].cloze) {
						console.log("Right!");
						x++;
						score++;
						playCloze();
					}
					else {
						console.log("Nope!");
						console.log("The answer is " + clozeFlashcards[x].cloze);
						x++;
						
						playCloze();	
					}
			});	
	}
	else {
		console.log("You Scored: " + score + "/6");
		console.log("");

		inquirer.prompt([
		{
			type: "list",
			name: "newGame",
			message: "Try Again?",
			choices: ["Yes", "No"]
			
		}	
		]).then(function(response) {
			if (response.newGame === "Yes") {
				score = 0;
				x = 0;
				i = 0;
				startSession();
			} 
		});
	};
};
startSession();
