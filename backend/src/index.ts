import { Hono } from 'hono'
import {verify } from 'hono/jwt'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';


const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
    JWT_SECRET:string,
    
	},
  Variables : {
		id: string
	}
}>();
app.use('/*',cors());
app.use('/api/v1/blog/*', async (c,next)=>{
 
  const headers=c.req.header('Authorization');
  if(!headers){
    return c.json({
      msg:"User not exists ",
    })
  }
  const token = headers.split(" ")[1];
  try{
       const decoded=await verify(token,c.env.JWT_SECRET);
       if(decoded.id){
        c.set('jwtPayload', decoded.id);
          await next();
       }
       else {
        c.status(401);
        return c.json({error:"unauthorized"});
       }
  }catch(err){
         c.status(403);
         return c.json({});
  }


})
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);





export default app
