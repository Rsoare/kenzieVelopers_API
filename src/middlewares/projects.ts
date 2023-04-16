import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { Idevelopers } from "../interfaces/developers";
import { Iprojects, Itechnologies } from "../interfaces/projects";
import { client } from "../database";

const checkingProjectDeveloper = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<Response | void> => {
   const developerId: number = parseInt(req.body.developerId);

   const queryString: string = `
      SELECT 
         *

      FROM 
         developers

      WHERE
         id = $1

   `;

   const queryConfig: QueryConfig = {
      text: queryString,
      values: [developerId],
   };

   const queryResult: QueryResult<Idevelopers> = await client.query(
      queryConfig
   );

   if (queryResult.rowCount == 0) {
      return res.status(404).json({
         message: "developer not found",
      });
   }
   return next();
};

const checkingExistenceProjectOfId = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<Response | void> => {
   const projectId = req.params.id;

   const queryString: string = `

   SELECT
      *

   FROM 
      projects

   WHERE 
      id = $1
   `;

   const queryConfig: QueryConfig = {
      text: queryString,
      values: [projectId],
   };

   const queryResult: QueryResult<Iprojects> = await client.query(queryConfig);

   if (queryResult.rowCount == 0) {
      return res.status(404).json({
         message: "project not found",
      });
   }

   return next();
};
const checkingExistenceTechnologies = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<Response | void> => {
   let techName = req.body.name;

   if (techName == undefined || techName == null) {
      techName = req.params.name;
   }

   const queryString: string = `
   SELECT
      *

   FROM 
      technologies

   WHERE 
      name = $1
   `;

   const queryConfig: QueryConfig = {
      text: queryString,
      values: [techName],
   };

   const queryResult: QueryResult<Itechnologies> = await client.query(
      queryConfig
   );

   if (queryResult.rowCount == 0) {
      return res.status(400).json({
         message: "Technology not supported.",
         options: [
            "JavaScript",
            "Python",
            "React",
            "Express.js",
            "HTML",
            "CSS",
            "Django",
            "PostgreSQL",
            "MongoDB",
         ],
      });
   }

   return next();
};
const checkingDuplicateTechnologies = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<Response | void> => {
   let techName = req.body.name;

   const queryString: string = `

      SELECT 
         pj."id" AS "projectId",
         pj."name" AS "projectName",
         pj."developerId" AS "projectDeveloperId",
         pj_tech."technologyId", 
         tech."name" AS "technologyName"  
      FROM 
         projects pj
      LEFT JOIN 
         projects_technologies pj_tech
         ON pj_tech."projectId" = pj.id 
      LEFT JOIN 
         technologies tech
         ON tech.id = pj_tech."technologyId"
      WHERE 
         tech.name = $1;
   `;

   const queryConfig: QueryConfig = {
      text: queryString,
      values: [techName],
   };

   const queryResult: QueryResult<Itechnologies> = await client.query(
      queryConfig
   );

   if (queryResult.rowCount > 0) {
      return res.status(409).json({
         message: "This technology is already associated with the project",
      });
   }

   return next();
};


export {
   checkingProjectDeveloper,
   checkingExistenceProjectOfId,
   checkingExistenceTechnologies,
   checkingDuplicateTechnologies,
};
