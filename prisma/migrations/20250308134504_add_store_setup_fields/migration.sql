/*
  Warnings:

  - A unique constraint covering the columns `[subdomain]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subdomain` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- Add setupCompleted to User
ALTER TABLE "User" ADD COLUMN "setupCompleted" BOOLEAN NOT NULL DEFAULT false;

-- Add subdomain to Store with a temporary default
ALTER TABLE "Store" ADD COLUMN "subdomain" TEXT;

-- Update existing stores with a default subdomain based on their name
UPDATE "Store" SET "subdomain" = CONCAT(LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]', '', 'g')), '.pagebuilder.com');

-- Make subdomain required and unique
ALTER TABLE "Store" ALTER COLUMN "subdomain" SET NOT NULL;
CREATE UNIQUE INDEX "Store_subdomain_key" ON "Store"("subdomain");
