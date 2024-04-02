var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkUrlInput = document.getElementById("bookmarkUrl");
var tableContent = document.getElementById("tableContent");
var AddMarkButton = document.getElementById("AddMark");
var UpdateMarkButton = document.getElementById("UpdateMark");
var alertModal = document.getElementById("alertModal");
var closeBtn = document.getElementById("closeBtn");
var bookMarksList;

if (localStorage.getItem("bookMarks") !== null) {
  bookMarksList = JSON.parse(localStorage.getItem("bookMarks"));
  displayMark();
} else {
  bookMarksList = [];
}

function addbookMark() {
  if (validateInputs(bookmarkNameInput) & validateInputs(bookmarkUrlInput)) {
    var bookMark = {
      bookmarkName: bookmarkNameInput.value,
      bookmarkUrl: bookmarkUrlInput.value,
    };
    bookMarksList.push(bookMark);
    displayMark();
    resetMark();
    addToLocalStorage();
  } else {
    openModal();
  }
}

function addToLocalStorage() {
  localStorage.setItem("bookMarks", JSON.stringify(bookMarksList));
}

function displayMark() {
  var containerElement = ``;
  for (var i = 0; i < bookMarksList.length; i++) {
    containerElement += `   <tr>
       <td>${i + 1}</td>
       <td>${bookMarksList[i].bookmarkName}</td>              
       <td>
        <button onclick=" visitbtn(${i})" class="btn btn-visit" data-index="${i}">
          <i class="fa-solid fa-eye pe-2"></i>Visit
        </button>
       </td>
       <td>
        <button class="btn btn-update" onclick="moveInputsValue(${i})" data-index="${i}">
          <i class="fa-solid fa-pen-to-square pe-2"></i>Update
        </button>
       </td>
       <td>
        <button class="btn btn-delete pe-2" onclick="deleteMark(${i})" data-index="${i}">
          <i class="fa-solid fa-trash-can"></i>
          Delete
        </button>
       </td>
  </tr>
  `;
  }
  tableContent.innerHTML = containerElement;
}

function deleteMark(index) {
  bookMarksList.splice(index, 1);
  addToLocalStorage();
  displayMark(bookMarksList);
}

var updatedindex;

function moveInputsValue(index) {
  bookmarkNameInput.value = bookMarksList[index].bookmarkName;
  bookmarkUrlInput.value = bookMarksList[index].bookmarkUrl;
  UpdateMarkButton.classList.replace("d-none", "d-block");
  AddMarkButton.classList.replace("d-block", "d-none");
  updatedindex = index;
}
function UpdateMark() {
  if (validateInputs(bookmarkNameInput) & validateInputs(bookmarkUrlInput)) {
    bookMarksList[updatedindex].bookmarkName = bookmarkNameInput.value;
    bookMarksList[updatedindex].bookmarkUrl = bookmarkUrlInput.value;

    addToLocalStorage();
    displayMark();
    resetMark();
    UpdateMarkButton.classList.replace("d-block", "d-none");
    AddMarkButton.classList.replace("d-none", "d-block");
  } else {
    openModal();
  }
}
function resetMark() {
  bookmarkNameInput.value = null;
  bookmarkUrlInput.value = null;
  bookmarkUrlInput.classList.remove("is-valid");
  bookmarkUrlInput.classList.remove("is-invalid");
  bookmarkNameInput.classList.remove("is-valid");
  bookmarkNameInput.classList.remove("is-invalid");
}

function validateInputs(element) {
  regax = {
    bookmarkName: /^[a-zA-Z]{3,}$/,
    bookmarkUrl: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?)$/,
  };

  if (regax[element.id].test(element.value) == true) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    element.nextElementSibling.classList.replace("d-block","d-none");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    element.nextElementSibling.classList.replace("d-none","d-block");
    return false;
  }
}

function visitbtn(index) {
  var httpsRegex = /^https?:\/\//;
  var bookmarkUrl = bookMarksList[index].bookmarkUrl;
  if (httpsRegex.test(bookmarkUrl)) {
    open(bookmarkUrl);
  } else {
    open(`https://${bookmarkUrl}`);
  }
}

function openModal() {
  alertModal.classList.remove("d-none");
}
function closeModal() {
  alertModal.classList.add("d-none");
}

document.addEventListener("click", function (close) {
  if (close.target.contains(alertModal)) {
    closeModal();
  }
});

document.addEventListener("keydown", function (close) {
  if (close.key == "Escape") {
    closeModal();
  }
});
