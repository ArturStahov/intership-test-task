import '@csstools/normalize.css';
import './sass/main.scss';
import { Select } from './js/selectPlugin'
import data from './team_db.json'
import CreateEvents from './js/createEvents'
import eventTemplate from './js/eventTemplate'
import Modal from './js/modal'
import createTableTemplate from './js/tableTemplate'
import PageControl from './js/pageControl'

let itemEventArray = []
let deleteItemId = null;

const modal = new Modal()

const pageControlOptions = {
    selectorButtonCreateEvent: '[data-type="button-create"]',
    selectorButtonCancelCreate: '[data-type="button-cancel"]',
    selectorPageNav: '[data-type="page-nav"]',
    selectorSectionForm: '[data-type="section-form"]',
    selectorSectionTable: '[data-type="section-table"]',
}
const pageControl = new PageControl(pageControlOptions)

const refs = {
    tableBodyRef: document.querySelector('[data-type="table-area"]'),
    modalRef: document.querySelector('[data-type="modal"]'),
}

function renderTable() {
    refs.tableBodyRef.innerHTML = createTableTemplate()
}
renderTable();
loadFromSave();

function loadFromSave() {
    itemEventArray = [...JSON.parse(localStorage.getItem('save_data'))]
    renderEvent()
}

const arrayCellRefs = refs.tableBodyRef.querySelectorAll('[data-type="cell"]');

function dispatchFilter(filterValueArray) {
    if (!filterValueArray) {
        return
    }
    let filtersArr = filterValueArray.map(item => item.value)

    arrayCellRefs.forEach(item => {
        let domItemEvent = item.firstElementChild;
        let domFilterStr = domItemEvent && domItemEvent.dataset.membersfilter;

        if (domItemEvent) {
            for (const filter of filtersArr) {
                let isIncludes = domFilterStr.includes(filter);
                if (isIncludes || filter === 'All' || domFilterStr === 'All') {
                    domItemEvent.classList.remove('hidden')
                    return
                } else {
                    domItemEvent.classList.add('hidden')
                }
            }
        }

    })
}

const selectFilter = new Select('[data-type="select-plugin"]', {
    placeholder: 'select value',
    data: data,
    startID: 0,
    dispatchFilter
});

function dispatchEvent(itemEvent) {
    pageControl.viewPageTable()
    itemEventArray.push(itemEvent)
    renderEvent();
    save()
}

const createEvents = new CreateEvents({ selectorForm: '[data-type="form-events"]', dispatchEvent })

function renderEvent() {
    itemEventArray.map(item => {
        const tableCellRef = refs.tableBodyRef.querySelector(`[data-marker="${item.marker}"]`)
        const mockup = eventTemplate(item);
        tableCellRef.innerHTML = mockup;
    })
}

function deleteItem() {
    arrayCellRefs.forEach(item => {
        if (item.firstElementChild?.dataset.id === deleteItemId) {
            item.innerHTML = '';
            itemEventArray = [...itemEventArray.filter(item => item.id !== deleteItemId)]
            deleteItemId = null;
            save()
        }
    })
}

const handlerOpenModal = (e) => {
    if (!e.target.dataset) {
        return
    }
    const { type } = e.target.dataset
    if (type === "button-delete") {
        console.log('click')
        modal.open();
        deleteItemId = e.target.parentNode.dataset.id
    }
}

const handlerModalButton = (e) => {
    if (!e.target.dataset) {
        return
    }
    const { type } = e.target.dataset;

    switch (type) {
        case 'button-delete':
            console.log('arrayCellRefs in delete', arrayCellRefs)
            deleteItem()
            modal.close();
            break;
        case 'button-close':
            modal.close();
            break;
        default:
            console.log('no defined type')
            return;
    }
}

function save() {
    const saveData = JSON.stringify(itemEventArray);
    localStorage.setItem('save_data', saveData)
}

refs.tableBodyRef.addEventListener('click', handlerOpenModal)
refs.modalRef.addEventListener('click', handlerModalButton)