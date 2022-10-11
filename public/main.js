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

