
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signupInput,signinInput } from "@zaidmd080/medium-common";
export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();




userRouter.post('/signup', async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
    const {success}=signupInput.safeParse(await c.req.json());
   
    if(!success){
      c.status(411)
      return c.json({
        msg:"Invalid input"
      })
    }
    const data= await c.req.json();
    const user=await prisma.user.findUnique({
      where:{
        email:data.email,
        password:data.password
      }
    })
    if(user){
     return new Response('user already exists', {
        status: 201,
      })
    }
    else {
      try{
      const user =await prisma.user.create({
        data:{
          email:data.email,
          name:data.name,
          password:data.password
        }
      })
      
       const token= await sign({
           id:user.id,
           name:data.name
       },c.env.JWT_SECRET);
      return  c.json(token)
    }catch(e){
      return c.json({ error: "error while signing up" });
    }
    
    }
  
    
        
  })
  
  userRouter.post('/signin', async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const {success}=signinInput.safeParse(await c.req.json());
    
    if(!success){
      c.status(411)
      return c.json({
        msg:"Invalid input"
      })
    }
     const body=await c.req.json();
     const user= await prisma.user.findUnique({
      where:{
        email:body.email,
        password:body.password,
      }
     })
  
  try{
     if(!user){
      c.status(403)
      return c.json({
        msg:"user not exists",
      })
     }
     else {
      const token=await sign({ id: user.id }, c.env.JWT_SECRET); 
      return c.json(token);
     }
  
  }catch(e){
       return c.json({
        msg:"some internal error try after some time"
       })
  }
  
  })

