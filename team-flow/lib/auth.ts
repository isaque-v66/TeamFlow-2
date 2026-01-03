import jwt from "jsonwebtoken";
import { cookies } from "next/headers";



export async function getUserIdFromToken() {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if(!token) {
        throw new Error('Token não encontrado')
    }

    const secret = process.env.JWT_SECRET
    if(!secret) {
        throw new Error("JWT_SECRET não definido")
    }


    const decoded = jwt.verify(token, secret) as {userId: string}

    return decoded.userId
    
}




