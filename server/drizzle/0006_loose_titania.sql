DROP INDEX IF EXISTS "resume_user_id";--> statement-breakpoint
ALTER TABLE "resume" ADD PRIMARY KEY ("userId");--> statement-breakpoint
ALTER TABLE "resume" ALTER COLUMN "userId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "resume" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "resume" DROP COLUMN IF EXISTS "id";