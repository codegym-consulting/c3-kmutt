CREATE TABLE IF NOT EXISTS "skill" (
	"id" serial PRIMARY KEY NOT NULL,
	"resumeId" integer NOT NULL,
	"name" text NOT NULL,
	"level" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "note" ALTER COLUMN "type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notification" ADD COLUMN "externalUrl" text NOT NULL;