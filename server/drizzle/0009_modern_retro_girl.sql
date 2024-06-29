DO $$ BEGIN
 CREATE TYPE "public"."note_type" AS ENUM('text', 'image');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notification" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"title" text,
	"content" text,
	"thumbnailUrl" text DEFAULT '',
	"createdAt" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "activity" RENAME TO "interest";--> statement-breakpoint
ALTER TABLE "note" RENAME COLUMN "isTextOnly" TO "type";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'interest'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "interest" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "interest" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "interest" ALTER COLUMN "id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "note" ALTER COLUMN "userId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "note" ALTER COLUMN "type" SET DATA TYPE note_type;--> statement-breakpoint
ALTER TABLE "note" ALTER COLUMN "type" SET DEFAULT 'text';--> statement-breakpoint
ALTER TABLE "note" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "interest" ADD COLUMN "name" text;--> statement-breakpoint
ALTER TABLE "interest" DROP COLUMN IF EXISTS "userId";--> statement-breakpoint
ALTER TABLE "interest" DROP COLUMN IF EXISTS "title";--> statement-breakpoint
ALTER TABLE "interest" DROP COLUMN IF EXISTS "description";--> statement-breakpoint
ALTER TABLE "interest" DROP COLUMN IF EXISTS "thumbnailUrl";--> statement-breakpoint
ALTER TABLE "interest" DROP COLUMN IF EXISTS "createdAt";