import { getData, postData, deleteData, editeData } from "./modules/fetch.js"
import { form, tbody, modal, modal_bg, inp_name, inp_age, exit, save } from "./modules/queryes.js"
import { open_edit_modal, close_edit_modal } from "./modules/func.js"

getData().then(data => reload(data, tbody))
form.onsubmit = (e) => {
    e.preventDefault()
    let std = {
        id: Math.random(),
    }
    let fm = new FormData(form)
    fm.forEach((value, key) => {
        std[key] = value
    });
    if (std.name.length > 0) {
        postData(std)
            .then(res => {
                if (res.ok) {
                    getData().then(data => reload(data, tbody))
                }
            })
    }
}

let reload = (data, pl) => {
    pl.innerHTML = ""
    for (let item of data) {
        // createElement
        let tr = document.createElement('tr')
        let tdNum = document.createElement('td')
        let tdName = document.createElement('td')
        let tdAge = document.createElement('td')
        let tdbut = document.createElement('td')
        let edit = document.createElement('button')
        let del = document.createElement('button')
        let ed_img = document.createElement('img')
        let del_img = document.createElement('img')
        //classList
        edit.classList.add('edit')
        del.classList.add('del')
        //src
        ed_img.src = `./img/edit.png`
        del_img.src = `./img/delete.png`
        //innerHTML
        tdName.innerHTML = item.name
        tdAge.innerHTML = new Date().getFullYear() - item.age
        tdNum.innerHTML = data.indexOf(item) + 1
        //append
        del.append(del_img)
        edit.append(ed_img)
        tdbut.append(edit, del)
        tr.append(tdNum, tdName, tdAge, tdbut)
        pl.prepend(tr)
        //delete 
        del.onclick = () => {
            deleteData(item.id)
                .then(res => {
                    if (res.ok) {
                        getData().then(data => reload(data, tbody))
                    }
                })
        }
        //edit modal func
        edit.onclick = () => {
            open_edit_modal(modal, modal_bg)
            save.onclick = () => {
                editeData(item.id, { name: inp_name.value, age: inp_age.value })
                    .then(res => {
                        if (res.ok) {
                            getData().then(data => reload(data, tbody))
                        }
                    })
                close_edit_modal(modal, modal_bg)
            }
            exit.onclick = () => {
                close_edit_modal(modal, modal_bg)
            }
        }
    }
}