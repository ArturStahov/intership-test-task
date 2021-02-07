
export default function eventTemplate(item) {
    let membersStr = item.memberArr.map(item => item.value).join('')

    return `<div class="event" data-type="event" data-id="${item.id}" data-membersfilter="${membersStr}">
           <h2 class="event_title">${item.eventName}</h2>
           <button class="event_button-delete" type='button' data-type="button-delete" >x</button>
           </div>`;
}
