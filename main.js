import {
	changeText,
	blockBtns,
	showBtns,
	dissapearBtns,
	answerBtns,
	data,
	headerModeChange,
	changeMode,
	nameMode,
} from './stylesEffect.js';
//--------------------------------------------------------------------------
const gameOver = document.querySelector('.GameOverScreen');
const playButton1 = document.querySelector('.playButton');
const gameOverBtn = document.querySelector('.forceButton');
const timerLeft = document.querySelector('.timeLeft');
const lightSaber = document.querySelector('.light');
const checkInput = document.querySelector('.inputNickname');
const parentElementForInjecting = document.querySelector('.grid-table');
let uniqueValue;
let arrNames;
let nameValuePairsArray;
let startingPoint = 0;
let questionCounter = 1;
let filteredArray = [];
let seconds = 59;
let timer;
let mode;
let i = 0;
let filteredArrayNames = [];
let arrayAllNames = [];
let arrayUniqueValues = [];
let arrayUniqueNames = [];
let pcAnswerGoodCounter = 0;
let pcGoodAnswers = [];
let pcAnswers = [];
sessionStorage.setItem('points', startingPoint);
sessionStorage.setItem('pcGoodPoints', pcAnswerGoodCounter);

//--------------------------------------------------------------------------
async function loadDataModule() {
	try {
		mode = data;
		if (mode == '0') {
			const module = await import('./modesJS/peopleMode.js');
			await module.finalDataPeopleMode();
			uniqueValue = module.uniqueValue;
			arrNames = module.arrNames;
			nameValuePairsArray = module.nameValuePairsArray;
			while (arrNames.length < 4) {
				await delay();
			}
		} else if (mode == '1') {
			const module = await import('./modesJS/vehiclesMode.js');
			await module.finalDataVehiclesMode();
			uniqueValue = module.uniqueValue;
			arrNames = module.arrNames;
			nameValuePairsArray = module.nameValuePairsArray;
			while (arrNames.length < 4) {
				await delay();
			}
		} else if (mode == '2') {
			const module = await import('./modesJS/starshipsMode.js');
			await module.finalDataStarshipsMode();
			uniqueValue = module.uniqueValue;
			arrNames = module.arrNames;
			while (arrNames.length < 4) {
				await delay();
			}
			nameValuePairsArray = module.nameValuePairsArray;
		}
	} catch (error) {
		console.error(error);
	}
}
function chooseMode() {
	if (data == null) {
		alert('You need to choose MODE if you want to proceed further !');
		return false;
	} else {
		return true;
	}
}

// //--------------------------------------------------------------------------

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
//--------------------------------------------------------------------------

const gameStart = async () => {
	if (chooseMode(data) == true && navigator.onLine) {
		await loadDataModule();
		changeText();
		dissapearBtns();
		blockBtns();
		startCountdown();
		timerBar();
	}
	if (!navigator.onLine) {
		alert('Jedi, your force was temporarily severed. Try again later.');
	}
};
const nextQuestion = async () => {
	internetConnection();
	disableBtns();
	await loadDataModule();
	changeText();
	setTimeout(unlockBtns(), 700);
};
function disableBtns() {
	answerBtns.forEach((answer) => {
		answer.disabled = true;
	});
}
function unlockBtns() {
	answerBtns.forEach((answer) => {
		answer.disabled = false;
	});
}

//--------------------------------------------------------------------------
function internetConnection() {
	if (!navigator.onLine) {
		alert('Jedi, your force was temporarily severed. Try again later.');
	}
}
function countdown() {
	if (seconds < 60 && navigator.onLine) {
		timerLeft.innerHTML = 'Time Left: 0m ' + seconds + 's';
	} else {
		timerLeft.innerHTML = 'Time Left: 0m ' + seconds + 's';
		seconds = null;
	}
	if (seconds > 0) {
		seconds--;
	} else {
		clearInterval(timer);
		answerBtns.forEach((button) => {
			button.disabled = true;
			button.style.color = 'grey';
		});
		gameOver.classList.toggle('hidden');
		document.querySelector('.inputNickname').value = '';
		document.querySelector('.questionPoints').textContent = `${sessionStorage.getItem(
			'points'
		)} / ${sessionStorage.getItem('question')}`;
		document.querySelector('.questionPointsPc').textContent = `${sessionStorage.getItem(
			'pcGoodPoints'
		)} / ${sessionStorage.getItem('question')}`;
		creatingTdAnswers();
	}
}
function timerBar() {
	if (i == 0) {
		i = 1;
		let lightSaberChild = lightSaber.children[0];
		let startTime = new Date().getTime();
		let id = window.setInterval(frame, 10);
		function frame() {
			let currentTime = new Date().getTime();
			let elapsedTime = currentTime - startTime;
			let totalTime = 60000;
			let width = (1 - elapsedTime / totalTime) * 100;

			if (width <= 0) {
				clearInterval(id);
				i = 0;
			} else {
				lightSaberChild.style.width = width + '%';
			}
			if (!navigator.onLine) {
				clearInterval(id);
			}
		}
	}
}

function startCountdown() {
	if (!timer) {
		timer = window.setInterval(() => {
			countdown();
			if (!navigator.onLine) {
				alert('Jedi, your force was temporarily severed. Try again later.');
			}
		}, 1000);
	}
}

function localStoragePlayers() {
	let obj = {
		name: `${document.querySelector('.inputNickname').value}`,
		points: `${sessionStorage.getItem('points')}`,
		questions: `${sessionStorage.getItem('question')}`,
	};
	let getLocalStorageData = localStorage.getItem(`${nameMode}`);
	let userData = getLocalStorageData ? JSON.parse(getLocalStorageData) : [];
	userData.push(obj);
	localStorage.setItem(`${nameMode}`, JSON.stringify(userData));
}

function returnToGameStart() {
	localStoragePlayers();
	seconds = 60;
	timer = null;
	timerLeft.innerHTML = 'Time Left: 1m 00s';
	gameOver.classList.toggle('hidden');
	mode = null;
	showBtns();
	blockBtns();
	headerModeChange();
	changeMode();
	unlockBtns();
	filteredArrayNames = [];
	arrayAllNames = [];
	arrayUniqueValues = [];
	arrayUniqueNames = [];
	pcGoodAnswers = [];
	pcAnswers = [];
	answerBtns.forEach((button) => {
		button.disabled = false;
		button.style.color = 'black';
	});
}
function validateInput() {
	if (checkInput.value == '') {
		alert('Please fill a form with your name');
		return false;
	} else {
		returnToGameStart();
	}
}
//--------------------------------------------------------------------------
const hallOfFameScores = () => {
	const playerName = document.querySelectorAll('.player');
	const answerScore = document.querySelectorAll('.answer');
	let localStorageName = nameMode;
	let retriveLocalObject = JSON.parse(localStorage.getItem(`${localStorageName}`));
	let selectedObjects = [];
	let count = 0;
	for (let key in retriveLocalObject) {
		if (count < 3) {
			selectedObjects[key] = retriveLocalObject[key];
			count++;
		} else {
			break;
		}
	}
	if (selectedObjects) {
		selectedObjects.sort((a, b) => parseInt(b.points) - parseInt(a.points));
		playerName.forEach((answer, index) => {
			try {
				answer.textContent = `${selectedObjects[index].name}`;
			} catch (error) {
				answer.textContent = '';
			}
		});
		answerScore.forEach((score, index) => {
			try {
				score.textContent = `${selectedObjects[index].points}/${selectedObjects[index].questions}`;
			} catch (error) {
				score.textContent = '';
			}
		});
	}
	localStorageName = '';
	retriveLocalObject = '';
	selectedObjects = [];
	count = 0;
};
function creatingTdAnswers() {
	let i = 0;
	do {
		let tdCorrectAnswerImg = document.createElement('div');
		let tdUserAnswer = document.createElement('div');
		let tdComputerAnswer = document.createElement('div');
		let tdCorrectAnswer = document.createElement('div');
		let correctAnswerIMG = document.createElement('img');
		tdCorrectAnswerImg.classList.add('divcell');
		tdUserAnswer.classList.add('divcell');
		tdComputerAnswer.classList.add('divcell');
		tdCorrectAnswer.classList.add('divcell');
		correctAnswerIMG.classList.add('imgcorrect');
		tdCorrectAnswer.textContent = arrayUniqueNames[i];
		correctAnswerIMG.src = `./img/modes/${nameMode}/${arrayUniqueValues[i]}.jpg`;
		if (arrayUniqueNames[i] == arrayAllNames[i]) {
			tdUserAnswer.textContent = arrayAllNames[i];
			tdUserAnswer.style.color = '#41ED25';
		} else {
			tdUserAnswer.textContent = arrayAllNames[i];
			tdUserAnswer.style.color = '#F00';
		}
		if (arrayUniqueNames[i] == pcAnswers[i]) {
			tdComputerAnswer.textContent = pcAnswers[i];
			tdComputerAnswer.style.color = '#41ED25';
		} else {
			tdComputerAnswer.textContent = pcAnswers[i];
			tdComputerAnswer.style.color = '#F00';
		}
		if (parentElementForInjecting) {
			parentElementForInjecting.append(
				tdCorrectAnswerImg,
				tdUserAnswer,
				tdComputerAnswer,
				tdCorrectAnswer
			);
		}
		if (tdCorrectAnswerImg) {
			tdCorrectAnswerImg.appendChild(correctAnswerIMG);
		}
		i++;
	} while (arrayAllNames.length > i);
}
function pcPoints() {
	let indexNumber = Math.floor(Math.random() * 4);
	let computerChosenAnswer = nameValuePairsArray[indexNumber].name;
	if (nameValuePairsArray[indexNumber].value == uniqueValue) {
		sessionStorage.setItem('pcGoodPoints', pcAnswerGoodCounter++);
		pcGoodAnswers.push(computerChosenAnswer);
		pcAnswers.push(computerChosenAnswer);
	} else {
		pcAnswers.push(computerChosenAnswer);
	}
}
//--------------------------------------------------------------------------
answerBtns.forEach((answer, index) => {
	answer.addEventListener('click', () => {
		if (nameValuePairsArray[index].value == uniqueValue) {
			answer.style.backgroundColor = '#41ED25';
			answer.style.boxShadow = '0px 4px 30px 0px #51FC00, 0px 4px 4px 0px rgba(0, 0, 0, 0.25)';
			answer.style.transition = 'all 0.8s';
			setTimeout(() => {
				answer.style.backgroundColor = 'white';
				answer.style.boxShadow = 'none';
			}, 1000);
			filteredArray.push(nameValuePairsArray[index].value);
			filteredArrayNames.push(nameValuePairsArray[index].name);
			arrayAllNames.push(nameValuePairsArray[index].name);

			sessionStorage.setItem('points', startingPoint++);
		} else {
			answer.style.backgroundColor = '#F00';
			answer.style.boxShadow = '0px 4px 30px 0px #F00, 0px 4px 4px 0px rgba(0, 0, 0, 0.25)';
			answer.style.transition = 'all 0.8s';
			setTimeout(() => {
				answer.style.backgroundColor = 'white';
				answer.style.boxShadow = 'none';
			}, 1000);
			arrayAllNames.push(nameValuePairsArray[index].name);
		}
		for (let index = 0; index < nameValuePairsArray.length; index++) {
			if (nameValuePairsArray[index].value == uniqueValue) {
				arrayUniqueNames.push(nameValuePairsArray[index].name);
				arrayUniqueValues.push(nameValuePairsArray[index].value);
			}
		}
		pcPoints();
		nextQuestion();
		sessionStorage.setItem('question', questionCounter++);
	});
});
gameOverBtn.addEventListener('click', validateInput);
checkInput.addEventListener('keypress', function (event) {
	if (event.key == 'Enter') {
		validateInput();
	}
});

playButton1.addEventListener('click', gameStart);
export {arrNames, uniqueValue, filteredArray, hallOfFameScores};
