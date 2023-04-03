import axios from 'axios'

const url = 'http://localhost:8080/productos'

let idNew = ''

await axios(`${url}`)
    .then( resp => { console.log(resp.data) } )
    .catch( err => { console.log(err) } )



await axios.post(`${url}`,    
    {
        producto: "GoPro2",
        precio: "3800",
        thumbnail: "https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-20-512.png",
    }
    ).then( resp => { console.log(resp.data)
        idNew = resp.data[0]._id
    } )
    .catch( err => { console.log(err) } )

await axios.put(`${url}${idNew}`, {
    producto: "GoPro2",
    precio: "3800",
    thumbnail: "https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-20-512.png",
        id: `${idNew}`
    }   
    ).then( resp => { console.log(resp.data) } )
    .catch( err => { console.log(err) } )

await axios(`${url}`)
    .then( resp => { console.log(resp.data) } )
    .catch( err => { console.log(err) } )

await axios.delete(`${url}${idNew}`
    ).then( resp => { console.log(resp.data) } )
    .catch( err => { console.log(err) } )

await axios(`${url}`)
    .then( resp => { console.log(resp.data) } )
    .catch( err => { console.log(err) } )
