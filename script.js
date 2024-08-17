class Brain {
    _folders = getLocalStorege("foldersList");
    _list = {};
    _listName = "";
    _listElements = "";
    _listDOM = [];
    _defaultColors = defaltColors.sort(() => Math.random() - 0.5);

    constructor() {}

    showFolders() {
        let modalBacgraundFolders = document.querySelector(
            ".modal-bacgraund__folders"
        );
        modalBacgraundFolders.innerHTML = "";
        this._folders.forEach((element) => {
            modalBacgraundFolders.insertAdjacentHTML(
                "beforeend",
                `<div data-name-folder="${element}" class="folder">
                    <p class="folder__name">${element}</p>
                </div>`
            );
        });
    }

    showList() {
        let listName = document.querySelector(".list-area__name");
        listName.innerHTML = this._listName;
        let list = document.querySelector(".list");
        list.innerHTML = "";
        list.append(...this._listDOM);
    }

    showNewListItem(end = false) {
        let element = document.querySelector(".new-list-form__list");
        if (end) {
            element.innerHTML = "";
            onVisible();
            this._defaultColors = defaltColors.sort(() => Math.random() - 0.5);
            return;
        }
        element.insertAdjacentHTML(
            "beforeend",
            ` <li class="new-list-form__item">
                    <input class="new-list-form__color" type="color" value="#${this.defaltColors()}"/>
                    <input class="new-list-form__name" type="text" />
                </li>
            `
        );
    }

    plas() {
        let lis = document.querySelectorAll(".list__inp");
        for (let i = 0; i < lis.length; i++) {
            let x = lis[i].nextElementSibling.innerHTML;
            let y = lis[i].value;
            lis[i].value = "";
            lis[i].placeholder = y;
            let sum = +y + +x;
            lis[i].nextElementSibling.innerHTML = sum;
            this._list.plaers[i].score = sum;
        }
    }

    sorts() {
        this._list.plaers.sort((a, b) => b.score - a.score);
        this._listDOM.sort(
            (a, b) =>
                +b.lastElementChild.innerHTML - +a.lastElementChild.innerHTML
        );
    }

    save() {
        setLocalStorege(`folder-${this._listName}`, this._list);
    }

    pushNewList() {
        let elements = document.forms["new-list-form"].elements;
        if (
            elements[0].value == "" ||
            this._folders.includes(elements[0].value)
        ) {
            if (elements[0].value == "") {
                alert("Вкажіть назву списку");
            } else {
                alert("Список із таким імене вже існує");
            }
            return false;
        }
        let newList = {
            name: elements[0].value,
            plaers: []
        };

        for (let i = 1; i < elements.length; i += 2) {
            if (elements[i + 1].value) {
                newList.plaers.push({
                    color: elements[i].value,
                    name: elements[i + 1].value,
                    score: 0
                });
            }
        }
        this.list = newList;
        return true;
    }

    defaltColors() {
        return this._defaultColors.pop();
    }

    set list(element) {
        let list;
        if (typeof element === "string") {
            list = getLocalStorege(`folder-${element}`);
        } else if (typeof element === "object") {
            list = element;
            this._folders.push(element.name);
            setLocalStorege("foldersList", this._folders);
        }
        this._list = list;
        this._listName = list.name;
        this.save();
        this._listElements = list.plaers;
        this._listDOM = list.plaers.map((item) => {
            let li = document.createElement("li");
            li.classList.add("list__item");
            li.style.backgroundColor = item.color;
            li.innerHTML = `<p class="list__name">${item.name}</p>
                            <input class="list__inp" type="text">
                            <p class="list__score">${item.score}</p>`;
            return li;
        });
    }
}

// other functions and lists
const defaltColors = [
    "C9DABF",
    "9CA986",
    "808D7C",
    "5F6F65",
    "A79277",
    "D1BB9E",
    "EAD8C0",
    "FFF2E1"
];

function onVisible() {
    document.querySelectorAll(".visible").forEach((item) => {
        item.classList.remove("visible");
    });
}

// events

function headerButtonsEvent(event) {
    if (event.target.closest("img")) {
        const backgraund = document.querySelector(".modal-bacgraund");
        backgraund.classList.add("visible");
        const targetM = document.querySelector(
            `[data-connection="${event.target.dataset.connection}M"]`
        );
        targetM.classList.add("visible");
        switch (event.target.dataset.connection) {
            case "folders":
                brain.showFolders();
                break;
            case "plas":
                brain.showNewListItem();
                break;
            case "calculation":
                onVisible();
                brain.plas();
                brain.sorts();
                brain.save();
                brain.showList();
                break;
        }
    }
}
function bGFoldersEvents(event) {
    if (event.target.closest(".folder")) {
        brain.list = event.target.closest(".folder").dataset.nameFolder;
        brain.showList();
        onVisible();
    }
}
function bGNewList(event) {
    if (
        event.target.closest(".new-list-form__name") ===
        document.forms["new-list-form"].lastElementChild.lastElementChild
            .lastElementChild
    ) {
        brain.showNewListItem();
    }
    if (event.target.closest(".end")) {
        if (brain.pushNewList()) {
            brain.showNewListItem(true);
            brain.showList();
        }
    }
    if (event.target.closest(".cansel")) {
        brain.showNewListItem(true);
    }
}
function bGcalculation(event) {}

document.querySelector(".header").addEventListener("click", headerButtonsEvent);
document
    .querySelector(".modal-bacgraund__folders")
    .addEventListener("click", bGFoldersEvents);
document
    .querySelector(".modal-bacgraund__new-list")
    .addEventListener("click", bGNewList);
// document.querySelector(".modal-bacgraund__calculation").addEventListener("click");

// local storege managers
function setLocalStorege(nameItem, item) {
    localStorage.setItem(nameItem, JSON.stringify(item));
}

function getLocalStorege(nameFolder) {
    return JSON.parse(localStorage.getItem(nameFolder)) || [];
}

let brain = new Brain();
