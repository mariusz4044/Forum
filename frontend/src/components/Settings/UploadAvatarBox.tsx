"use client";

import { useState } from "react";
import ForumButton from "@/components/Utils/Buttons/ForumButton";
import { toast } from "react-toastify";
import { fetchData } from "@/functions/fetchData";
import { User } from "lucide-react";

export default function () {
  //Preview is base64 image
  const [preview, setPreview] = useState<null | string>(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file && file.size <= 512 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      toast.error("File size is more than 512KB!");
    }
  };

  async function onSave() {
    let res = await fetchData(
      "/api/user/avatar",
      {
        base64: preview,
      },
      "PATCH",
    );

    if (!res.error) window.location.reload();
  }

  return (
    <div className="bg-[#ffffff08] p-8 rounded-xl flex flex-row gap-5 items-center">
      <div className="min-w-20 min-h-20 rounded-full border-dashed border-2 border-[#ffffff1a] bg-[#ffffff08] bor from-pink-400 to-purple-400 flex items-center justify-center text-3xl font-bold text-white overflow-hidden">
        {preview ? (
          <img
            src={preview}
            alt="Avatar Preview"
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <span>
            <User />
          </span>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h4 className="font-bold">Profile avatar</h4>
          <p className="text-sm text-[#ccc] font-light">
            Select a photo that will represent you on the forum. Maximum size:
            512KB
          </p>
        </div>
        <div className="flex gap-3 mt-2 max-sm:flex-col">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="bg-[#ffffff1a]/[0.5] px-4 py-2.5 rounded-md border-1 border-[#ffffff1a] text-sm text-center">
              Select file
            </div>
          </label>
          <ForumButton
            className="p-5 rounded-md w-auto lowercase"
            onClick={onSave}
          >
            <p className="capitalize font-normal">Save changes</p>
          </ForumButton>
        </div>
      </div>
    </div>
  );
}
