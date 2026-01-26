import React, { useEffect, useState, useCallback } from 'react'; // useCallback එකතු කළා
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from 'react-icons/lu';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import { toast } from "react-hot-toast";
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import RoleInfoHeader from './Components/RoleInfoHeader';
import axiosInstance from '../../utils/axioslnstance';
import { API_PATHS } from '../../utils/apiPaths';
import QuestionCard from '../../components/Cards/QuestionCard';
import AIResponsePreview from './Components/AIResponsePriview';
import Drawer from '../../components/Drawer';
import SkeletonLoader from '../../components/Loader/SkeletonLoader';

const InterviewPrep = () => {
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  const fetchSessionDetailsById = useCallback(async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to load session details");
    }
  }, [sessionId]);

  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLeanMoreDrawer(true);

      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, { question });

      if (response.data && response.data.explanation) {
        // Backend එකෙන් explanation object එකක් එවන නිසා එය කෙලින්ම set කරන්න
        setExplanation(response.data.explanation);
      }
    } catch (error) {
      setErrorMsg("Failed to generate explanation, try again later");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

 // InterviewPrep.jsx ඇතුළත
const toggleQuestionPinStatus = async (questionId) => {
  try {
    // ✅ POST වෙනුවට PATCH භාවිතා කරන්න (Backend එකේ තියෙන්නේ PATCH නිසා)
    const response = await axiosInstance.patch(API_PATHS.QUESTION.PIN(questionId));

    if (response.data) {
      const isPinned = response.data.question.isPinned;
      toast.success(isPinned ? "Question Pinned!" : "Question Unpinned!");
      fetchSessionDetailsById();
    }
  } catch (error) {
    console.error("Pin error:", error);
    toast.error("Failed to update pin status");
  }
};

 const uploadMoreQuestions = async () => {
  try {
    setIsUpdateLoader(true);

    // 1. AI එකෙන් ප්‍රශ්න ජනනය කරගන්න
    const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
      role: sessionData?.role,
      experience: sessionData?.experience,
      topicsToFocus: sessionData?.topicsToFocus,
      numberOfQuestions: 10,
    });

    // AI එකෙන් එන්නේ { questions: [...] } වැනි object එකක් නම්:
    const newQuestions = aiResponse.data.questions || aiResponse.data;

    // 2. ජනනය වූ ප්‍රශ්න DB එකට යැවීම
    const response = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
      sessionId,
      questions: newQuestions, // ✅ Array එකක් ලෙස යැවිය යුතුයි
    });

    if (response.data) {
      toast.success("New Questions Added!");
      fetchSessionDetailsById(); // UI එක refresh කිරීමට
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to add questions");
  } finally {
    setIsUpdateLoader(false);
  }
};

  useEffect(() => {
    fetchSessionDetailsById();
  }, [fetchSessionDetailsById]);

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || ""}
        // ✅ 'question' නෙවෙයි 'questions' විය යුතුයි
        question={sessionData?.questions?.length || 0}
        description={sessionData?.description || ""}
        lastUpdated={sessionData?.updatedAt ? moment(sessionData.updatedAt).format("Do MMM YYYY") : ""}
      />

      <div className="mt-12 mb-20">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-10 w-1.5 bg-purple-600 rounded-full shadow-[0_0_15px_rgba(147,51,234,0.5)]"></div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Interview <span className="text-purple-500">Q & A</span>
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent ml-4"></div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className={`col-span-12 transition-all duration-500 ease-in-out ${openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"}`}>
            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {sessionData?.questions?.map((data, index) => (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative group"
                    layout
                  >
                    <QuestionCard
                      question={data?.question}
                      answer={data?.answer}
                      onLearnMore={() => generateConceptExplanation(data.question)}
                      isPinned={data?.isPinned}
                      onTogglePin={() => toggleQuestionPinStatus(data._id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* ✅ Load More Button එක map එකෙන් පිටතට ගත්තා */}
              <div className="flex justify-center mt-12">
                <button
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-purple-600/10 text-purple-400 border border-purple-500/20 font-medium hover:bg-purple-600 hover:text-white transition-all group disabled:opacity-50"
                  disabled={isUpdateLoader}
                  onClick={uploadMoreQuestions}
                >
                  {isUpdateLoader ? <SpinnerLoader /> : <LuListCollapse className="text-lg" />}
                  <span>Load More Questions</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <Drawer
          isOpen={openLeanMoreDrawer}
          onClose={() => setOpenLeanMoreDrawer(false)}
          // ✅ Loading නැති වෙලාවට විතරක් title පෙන්වන්න
          title={!isLoading ? explanation?.title : "Generating..."}
        >
          {errorMsg && (
            <p className="flex gap-2 text-red-400">
              <LuCircleAlert className='mt-1' /> {errorMsg}
            </p>
          )}

          {isLoading && <SkeletonLoader />}

          {/* ✅ Loading ඉවර වූ පසු (isLoading false) explanation පෙන්වන්න */}
          {!isLoading && explanation && (
            <AIResponsePreview content={explanation?.explanation} />
          )}
        </Drawer>
      </div>
    </DashboardLayout>
  );
}

export default InterviewPrep;