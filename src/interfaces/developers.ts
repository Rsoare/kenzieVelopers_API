interface Idevelopers {
   id: number;
   name: string;
   email: string;
}

interface IdevelopersInfos {
   id: number;
   developerSince: Date;
   preferedOS: "Windows" | "Linux" | "MacOS";
   developerId?: number;
}

interface IpreferredOS {
   preferredOS: "Windows" | "Linux" | "MacOS";
}

type IdevelopersRequest = Omit<Idevelopers, "id">;

type IdevelopersInfosRequest = Omit<IdevelopersInfos, "id">;

interface IdevelopersUpdate extends IdevelopersRequest {}
interface IGetDevelopers {
   developerId: number;
   developerName: string;
   developerEmail: string;
   developerInfoDeveloperSince: Date | null;
   developerInfoPreferredOS: string | null;
}

export {
   Idevelopers,
   IdevelopersRequest,
   IGetDevelopers,
   IdevelopersUpdate,
   IdevelopersInfos,
   IdevelopersInfosRequest,
   IpreferredOS,
};
