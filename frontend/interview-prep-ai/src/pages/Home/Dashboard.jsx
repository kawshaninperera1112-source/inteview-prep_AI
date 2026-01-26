import React, { useEffect, useState, useCallback } from 'react';
import { LuPlus } from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import toast from "react-hot-toast";
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axioslnstance'; 
import { API_PATHS } from '../../utils/apiPaths';
import SummaryCard from '../../components/Cards/SummaryCard';
import moment from 'moment';
import Modal from '../../components/modal';
import CreateSessionForm from './CrateSessionForm'; 
import DeleteAlertContent from '../../components/DeleteAlertContent';

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ 1. ReferenceError එක ඉවත් කිරීමට State එක හඳුන්වා දීම
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      
      const data = Array.isArray(response.data) 
        ? response.data 
        : response.data.sessions || [];

      setSessions(data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      toast.error("Failed to load sessions");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllSessions();
  }, [fetchAllSessions]);

  // ✅ 2. Delete function එකේ අකුරු වැරදි නිවැරදි කිරීම (sessionData සහ setOpenDeleteAlert)
  const handleDeleteSession = async (sessionData) => {
    try {
      // sessionData object එකක් නම් එහි ID එක ලබා ගැනීම
      const sessionId = typeof sessionData === 'string' ? sessionData : sessionData?._id;
      
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionId));
      toast.success("Session deleted successfully");
      
      // Modal එක වසා දැමීම
      setOpenDeleteAlert({
        open: false,
        data: null,
      });
      
      fetchAllSessions(); // List එක refresh කිරීම
    } catch (error) {
      console.error("Failed to delete session", error);
      toast.error("Failed to delete session");
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#050505] text-white">
        
        {/* Header Section */}
        <div className="flex items-center justify-between p-8 border-b border-white/5 bg-zinc-950/20 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              My <span className="text-purple-500">Sessions</span>
            </h1>
            <p className="text-zinc-500 text-sm mt-1">
              {sessions.length} sessions generated so far.
            </p>
          </div>

          <button
            className="flex items-center gap-2 bg-white text-black hover:bg-purple-500 hover:text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 shadow-xl active:scale-95 cursor-pointer"
            onClick={() => setOpenCreateModal(true)}
          >
            <LuPlus size={20} />
            <span>New Prep</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {isLoading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-50">
                {[1, 2, 3].map(i => <div key={i} className="h-48 bg-zinc-900 animate-pulse rounded-3xl" />)}
             </div>
          ) : sessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map((data, index) => (
                <SummaryCard
                  key={data._id}
                  colors={CARD_BG[index % CARD_BG.length]}
                  role={data.role}
                  topicsToFocus={data.topicsToFocus}
                  experience={data.experience}
                  questions={data.questions?.length || 0}
                  description={data.description}
                  lastUpdated={moment(data.updatedAt).fromNow()} 
                  onSelect={() => navigate(`/interview-prep/${data._id}`)}
                  // ✅ Delete ක්ලික් කළ විට කෙලින්ම delete නොකර Modal එක පෙන්වීම
                  onDelete={() => setOpenDeleteAlert({ open: true, data: data })}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 px-6 border-2 border-dashed border-white/5 rounded-[3rem] bg-zinc-900/10">
              <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mb-6">
                <LuPlus className="text-3xl text-purple-500 " />
              </div>
              <h3 className="text-xl font-bold">No sessions yet</h3>
              <p className="text-zinc-500 text-center max-w-sm mt-2 leading-relaxed">
                You haven't created any AI interview sessions. Start by clicking the "New Prep" button.
              </p>
              <button 
                onClick={() => setOpenCreateModal(true)}
                className="mt-8 text-purple-400 font-bold hover:text-purple-300 underline underline-offset-8 cursor-pointer"
              >
                Create your first session
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create Session Modal */}
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <CreateSessionForm 
          onSuccess={() => {
            setOpenCreateModal(false);
            fetchAllSessions(); 
          }} 
          onClose={() => setOpenCreateModal(false)}
        />
      </Modal>

      {/* ✅ 3. Delete Alert Modal - මෙහි අකුරු නිවැරදි කර ඇත */}
      <Modal 
        isOpen={openDeleteAlert.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Delete Alert"
      >
        <div className="w-[30vw]">
          <DeleteAlertContent
            content="Are you sure you want to delete this session detail?"
            onDelete={() => handleDeleteSession(openDeleteAlert.data)}
          />
        </div>
      </Modal>

    </DashboardLayout>
  );
};

export default Dashboard;