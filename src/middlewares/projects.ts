import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { Idevelopers } from "../interfaces/developers";
import { client } from "../dataBaseDebug";
import { Iprojects } from "../interfaces/projects";

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


export { checkingProjectDeveloper, 
         checkingExistenceProjectOfId };
