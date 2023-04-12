import express, { Application } from "express";
import "dotenv/config";
import { startDatabase } from "./dataBaseDebug";
import { createUserDevelopers, getDevelopersById } from "./logics/developers";
import { checkingExistenceOfId, checkNameDuplicate } from "./middlewares/developers";

const app: Application = express();

app.use(express.json())

app.post('/developers',checkNameDuplicate,createUserDevelopers)

app.get('/developers/:id',checkingExistenceOfId ,getDevelopersById)

app.patch('/developers/:id')

app.delete('/developers/:id')

app.post('/developers/:id/infos')


app.listen(3000,async () =>{

   await startDatabase()
   console.log('Server started on port 3000')
})
export default app;
