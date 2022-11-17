const swaggerJsDoc  = require('swagger-jsdoc')

const swaggerOptions = {
    swaggerDefinition: {
        openApi: "3.0.0",
        info: {
            title: "API for Amanda",
            description: "Information about the API, how to use it and the valid HTTP methods",
            version: "0.0.0"
        },
        servers: [
            {
                url: "http://localhost:5000",
            }
        ]
    },
    apis: ["./routes/*.js"]
}

const swaggerDocument = swaggerJsDoc(swaggerOptions)

module.exports = swaggerDocument