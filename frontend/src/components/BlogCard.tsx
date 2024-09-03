import { Link } from "react-router-dom"
interface BlogCardProps{
    authorName:string
    title:string
    content:string
    publishedDate:string
    id:string
}
export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate,

}:BlogCardProps) =>{
    
       return  <Link to={`/blog/${id}`}>
       <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
           <div className= "flex justify-center flex-col">
          <Avatar name={authorName} size={"small"}/> 
          </div>
          <div className=" flex justify-center flex-col font-extralight pl-2 text-sm">{authorName}</div>
          <span className="pl-1 text-slate-400 flex justify-center flex-col">&#183;</span>
           <div className="pl-2 font-thin text-slate-400 text-sm flex justify-center flex-col">{publishedDate}</div>
        </div>
        <div className="text-xl font-semibold pt-2 ">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0,100) + "..."}
        </div>

        <div className="text-slate-500 text-sm font-thin pt-4">
            {`${Math.ceil(content.length/100)} minutes(s)`}
        </div>
        
       </div>
       </Link>
}

export function  Avatar({name,size="small" } : {name: string,size:"small" | "big"}){
   return <div className={`relative inline-flex items-center justify-center ${size==="big" ? "w-10 h-10" : "w-6 h-6"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
    <span className={` ${size==="small" ? "text-xs" : "text-md"} text-gray-600 dark:text-gray-300`}>{name[0]}</span>
</div>

}