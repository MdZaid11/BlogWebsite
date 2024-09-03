import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog =({blog} : {blog:Blog})=>{
  console.log(blog)
    return <div>
     <Appbar/>   
     <div className="flex justify-center">
    <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
        <div className=" col-span-8">
            <div className="text-5xl font-extrabold">
                {blog.title}
            </div>
           <div className="text-slate-500 pt-2">
            Post on 2nd December 2023
           </div>
            <div className="pt-4">
             {blog.content}
            </div>
        </div>
        <div className="col-span-4">
            <div className="text-slate-600 text-lg">
            Author
            </div>
            <div className="flex">
                <div className="pr-4 flex flex-col justify-center">
                <Avatar size="big" name={blog.author.name}/></div>
                <div>
            <div className="text-xl font-bold">{blog.author.name}

           </div>
             <div className="pt-2 text-slate-500">
                 A sharp-witted storyteller, I blend intelligence and humor in my writing, making complex ideas accessible and entertaining. My work invites readers to think deeply while enjoying a good laugh.
            </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
}