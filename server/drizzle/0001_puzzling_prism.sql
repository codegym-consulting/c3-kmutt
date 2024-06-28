DO $$ BEGIN
 CREATE TYPE "public"."academic_title" AS ENUM('dr', 'prof', 'prof_dr', 'asst_prof', 'asst_prof_dr', 'assoc_prof', 'assoc_prof_dr');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."profile_title" AS ENUM('mr', 'miss', 'mrs');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "academic_service" (
	"id" integer PRIMARY KEY NOT NULL,
	"resumeId" integer,
	"name" text,
	"categories" jsonb,
	"date" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookmark" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"id" integer,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "department" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"facultyId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "education" (
	"id" serial PRIMARY KEY NOT NULL,
	"resumeId" integer,
	"typeOfDegree" text,
	"institution" text,
	"fieldOfStudy" text,
	"graduationYear" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "experience" (
	"id" serial PRIMARY KEY NOT NULL,
	"resumeId" integer,
	"title" text,
	"company" text,
	"location" text,
	"startDate" timestamp with time zone,
	"endDate" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "expertise" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "faculty" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "note" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer,
	"isTextOnly" boolean,
	"title" text,
	"content" text,
	"imageUrl" text,
	"createdAt" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profile" (
	"id" integer PRIMARY KEY NOT NULL,
	"userId" integer,
	"title" "profile_title",
	"name" text,
	"surname" text,
	"nickname" text,
	"photoUrl" text,
	"phoneNo" text,
	"email" text,
	"linkUrl" text,
	"address" text,
	"shortBio" text,
	"nationality" text,
	"occupation" text,
	"organization" text,
	"faculty" integer,
	"department" integer,
	"academicTitle" "academic_title",
	"expertises" jsonb,
	"areaOfInterests" jsonb,
	"teachingExperiences" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"summary" text,
	"categories" jsonb,
	"hashtags" jsonb,
	"researchTheme" integer,
	"SDGGoal" integer,
	"imageUrl" text,
	"imageUrls" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "research" (
	"id" serial PRIMARY KEY NOT NULL,
	"resumeId" integer,
	"name" text,
	"categories" jsonb,
	"date" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resume" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer,
	"isFileType" boolean DEFAULT false NOT NULL,
	"fileUrls" jsonb,
	"name" text,
	"email" text,
	"phoneNo" text,
	"updatedAt" timestamp with time zone DEFAULT now(),
	"createdAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"name" text,
	"photoUrl" text,
	"provider" text,
	"loggedInAt" timestamp with time zone,
	"password" text
);
--> statement-breakpoint
ALTER TABLE "users" RENAME TO "activity";--> statement-breakpoint
ALTER TABLE "activity" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "activity" ADD COLUMN "title" text;--> statement-breakpoint
ALTER TABLE "activity" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "activity" ADD COLUMN "thumbnailUrl" text DEFAULT '';--> statement-breakpoint
ALTER TABLE "activity" ADD COLUMN "createdAt" timestamp with time zone DEFAULT now();--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email" ON "user" USING btree ("email");--> statement-breakpoint
ALTER TABLE "activity" DROP COLUMN IF EXISTS "full_name";--> statement-breakpoint
ALTER TABLE "activity" DROP COLUMN IF EXISTS "phone";