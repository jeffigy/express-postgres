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
