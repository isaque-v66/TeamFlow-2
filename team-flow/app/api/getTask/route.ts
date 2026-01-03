import { getUserIdFromToken } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";



const prisma = new PrismaClient()

export async function GET() {

  try{

    const userId = await getUserIdFromToken()

    const tasks = await prisma.task.findMany({
        where: {userId},
        orderBy: {createdAt: 'desc'}
    })

    return NextResponse.json(tasks)


  } catch(err){
    return NextResponse.json({error: "Erro na API getTasks"})
  }

}