export function open_edit_modal(modal, modal_bg) {
    modal.style.display = "flex"
    modal_bg.style.display = "block"
    setTimeout(() => {
        modal.style.opacity = "1"
        modal_bg.style.opacity = "1"
    }, 200)
}

export function close_edit_modal(modal, modal_bg) {
    modal.style.opacity = "0"
    modal_bg.style.opacity = "0"
    setTimeout(() => {
        modal.style.display = "none"
        modal_bg.style.display = "none"
    }, 200)
}