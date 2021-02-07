import { Select } from '../selectPlugin'
import data from '../../team_db.json'
import uniqid from 'uniqid'

const selectMember = new Select('[data-type="form-select-members"]', {
    placeholder: 'select value',
    data: data,
});

export default class CreateEvents {

    constructor({ selectorForm, dispatchEvent }) {
        this.formRef = document.querySelector(selectorForm)
        this._init()
        this.eventItem = null;
        this.eventsItemArray = [];
        this.dispatchEvent = dispatchEvent
        this.tableBodyRef = document.querySelector('[data-type="table-area"]');
        this.errorFormRef = document.querySelector('[data-type="form-error"]');
    }

    _init() {

        this._formHandlerSubmit = this._formHandlerSubmit.bind(this);
        this.formRef.addEventListener('submit', this._formHandlerSubmit)
    }

    _isCellFree(marker) {
        let isCellFree = true;
        const cell = this.tableBodyRef.querySelector(`[data-marker="${marker}"]`)

        if (cell.firstElementChild) {
            isCellFree = false;
        }
        return isCellFree;
    }

    _errorHandler(message) {
        this.errorFormRef.classList.remove('hidden');
        const errorMessageTemplate = `<p class="form-error_message">${message}</p>`
        this.errorFormRef.innerHTML = errorMessageTemplate
        const timerId = setTimeout(() => {
            this.errorFormRef.classList.add('hidden');
            this.errorFormRef.innerHTML = ''
            clearTimeout(timerId);
        }, 2000)
    }

    _formHandlerSubmit(e) {
        e.preventDefault();
        const membersArr = selectMember.getSelectedItemsArray()
        const formData = new FormData(this.formRef);

        if (membersArr.length > 0) {
            this.eventItem = {
                id: uniqid(),
                eventName: formData.get('name'),
                memberArr: membersArr,
                marker: `${formData.get('time')}-${formData.get('day')}`
            }
        } else {
            this._errorHandler('Select Patricipants!');
            return;
        }

        if (this._isCellFree(this.eventItem.marker)) {
            this.formRef.reset()
            this.dispatchEvent(this.eventItem)
        } else {
            this._errorHandler('Failed to create an event.Time slot is already booked');
        }
    }
}