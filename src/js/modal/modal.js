
export default class Modal {
    constructor() {
        this.modalRef = document.querySelector('[data-type="modal"]')
    }
    open() {
        this.modalRef.classList.add('open')
    }
    close() {
        this.modalRef.classList.remove('open')
    }
}