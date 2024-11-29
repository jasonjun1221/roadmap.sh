const messageBox = document.getElementById("messageBox");
const charCounter = document.getElementById("charCounter");

const maxLength = 250;

messageBox.addEventListener("input", () => {
  const currentLength = messageBox.value.length;
  charCounter.textContent = `${currentLength} / ${maxLength}`;

  if (currentLength >= maxLength) {
    messageBox.classList.add("limit-reached");
    charCounter.style.color = "red";
    messageBox.value = messageBox.value.slice(0, maxLength - 1);
  } else {
    messageBox.classList.remove("limit-reached");
    charCounter.style.color = "black";
  }
});
