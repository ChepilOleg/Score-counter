class Brain {
    _folders = getLocalStorege("foldersList");
    _list = null;
    _listName = "";
    _listElements = "";
    _listDOM = [];
    _defaultColors = [...defaltColors].sort(() => Math.random() - 0.5);

    constructor() {}

    // CREATE ELEMENTS CREATE ELEMENTS CREATE ELEMENTS CREATE ELEMENTS CREATE ELEMENTS CREATE ELEMENTS

    CreateSVGBrash() {
        return `<svg
            class
            fill="#000000"
            width="800px"
            height="800px"
            viewBox="0 0 1920 1920"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M517.257 1127.343c72.733 0 148.871 36.586 221.274 107.45 87.455 110.418 114.922 204.135 81.632 278.296-72.733 162.274-412.664 234.897-618.666 259.178 34.609-82.62 75.15-216.88 75.15-394.645 0-97.123 66.47-195.455 157.88-233.689 26.698-11.097 54.494-16.59 82.73-16.59Zm229.404-167.109c54.055 28.895 106.462 65.371 155.133 113.494l13.844 15.6c28.016 35.378 50.649 69.987 70.425 104.155-29.554 26.259-59.878 52.737-90.75 79.545-18.898-35.488-43.069-71.964-72.843-109.319l-4.285-4.834c-48.342-47.683-99.43-83.39-151.727-107.011 26.368-30.653 53.066-61.196 80.203-91.63Zm1046.49-803.133c7.801 7.8 18.129 21.754 16.92 52.187-6.043 155.683-284.338 494.405-740.509 909.266-19.995-32.302-41.969-64.822-67.788-97.453l-22.523-25.27c-49.22-48.671-101.408-88.883-156.012-121.074 350.588-385.855 728.203-734.356 910.254-741.828 30.983-.109 44.497 9.01 59.658 24.172Zm126.678 56.472c2.087-53.615-14.832-99.98-56.142-141.29-34.28-34.279-81.962-51.198-134.588-49.11-304.554 12.414-912.232 683.377-1179.54 996.17-53.616-5.383-106.682 2.088-157.441 23.402-132.61 55.263-225.339 193.038-225.339 334.877 0 268.517-103.935 425.737-104.923 427.275L0 1896.747l110.307-6.153c69.217-3.735 681.29-45.375 810.165-332.46 24.39-54.604 29.225-113.163 15.93-175.239 374.32-321.802 972.11-879.71 983.427-1169.322"
                fill-rule="evenodd"
            />
        </svg>`;
    }

    putDOMBlock(where, type, how = "beforeend") {
        switch (type) {
            case "folder":
                return (element) => {
                    where.insertAdjacentHTML(
                        how,
                        `<div data-name-folder="${element}" class="folder">
                            <p class="folder__name">${element}</p>
                        </div>`
                    );
                };
            case "new-list-form":
                return () => {
                    where.insertAdjacentHTML(
                        how,
                        ` <li class="new-list-form__item">
                            <input class="new-list-form__color" type="color" value="${this.getColors()}"/>
                            <input class="new-list-form__name" type="text" />
                        </li>
                         `
                    );
                };

            default:
                alert("Сталась помилка, Повідомте про це");
        }
    }

    creatListItem(item) {
        let li = document.createElement("li");
        li.classList.add("list__item");
        li.style.backgroundColor = item.color;
        li.innerHTML = `<p class="list__name">${item.name}</p>
                        <input class="list__inp" type="text">
                        <p class="list__score">${item.score}</p>`;
        return li;
    }

    createNewListItem() {
        let li = document.createElement("li");
        li.classList.add("list__item");
        li.style.backgroundColor = this.randomColor();
        li.innerHTML = `<input class="list__name hidden-input" value="Ім'я" >
                        <input class="onVisible hidden-input">
                        <input class="list__score hidden-input" value="0">
                        <div class="color-setting">
                            <input class="input-color" type="color">
                            ${this.CreateSVGBrash()}
                        </div>`;
        return li;
    }

    // SHOW ELEMENTS SHOW ELEMENTSSHOW ELEMENTSSHOW ELEMENTSSHOW ELEMENTSSHOW ELEMENTSSHOW ELEMENTSSHOW ELEMENTS

    showFolders() {
        let modalBacgraundFolders = document.querySelector(
            ".modal-bacgraund__folders"
        );
        modalBacgraundFolders.innerHTML = "";
        let put = this.putDOMBlock(
            modalBacgraundFolders,
            "folder",
            "beforeend"
        );
        this._folders.forEach((element) => {
            put(element);
        });
    }

    showNewListItem(end = false) {
        let element = document.querySelector(".new-list-form__list");
        if (end) {
            document.querySelector(".new-list-form__name-list").value = "";
            element.innerHTML = "";
            onVisible();
            this._defaultColors = [...defaltColors].sort(
                () => Math.random() - 0.5
            );
            return;
        }
        this.putDOMBlock(element, "new-list-form")();
    }

    showList() {
        let listName = document.querySelector(".list-area__name");
        listName.innerHTML = this._listName;
        let list = document.querySelector(".list");
        list.innerHTML = "";
        list.append(...this._listDOM);
    }

    // CHANGES CHANGES CHANGES CHANGES CHANGES CHANGES CHANGES CHANGES CHANGES CHANGES CHANGES CHANGES

    plas() {
        let lis = document.querySelectorAll(".list__inp");
        for (let i = 0; i < lis.length; i++) {
            let x = this.validationNamber(lis[i].nextElementSibling.innerHTML);
            let y = this.validationNamber(lis[i].value);
            lis[i].value = "";
            lis[i].placeholder = y;
            let sum = +y + +x;
            lis[i].nextElementSibling.innerHTML = sum;
            this._list.plaers[i].score = sum;
        }
    }

    write() {
        let newListName = document.querySelector(".list-area__name").value;
        if (newListName != this._listName) {
            if (newListName == "") newListName = this._listName;
            this._list.name = newListName;
            this._folders.splice(
                this._folders.indexOf(this._listName),
                1,
                newListName
            );
            this._listName = newListName;
        }

        let newListItemName = document.querySelectorAll(".list__name");
        let newListItemScore = document.querySelectorAll(".list__score");
        let newListItemColor = document.querySelectorAll(".input-color");
        for (let i = 0; i < newListItemName.length; i++) {
            if (this._list.plaers[i]) {
                this._list.plaers[i].name = newListItemName[i].value;
                this._list.plaers[i].score = this.validationNamber(
                    newListItemScore[i].value
                );
            } else {
                this._list.plaers.push({
                    name: newListItemName[i].value,
                    score: this.validationNamber(newListItemScore[i].value),
                    color: newListItemName[i].parentElement.style
                        .backgroundColor
                });
            }

            if (newListItemColor[i].value != "#000000") {
                this._list.plaers[i].color = newListItemColor[i].value;
            }
        }

        console.log(this._list);
        this.remove(newListName);
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
            return this.creatListItem(item);
        });
    }

    // RANDOMAIZER RANDOMAIZER RANDOMAIZER RANDOMAIZER RANDOMAIZER RANDOMAIZER RANDOMAIZER RANDOMAIZER

    randomColor() {
        let color = "#";
        for (let i = 0; i < 3; i++) {
            let x = this.randomNamber(1, 255);
            x = x.toString(16);
            switch (x.length) {
                case 1:
                    x = "0" + x;
                case 2:
                    color += x;
            }
        }
        return color;
    }

    randomNamber(min, max) {
        let randomNam = Math.random();
        if (!max) {
            if (min > 15) {
                min = 15;
            }
            let randomInt = Math.floor(randomNam * Math.pow(10, min));
            if (("" + randomInt).length < min) {
                return +(
                    "" +
                    randomInt +
                    this.randomNamber(min - ("" + randomInt).length)
                );
            } else {
                return randomInt;
            }
        } else {
            return Math.floor(min + randomNam * (max + 1 - min));
        }
    }

    // ASIST METODS ASIST METODS ASIST METODS ASIST METODS ASIST METODS ASIST METODS ASIST METODS ASIST METODS

    getColors() {
        let color = this._defaultColors.pop();
        if (!color) color = this.randomColor();
        return color;
    }

    sorts() {
        this._list?.plaers.sort((a, b) => b.score - a.score);
        this._listDOM.sort(
            (a, b) =>
                +b.lastElementChild.innerHTML - +a.lastElementChild.innerHTML
        );
    }

    save() {
        setLocalStorege(`folder-${this._listName}`, this._list);
    }

    remove(newName) {
        localStorage.removeItem(`folder-${this._listName}`);
        setLocalStorege("foldersList", this._folders);
        this._listName = newName;
        this.save();
    }

    validationNamber(prop) {
        return typeof parseInt(prop) != "number" || isNaN(parseInt(prop))
            ? 0
            : parseInt(prop);
    }

    doesNothing(x) {
        return x;
    }

    chengesText({
        classText,
        classInp,
        typeText = "p",
        toInput = true,
        validatin = this.doesNothing
    }) {
        if (!classInp && !classText) return;
        if (classText && !classInp) classInp = classText;
        if (classInp && !classText) classText = classInp;
        if (toInput) {
            let mas = document.querySelectorAll(`.${classText}`);
            mas.forEach((item) => {
                let elem = document.createElement("input");
                elem.value = item.innerHTML;
                elem.classList.add(classInp);
                elem.classList.add("hidden-input");
                item.replaceWith(elem);
            });
        } else {
            let mas = document.querySelectorAll(`.${classInp}`);
            mas.forEach((item) => {
                let elem = document.createElement(typeText);
                elem.innerHTML = validatin(item.value);
                elem.classList.add(classText);
                item.replaceWith(elem);
            });
        }
    }

    //
}

// other functions variable and lists
let isSetings = false;

const defaltColors = [
    "#C9DABF",
    "#9CA986",
    "#808D7C",
    "#5F6F65",
    "#A79277",
    "#D1BB9E",
    "#EAD8C0",
    "#FFF2E1"
];

function onVisible() {
    document.querySelectorAll(".visible").forEach((item) => {
        item.classList.remove("visible");
    });
}

// events

// setings

function settingsEdit(event) {
    if (event.target.closest(".input-color")) {
        let color = event.target.value;
        event.target.parentElement.lastElementChild.style.fill = color;
    }
}

function itemsColor(startSetings) {
    if (startSetings) {
        document.documentElement.addEventListener("input", settingsEdit);
        document.querySelectorAll(".list__item").forEach((item) => {
            let div = document.createElement("div");
            div.classList.add("color-setting");
            let input = document.createElement("input");
            input.classList.add("input-color");
            input.type = "color";
            div.append(input);
            div.insertAdjacentHTML("beforeend", brain.CreateSVGBrash());
            item.append(div);
        });
    } else {
        document.documentElement.removeEventListener("input", settingsEdit);
        document.querySelectorAll(".color-setting").forEach((item) => {
            if (item.firstElementChild.value != "#000000") {
                item.parentElement.style.backgroundColor =
                    item.firstElementChild.value;
            }
            item.remove();
        });
    }
}

function pushSetingsBottom(start) {
    isSetings = start;

    let headerButtons = event.target.parentElement.children;

    for (let i = 0; i < headerButtons.length - 1; i++) {
        headerButtons[i].classList.toggle("onVisible2");
    }

    itemsColor(isSetings);
    brain.chengesText({
        classText: "list__name",
        toInput: start
    });
    brain.chengesText({
        classText: "list__score",
        toInput: start,
        validatin: brain.validationNamber
    });
    brain.chengesText({
        classText: "list-area__name",
        toInput: start,
        typeText: "h1"
    });
    brain.chengesText({
        classText: "list__inp",
        classInp: "onVisible",
        toInput: start,
        typeText: "input"
    });
}

function endSetings(save) {
    if (save) {
        brain.write();
        pushSetingsBottom(false);
    } else {
        pushSetingsBottom(false);
        brain.showList();
    }
    document.querySelectorAll(".rotate").forEach((item) => {
        item.classList.remove("rotate");
    });
}

// events

function headerButtonsEvent(event) {
    if (event.target.closest("img") || event.target.closest("button")) {
        const backgraund = document.querySelector(".modal-bacgraund");
        const targetM = document.querySelector(
            `[data-connection="${event.target.dataset.connection}M"]`
        );
        if (targetM) {
            backgraund.classList.add("visible");
            targetM.classList.add("visible");
        }
        switch (event.target.dataset.connection) {
            case "folders":
                brain.showFolders();
                break;
            case "plas":
                brain.showNewListItem();
                break;
            case "calculation":
                event.target.closest("img").classList.add("calckAnimation");
                let sT = setTimeout(() => {
                    event.target
                        .closest("img")
                        .classList.remove("calckAnimation");
                }, 2000);
                brain.plas();
                brain.sorts();
                brain.save();
                brain.showList();
                break;
            case "settings":
                if (!brain._list) {
                    brain.showFolders();
                    backgraund.classList.add("visible");
                    document
                        .querySelector('[data-connection="foldersM"')
                        .classList.add("visible");
                } else {
                    if (isSetings) {
                        endSetings(confirm("Зберегти зміни?"));
                    } else {
                        event.target.classList.add("rotate");
                        pushSetingsBottom(true);
                    }
                }
                break;

            case "plasItem":
                document
                    .querySelector(".list")
                    .append(brain.createNewListItem());
                break;
            case "cansel":
                endSetings(confirm("Зберегти зміни?"));
                break;
            case "delete":
                localStorage.removeItem(`folder-${brain._listName}`);
                brain._folders.splice(
                    brain._folders.indexOf(brain._listName),
                    1
                );
                setLocalStorege("foldersList", brain._folders);
                document.querySelector(".list-area").innerHTML = "";
                document.querySelectorAll(".rotate").forEach((item) => {
                    item.classList.remove("rotate");
                });
                pushSetingsBottom(false);
                break;
        }
    }
}

function bG(event) {
    if (event.target.classList.contains("modal-bacgraund")) {
        onVisible();
        brain.showNewListItem(true);
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

document.querySelector(".header").addEventListener("click", headerButtonsEvent);

document.querySelector(".modal-bacgraund").addEventListener("click", bG);
document
    .querySelector(".modal-bacgraund__folders")
    .addEventListener("click", bGFoldersEvents);
document
    .querySelector(".modal-bacgraund__new-list")
    .addEventListener("click", bGNewList);

// local storege managers
function setLocalStorege(nameItem, item) {
    localStorage.setItem(nameItem, JSON.stringify(item));
}

function getLocalStorege(nameFolder) {
    return JSON.parse(localStorage.getItem(nameFolder)) || [];
}

function removeLocalStorege(nameFolder) {
    localStorage.removeItem(nameFolder);
}

let brain = new Brain();
