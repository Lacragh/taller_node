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

dotenv.config();
console.log(process.env.DBPASS);

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

async function startApolloServer() {
  // Configurar Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  // Usar Apollo como middleware de Express
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server)
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
