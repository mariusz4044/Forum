"use client";

import { useState } from "react";
import ForumButton from "@/components/Utils/Buttons/ForumButton";
import { toast } from "react-toastify";

export default function () {
  //Preview is base64 image
  const [preview, setPreview] = useState<null | string>(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      toast.error("File size is less than 512KB!");
    }
  };

  const handleSave = () => {};

  return (
    <div className="bg-[#ffffff08] p-8 rounded-xl flex flex-row gap-5 items-center">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-3xl font-bold text-white overflow-hidden">
        {preview ? (
          <img
            src={preview}
            alt="Avatar Preview"
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <span>T</span>
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
        <div className="flex gap-3 mt-2">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="bg-[#ffffff1a]/[0.5] px-4 py-2.5 rounded-md border-1 border-[#ffffff1a] text-sm">
              Select file
            </div>
          </label>
          <ForumButton
            className="p-5 rounded-md w-auto lowercase"
            onClick={handleSave}
          >
            <p className="capitalize font-normal">Save changes</p>
          </ForumButton>
        </div>
      </div>
    </div>
  );
}
