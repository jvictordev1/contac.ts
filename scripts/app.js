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
  }
  adicionarContato(contato) {
    this.contactList.push(contato);
  }
  removerContato(contato) {
    this.contactList = this.contactList.filter(
      (contact) => contact.id !== contato.id
    );
  }
  atualizarLista() {
    const emptyListText = document.getElementById("empty-list-text");
    if (this.updatedListLength !== this.contactList.length) {
      const list = document.getElementById("list");
      const newContacts = this.contactList.slice(
        this.updatedListLength,
        this.contactList.length
      );
      emptyListText.classList.contains("hidden")
        ? null
        : emptyListText.classList.add("hidden");
      newContacts.forEach((contact) => {
        const li = document.createElement("li");
        li.classList.add("list-item");
        li.innerHTML = `
        <span class="material-symbols-outlined user-icon"> account_circle </span>
        <h1>${contact.name}</h1>
        <p>${contact.phone}</p>
        <button class="delete-button">
          <span class="material-symbols-outlined delete-icon">delete</span>
        </button>
        `;
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
const updateListButton = document.getElementById("update-list");
const contactManager = new ContactManager();

updateListButton.addEventListener("click", () => {
  contactManager.atualizarLista();
});

addFriendForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const contact = new Contact(friendNameInput.value, friendPhoneInput.value);
  friendNameInput.value = "";
  friendPhoneInput.value = "";
  contactManager.adicionarContato(contact);
});
