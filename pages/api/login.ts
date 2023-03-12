import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import bcrypt from 'bcrypt';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST'){
        return res.status(405).end()
    }

    try {
        const user = await prismadb.user.findUnique({
            where: {
                email: req.body.email
            }
        })

        if(!user){
            return res.status(405).json({error: "User not found"})
        }
        
        const hashedPassword = await bcrypt.compare(req.body.password, user.hashedPassword)
    
        if(!hashedPassword){
            return res.status(405).json({ error: "Password does not match" })
        }

        return res.status(200).json(user)
    } catch (err) {
        console.log(err) 
    }
}