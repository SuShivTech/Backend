const express = require("express");
const connectdb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const cookieparser = require('cookie-parser')
const dotenv = require("dotenv").config();
const { rateLimiterUsingThirdParty } = require('./middlewares/rateLimit');

const swaggerJSdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");



const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: 'BlogAPI',
      description: "This is the simple Blog curd operations api ",
      version: '1.0.0',
      contact: {
        name: "adityam172003"
      }
    },
    servers: [
      {
        url: "https://aditya17003blog.azurewebsites.net"
      }
      ,
      {
        url: "http://localhost:8080"
      }


    ]
  },
  apis: ["./SwaggerDocs/*.js"]
}

const swaggerscep = swaggerJSdoc(options)

connectdb();

const app = express();

const port = process.env.PORT || 8080;


app.use(cors());


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerscep))

app.use(cookieparser())
app.use(express.json());
app.use(rateLimiterUsingThirdParty);

app.get("/", (req, res) => {
  res.send("from express server ")

})

app.use(express.static("public"));

app.use("/api/user", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
