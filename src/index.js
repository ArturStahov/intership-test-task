import '@csstools/normalize.css';
import './sass/main.scss';
import { Select } from './js/selectPlugin'
import data from './team_db.json'


const select = new Select('[data-type="select-plugin"]', {
    placeholder: 'select value',
    data: data,
    startID: 0
});

