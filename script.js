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
// Variables for changing costs
let processingUnitBoughtCount = 0;


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

function updatePUCost(cost) {
  processingUnitButton.textContent = `Processing Unit\nCost: ${cost} Chips`;
}


// Function to enable/disable robot part buttons based on chip count
function updateRobotPartButtons() {
  console.log("Current Chip Count:", chipCount);
  //processingUnitButton.disabled = chipCount < 20;
  assemblyModuleButton.disabled = chipCount < 50;

  const processingUnitCost = getProcessingUnitCost(processingUnitBoughtCount);

  processingUnitButton.disabled = chipCount < processingUnitCost;
  
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

// Base cost for Processing Unit
let processingUnitCost = 20;
//let processingUnitCost = 20;

// Function to calculate processing unit cost for next round
function getProcessingUnitCost(PUBoughtCount) {
  console.log(Math.log(PUBoughtCount))
  PUBoughtCount = PUBoughtCount + 0.5;
  let result = processingUnitCost * (Math.log(PUBoughtCount) + 1);
  console.log(result);
  return result;
}
console.log(Math.log(2))
getProcessingUnitCost(1);
// Processing Unit Build Button
processingUnitButton.addEventListener('click', () => {
  PUCount++;
  processingUnitBoughtCount++;
  console.log(processingUnitBoughtCount, "processingUnitBoughtCount");
  console.log(processingUnitCost, "old processingUnitCost");
  let newCost = getProcessingUnitCost(processingUnitBoughtCount);
  console.log(newCost, "newCost");
  chipCount -= processingUnitCost;
  //console.log(processingUnitCost, "new processingUnitCost");
  // Update the chip counter display
  updateChipCounter();
  updatePUCounter();
  updateRobotPartButtons();
  
  updatePUCost(newCost); // Pass the cost as an argument
  
  // Reveal the AS1 button
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
  

  // Reveal the AS1 button
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
    intervalId = setInterval(increaseChipCount, 20000);
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




