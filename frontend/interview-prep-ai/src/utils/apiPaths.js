export const BASE_URL = "http://localhost:8000/api"; 

export const API_PATHS = {
    AUTH: {
        REGISTER: "/auth/register",
        LOGIN: "/auth/login",
        GET_PROFILE: "/auth/profile",
    },
    IMAGE: {
        UPLOAD_IMAGE: "/upload",
    },
    AI: {
        GENERATE_QUESTIONS: "/ai/generate-questions",
        GENERATE_EXPLANATION: "/ai/generate-explanation",
    },
    SESSION: {
        CREATE: "/sessions/create",
        GET_ALL: "/sessions/my-sessions",
        GET_ONE: (id) => `/sessions/${id}`,
        DELETE: (id) => `/sessions/${id}`,
    },
    // ✅ මේ කොටස අලුතින් එකතු කරන්න
    QUESTION: {
    // ❌ වැරදි නම්: "/questions/add-to-session"
    // ✅ නිවැරදි නම්: "/questions/add" (Backend එකේ /add නිසා)
    ADD_TO_SESSION: "/questions/add-to-session", 
    PIN: (id) => `/questions/${id}/pin`,
},
};