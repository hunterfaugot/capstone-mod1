//this is javascript code
// Get references to the button and chip counter elements
const assembleButton = document.getElementById('assemble-btn');
const chipCounterSpan = document.getElementById('chip-counter');
const PUCounterSpan = document.getElementById('PU-counter');
const AMCounterSpan = document.getElementById('AM-counter');

// Get references to the robot part buttons
const processingUnitButton = document.getElementById('processing-unit-button');
const assemblyModuleButton = document.getElementById('assembly-module-button');

// Variable to store the chip count
let chipCount = 0;
// Other variable counters
let PUCount = 0;
let AMCount = 0;
// Variable for the first press
let firstPress = false;
// Variable to first display PU
let PUbtnDisplay = false;
// Variable to first display AM
let AMbtnDisplay = false;

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

// Function to enable/disable robot part buttons based on chip count
function updateRobotPartButtons() {
  console.log("Current Chip Count:", chipCount);
  processingUnitButton.disabled = chipCount < 20;
  assemblyModuleButton.disabled = chipCount < 30;

  console.log("Processing Unit Button Disabled:", processingUnitButton.disabled);
  console.log("Assembly Module Button Disabled:", assemblyModuleButton.disabled);

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

  // Reveal the PU button after reaching 20 first time
  if (chipCount === 20) {
    if (PUbtnDisplay === false) {
      PUbtnDisplay = true;
      processingUnitButton.style.display = 'block';
      PUCounterSpan.style.display = 'block';
    }
  }

  // Reveal the AM button after reaching 30 first time
  if (chipCount === 30) {
    if (AMbtnDisplay === false) {
      AMbtnDisplay = true;
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
});

// Processing Unit Build Button
assemblyModuleButton.addEventListener('click', () => {

  chipCount -= 30;
  AMCount++;
  // Update the chip counter display
  updateChipCounter();
  updateAMCounter();
  updateRobotPartButtons();
});

// Call updateChipCounter to initially display chip count (0)
updateChipCounter();

