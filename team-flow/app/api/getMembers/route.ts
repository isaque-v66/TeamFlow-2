import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const members = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
      },
    })

    return NextResponse.json(members)
  } catch (err) {
    return NextResponse.json(
      { error: "Erro ao buscar membros" },
      { status: 500 }
    )
  }
}
