import express, { Express } from "express";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import bodyParser from "body-parser";
import 'graphql-import-node';
import typeDefs from './graphql/schema.graphql';
import { resolvers } from "./graphql/resolvers";
import { router } from "./routes/posts";
import { router as user } from "./routes/user";
import { router as comment } from "./routes/comment";
import { router as reaction } from "./routes/reaction";
import { db } from "./config/db";
import jwt from "jsonwebtoken";

dotenv.config();
console.log(process.env.DBPASS);

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;


async function startApolloServer() {
  const server = new ApolloServer({
    csrfPrevention: false,
    typeDefs,
    resolvers,
  });

  await server.start();

  // Usar Apollo como middleware de Express
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization?.split(" ")[0]; // Extrae el token
        if (!token) {
          console.warn("No token provided in request headers");
          return {}; // Devuelve un contexto vacío
        }

        try {
          const user = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key")
          return { user }; // Devuelve el usuario autenticado en el contexto
        } catch (error) {
          console.error("Invalid token:");
          return {}; // Contexto vacío si el token no es válido
        }
      },
    })
  );

  // Rutas REST
  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.use("/api/v1/posts", router);
  app.use("/api/v1/user", user);
  app.use("/api/v1/comment", comment);
  app.use("/api/v1/reaction", reaction);

  // Conexión a la base de datos y servidor
  db.then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
    });
  });
}

startApolloServer();
