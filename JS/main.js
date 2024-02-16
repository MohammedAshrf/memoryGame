document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("What is you name?");
  console.log(yourName);
  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Uknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
};
let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
// let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());
// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);
// Add order range Css property to game blocks
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  // Add click event
  block.addEventListener("click", function () {
    // Trigger flip block function
    flipBlock(block);
  });
});
// Flip block function
function flipBlock(slectedBlock) {
  // Add class is-flipped
  slectedBlock.classList.add("is-flipped");
  // collet all flipped cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  if (allFlippedBlocks.length === 2) {
    // console.log("two flipped blocks slected");
    // Stop clicking function
    stopClicking();
    // Check matched block function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}
// stop clicking function
function stopClicking() {
  // Add class no clicking on main container
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    // Remove class no clicking after the duration
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}
// Check matched block
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    // document.getElementById("fail").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }
}

// Shuffle function
function shuffle(array) {
  // Setting vars
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    // Get random number
    random = Math.floor(Math.random() * current);
    // Decrease length by one
    current--;
    // [1] save current element in stash
    temp = array[current];
    // [2] current element = random element
    array[current] = array[random];
    // [3] random element = get element from stash
    array[random] = temp;
  }
  return array;
}
