/*
  Warnings:

  - You are about to drop the `BlogTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BlogTag" DROP CONSTRAINT "BlogTag_blogId_fkey";

-- DropForeignKey
ALTER TABLE "BlogTag" DROP CONSTRAINT "BlogTag_tagId_fkey";

-- DropTable
DROP TABLE "BlogTag";

-- DropTable
DROP TABLE "Tag";

-- CreateTable
CREATE TABLE "tag" (
    "tagId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("tagId")
);

-- CreateTable
CREATE TABLE "blog_tag" (
    "blogId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "blog_tag_pkey" PRIMARY KEY ("blogId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "tag_name_key" ON "tag"("name");

-- AddForeignKey
ALTER TABLE "blog_tag" ADD CONSTRAINT "blog_tag_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "blogs"("blog_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_tag" ADD CONSTRAINT "blog_tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tag"("tagId") ON DELETE RESTRICT ON UPDATE CASCADE;
