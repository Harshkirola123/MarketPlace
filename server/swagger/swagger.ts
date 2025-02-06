const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Drawing App",
    description: "API documentation for the Drawing App",
  },
  host: "localhost:5000",
  schemes: ["http"],
  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Enter your Bearer token here",
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
  definitions: {
    User: {
      type: "object",
      properties: {
        _id: { type: "string", description: "User ID" },
        name: { type: "string", description: "User's name" },
        email: { type: "string", description: "User's email" },
        password: { type: "string", description: "User's password" },
      },
    },
  },
};

const outputFile = "./swagger_output.json"; // Path to the generated Swagger JSON file
const endpointsFiles = ["../index.ts"]; // Path to all your route files (adjust as needed)

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation generated!");
});
