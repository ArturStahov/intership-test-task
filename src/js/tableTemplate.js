
import tableData from '../table_db.json'



function createTableRow(time) {
    const items = tableData.day.map(item => `<td data-marker="${time}-${item}" data-type="cell"></td>`)
    return `<tr data-type="tr">
    <td class="table-events_row-title">${time}:00</td>
    ${items.join(' ')}
    </tr >`
}

export default function createTableTemplate() {
    const items = tableData.time.map(item => createTableRow(item))
    return `${items.join(' ')}`
}



