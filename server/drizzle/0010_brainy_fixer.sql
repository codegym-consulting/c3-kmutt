DO $$ BEGIN
 CREATE TYPE "public"."occupation_type" AS ENUM('student', 'instructor', 'lecturer', 'researcher', 'research_assistant', 'support', 'consultant');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "academic_service" ALTER COLUMN "resumeId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "academic_service" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "category" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "category" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "department" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "department" ALTER COLUMN "facultyId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "education" ALTER COLUMN "resumeId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "experience" ALTER COLUMN "resumeId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "expertise" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "faculty" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "interest" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "interest" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notification" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notification" ALTER COLUMN "content" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notification" ALTER COLUMN "thumbnailUrl" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "notification" ALTER COLUMN "thumbnailUrl" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profile" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profile" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profile" ALTER COLUMN "surname" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profile" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profile" ALTER COLUMN "nationality" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profile" ALTER COLUMN "occupation" SET DATA TYPE occupation_type;--> statement-breakpoint
ALTER TABLE "profile" ALTER COLUMN "occupation" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profile" ALTER COLUMN "organization" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profile" ALTER COLUMN "faculty" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profile" ALTER COLUMN "department" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "summary" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "research" ALTER COLUMN "resumeId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "research" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "resume" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "photoUrl" SET DEFAULT 'https://storage.googleapis.com/c3-kmutt/default/user.svg';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "photoUrl" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "provider" SET DEFAULT 'password';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "provider" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "loggedInAt" SET DEFAULT now();