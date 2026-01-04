import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient()



export async function DELETE(req: Request) {

    try {
        const {id} = await req.json()

        if(!id){
            return NextResponse.json({success: false, message: "Id não informado para exclusão"},{status: 400})
        }

        await prisma.task.delete({
            where: {
                id: id
 }
        })

        return NextResponse.json({success: true, message: "tarefa deletada com sucesso"}, {status: 200})


    } catch(err) {
        return NextResponse.json({success: false, message: "Erro ao excluir tarefa"}, {status: 200})

    }



}