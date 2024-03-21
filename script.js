//this is javascript code
// Get references to the button and chip counter elements
const assembleButton = document.getElementById('assemble-btn');
const chipCounterSpan = document.getElementById('chip-counter');
const PUCounterSpan = document.getElementById('PU-counter');
const AMCounterSpan = document.getElementById('AM-counter');
const ass1CounterSpan = document.getElementById('A1-counter');

// Get references to the robot part buttons
const processingUnitButton = document.getElementById('processing-unit-button');
const assemblyModuleButton = document.getElementById('assembly-module-button');
const assembler1Button = document.getElementById('Mk1-assembler-button');

// Variable to store the chip count
let chipCount = 0;
// Other variable counters
let PUCount = 0;
let AMCount = 0;
let ass1Count = 0;
// Variable for revealing buttons
let firstPress = false;
let partsReveal1 = false;
let robotsReveal1 = false;

// Function to update the chip counter display
function updateChipCounter() {
  chipCounterSpan.textContent = `Chips: ${chipCount}`;
}

function updatePUCounter() {
  PUCounterSpan.textContent = `PUs: ${PUCount}`;
}

function updateAMCounter() {
  AMCounterSpan.textContent = `AMs: ${AMCount}`;
}

function updateAss1Counter() {
  ass1CounterSpan.textContent = `Mk1As: ${ass1Count}`;
}

// Function to enable/disable robot part buttons based on chip count
function updateRobotPartButtons() {
  console.log("Current Chip Count:", chipCount);
  processingUnitButton.disabled = chipCount < 20;
  assemblyModuleButton.disabled = chipCount < 50;

  if (processingUnitButton.disabled) {
    processingUnitButton.classList.add('disabled');
    console.log("PU true");
  } else {
    processingUnitButton.classList.remove('disabled');
    console.log("PU false");
  }

  if (assemblyModuleButton.disabled) {
    assemblyModuleButton.classList.add('disabled');
    console.log("AM true");
  } else {
    assemblyModuleButton.classList.remove('disabled');
    console.log("AM false");
  }
}

function updateRobotButtons() {
  if (PUCount < 1 || AMCount < 1) {
    assembler1Button.classList.add('disabled');
    console.log("A1 true");
  } else {
    assembler1Button.classList.remove('disabled');
    console.log("A1 false");
  }

}

// Add event listener to the assemble button
assembleButton.addEventListener('click', () => {
  // Increase chip count by 1
  chipCount++;
  // Update the chip counter display
  updateChipCounter();

  // Reveal the chip counter element after the first click
  if (chipCount === 1) {
    if (firstPress === false) {
      firstPress = true;
      chipCounterSpan.style.display = 'block';
    }
  }

  // Reveal first parts buttons after reaching 20
  if (chipCount === 20) {
    if (partsReveal1 === false) {
      partsReveal1 = true;
      processingUnitButton.style.display = 'block';
      PUCounterSpan.style.display = 'block';
      assemblyModuleButton.style.display = 'block';
      AMCounterSpan.style.display = 'block';
    }
  }

  
  // Update robot part button visibility and functionality
  updateRobotPartButtons();
});

// Processing Unit Build Button
processingUnitButton.addEventListener('click', () => {
  
  chipCount -= 20;
  PUCount++;
  // Update the chip counter display
  updateChipCounter();
  updatePUCounter();
  updateRobotPartButtons();
  

  // Reveal the AM button after reaching 30
  if (PUCount === 1) {
    if (robotsReveal1 === false) {
      robotsReveal1 = true;
      assembler1Button.style.display = 'block';
      ass1CounterSpan.style.display = 'block';
    }
  }
  updateRobotButtons();
});

// Assembly Module Build Button
assemblyModuleButton.addEventListener('click', () => {

  chipCount -= 50;
  AMCount++;
  // Update the chip counter display
  updateChipCounter();
  updateAMCounter();
  updateRobotPartButtons();
  

  // Reveal the AM button after reaching 30
  if (AMCount === 1) {
    if (robotsReveal1 === false) {
      robotsReveal1 = true;
      assembler1Button.style.display = 'block';
      ass1CounterSpan.style.display = 'block';
    }
  }
  updateRobotButtons();
});


// Variable to store the interval ID (used for stopping)
let intervalId = null;

// Function to auto increase chip count
function increaseChipCount() {
  chipCount += ass1Count; // Multiply by number of active assemblers
  updateChipCounter();
  updatePUCounter();
  updateAMCounter();
  updateRobotPartButtons();
  updateRobotButtons();
}



// Mk1 Assembler Build Button
assembler1Button.addEventListener('click', () => {
  if (PUCount >= 1 && AMCount >= 1) {
  PUCount -= 1;
  AMCount -= 1;
  ass1Count++;
  }
  // Start or continue the chip increment interval
  if (!intervalId) {
    intervalId = setInterval(increaseChipCount, 10000);
  }
  // Update the chip counter display
  updateChipCounter();
  updatePUCounter();
  updateAMCounter();
  updateAss1Counter();
  updateRobotPartButtons();
  updateRobotButtons();
});


// Call updateChipCounter to initially display chip count (0)
updateChipCounter();




