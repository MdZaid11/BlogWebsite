
import { useEffect, useState } from "react"
import axios from "axios"
import { Backend_Url } from "../config";
export interface Blog {
  id: string;
  title: string;
  content: string;
  author:{
    name:string
  }
}

export const useBlog= ({id}: {id:string}) =>{
  const [loading,setLoading] = useState(true);
  
  const [blog,setBlog]= useState<Blog[]>([]);
  
    useEffect(()=>{
    axios.get(`${Backend_Url}/api/v1/blog/${id}`,{
      headers:{
          Authorization:"Bearer " + localStorage.getItem("token")
      }
    })
               .then(response=>{
              //  console.log(response.data)
                  setBlog(response.data.post);
                  setLoading(false);
               })
    },[id]);
  return {
      loading,
      blog
  } 
}
export const useBlogs = ()=>{
    const [loading,setLoading] = useState(true);
  
    const [blogs,setBlogs]= useState<Blog[]>([]);
    
      useEffect(()=>{
      axios.get(`${Backend_Url}/api/v1/blog/bulk`,{
        headers:{
            Authorization:"Bearer " + localStorage.getItem("token")
        }
      })
                 .then(response=>{
                //  console.log(response.data)
                    setBlogs(response.data.allPosts);
                    setLoading(false);
                 })
      },[]);
    return {
        loading,
        blogs
    }
}