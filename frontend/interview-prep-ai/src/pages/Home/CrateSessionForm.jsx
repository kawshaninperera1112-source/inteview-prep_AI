import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utils/axioslnstance"; 
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";

const CreateSessionForm = ({ onSuccess, onClose }) => {
    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        topicsToFocus: "",
        description: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const isSubmittingRef = useRef(false);

    const labelStyle = "text-[10px] font-bold text-purple-400/80 uppercase tracking-[0.2em] mb-2 block ml-1";

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        if (error) setError(null); // User type කරද්දී error එක අයින් කරන්න
    };
// ... ඉහත code එක එලෙසම තබා handleCreateSession කොටස පමණක් මෙසේ වෙනස් කරන්න

const handleCreateSession = async (e) => {
    e.preventDefault();
    if (isLoading || isSubmittingRef.current) return;

    const { role, experience, topicsToFocus } = formData;
    if (!role || !experience || !topicsToFocus) {
        setError("All essential fields (*) are required.");
        return;
    }

    setIsLoading(true);
    isSubmittingRef.current = true;
    const toastId = toast.loading("AI is curating your interview questions...");

    try {
        // 1️⃣ Generate Questions via AI
        const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
            role,
            experience,
            topicsToFocus,
            numberOfQuestions: 6,
        });

        // ✅ Backend එකෙන් එන structure එකට අනුව දත්ත ගැනීම
        const generatedQuestions = aiResponse.data?.questions || (Array.isArray(aiResponse.data) ? aiResponse.data : []);

        if (!generatedQuestions || generatedQuestions.length === 0) {
            throw new Error("AI failed to generate questions. Please try again.");
        }

        // 2️⃣ Save Session to DB
        const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
            ...formData,
            questions: generatedQuestions, // AI එකෙන් ආපු ප්‍රශ්න මෙතනට යනවා
        });

        if (response.data) {
            toast.success("Interview session generated!", { id: toastId });
            const sessionId = response.data?._id;
            if (onSuccess) onSuccess();
            if (onClose) onClose();
            if (sessionId) navigate(`/interview-prep/${sessionId}`);
        }
    } catch (err) {
        const errMsg = err.response?.data?.message || err.message || "Failed to start session.";
        setError(errMsg);
        toast.error(errMsg, { id: toastId });
    } finally {
        setIsLoading(false);
        isSubmittingRef.current = false;
    }
};
    
    return (
        <div className="bg-zinc-950 p-1">
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                    Custom <span className="text-purple-500">Interview</span> Prep
                </h3>
                <p className="text-zinc-500 text-sm mt-1">
                    Enter your details to generate personalized AI questions.
                </p>
            </div>

            <form onSubmit={handleCreateSession} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelStyle}>Target Role *</label>
                        <Input
                            value={formData.role}
                            onChange={({ target }) => handleChange("role", target.value)}
                            placeholder="e.g. Backend Engineer"
                        />
                    </div>
                    <div>
                        <label className={labelStyle}>Years of Exp *</label>
                        <Input
                            value={formData.experience}
                            onChange={({ target }) => handleChange("experience", target.value)}
                            placeholder="e.g. 3"
                            type="number"
                        />
                    </div>
                </div>

                <div>
                    <label className={labelStyle}>Skills / Topics to focus *</label>
                    <Input
                        value={formData.topicsToFocus}
                        onChange={({ target }) => handleChange("topicsToFocus", target.value)}
                        placeholder="e.g. Node.js, Redis, Microservices"
                    />
                </div>

                <div>
                    <label className={labelStyle}>Additional Context</label>
                    <textarea
                        value={formData.description}
                        onChange={({ target }) => handleChange("description", target.value)}
                        placeholder="e.g. Focus on architectural patterns and scaling..."
                        className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all resize-none min-h-[100px]"
                    />
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl animate-shake">
                        <p className="text-red-400 text-[11px] text-center font-semibold uppercase tracking-wider">
                            {error}
                        </p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-white text-black hover:bg-purple-500 hover:text-white font-bold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                >
                    {isLoading ? (
                        <SpinnerLoader size="w-5 h-5" color="text-black" />
                    ) : (
                        <>
                            <span>START PREPARATION</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default CreateSessionForm;