const socket = io.connect();

const divProducts = document.getElementById("zonaProductos");
const tableProducts = document.getElementById("tablaProductos");

socket.on("productos", (data) => {
  return getProductos(tableProducts, data)
});

function getProductos(table, productsArray) {
  document.getElementById("tablaProductos").innerHTML = "";
  productsArray.forEach((el) => {
    let row = table.insertRow();
    row.insertCell().innerHTML = el.producto;
    row.insertCell().innerHTML = el.precio;
    row.insertCell().innerHTML = `<img src="${el.thumbnail}" alt="${el.producto}" width="60px">`;
  });
}

function addProduct() {
  const product = {
    producto: document.getElementById("producto").value,
    precio: document.getElementById("precio").value,
    thumbnail: document.getElementById("thumbnail").value,
  };

  socket.emit("newProduct", product);
  return false;
}

function updateMessages(message) {
  const html = message.map(msj => {
    return `<div>
      <span style="color: blue">${msj.email}</span><span style="color: brown"> [${msj.dateAndTime}] </span><span style="color: green">${msj.message}</span>
    </div>`
  })
    .join("<br>")
  document.getElementById("messagesMain").innerHTML = html;
}

function addMessage() {
  const message = {
    author: {
      mail: document.getElementById("mail").value,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      edad: document.getElementById("edad").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value
    },
    dateAndTime: new Date(Date.now()).toLocaleString(),
    mesage: document.getElementById("message").value
  }

  socket.emit("newMessage", message);
  return false
}

socket.on("messages", data => {
  const schemaAuthor = new normalizr.schema.Entity( "author",{},{ idAttribute: "mail" }
  );
  const schemaMessage = new normalizr.schema.Entity("message", {
    author: schemaAuthor,
  });
  const schemaMessageAll = new normalizr.schema.Entity("messages", {
    messages: [messageSchema],
  });

  const messDeNormalizado = normalizr.denormalize(data.result,schemaMessageAll,data.entities);
  const tamanoNormalizado = JSON.stringify(data).length
  const tamanoDesNormalizado = JSON.stringify(messDeNormalizado).length
  const porcentajeCompresion = 100 - (tamanoNormalizado * 100 / tamanoDesNormalizado)
  console.log("TAMANO DES NORMALIZADO", tamanoDesNormalizado)
  console.log("TAMANO NORMALIZADO", tamanoNormalizado)
  console.log("SE ACHICO UN " + porcentajeCompresion + "%")
  updateMessages(messDeNormalizado.messages);


})