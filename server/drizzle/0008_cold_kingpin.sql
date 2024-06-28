DO $$ BEGIN
 CREATE TYPE "public"."type_of_degree" AS ENUM('diploma', 'bachelor', 'master', 'doctorate');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."type_of_source" AS ENUM('book', 'book_section', 'journal_article', 'article_in_a_periodical', 'conference', 'report', 'website', 'electronic', 'art', 'sound_recording', 'performance', 'film', 'interview', 'patent');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "profile" RENAME COLUMN "photoUrl" TO "avatarUrl";--> statement-breakpoint
ALTER TABLE "resume" RENAME COLUMN "photoUrl" TO "avatarUrl";