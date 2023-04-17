import express, { Application } from "express";
import "dotenv/config";

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

import {
   addTechnologiesForProject,
   createProjects,
   deleteProjectById,
   deleteTechnologiesById,
   getProjectsById,
   updateProjectById,
} from "./logics/projects";

import {
   checkingDuplicateTechnologies,
   checkingExistenceProjectOfId,
   checkingExistenceTechnologies,
   checkingProjectDeveloper,
} from "./middlewares/projects";
import { startDatabase } from "./database";

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

app.delete("/developers/:id", checkingExistenceOfId, deleteDevelopersById);

app.post(
   "/developers/:id/infos",
   checkingExistenceOfId,
   checkDevelopersInfosDuplicateId,
   CheckingPreferredOsExistence,
   createDevelopersInfos
);

// routes projects
app.post("/projects", checkingProjectDeveloper, createProjects);

app.get("/projects/:id", checkingExistenceProjectOfId, getProjectsById);

app.patch(
   "/projects/:id",
   checkingExistenceProjectOfId,
   checkingProjectDeveloper,
   updateProjectById
);
app.delete("/projects/:id", checkingExistenceProjectOfId, deleteProjectById);

app.post(
   "/projects/:id/technologies",
   checkingExistenceProjectOfId,
   checkingExistenceTechnologies,
   checkingDuplicateTechnologies,
   addTechnologiesForProject
);

app.delete(
   "/projects/:id/technologies/:name",
   checkingExistenceProjectOfId,
   checkingExistenceTechnologies,
   deleteTechnologiesById
);

export default app;
