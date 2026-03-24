import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey:            "AIzaSyCmOZk5eTBNvbDyGg0CdDplLkAMmkPaxOo",
  authDomain:        "my-shop-70417.firebaseapp.com",
  projectId:         "my-shop-70417",
  storageBucket:     "my-shop-70417.firebasestorage.app",
  messagingSenderId: "831688982536",
  appId:             "1:831688982536:web:8f5d5c95cb9830d37ed1bd"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)  