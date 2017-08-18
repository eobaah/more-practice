let modaOverlay = document.querySelector(".modal-overlay")
let modal = document.querySelector(".modal-container")
let closeBtns = document.querySelector(".modal-close-btn")
let roomNumberText = document.querySelector(".modal-room-name")
let roomNumberPrice = document.querySelector(".modal-room-price")
let bookBtns = document.querySelectorAll("td button")
let nightsStayed = document.querySelector(".modal-nights-stayed-selector")
let modalTotalPrice = document.querySelector(".modal-total-price")
let roomTotal = 0

function openBook(element) {
  modaOverlay.classList.add("show-modal")
  modal.classList.add("show-modal")
  let roomNumber = element.target.parentElement.parentElement.childNodes[1].innerHTML
  let price = element.target.parentElement.parentElement.childNodes[5].innerHTML
  roomNumberText.innerHTML = "<strong>Room</strong> " + roomNumber
  roomNumberPrice.innerHTML = price + " / night"
  calcTotal(element)
}

function closeBook() {
  modaOverlay.classList.remove("show-modal")
  modal.classList.remove("show-modal")
  nightsStayed.value = 0;
}

function calcTotal(element) {
  let changeNightsStayed = Number(element.target.value)
  let pricePerNight = Number(roomNumberPrice.innerHTML.replace(/[^0-9]+/g, '')/100)
  roomTotal = changeNightsStayed * pricePerNight
  modalTotalPrice.innerHTML = "$"+ roomTotal.toFixed(2)
}

nightsStayed.addEventListener("change",calcTotal)

bookBtns.forEach( target => {
  target.addEventListener("click", openBook)
})

closeBtns.addEventListener("click", closeBook)
