-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'MANAGER');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "agencyAssigned" TEXT NOT NULL,
    "yearAssigned" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "lastOverhaul" TIMESTAMP(3) NOT NULL,
    "nextOverhaul" TIMESTAMP(3) NOT NULL,
    "lastMaintenance" TIMESTAMP(3) NOT NULL,
    "nextMaintenance" TIMESTAMP(3) NOT NULL,
    "unscheduledMaint" BOOLEAN NOT NULL,
    "trackerStatus" TEXT NOT NULL,
    "serviceability" BOOLEAN NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_serialNumber_key" ON "vehicles"("serialNumber");
