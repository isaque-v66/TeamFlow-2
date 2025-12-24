import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { success } from "zod";
import bcrypt from "bcryptjs";






const prisma = new PrismaClient()



export async function POST(req: Request) {

    try{
        const {email, password} = await req.json()

        const user = await prisma.user.findUnique({
            where: {email: email}
        })


        if(!user){
            return (
                NextResponse.json({success: false, error: "Usuário não encontrado"}, {status: 404})
            )
        }


        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return NextResponse.json({success: false, error: "Senha incorreta"}, {status: 401})
        }

       // emove a senha (hash) do objeto antes de retornar por segurança
        const { password: _, ...userWithoutPassword } = user;


        return NextResponse.json({success: true, user: userWithoutPassword})
         
    } catch(err){

         console.error('Erro no servidor de login:', err);
        return NextResponse.json(
        { success: false, error: "Erro interno do servidor" },
        { status: 500 })

    }

}