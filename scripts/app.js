import { v4 as uuidv4 } from "https://esm.sh/uuid";

class Contact {
  constructor(name, phone) {
    this.id = uuidv4();
    this.name = name;
    this.phone = phone;
  }
}

class ContactManager {
  constructor() {
    this.contactList = [];
    this.updatedListLength = 0;
    if (
      localStorage.getItem("contacts") &&
      localStorage.getItem("contacts").length > 0
    ) {
      this.contactList = JSON.parse(localStorage.getItem("contacts"));
      window.onload = this.atualizarLista();
    }
  }
  adicionarContato(contato) {
    this.contactList.push(contato);
    this.atualizarLista();
  }
  atualizaLocalStorage() {
    if (this.contactList.length) {
      localStorage.setItem("contacts", JSON.stringify(this.contactList));

      return;
    }
    localStorage.clear();
  }
  removerContato(contato) {
    const listItem = document.getElementById(contato.id);
    const emptyListText = document.getElementById("empty-list-text");
    this.contactList = this.contactList.filter(
      (contact) => contact.id !== contato.id
    );
    this.updatedListLength = this.contactList.length;
    listItem.remove();
    this.contactList.length ? null : emptyListText.classList.remove("hidden");
    this.atualizaLocalStorage();
  }

  deletarLista() {
    if (this.contactList.length) {
      const contactList = document.getElementById("list");
      const emptyListText = document.getElementById("empty-list-text");
      emptyListText.classList.toggle("hidden");
      this.contactList = [];
      contactList.innerHTML = "";
      this.atualizaLocalStorage();
    }
  }

  atualizarLista() {
    const emptyListText = document.getElementById("empty-list-text");
    if (this.updatedListLength !== this.contactList.length) {
      const list = document.getElementById("list");
      const newContacts = this.contactList.slice(
        this.updatedListLength,
        this.contactList.length
      );
      this.atualizaLocalStorage();

      emptyListText.classList.contains("hidden")
        ? null
        : emptyListText.classList.add("hidden");
      newContacts.forEach((contact) => {
        const li = document.createElement("li");
        li.classList.add("list-item");
        li.setAttribute("id", contact.id);
        li.innerHTML = `
        <div class="contact-list-div">
            <div class="contact-card-header">
              <span class="material-symbols-outlined user-icon">
                account_circle
              </span>
              <div class="desc-col">
                <p class="name">${contact.name}</p>
                <p class="phone">${contact.phone}</p>
              </div>
          </div>
          <button class="delete-button" id="delete-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  class="delete-icon"
                  style="color: red; font-size: 40px"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
        `;
        const deleteButton = li.querySelector("button");
        deleteButton.addEventListener("click", () =>
          this.removerContato(contact)
        );
        list.appendChild(li);
      });
      this.updatedListLength = this.contactList.length;
    } else {
      return;
    }
  }
}

const friendNameInput = document.getElementById("friend-name");
const friendPhoneInput = document.getElementById("friend-phone");
const addFriendForm = document.getElementById("add-friend-form");

const deleteListButton = document.getElementById("delete-list");
const contactManager = new ContactManager();

addFriendForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const contact = new Contact(friendNameInput.value, friendPhoneInput.value);
  friendNameInput.value = "";
  friendPhoneInput.value = "";
  contactManager.adicionarContato(contact);
});

deleteListButton.addEventListener("click", (e) =>
  contactManager.deletarLista()
);
