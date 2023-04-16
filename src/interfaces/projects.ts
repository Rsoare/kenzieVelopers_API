interface Iprojects {
   id: number;
   name: string;
   description: string;
   estimatedTime: string;
   repository: string;
   startDate: Date;
   endDate?: Date | null;
   developerId: number;
}

type IprojectsRequest = Omit<Iprojects, "id">;

interface IGetProjects {
   projectId: number;
   projectName: string;
   projectDescription: string;
   projectEstimatedTime: string;
   projectRepository: string;
   projectStartDate: Date;
   projectEndDate: Date | null;
   projectDeveloperId: number;
   technologyId: number | null;
   technologyName: string | number;
}

type IprojectsTechnologies = Omit<IGetProjects, "projectDeveloperId">;

interface Itechnologies {
   id: number;
   name: string;
}
interface Iprojects_technologies {
   id: number;
   addedln: Date;
   technologyId: number;
   projectId: number;
}
export {
   Iprojects,
   IprojectsRequest,
   IGetProjects,
   IprojectsTechnologies,
   Itechnologies,
   Iprojects_technologies,
};
