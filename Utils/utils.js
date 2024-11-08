import jsonData from '../Utils/userData.json'
import fs from 'fs'
import { test, request } from "@playwright/test";
import dotenv from 'dotenv';
dotenv.config();

const generateRandomId=(min,max)=>{
    let randomId= Math.random()*(max-min)+min
    return parseInt(randomId)
}

const getNewEmail = ()=>{
    
    const newCount = 500  + jsonData.length +1;
    const newEmail = "Shouvik9292+"+ newCount +"@gmail.com";
    return newEmail;
}

async function fetchID() {
    const api = await request.newContext({
      baseURL: 'https://gmail.googleapis.com',
      extraHTTPHeaders: {
        "Accept" : "*/*",
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${process.env.google_access_token}`,
      }
    });
  
    const response = await api.get("/gmail/v1/users/me/messages");
    //const data = response.ok() ? await response.json() : null;
    const data = await response.json();
  
    const emailID = data.messages[0].id;
  
    return emailID;
  }
  
  async function fetchEmail() {
    
    const emailId = await fetchID();
   console.log(typeof(emailId));
    const api = await request.newContext({
      baseURL: 'https://gmail.googleapis.com',
      extraHTTPHeaders: {
        "Accept" : "*/*",
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${process.env.google_access_token}`
      }
    });
  
    const response = await api.get("/gmail/v1/users/me/messages/"+ emailId);
    //const data = response.ok() ? await response.json() : null;
  
  
    const resJson = await  response.json();
    const latestEmail = resJson.snippet
    return latestEmail;
  }
  


export { generateRandomId, getNewEmail ,fetchEmail  };
