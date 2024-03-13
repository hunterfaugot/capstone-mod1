// Get references to the button and chip counter elements
const assembleButton = document.getElementById('assemble-btn');
const chipCounterSpan = document.getElementById('chip-counter');

// Variable to store the chip count
let chipCount = 0;

// Function to update the chip counter display
function updateChipCounter() {
  chipCounterSpan.textContent = `Chips: ${chipCount}`;
}

// Add event listener to the assemble button
assembleButton.addEventListener('click', () => {
  // Increase chip count by 1
  chipCount++;
  // Update the chip counter display
  updateChipCounter();

  // Show the chip counter element after the first click
  chipCounterSpan.style.display = 'block';
});