import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config";
import {Fraction} from 'fractional'
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const AJAX  =  async function(url,uploadData = null){

    try {
        const fetchPromise = uploadData?fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify(uploadData),
        }):fetch(url);
        const response=  await Promise.race([fetchPromise,timeout(TIMEOUT_SEC)]);
        const data  = await response.json() ; 
        if(!response.ok) throw new Error(data.message);
        return data ;

    } catch (err) {
        throw err ;
    }
}

// export const getJson = async function(url){

//     try {
//         const response=  await Promise.race([fetch(url),timeout(TIMEOUT_SEC)]);
//         const data  = await response.json() ; 
//         if(!response.ok) throw new Error(data.message);
//         return data ;

//     } catch (err) {
//         throw err ;
//     }
// }

// export const sendJson = async function(url,uploadData){


//     try {
//         const fetchPromise = fetch(url,{
//             method:'POST',
//             headers:{
//                 'Content-Type':"application/json"
//             },
//             body:JSON.stringify(uploadData),
//         })
//         const response=  await Promise.race([fetchPromise,timeout(TIMEOUT_SEC)]);
//         const data  = await response.json() ; 
//         if(!response.ok) throw new Error(data.message);
//         return data ;

//     } catch (err) {
//         throw err ;
//     }
// }