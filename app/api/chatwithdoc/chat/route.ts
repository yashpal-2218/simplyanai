import { getIp, hashIp } from "@/helpers";
import { createEmbeddings, fetchFromVectorDB, getModelResponse } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { query, fileName } = data;

  // if ip is null, return ""
  const forwardedFor = req.headers.get("x-forwarded-for") || "";
  const ip = getIp(forwardedFor);
  const hashedIp = hashIp(ip);

  try {
    const embeddings = await createEmbeddings(query);
    const fetchRecords = await fetchFromVectorDB(
      embeddings,
      hashedIp,
      fileName
    );

    const answer = await getModelResponse(fetchRecords, query);

    return NextResponse.json(
      {
        answer: answer,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occured in Chat", error);
    return NextResponse.json(
      {
        answer: "Sorry, an unexpected error has occured. Please resend",
      },
      { status: 203 }
    );
  }
}
