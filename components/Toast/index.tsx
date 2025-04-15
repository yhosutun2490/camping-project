"use client"
import { Toaster }  from 'react-hot-toast';

export default function Toast() {
    return <Toaster toastOptions={{ duration: 1000 }}/>
}