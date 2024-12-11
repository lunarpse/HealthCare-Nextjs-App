import * as sdk from 'node-appwrite';
export const {
    PROJECT_ID,
API_SECRET,
DATABSE,
PATIENT_COLLECTION_ID,
DOCTOR_COLLECTION_ID,
APPOINTEMTN_COLLECTION_ID,
NEXT_PUBLIC_BUCKET_ID:BUCKET_ID,
NEXT_PUBLIC_ENDPOINT:ENDPOINT

}=process.env;

const client=new sdk.Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('6756d04500046afd205a').setKey('standard_7027367f2bc0e5b97051e972c88a86dd73f61e4caf0658ddcfcca7db0d12447e6965a2e4b515b8dc16f24db52c68bdbd2659dea8b3515ca74a12bf26090a465d1b46ac42dca5c5130036fa1df672e824bd8cd1d6283ac9d0377d57e0a6c8a58f482b019fe6f8f5a61665dbb3de9d6a5d297d681139ae9244a89cc122b6a8d1c6')



export const databases=new sdk.Databases(client);
export const storage=new sdk.Storage(client);
export const messaging=new sdk.Messaging(client);
export const users=new sdk.Users(client)