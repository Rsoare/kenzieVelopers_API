import express, { Application } from "express";
import "dotenv/config";
import { startDatabase } from "./dataBaseDebug";

const app: Application = express();

app.use(express.json())

app.post('/developers')

app.get('/developers/:id')

app.patch('/developers/:id')

app.delete('/developers/:id')

app.post('/developers/:id/infos')


app.listen(3000,async () =>{

   await startDatabase()
   console.log('Server started on port 3000')
})
export default app;
