const optionsSql = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'Titania18*',
        database: 'ecommerce'
    }
}

 const optionsSqlite = {
    client: "sqlite3",
    connection: {
        filename: "./db/ecommerce.sqlite"
    },
    useNullAsDefault: true
}

module.exports = optionsSql
module.exports = optionsSqlite