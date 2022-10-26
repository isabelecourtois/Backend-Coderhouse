//Constructor de clase

class Usuario {

    constructor(nombre, apellido, libros, mascota) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascota = mascota;   
    };

    //Funciones

    getFullName() {
        return ("Nombre completo:" + this.nombre +" " + this.apellido) 
    };

    addMascotas (nomMascota) {
        this.mascota.push(nomMascota)
    };
    countMascotas(){
        return ("El número de mascotas es:" + this.mascota.length)
    };
    addBook (nomLibros) {
        this.libros.push(nomLibros)
    };
    getBookNames(){
        const book = this.libros.map((element) =>  element.nombre)
        return book
             
         
    };
}

//Objeto usuario con valores arbitrarios 

const usuario1 = new Usuario("Isabel","Lecourtois",
                            [{nombre : "La sombra del viento", autor : "Carlos Ruiz Zafón"},
                            {nombre : "1Q84", autor : "Haruki Murakami"},
                            {nombre : "La caída de los gigantes", autor : "Ken Follet"}],
                            ["Rex", "Galleta"]
)

//usuario 1
console.log(usuario1)

//Función nombre completo
console.log(usuario1.getFullName())

//Agrego mascota
usuario1.addMascotas("Horacio")
console.log(usuario1) 

//Cuento las mascotas
console.log(usuario1.countMascotas())

//Agrega un libro
usuario1.addBook({nombre : "Factfulness", autor : "Hans Rosling"})
console.log(usuario1)

//Filtra los autores
console.log(usuario1.getBookNames())