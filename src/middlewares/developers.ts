import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { Idevelopers } from "../interfaces/developers";
import { client } from "../database";


const checkNameDuplicate = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<Response | void> => {
   const email: string = req.body.email;

   const queryString: string = `

      SELECT 
         * 

      FROM 
         developers 
         
      WHERE 
         email = $1;
   `;

   const queryConfig: QueryConfig = {
      text: queryString,
      values: [email],
   };

   const queryResult: QueryResult<Idevelopers> = await client.query(
      queryConfig
   );

   if (queryResult.rowCount > 0) {
      return res.status(409).json({
         message: "Email already exists.",
      });
   }

   return next();
};

const checkingExistenceOfId = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<Response | void> => {
   const id: number = parseInt(req.params.id);

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
      values: [id],
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

const checkDevelopersInfosDuplicateId = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<Response | void> => {
   const id: number = parseInt(req.params.id);

   const queryString: string = `
      SELECT
         *

      FROM
         developer_infos

      WHERE
         "developerId" = $1;
   `;
   const queryConfig: QueryConfig = {
      text: queryString,
      values: [id],
   };

   const queryResult: QueryResult<Idevelopers> = await client.query(
      queryConfig
   );

   if (queryResult.rowCount > 0) {
      return res.status(409).json({
         message: "Developer infos already exists",
      });
   }

   return next();
};

const CheckingPreferredOsExistence = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<Response | void> => {
   const { preferredOS } = req.body;
   const operationalSystems = ["Windows", "Linux", "MacOS"];

   const checkingPreferredOS = operationalSystems.includes(preferredOS);

   if (!checkingPreferredOS) {
      return res.status(400).json({
         message: "Invalid OS option.",
         options: ["Windows", "Linux", "MacOS"],
      });
   }

   return next();
};

export {
   checkNameDuplicate,
   checkingExistenceOfId,
   checkDevelopersInfosDuplicateId,
   CheckingPreferredOsExistence,
};
