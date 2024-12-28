import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import {
  chunkText,
  createEmbeddings,
  readFileContent,
  storeToVectorDB,
} from "@/utils";
import {
  checkIfFileExists,
  getIp,
  hashIp,
  supportedFileFormat,
} from "@/helpers";

export const POST = async (req: NextRequest) => {
  const res = NextResponse;

  const formData = await req.formData();
  const file = formData.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json(
      { success: false, error: "No files received." },
      { status: 400 }
    );
  }

  const fileName = file.name.replaceAll(" ", "_");
  const supportedType = supportedFileFormat(fileName);
  if (!supportedType) {
    return res.json(
      {
        success: false,
        error: "Upload a supported file",
      },
      { status: 200 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const isProduction = process.env.NODE_ENV === "production";
  const pathName = isProduction
    ? "/tmp"
    : path.join(process.cwd(), "public/tmp");

  const dirPath = path.join(pathName);

  // directory to save file
  const dirExists = await checkIfFileExists(dirPath);
  if (!dirExists) {
    await fs.mkdir(dirPath, { recursive: true });
  }

  try {
    const filePath = path.join(dirPath, fileName);
    await fs.writeFile(filePath, buffer);

    // read file content
    const fileData = await readFileContent(filePath, fileName);

    if (!fileData) {
      return res.json(
        { success: false, error: "Can't read file content" },
        { status: 201 }
      );
    }

    // if ip is null, return ""
    const forwardedFor = req.headers.get("x-forwarded-for") || "";
    const ip = getIp(forwardedFor);
    const hashedIp = hashIp(ip);

    // array of tokenized text
    const chunks = chunkText(fileData, 500);
    for (let i = 0; i < chunks.length; i++) {
      const embeddings = await createEmbeddings(fileData);

      await storeToVectorDB(embeddings, fileData, fileName, hashedIp, i + 1);
    }

    // remove redundant file
    const fileExists = await checkIfFileExists(filePath);
    if (fileExists) {
      await fs.unlink(filePath);
    }

    return res.json(
      { success: true, Message: "File Uploaded Successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error occured in File Upload ", error);
    return res.json(
      { success: false, error: "File Upload Failed" },
      { status: 500 }
    );
  }
};
