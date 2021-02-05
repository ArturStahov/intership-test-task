import '@csstools/normalize.css';
import './sass/main.scss';
import { Select } from './js/selectPlugin'
import data from './team_db.json'
import CreateEvents from './js/createEvents'



const selectFilter = new Select('[data-type="select-plugin"]', {
    placeholder: 'select value',
    data: data,
    startID: 0
});

const createEvents = new CreateEvents({ selectorForm: '[data-type="form-events"]', selectorTable: '[data-type="table-area"]' })



