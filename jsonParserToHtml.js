let handlersForForm, ourInputsForForm

const jsonParserToHtml = (json, theme) => {
    handlersForForm = {
        "jsonparser-form-label-clear": clearForm,
        "jsonparser-form-label-submit": () => formHandler(json.submit.url)
    }
    ourInputsForForm = {}
    let result = `<form class="jsonparser-form" action="javascript:void(0);" ${json.id ? `id="${json.id}"` : '' }>
        ${json.title ? `<p class="jsonparser-form-title">${json.title}</p>`: ''}
        ${json.introduction ? `<p class="jsonparser-form-introduction">${json.introduction}</p>`: ''}`
        
    json.fields.forEach(el => {
        if(!el.id) return
        const id = `id="${el.id}"`
        let attrs = el.width ? `style="width: ${el.width}"` : ''
        let help = '' 
        if(el.help){
            help = '<p class="jsonparser-form-label-help">?</p>'
            attrs += ` title="${el.help}"`
        }
        let classes = []
        if(el.forsure) classes.push('jsonparser-form-label-forsure')
        if(el.button){
            classes.push('jsonparser-form-label-button')
            handlersForForm[el.id + '-button'] = ()=>{ setValueForForm(el.id, el.button.value) }
        }

        let res = ''
        if(el.type == "checkbox-block"){
            ourInputsForForm[el.id] = {}
            let idCollect = []
            res += `<div class="${classes.join(" ")} jsonparser-form-label-checkboxblock" ${el.id? `id="${el.id}"`: ''}>`
            for(key in el.arr){
                idCollect.push('checkbox-block-' + key)
                res += `<label class="jsonparser-form-label-checkbox" ${attrs}>
                    <input type="checkbox" id="checkbox-block-${key}">
                    <span></span>
                    ${el.arr[key].img? `<div style="background-image: url(${el.arr[key].img})"></div>` : ''}
                    ${el.arr[key].text}</label>`
            }
            if(el.max){
                ourInputsForForm[el.id].max = el.max
            }
            ourInputsForForm[el.id].arr = idCollect
            result += res + `${el.label ? `<p class="jsonparser-form-label-text">${el.label}${el.max? ` (Максимум: ${el.max})`: ''}</p>` : ''}</div>`
            return
        }
        const value = el.value ? el.value : ''
        if(el.type == "checkbox") classes.push('jsonparser-form-label-checkbox') 
        res += `<label ${attrs} class="${classes.join(' ')}">`
        ourInputsForForm[el.id] = null
        switch(el.type){
            case "select":
                res += `<select ${id}>`
                for(opt in el.options){
                    res += `<option value="${opt}">${el.options[opt]}</option>`
                }
                res += "</select>"
                break  
            case "textarea":
                res += `<textarea ${id}` +
                    (el.maxlength ? ` maxlength="${el.maxlength}"` : '') +
                    (el.placeholder ? ` placeholder="${el.placeholder}"` : '' ) +
                    (`>${value}</textarea>`)
                break
            case "checkbox":
                res += `<input type="checkbox" ${id} ${el.checked ? `checked="true"` : ''}><span></span>`
                break
            default:
                res += `<input type="${el.type}" ${id} value="${value}"` +                
                    (el.placeholder ? ` placeholder="${el.placeholder}">` : '>') + 
                    (el.button ? `<button ${id.slice(0, id.length-1)}-button">${el.button.text}</button>`: '')
                break
        }
        res += `${el.label ? `<p class="jsonparser-form-label-text">${el.label}</p>` : ''} ${help != '' ? help: ''}</label>`
        result += res
    })
    result += `<button id="jsonparser-form-label-submit">${j.submit.text}</button>
    ${j.notes ? `<p class="jsonparser-form-notes">${j.notes}</p>`: ''}
    <button id="jsonparser-form-label-clear">Очистить</button></form>`
    return result
}

const formHandler = (url) => {
    let form = {}
    for(el in ourInputsForForm) {
        if(ourInputsForForm[el] == null){
            element = document.getElementById(el)
            if(element.type == "checkbox"){
                form[el] = element.checked
                continue
            }
            form[el] = element.value            
            continue
        }
        form[el] = []
        ourInputsForForm[el].arr.forEach(cb => {
            if(document.getElementById(cb).checked && ourInputsForForm[el].max > form[el].length){
                form[el].push(cb)
            }
        })
    }
    if(url == "test"){
        console.log(form)
    }else{
        fetch(url,{
            method: "POST",
            body: JSON.stringify(form)
        })
            .then(res => res.json)
            .then(res => console.log(res))
            .catch(e => console.log(e))
    }
}

const setValueForForm = (id, value) => {
    if(value == "today"){
        let today = new Date()
        day = today.getDate().toString()
        if(day.length < 2) day = '0' + day
        month = (today.getMonth() + 1).toString()
        if(month.length < 2) month = '0' + month
        value = `${today.getFullYear()}-${month}-${day}`
    }
    document.getElementById(id).value = value
}

const setHandlersForForm = (event, handlers = handlersForForm) => {
    for(el in handlers){
        document.getElementById(el).addEventListener('click', handlers[el])
    }
}

const clearForm = () => {
    for(el in ourInputsForForm) {
        if(ourInputsForForm[el] == null){
            document.getElementById(el).value = ""
            document.getElementById(el).checked = false
            continue
        }
        ourInputsForForm[el].arr.forEach(cb => {
            document.getElementById(cb).checked = false
        })
    }
}
