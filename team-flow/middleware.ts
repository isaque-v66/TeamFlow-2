import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";




export function middleware (req: NextRequest) {

   const token = req.cookies.get("auth-token")?.value

   if(!token) {
    return NextResponse.redirect(new URL("/login", req.url))
   }


   try {

    jwt.verify(token, process.env.JWT_SECRET!)

    return NextResponse.next()


   } catch(err) {

    return NextResponse.redirect(new URL("/login", req.url))

   }

}




export const config = {
    matcher: [
        "/dashboard/:path",
        "/api/createTask",
        "/api/tasks/:path"
    ]
}