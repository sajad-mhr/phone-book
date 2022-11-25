const $ = document;
const MenuBtn = $.getElementById("menu-btn");
const closeMenuBtn = $.getElementById("close-menu-btn");
const overley = $.getElementById("overley");
const drawer = $.getElementById("drawer");

function openDrawer() {
  drawer.classList.remove("hidden");
  overley.classList.remove("hidden");
  $.body.style.overflowY = "hidden";
}
function closeDrawer() {
  drawer.classList.add("hidden");
  setTimeout(function () {
    overley.classList.add("hidden");
    $.body.style.overflowY = "scroll";
  }, 450);
}

MenuBtn.addEventListener("click", openDrawer);
closeMenuBtn.addEventListener("click", closeDrawer);
overley.addEventListener("click", closeDrawer);

///////////////////////////////////////////////
const header = $.querySelector(".header");

window.addEventListener("scroll", function () {
  if (window.scrollY > 0) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
});

///////////////////////////////////////////////

const modal = $.getElementById("modal");
const overleyModal = $.getElementById("overley-modal");
const newContact = $.getElementById("new-contact");
const closeModalBtn = $.getElementById("close-modal-btn");

function openModal() {
  modal.classList.remove("modal-hidden");
  drawer.classList.add("hidden");
  overley.classList.add("hidden");
  $.body.style.overflowY = "hidden";
  window.scrollTo(0, 0);
}

function closeModal() {
  modal.classList.add("modal-hidden");
  $.body.style.overflowY = "scroll";
}

newContact.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

/////////////////////////////////////////////////////

const switchThemeBtn = $.getElementById("switch-theme-btn");
const themeTitle = $.getElementById("theme-title");
const themeIcon = $.getElementById("theme-icon");
let isDark = false;
function darkTheme() {
  isDark = false;
  $.body.classList.add("dark");
  themeTitle.innerHTML = "حالت روشن";
  localStorage.setItem("theme", "dark");
  themeIcon.classList.replace("fa-moon", "fa-sun");
}
function lightTheme() {
  isDark = true;
  $.body.classList.remove("dark");
  themeTitle.innerHTML = "حالت تاریک";
  localStorage.setItem("theme", "light");
  themeIcon.classList.replace("fa-sun", "fa-moon");
}
function switchTheme() {
  if (isDark) {
    darkTheme();
  } else {
    lightTheme();
  }
}
window.addEventListener("load", function () {
  let checkTheme = localStorage.getItem("theme");
  if (checkTheme === "dark") {
    darkTheme();
  } else {
    lightTheme();
  }
});
switchThemeBtn.addEventListener("click", switchTheme);

/////////////////////////////////////////////////////

let contactsData = [];

const firstNameInput = $.getElementById("first-name");
const lastNameInput = $.getElementById("last-name");
const phoneNumberInput = $.getElementById("phone-number");
const addContactBtn = $.getElementById("add-contact-btn");
const contactsContainer = $.querySelector(".contacts-container");
const errorFirstName = $.getElementById("error-name");
const errorLastName = $.getElementById("error-family");
const errorPhoneNumber = $.getElementById("error-phone-number");
const emptyPhoneBook = $.getElementById("empty-phone-book");

function firstNameValid() {
  if (!firstNameInput.value.trim()) {
    errorFirstName.style.display = "block";
  } else {
    errorFirstName.style.display = "none";
  }
}
function lastNameValid() {
  if (!lastNameInput.value.trim()) {
    errorLastName.style.display = "block";
  } else {
    errorLastName.style.display = "none";
  }
}

function phoneNumberValid() {
  if (!phoneNumberInput.value.trim()) {
    errorPhoneNumber.style.display = "block";
    errorPhoneNumber.innerHTML = "شماره همراه الزامی است";
  } else if (isNaN(phoneNumberInput.value)) {
    errorPhoneNumber.style.display = "block";
    errorPhoneNumber.innerHTML = "فقط اعداد مجاز است";
  } else {
    errorPhoneNumber.style.display = "none";
  }
}

Number(phoneNumberInput.value);
function addNewContact() {
  if (contactsData.length < 1) {
    emptyPhoneBook.style.display = "flex";
  } else {
    emptyPhoneBook.style.display = "none";
  }
  if (
    !firstNameInput.value.trim() &&
    !lastNameInput.value.trim() &&
    !phoneNumberInput.value.trim()
  ) {
    errorFirstName.style.display = "block";
    errorLastName.style.display = "block";
    errorPhoneNumber.style.display = "block";
    errorPhoneNumber.innerHTML = "شماره همراه الزامی است";
  } else if (isNaN(phoneNumberInput.value)) {
    errorPhoneNumber.style.display = "block";
    errorPhoneNumber.innerHTML = "فقط اعداد مجاز است";
  } else {
    errorFirstName.style.display = "none";
    errorLastName.style.display = "none";
    errorPhoneNumber.style.display = "none";

    let contactObject = {
      id: contactsData.length + 1,
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      phoneNumber: phoneNumberInput.value,
    };

    contactsData.push(contactObject);
    settoLocalStorage(contactsData);
    createContactToDOM(contactsData);
    firstNameInput.value = "";
    lastNameInput.value = "";
    phoneNumberInput.value = "";
    closeModal();
  }
}

function settoLocalStorage(contactData) {
  localStorage.setItem("contactList", JSON.stringify(contactData));
}

function getFromLocalStorage() {
  let getContacts = JSON.parse(localStorage.getItem("contactList"));
  if (getContacts) {
    contactsData = getContacts;
  } else {
    getContacts = [];
  }
  createContactToDOM(getContacts);
}

window.addEventListener("load", getFromLocalStorage);

function createContactToDOM(contactData) {
  if (contactsData.length < 1) {
    emptyPhoneBook.style.display = "flex";
  } else {
    emptyPhoneBook.style.display = "none";
  }
  contactsContainer.innerHTML = "";
  let contactCardElem,
    rightCardElem,
    avatarContainerElem,
    avatarElem,
    contactDetailsElem,
    contactNameElem,
    contactPhoneNumberElem,
    leftCardElem,
    callBtnElem,
    callIconElem,
    deleteBtnElem,
    deleteIconElem,
    editBtnElem,
    editIconElem;

  contactData.forEach(function (contact) {
    contactCardElem = $.createElement("div");
    contactCardElem.className = "contact-card";
    rightCardElem = $.createElement("div");
    rightCardElem.className = "right-card";

    avatarContainerElem = $.createElement("div");
    avatarContainerElem.className = "avatar";

    avatarElem = $.createElement("p");
    avatarElem.innerHTML =
      contact.firstName.substr(0, 1) + "." + contact.lastName.substr(0, 1);

    avatarContainerElem.append(avatarElem);

    contactDetailsElem = $.createElement("div");
    contactDetailsElem.className = "contact-details";

    contactNameElem = $.createElement("p");
    contactNameElem.innerHTML = contact.firstName + " " + contact.lastName;

    contactPhoneNumberElem = $.createElement("p");
    contactPhoneNumberElem.innerHTML = contact.phoneNumber;

    contactDetailsElem.append(contactNameElem, contactPhoneNumberElem);

    leftCardElem = $.createElement("div");
    leftCardElem.className = "left-card";

    callBtnElem = $.createElement("a");
    callBtnElem.href = "tel:".concat(contact.phoneNumber);
    callIconElem = $.createElement("i");
    callIconElem.className = "fa fa-phone";
    callBtnElem.append(callIconElem);

    deleteBtnElem = $.createElement("a");
    deleteIconElem = $.createElement("i");
    deleteIconElem.className = "fa fa-trash";
    deleteBtnElem.setAttribute("id", "delete");
    deleteBtnElem.append(deleteIconElem);
    deleteBtnElem.setAttribute("onclick", "removeContact(" + contact.id + ")");

    editBtnElem = $.createElement("a");
    editIconElem = $.createElement("i");
    editIconElem.className = "fa fa-edit";
    editBtnElem.setAttribute("id", "edit");
    editBtnElem.append(editIconElem);
    editBtnElem.setAttribute("onclick", "openEditModal(" + contact.id + ")");

    leftCardElem.append(callBtnElem, editBtnElem, deleteBtnElem);

    rightCardElem.append(avatarContainerElem, contactDetailsElem);

    contactCardElem.append(rightCardElem, leftCardElem);

    contactsContainer.append(contactCardElem);
  });
}

function removeContact(contactId) {
  let getContacts = JSON.parse(localStorage.getItem("contactList"));
  contactsData = getContacts;

  let findIndexContact = contactsData.findIndex(function (contact) {
    return contact.id === contactId;
  });
  contactsData.splice(findIndexContact, 1);
  settoLocalStorage(contactsData);
  createContactToDOM(contactsData);
}

const editModal = $.getElementById("modal-edit");
const editFirstName = $.getElementById("edit-first-name");
const editLastName = $.getElementById("edit-last-name");
const editPhoneNumber = $.getElementById("edit-phone-number");
const editBtn = $.getElementById("edit-add-contact-btn");
const editCloseBtn = $.getElementById("close-edit-modal-btn");

const editError = $.getElementById("edit-error");
Number(editPhoneNumber.value)
function openEditModal(contactId) {
  editModal.classList.remove("modal-hidden");
  let getContacts = JSON.parse(localStorage.getItem("contactList"));
  contactsData = getContacts;
  contactsData.forEach(function (contact) {
    if (contact.id === contactId) {
      editFirstName.value = contact.firstName;
      editLastName.value = contact.lastName;
      editPhoneNumber.value = contact.phoneNumber;
    }
  });
  editBtn.addEventListener("click", function () {
    if (
      !editFirstName.value.trim() ||
      !editLastName.value.trim() ||
      !editPhoneNumber.value.trim()
    ) {
      editError.style.display = "block"
      editError.innerHTML = "تمامی فیلد ها الزامی است"
    } else {
      if(isNaN(editPhoneNumber.value)){
        editError.style.display = "block"
        editError.innerHTML = "برای شماره فقط اعداد مجاز است"
      }else {
        contactsData.forEach(function (contact) {
          if (contact.id === contactId) {
            contact.firstName = editFirstName.value;
            contact.lastName = editLastName.value;
            contact.phoneNumber = editPhoneNumber.value;
          }
        });
        settoLocalStorage(contactsData);
        createContactToDOM(contactsData);
        editError.style.display = "none"
        editModal.classList.add("modal-hidden");
      }
    }
  });
}

editCloseBtn.addEventListener("click", function () {
  editModal.classList.add("modal-hidden");
  editError.style.display = "none"
});

addContactBtn.addEventListener("click", addNewContact);
firstNameInput.addEventListener("keyup", firstNameValid);
lastNameInput.addEventListener("keyup", lastNameValid);
phoneNumberInput.addEventListener("keyup", phoneNumberValid);
