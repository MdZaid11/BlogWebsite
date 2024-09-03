
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { createPostInput, updatePostInput} from "@zaidmd080/medium-common";


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

blogRouter.post('/', async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const {success}=createPostInput.safeParse(await c.req.json());
   
    if(!success){
      c.status(411)
      return c.json({
        msg:"Invalid input"
      })
    }
    const userId=c.get('jwtPayload');
    const body=await c.req.json();
    try{
    const userBlog=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:userId
        }

    })

    c.status(200);
    return c.json({
        id:userBlog.id,
        msg:"Blog successfully created thankss"
    })
}catch(err){
    c.status(404);
    return c.json({
        msg:"something error occured while creating blog pls try again"
    })
}
   
  })
  
  blogRouter.put('/',async (c)=>{
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const {success}=updatePostInput.safeParse(await c.req.json());
    console.log(success);
    if(!success){
      c.status(411)
      return c.json({
        msg:"Invalid input"
      })
    }
    
    const body=await c.req.json();
    const userId=c.get('jwtPayload');
    try{
        const updatedData=await prisma.post.updateMany({
            where:{
                id:body.id,
                authorId: userId
            },
            data:{
             title:body.title,
             content:body.content,
            }
        })
        return c.json({
            msg:"Blog updated successfully "
        })
    }catch(err){
        c.status(404);
        return c.json({
            msg:"something error occured while updating blog pls try again"
        })
    }
  })
  blogRouter.get('/bulk', async (c) =>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    const allPosts=await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true,
                    email:true
                    
                }
            }
        }
    })
    return c.json({allPosts});
  })
  blogRouter.get('/:id', async (c)=>{
    const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.post.findUnique({
		where: {
			id
		},
       select:{
        id:true,
        title:true,
        content:true,
        author:{
            select:{ name:true,}
           
        }
       }
	});

	return c.json({post});
  })

  blogRouter.delete('/', async (c)=>{
 
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    const userid=c.get('jwtPayload');
    const body= await c.req.json();
    try{
   const deletedBlog=await prisma.post.delete({
    where:{
        id:body.id,
        authorId:userid
    }
   })
   return c.json({
    msg:"deleted successsfully......",
})
}catch(err){
    return c.json({
        msg:"some error while deleting the blog"
    })
}

  })
 
  
  
  
  