const template = (data = [], placeholder, startID) => {
    let textPlaceholder = placeholder ?? 'Select Value'
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
        this.options = options;
        this.selectedID = startID;
        this.dispatchFilter = options.dispatchFilter ? options.dispatchFilter : null;
        this._render();
        this._setup();
        this.valueRef = document.querySelector(`${selector} [data-type="value"]`);
        this.selectedItemsArray = [];
    }

    _setup() {
        this.handlerEvent = this.handlerEvent.bind(this);
        this.selectRef.addEventListener('click', this.handlerEvent);
    }

    handlerEvent(event) {
        const { type } = event.target.dataset;
        if (type === "input") {
            this.toggle()
        }

        if (type === "item") {
            let id = Number(event.target.dataset.id);
            this.selectedID = id;
            let isItemInArray = this.selectedItemsArray.find(item => Number(item.id) === id)
            let isSelectAll = this.selectedItemsArray.find(item => Number(item.id) === 0)
            let itemUser = this._currentItem();
            const elRefs = this.selectRef.querySelectorAll(`.selected`);
            if (isSelectAll || this.selectedItemsArray.length == 0) {
                elRefs.forEach(element => {
                    element.classList.remove("selected");
                });
                this.selectedItemsArray = []
            }
            if (isItemInArray) {
                this.selectedItemsArray = [...this.selectedItemsArray.filter(item => Number(item.id) !== id)]
                event.target.classList.remove("selected");
            } else {

                if (id === 0) {
                    this.selectedItemsArray = []
                    elRefs.forEach(element => {
                        element.classList.remove("selected");
                    });
                }
                this.selectedItemsArray.push(itemUser)
                event.target.classList.add("selected");
            }
            this.valueRef.textContent = this.selectedItemsArray.length > 0 ? this.selectedItemsArray.map(item => item.value) : 'All';
        }

        if (type === "backdrop") {
            this.close();
        }
    }

    get isOpen() {
        return this.selectRef.classList.contains("open")
    }

    _currentItem() {
        return this.options.data.find(item => Number(item.id) === this.selectedID)
    }

    getSelectedItemsArray() {
        return this.selectedItemsArray;
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
        if (this.dispatchFilter) {
            this.dispatchFilter(this.selectedItemsArray)
        }
        this.selectRef.classList.remove('open')
    }

    delete() {
        this.selectRef.removeEventListener('click', this.handlerEvent)
        this.selectRef.innerHTML = " "
    }
}