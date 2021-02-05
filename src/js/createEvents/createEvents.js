import { Select } from '../selectPlugin'
import data from '../../team_db.json'

const selectMember = new Select('[data-type="form-select-members"]', {
    placeholder: 'select value',
    data: data,
});


export default class CreateEvents {

    constructor({ selectorForm, selectorTable }) {
        this.formRef = document.querySelector(selectorForm)
        this.tableRef = document.querySelector(selectorTable)
        this._init()
        this.eventItem = null;
    }

    _init() {
        this._formHandlerSubmit = this._formHandlerSubmit.bind(this);
        this.formRef.addEventListener('submit', this._formHandlerSubmit)
    }

    _formHandlerSubmit(e) {
        e.preventDefault();
        const member = selectMember.currentItem
        const formData = new FormData(this.formRef);
        this.eventItem = {
            eventName: formData.get('name'),
            member: member.value,
            marker: `${formData.get('time')}-${formData.get('day')}`
        }
        this.formRef.reset()
        console.log('this.eventItem', this.eventItem)
        this._addEvents(this.eventItem);
    }

    _addEvents(eventsItem) {
        if (eventsItem) {
            const tableCellRef = this.tableRef.querySelector(`[data-marker="${eventsItem.marker}"]`)
            console.log('this.tableRef', this.tableRef)
            console.log(tableCellRef)
            tableCellRef.innerHTML = `<p>${eventsItem.eventName} </p>`
        }

    }


}