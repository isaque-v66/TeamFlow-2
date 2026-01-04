import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs" 
import { success } from "zod"

const prisma = new PrismaClient()
const saltRounds = 10

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

   
    const existingUser = await prisma.user.findUnique({
      where: { email: email }
    })

    if(existingUser) {
      return NextResponse.json(
        { success: false, error: "Usuário já existe" }, 
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds)

   
    const newUser = await prisma.user.create({ 
      data: {
        email,
        password: hashedPassword
      }
    })

    // Remover o hash da resposta por segurança
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json(
      { 
        success: true, 
        message: "Usuário criado com sucesso",
        user: userWithoutPassword 
      }, 
      { status: 201 }
    )
    
  } catch (err) {
    console.error("Erro no cadastro:", err)
    return NextResponse.json(
      { 
        success: false, 
        error: "Erro interno do servidor" 
      }, 
      { status: 500 }
    )
  }
}

















