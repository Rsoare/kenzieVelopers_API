import { Request, Response } from "express";
import {
   IGetDevelopers,
   Idevelopers,
   IdevelopersInfos,
   IdevelopersInfosRequest,
   IdevelopersRequest,
   IdevelopersUpdate,
} from "../interfaces/developers";
import format from "pg-format";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../dataBaseDebug";

const createUserDevelopers = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const developerData: IdevelopersRequest = req.body;

   const queryParamKeys = Object.keys(developerData);
   const queryParamValues = Object.values(developerData);

   const queryString: string = format(
      `

      INSERT INTO 
         developers(%I)

      VALUES
         (%L)

      RETURNING *;
   `,
      queryParamKeys,
      queryParamValues
   );

   const queryResult: QueryResult<Idevelopers> = await client.query(
      queryString
   );

   return res.status(201).json(queryResult.rows[0]);
};

const getDevelopersById = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const developerId: number = parseInt(req.params.id);

   const queryString: string = `

   SELECT 
      "dev"."id" AS "developerId",
      "dev"."name" AS "developerName",
      "dev"."email" AS "developerEmail",
      "dev_info"."developerSince" AS "developerInfoDeveloperSince", 
      "dev_info"."preferredOS" AS "developerInfoPreferredOS"

   FROM 
      developers "dev"

   LEFT JOIN 
      developer_info "dev_info" ON "dev_info"."developerId" = "dev".id 

   LEFT JOIN 
      projects "pj" ON  "pj"."developerId" = "dev".id

   WHERE 
      "dev".id  = $1;
   `;

   const queryConfig: QueryConfig = {
      text: queryString,
      values: [developerId],
   };

   const queryResult: QueryResult<IGetDevelopers> = await client.query(
      queryConfig
   );

   return res.status(200).json(queryResult.rows[0]);
};

const updateDevelopersById = async (
   req: Request,
   res: Response
): Promise<Response> => {

   const developerId:number = parseInt(req.params.id)

   const bodyParams: IdevelopersRequest = req.body;

   const queryParamKeys = Object.keys(bodyParams);
   const queryParamValues = Object.values(bodyParams);

   const queryString: string = format(
      `

      UPDATE 
         developers

      SET(%I) = ROW(%L)

      WHERE
         "id" = $1
   
      RETURNING *;
      `,
      queryParamKeys,
      queryParamValues
   );

   const queryConfig: QueryConfig = {
      text: queryString,
      values: [developerId],
   };

   const queryResult: QueryResult<IdevelopersUpdate> = await client.query(queryConfig);

   return res.status(200).json(queryResult.rows[0]);
};


const deleteDevelopersById = async (req:Request,res:Response):Promise<Response> => {

   const developerId:number = parseInt(req.params.id)

   const queryString:string=`

   DELETE FROM 
      developers 

   WHERE "id" = $1;
   `

   const queryConfig:QueryConfig = {
      text:queryString,
      values:[developerId]
   }

   await client.query(queryConfig)

   return res.status(204).send()
}


const createDevelopersInfos = async (
   req: Request,
   res: Response
): Promise<Response> => {

   const developerData: IdevelopersInfosRequest= req.body;
         developerData.developerId = parseInt(req.params.id)


   const queryParamKeys = Object.keys(developerData);
   const queryParamValues = Object.values(developerData);

   const queryString: string = format(
      `

      INSERT INTO 
         developer_info(%I)

      VALUES
         (%L)

      RETURNING *;
   `,
      queryParamKeys,
      queryParamValues
   );

   const queryResult: QueryResult<IdevelopersInfos> = await client.query(
      queryString
   );

   return res.status(201).json(queryResult.rows[0]);
};

export { createUserDevelopers, 
         getDevelopersById, 
         updateDevelopersById,
         deleteDevelopersById,
         createDevelopersInfos
      };