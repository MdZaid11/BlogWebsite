import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Blogs = ()=>{

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const {loading,blogs} = useBlogs();
   
  if(loading){
   return <div><Appbar/>
   <div className="flex justify-center">
      <div>
   <BlogSkeleton/>
   <BlogSkeleton/>
   <BlogSkeleton/>
   <BlogSkeleton/>
   <BlogSkeleton/>
   <BlogSkeleton/>
   </div>
   </div>
   </div>
  }
   return <div>
    <Appbar/>
    <div className="pt-2 flex justify-center" >
   <div>
   {blogs.map(blog=><BlogCard authorName={blog.author.name || "Anonymous"}
        id={blog.id}
        title={blog.title}
        content={blog.content}
        publishedDate={"2nd feb 2024"}
        />)}
      
      
    
   </div>
   </div>
   </div> 
}