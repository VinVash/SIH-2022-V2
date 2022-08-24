import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: "1.0.0",
      title: "SIH-Backend",
      description: "SIH Backend Server API Documentation",
      license: {
        name: "Apache 2.0",
        url: "http://www.apache.org/licenses/LICENSE-2.0.html"
      },
      contact: {
        email: "raghhavdturki@gmail.com"
      }
    },
    servers: [
      {
        url: "http://localhost:7071/api/",
        description: "Dev Server"
      },
      {
        url: "https://sih-2022-server.azurewebsites.net/api/",
        description: "Prod Server"
      }
    ]
  },
  apis: ['swagger.yml'],
};

const specs = swaggerJSDoc(options);

const app = express();
app.set("port", process.env.PORT || 3000);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.listen(app.get("port"), () => {
  console.log(`Server is running at http://localhost:${app.get("port")}`);
});