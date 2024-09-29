/*
  Warnings:

  - A unique constraint covering the columns `[productId,userId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Product_productId_userId_idx";

-- CreateIndex
CREATE INDEX "Product_name_productId_userId_idx" ON "Product"("name", "productId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_productId_userId_key" ON "Product"("productId", "userId");
