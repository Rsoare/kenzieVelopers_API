import express, { Application } from "express";
import "dotenv/config";
import { startDatabase } from "./dataBaseDebug";
import {
   createDevelopersInfos,
   createUserDevelopers,
   deleteDevelopersById,
   getDevelopersById,
   updateDevelopersById,
} from "./logics/developers";
import {
   checkDevelopersInfosDuplicateId,
   checkingExistenceOfId,
   CheckingPreferredOsExistence,
   checkNameDuplicate,
} from "./middlewares/developers";

const app: Application = express();

app.use(express.json());

app.post("/developers", checkNameDuplicate, createUserDevelopers);

app.get("/developers/:id", checkingExistenceOfId, getDevelopersById);

app.patch(
   "/developers/:id",
   checkingExistenceOfId,
   checkNameDuplicate,
   updateDevelopersById
);

app.delete("/developers/:id", 
   checkingExistenceOfId,
   deleteDevelopersById
);

app.post(
   "/developers/:id/infos",
   checkingExistenceOfId,
   checkDevelopersInfosDuplicateId,
   CheckingPreferredOsExistence, 
   createDevelopersInfos
);

app.listen(3000, async () => {
   await startDatabase();
   console.log("Server started on port 3000");
});
export default app;
