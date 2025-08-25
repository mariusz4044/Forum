import {useEffect, useState} from "react";
import Image from "next/image";
import {LoaderIcon} from "lucide-react";

export function Captcha() {
    const [captchaBase64, setCaptchaBase64] = useState<string>("")

    async function getCaptcha() {
        const res = await fetch(`${process.env.SERVER_URL}/api/captcha`,{
            method: "GET",
            credentials: "include"
        })

        const captcha: string = await res.text()
        setCaptchaBase64(captcha)
    }

    useEffect(()=>{
        getCaptcha()
    },[])

    if(!captchaBase64){
        return <div className="w-full form-input h-24 flex items-center justify-center">
           <LoaderIcon  className="opacity-40 spinner"/>
        </div>
    }

    return <div className="w-full form-input h-24 relative">
        <Image src={captchaBase64} alt="Captcha" fill  />
    </div>
}