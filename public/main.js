const socket = io()

const deleteId = document.querySelector('#deleteById')
socket.on('products', product => {
    makeHtmlTable(product).then(html => {
        document.querySelector('#products').innerHTML = html
    })
});
const makeHtmlTable = (products) => {
    return fetch('./views/index.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ products });
            return html
        })
}

//-------------------------------------------------------------------------------------

const inputUsername = document.getElementById('inputUsername')
const inputMessage = document.getElementById('inputMessage')
const btnSend = document.getElementById('btnSend')

const formMessage = document.getElementById('formMessage')
formMessage.addEventListener('submit', e => {
    e.preventDefault()

    const message = { autor: inputUsername.value, texto: inputMessage.value }
    socket.emit('newMessage', message);
    formMessage.reset()
    inputMessage.focus()
})

socket.on('message', message => {
    console.log(message);
    const html = makeHtmlList(message)
    document.getElementById('message').innerHTML = html;
})

const makeHtmlList = (message) =>{
    return message.map(message => {
        return (`
            <div>
                <b style="color:blue;">${message.autor}</b>
                [<span style="color:brown;">${message.time}</span>] :
                <i style="color:green;">${message.texto}</i>
            </div>
        `)
    }).join(" ");
}

inputUsername.addEventListener('input', () => {
    const valueEmail = inputUsername.value.length
    const valueText = inputMessage.value.length
    inputMessage.disabled = !valueEmail
    btnSend.disabled = !valueEmail || !valueText
})

inputMessage.addEventListener('input', () => {
    const valueText = inputMessage.value.length
    btnSend.disabled = !valueText
})
