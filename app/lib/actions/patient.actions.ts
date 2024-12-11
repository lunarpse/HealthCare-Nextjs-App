'use server'
import { ID, Query } from "node-appwrite"
import {InputFile} from 'node-appwrite/file'
import { databases, storage, users } from "../appwrite.config"
import { parseStringify } from "../utils"

export const createUser=async({name,email,phone}:CreateUserParams)=>{
    console.log("hereeeeee")
    try {
        const newuser=await users.create(
            ID.unique(),
            email,
            phone,
            undefined,
            name
        )
        console.log(newuser)
        return parseStringify(newuser)
    } catch (error:any) {
        console.log(error)
     if(error && error.status==409){
        const existinguser=await users.list([Query.equal('email',[email])])
        return existinguser.users[0]
     }   
    }

}


// echo "# HealthCare-Nextjs-App" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/lunarpse/HealthCare-Nextjs-App.git
// git push -u origin main
export const getUSer=async(userID:string)=>{
    try {
        const user=await users.get(userID);
        return parseStringify(user)
        
    } catch (error) {
        console.log(error)
    }
}

export const registerpatient=async({identificationDocument,...patient}:RegisterUserParams)=>{
    try {
        let file;
        if(identificationDocument){
            const inputfile=identificationDocument && InputFile.fromBuffer(
                identificationDocument.get('blobFile') as Blob,
                identificationDocument.get('fileName') as string
            )

            file=await storage.createFile(process.env.NEXT_PUBLIC_BUCKET_ID!,ID.unique(),inputfile)
        }

        const newpatient=await databases.createDocument(
            '6756d1e4001a1d6b6a89',
            process.env.PATIENT_COLLECTION_ID!,
            ID.unique(),
            {
                identificationDocumentId:file?.$id ?file.$id:null,
                identificationDocumentUrl:file?.$id?`${ process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${ process.env.NEXT_PUBLIC_BUCKET_ID}/files/${file.$id}/view??project=${process.env.PROJECT_ID}`:null,
                ...patient
            }

        )
        return parseStringify(newpatient)







    } catch (error) {
        console.error("An error occurred while creating a new patient:", error);
    }
}

export const getpatient=async(userId:string)=>{
    try {
        const patient=await databases.listDocuments(
            process.env.DATABSE as string,process.env.PATIENT_COLLECTION_ID as string,
            [
                Query.equal('userId',userId)
            ]
        )
        return parseStringify(patient)

    } catch (error) {
        console.log(`unable to fetch patient`)
    }
}