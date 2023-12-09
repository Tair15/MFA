/*################################
    Navigation Bar hamburger button
################################*/
const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn i");
const dropDownMenu = document.querySelector(".dropdown_menu");

toggleBtn.onclick = function () {
  dropDownMenu.classList.toggle("open");
  const isOpen = dropDownMenu.classList.contains("open");
  toggleBtnIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
};

/*################################
    form validation
################################*/
let currentStep = 1;

function nextStep(step) {
  document.querySelector(`.step-${step}`).classList.remove('active');
  currentStep++;
  document.querySelector(`.step-${currentStep}`).classList.add('active');
}

function prevStep(step) {
  document.querySelector(`.step-${step}`).classList.remove('active');
  currentStep--;
  document.querySelector(`.step-${currentStep}`).classList.add('active');
}

function validateForm() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (!isValidEmail(email)) {
    alert("Не верная почта");
    return false;
  }

  if (name === "" || email === "" || message === "") {
    alert("Заполните все поля");
    return false;
  } else {
    alert("Вы успешно отправили сообщение!");
    startConfetti();
  }
}

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

function startConfetti() {
  console.log("confetti");
  playSound("assets/sounds/horn-party-horn-smartsound-fx-1-00-01.mp3");
  jsConfetti = new JSConfetti();
  jsConfetti.addConfetti();
}

function playSound(audioName) {
  let audio = new Audio(audioName);
  audio.play();
}

/*################################
    game
################################*/
function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var element = document.getElementById(data);
  if (element) {
    var roomBlock = document.getElementById("roomBlock");
    var rect = roomBlock.getBoundingClientRect();

    var randomX = event.clientX - rect.left - element.offsetWidth / 2;
    var randomY = event.clientY - rect.top - element.offsetHeight / 2;

    element.style.position = "absolute";
    element.style.left = randomX + "px";
    element.style.top = randomY + "px";

    roomBlock.appendChild(element);
  }
}

function rotateElement(element) {
  let rotation = (element.getAttribute("data-rotation") || 0) % 360;
  rotation += 90;

  element.style.transform = `rotate(${rotation}deg)`;
  element.setAttribute("data-rotation", rotation);
}

document.addEventListener("DOMContentLoaded", function () {
  var furnitureItems = document.querySelectorAll(".furniture");
  furnitureItems.forEach((item) => {
    item.addEventListener("dragstart", drag);
  });
});
/*################################
    animation
################################*/

function onEntry(entry) {
  entry.forEach((change) => {
    if (change.isIntersecting) {
      change.target.classList.add("element-show");
    }
  });
}
let options = { threshold: [0.5] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll(".element-animation");

for (let elm of elements) {
  observer.observe(elm);
}

$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#js-top").removeClass("hide");
    } else {
      $("#js-top").addClass("hide");
    }
  });

  /*################################
    
  // Smooth scrolling to top
################################*/
  $("#js-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });
});

function navigateToQuizHome() {
  const modal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
  modal.hide();

  window.location.href = 'quizHome.html';
}

$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();   
});