export const BlogSkeleton = ()=>{
    return <div role="status" className="animate-pulse">
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
           <div className= "flex justify-center flex-col">
           <div className="h-4 w-4 bg-gray-200 rounded-full  w-48 mb-4"></div>
          </div>
          <div className="ml-4 mt-1 h-2.5 bg-gray-200 rounded-full  w-40 mb-4"></div>
          <span className="pl-1 text-slate-400 flex justify-center flex-col">
          <div className="h-2.5 bg-gray-200 rounded-full  mb-4"></div>
          </span>
           <div className="pl-4 font-thin text-slate-400 text-sm flex justify-center flex-col">
           <div className="h-2 bg-gray-200 "></div>
           </div>
        </div>
        <div className="text-xl font-semibold pt-2 ">
        <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        </div>
        <div className="text-md font-thin">
        <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        </div>

        <div className="text-slate-500 text-sm font-thin pt-4">
        <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        </div>
        
       </div>
      
        <span className="sr-only">Loading...</span>
    </div>
    
    
}