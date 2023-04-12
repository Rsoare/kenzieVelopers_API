import { NextFunction,Request,Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { Idevelopers } from "../interfaces/developers";
import { client } from "../dataBaseDebug";

const checkNameDuplicate = async (req:Request,
   res:Response,
   next:NextFunction
   ):Promise<Response|void> =>{

      const email:string = req.body.email

      const queryString:string=`

         SELECT 
            * 

         FROM 
         developers 
         
         WHERE 
         email = $1;
      `

      const queryConfig: QueryConfig={
         text:queryString,
         values:[email]
      }

      const queryResult:QueryResult<Idevelopers> = await client.query(queryConfig)

      if(queryResult.rowCount > 0){
         return res.status(409).json({
            message:"Email already exists."
         })
      }

      return next()
}


const checkingExistenceOfId = async (req:Request,res:Response,next:NextFunction):Promise<Response | void> => {
   const id:number = parseInt(req.params.id)

   const queryString:string=`
      SELECT
         *
      FROM
         developers
      WHERE
         id = $1
   `
   const queryConfig:QueryConfig={
      text:queryString,
      values:[id]
   }

   const queryResult:QueryResult<Idevelopers> = await client.query(queryConfig)

   if(queryResult.rowCount == 0){

      return res.status(404).json({
         message: 'developer not found'
      })
   }

   return next()
}

export{checkNameDuplicate,checkingExistenceOfId }