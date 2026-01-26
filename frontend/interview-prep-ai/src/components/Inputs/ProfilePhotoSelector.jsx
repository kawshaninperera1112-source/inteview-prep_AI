import React, { useRef, useState, useEffect } from 'react';
import { LuCamera, LuUser, LuX } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Memory leak වැළැක්වීමට clean up function එකක්
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // පරණ URL එක memory එකෙන් අයින් කරන්න
            if (previewUrl) URL.revokeObjectURL(previewUrl);

            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = (e) => {
        e.stopPropagation(); // Image එක උඩ click වීම වැළැක්වීමට
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
        <div className="flex flex-col items-center justify-center mb-6">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            {!previewUrl ? (
                /* Empty State */
                <button
                    type="button"
                    className="w-24 h-24 flex flex-col items-center justify-center gap-2 rounded-full bg-zinc-900 border-2 border-dashed border-purple-500/30 text-purple-400 hover:border-purple-500/60 hover:bg-purple-500/5 transition-all duration-300"
                    onClick={onChooseFile}
                >
                    <div className="bg-purple-500/10 p-2 rounded-full">
                        <LuUser size={28} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider">Add Photo</span>
                </button>
            ) : (
                /* Preview State */
                <div className="relative group cursor-pointer" onClick={onChooseFile}>
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500 shadow-lg shadow-purple-500/20">
                        <img
                            src={previewUrl}
                            alt="Profile Preview"
                            className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                        />
                        {/* Hover එකකදී පෙන්වන overlay එක */}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <LuCamera className="text-white" size={20} />
                        </div>
                    </div>
                    
                    {/* Remove Button */}
                    <button
                        type="button"
                        className="absolute -top-1 -right-1 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-all shadow-md z-10"
                        onClick={handleRemoveImage}
                        title="Remove Image"
                    >
                        <LuX size={14} strokeWidth={3} />
                    </button>
                </div>
            )}
            
            <p className="mt-3 text-[11px] text-slate-500 font-medium">
                {previewUrl ? "Click image to change" : "JPG, PNG or WebP"}
            </p>
        </div>
    );
};

export default ProfilePhotoSelector;