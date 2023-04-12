CREATE TYPE OS AS ENUM ('Windows','Linux','MacOS');

CREATE TABLE IF NOT EXISTS developers ( 

	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL,
	"email" VARCHAR(50) NOT NULL UNIQUE

);

CREATE TABLE IF NOT EXISTS developer_info (

	"id" SERIAL PRIMARY KEY,
	"developerSince" DATE NOT NULL,
	"preferredOS" OS NOT NULL,
	"developerId" INTEGER UNIQUE NOT NULL,

	FOREIGN KEY ("developerId") REFERENCES developers(id) 
);

CREATE TABLE IF NOT EXISTS projects (

	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL,
	"description" TEXT,
	"estimatedTime" VARCHAR(20) NOT NULL,
	"repository" VARCHAR(120) NOT NULL,
	"startDate" DATE NOT NULL,
	"endDate" DATE,
	"developerId" INTEGER,

	FOREIGN KEY ("developerId") REFERENCES developers(id)
);

CREATE TABLE IF NOT EXISTS projects_technologies(
	"id" SERIAL PRIMARY KEY,
	"addedln" DATE NOT NULL,
	"technologyId" INTEGER NOT NULL,
	"projectId" INTEGER NOT NULL,
	FOREIGN KEY ("technologyId") REFERENCES technologies(id),
	FOREIGN KEY ("projectId") REFERENCES projects(id)
);