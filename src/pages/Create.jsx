import React from 'react'
import CreateForm from '../components/CreateForm'
import uuid from 'react-uuid';
import { redirect } from 'react-router-dom';

const Create = () => {
  return (
    <>
    <CreateForm header={"Create your posts now"} btnText={"Create Post"}/>
    </>
  )
}

export default Create

export const action = async({request,params}) =>{
  const data = await request.formData();
  const postData = {
      id: uuid(),
      title: data.get("title"),
      image: data.get("image"),
      date: data.get("date"),
      description: data.get("description"),
  }
  
  const response = await fetch("http://localhost:8080/posts",{
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(postData),
  });
  if (response.status === 422){
    return response;
  }
  if(!response.ok){
   throw new Error("")
  }
    return redirect("/");
  
}
