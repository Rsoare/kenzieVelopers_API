import { Request, Response, query } from "express";
import { IGetProjects, Iprojects, IprojectsRequest } from "../interfaces/projects";
import format from "pg-format";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../dataBaseDebug";

const createProjects = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const dataProjects: IprojectsRequest = req.body;

   const queryParamKeys = Object.keys(dataProjects);
   const queryParamValues = Object.values(dataProjects);

   const queryString: string = format(
      `
      INSERT INTO 
         projects (%I)

      VALUES
         (%L)

      RETURNING *;
   `,
      queryParamKeys,
      queryParamValues
   );

   const queryResult: QueryResult = await client.query(queryString);

   return res.status(201).json(queryResult.rows[0]);
};

const getProjectsById = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const id: number = parseInt(req.params.id);

   const queryString: string = `
      SELECT 
      pj."id" AS "projectId",
      pj."name" AS "projectName",
      pj."description" AS "projectDescription",
      pj."estimatedTime" AS "projectEstimatedTime",
      pj."repository" AS "projectRepository",
      pj."startDate" AS "projectStartDate",
      pj."endDate" AS "projectEndDate",
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
      pj.id = $1; 
   `;

   const queryConfig: QueryConfig = {
      text: queryString,
      values: [id],
   };

   const queryResult: QueryResult<IGetProjects> = await client.query(
      queryConfig
   );

   return res.status(200).json(queryResult.rows[0]);
};

const updateProjectById = async (
   req: Request,
   res: Response
): Promise<Response> => {

   const projectId:number = parseInt(req.params.id) 

   const bodyParams:Partial<IprojectsRequest> = req.body

   const queryParamKeys = Object.keys(bodyParams)
   const queryParamValues = Object.values(bodyParams)

   const queryString:string = format(`

      UPDATE
         projects

      SET(%I) = ROW(%L)

      WHERE
         "id" = $1

      RETURNING *;
   `,
   queryParamKeys,
   queryParamValues)

   const queryConfig:QueryConfig= {
      text:queryString,
      values:[projectId]
   }

   const queryResult:QueryResult<Iprojects> = await client.query(queryConfig)

   return res.status(200).json(queryResult.rows[0]);

};

const deleteProjectById = async (req:Request,res:Response):Promise<Response> => {

   const projectId:number = parseInt(req.params.id)

   const queryString:string= `
      DELETE FROM 
         projects
      
      WHERE id = $1
   `

   const queryConfig:QueryConfig ={
      text:queryString,
      values: [projectId]
   }

   await client.query(queryConfig)

   return res.status(204).send()
}
export { createProjects, getProjectsById,updateProjectById,deleteProjectById };
