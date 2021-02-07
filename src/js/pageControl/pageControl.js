
export default class PageControl {
    constructor({
        selectorButtonCreateEvent,
        selectorPageNav,
        selectorSectionForm,
        selectorSectionTable,
        selectorButtonCancelCreate }) {

        this.buttonCreateEventRef = document.querySelector(selectorButtonCreateEvent);
        this.buttonCancelEventRef = document.querySelector(selectorButtonCancelCreate);
        this.pageNavRef = document.querySelector(selectorPageNav);
        this.pageSectionFormRef = document.querySelector(selectorSectionForm);
        this.pageSectionTableRef = document.querySelector(selectorSectionTable);
        this._init()
    }

    _init() {
        this._handlerButtonCreate = this._handlerButtonCreate.bind(this);
        this.buttonCreateEventRef.addEventListener('click', this._handlerButtonCreate);
        this._handlerButtonCancel = this._handlerButtonCancel.bind(this);
        this.buttonCancelEventRef.addEventListener('click', this._handlerButtonCancel);
    }

    _handlerButtonCancel() {
        this.viewPageTable()
    }

    _handlerButtonCreate() {
        this.viewPageForm()
    }
    viewPageTable() {
        this.pageNavRef.classList.remove('hidden');
        this.pageSectionTableRef.classList.remove('hidden');
        this.pageSectionFormRef.classList.add('hidden');
    }
    viewPageForm() {
        this.pageNavRef.classList.add('hidden');
        this.pageSectionTableRef.classList.add('hidden');
        this.pageSectionFormRef.classList.remove('hidden');
    }
}