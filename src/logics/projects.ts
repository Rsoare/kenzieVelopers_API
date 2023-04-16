import { Request, Response } from "express";
import {
   IGetProjects,
   Iprojects,
   IprojectsRequest,
   IprojectsTechnologies,
   Iprojects_technologies,
} from "../interfaces/projects";
import format from "pg-format";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";

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

   return res.status(200).json(queryResult.rows);
};

const updateProjectById = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const projectId: number = parseInt(req.params.id);

   const bodyParams: Partial<IprojectsRequest> = req.body;

   const queryParamKeys = Object.keys(bodyParams);
   const queryParamValues = Object.values(bodyParams);

   const queryString: string = format(
      `

      UPDATE
         projects

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
      values: [projectId],
   };

   const queryResult: QueryResult<Iprojects> = await client.query(queryConfig);

   return res.status(200).json(queryResult.rows[0]);
};

const deleteProjectById = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const projectId: number = parseInt(req.params.id);

   const queryString: string = `
      DELETE FROM 
         projects
      
      WHERE id = $1
   `;

   const queryConfig: QueryConfig = {
      text: queryString,
      values: [projectId],
   };

   await client.query(queryConfig);

   return res.status(204).send();
};

const addTechnologiesForProject = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const paramsBody: string = req.body;

   const projectId: number = parseInt(req.params.id);

   const paramsBodyValues = Object.values(paramsBody);

   const date = new Date();

   const queryStringSelect: string = `
      SELECT 
         technologies.id 

      FROM 
         technologies
         
      WHERE 
         name = $1;
   `;
   const queryConfigSelect: QueryConfig = {
      text: queryStringSelect,
      values: [paramsBodyValues[0]],
   };

   const queryResultSelect: QueryResult<{ id: number }> = await client.query(
      queryConfigSelect
   );

   const { id } = queryResultSelect.rows[0];

   const queryStringInsert: string = `
      INSERT INTO 
         projects_technologies ("projectId","technologyId","addedln")
      VALUES 
         ($1,$2,$3);	
      
   `;
   const queryConfigInsert: QueryConfig = {
      text: queryStringInsert,
      values: [projectId, id, date],
   };

   await client.query(queryConfigInsert);

   const queryString: string = `

      SELECT 
         pj."id" AS "projectId",
         pj."name" AS "projectName",
         pj."description" AS "projectDescription",
         pj."estimatedTime" AS "projectEstimatedTime",
         pj."repository" AS "projectRepository",
         pj."startDate" AS "projectStartDate",
         pj."endDate" AS "projectEndDate",
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
      values: [projectId],
   };
   const queryResult: QueryResult<IprojectsTechnologies> = await client.query(
      queryConfig
   );

   return res.status(201).json(queryResult.rows[0]);
};

const deleteTechnologiesById = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const { id: projectId, name: techName } = req.params;

   const queryStringSelect: string = `
      SELECT 
         technologies.id 

      FROM 
         technologies
         
         
      WHERE 
         name = $1;
   `;

   const queryConfigSelect: QueryConfig = {
      text: queryStringSelect,
      values: [techName],
   };

   const queryResultSelect: QueryResult<{ id: number }> = await client.query(
      queryConfigSelect
   );

   const { id } = queryResultSelect.rows[0];

   const queryString: string = `
      DELETE FROM 
         projects_technologies

      WHERE 
         "technologyId" = $1 AND "projectId" = $2

      RETURNING *;
   `;

   const queryConfig: QueryConfig = {
      text: queryString,
      values: [id, projectId],
   };

   const queryResult: QueryResult<Iprojects_technologies> = await client.query(
      queryConfig
   );

   if (queryResult.rowCount == 0) {
      return res.status(400).json({
         message: "Technology not related to the project.",
      });
   }

   return res.status(204).send();
};
export {
   createProjects,
   getProjectsById,
   updateProjectById,
   deleteProjectById,
   addTechnologiesForProject,
   deleteTechnologiesById,
};
