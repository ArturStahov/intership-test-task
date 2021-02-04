const template = (data = [], placeholder, startID) => {
    let textPlaceholder = placeholder ?? 'Выбери'; //Оператор нуллевого слияния
    let classSelItem = ' ';
    const items = data.map(item => {
        if (item.id === startID) {
            textPlaceholder = item.value;
            classSelItem = "selected"
        } else {
            classSelItem = " "
        }
        return `<li class="select-item ${classSelItem}" data-type="item" data-id="${item.id}">${item.value}</li>`
    })
    return `<div class="select-backdrop" data-type="backdrop"></div>
           <div class="select-input" data-type="input">
          <span class="select-text" data-type="value">
            ${textPlaceholder}
          </span>
        </div>
        <div class="select-dropdown">
          <ul class="select-list">
           ${items.join(' ')}
          </ul>
        </div>`
}


export class Select {

    constructor(selector, options, startID) {
        this.selectRef = document.querySelector(selector);
        console.log(this.selectRef)
        this.options = options;
        this.selectedID = startID;
        this._render();
        this._setup();
        this.valueRef = document.querySelector(`${selector} [data-type="value"]`);
        console.log(this.selectedID)
    }

    _setup() {
        this.handlerEvent = this.handlerEvent.bind(this);
        this.selectRef.addEventListener('click', this.handlerEvent)
    }

    handlerEvent(event) {
        const { type } = event.target.dataset;
        if (type === "input") {
            this.toggle()
        }
        if (type === "item") {
            const id = event.target.dataset.id;
            this.select(id);
        }
        if (type === "backdrop") {

            this.close();
        }
        console.log(this.currentItem)
    }

    get isOpen() {
        return this.selectRef.classList.contains("open")
    }

    get currentItem() {
        return this.options.data.find(item => Number(item.id) === Number(this.selectedID))
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    _render() {
        const { placeholder, data, startID } = this.options
        this.selectRef.classList.add("select")
        this.selectRef.innerHTML = template(data, placeholder, startID);
    }

    open() {
        this.selectRef.classList.add('open');
    }

    close() {
        this.selectRef.classList.remove('open')
    }

    delete() {
        this.selectRef.removeEventListener('click', this.handlerEvent)
        this.selectRef.innerHTML = " "
    }

    select(id) {
        this.selectedID = id;
        let selectItem = this.currentItem;

        this.valueRef.textContent = selectItem.value;
        const elRef = this.selectRef.querySelector(`.selected`);
        if (elRef !== null) {
            elRef.classList.remove("selected");
        }
        const selectItemRef = this.selectRef.querySelector(`[data-id="${id}"]`);
        selectItemRef.classList.add('selected');
        this.close();
    }

}