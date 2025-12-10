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
    
    const newCount = generateRandomId(100000,99999999);
    const newEmail = "Shouvik9292+"+ newCount +"@gmail.com";
    return newEmail;
}



  async function fetchID() {
  const api = await request.newContext();

  const response = await api.get(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages",
    {
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.google_access_token}`,
      }
    }
  );
  const data = await response.json();
  const emailID = data.messages[0].id;

  return emailID;
}

  



  async function fetchEmail() {
  const emailId = await fetchID();

  const api = await request.newContext();

  const response = await api.get(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages/" + emailId,
    {
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.google_access_token}`,
      }
    }
  );
  const resJson = await response.json();
  const latestEmail = resJson.snippet;

  return latestEmail;
}

  


export { generateRandomId, getNewEmail ,fetchEmail  };
