
export default function eventTemplate(item) {

    return `<div class="event" data-type="event" data-id="${item.id}" data-memberId="${item.memberId}">
           <h2 class="event_title">${item.eventName}</h2>
           <button class="event_button-delete" type='button' data-type="button-delete" >x</button>
           </div>`;
}
