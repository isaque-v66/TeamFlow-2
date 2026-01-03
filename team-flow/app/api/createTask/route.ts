import { getUserIdFromToken } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";




const prisma = new PrismaClient()


export async function POST(req: Request) {
    
    try{
        const {title, description, priority, assignedTo, status, deadline} = await req.json()
        const userId = await getUserIdFromToken()

        const response = await prisma.task.create({
            data: {
                title: title,
                description: description,
                priority: priority,
                assignedTo: assignedTo,
                status: status,
                deadline: deadline ? new Date(deadline) : null,
                userId: userId,
    
                
               
            }
        })
        
        
        return NextResponse.json(response)


    } catch (err) {

        console.log(err)
        return NextResponse.json({error: "Erro o servidor"})
    }

}