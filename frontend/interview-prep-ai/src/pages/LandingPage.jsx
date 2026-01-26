import React, { useContext, useState } from 'react';
import Hero_img from "../assets/Hero.png";
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from 'react-router-dom';

import Modal from "../components/modal"; 
import Login from "./Auth/Login";
import SignUp from "./Auth/Signup";
import { UserContext } from '../context/UserContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';

const LandingPage = () => {
    const {user}= useContext(UserContext);

    const navigate = useNavigate();
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [currentPage, setCurrentPage] = useState("dashboard"); 

    const handleCTA = () => {
       if(!user){
        setOpenAuthModal(true);

       }else{
        navigate("/dashboard");
       } 
    };

    return (
        /* Changed bg-white to bg-black and text-slate-900 to text-white */
        <div className='w-full min-h-screen bg-black text-white font-display'> 
            
            {/* Navbar: Changed bg-white/80 to bg-black/80 and border color */}
            <header className="flex justify-between items-center px-8 py-6 bg-black/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/10"> 
                <div className="text-2xl font-bold tracking-tight text-purple-500">
                    Interview<span className="text-white">Prep AI</span>
                </div>
                <div className="flex gap-6 items-center">
               {user ? (
  <ProfileInfoCard />
) : (
  <> {/* Fragment wrapper allows returning multiple adjacent elements */}
    <button 
      className="text-sm font-semibold hover:text-purple-400 cursor-pointer transition-colors"
      onClick={() => {
        setCurrentPage("login");
        setOpenAuthModal(true);
      }}
    >
      Sign In
    </button>
    
    <button 
      className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-medium hover:bg-purple-500 hover:text-white transition-all shadow-md active:scale-95 cursor-pointer"
      onClick={() => {
        setCurrentPage("signup");
        setOpenAuthModal(true);
      }}
    >
      Join Now
    </button>
  </>
)}
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 pt-16 pb-24">
                {/* Hero Section */}
                <div className="flex flex-col items-center text-center">
                    {/* Changed badge colors to Purple/Black */}
                    <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-m font-medium mb-8">
                        ✨ Next-Gen AI Interview Coach
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8">
                        Master Your Next Interview <br />
                        <span className="text-purple-500">With Confidence</span>
                    </h1>
                    
                    <p className="max-w-2xl text-lg text-slate-400 mb-10">
                        Personalized AI-driven mock interviews. Get role-specific feedback, 
                        improve your answers, and land your dream job.
                    </p>

                    {/* CTA Button: Blue-600 to Purple-600 */}
                    <button 
                        className="px-8 py-4 bg-purple-600 text-white rounded-xl font-bold text-lg hover:bg-purple-700 transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)]" 
                        onClick={handleCTA}
                    >
                        Get Started 
                    </button>

                    {/* Hero Image Container: Adjusted border and shadow */}
                    <div className="relative w-full max-w-5xl mt-16 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(147,51,234,0.1)] border border-white/10">
                        <img src={Hero_img} alt="Hero" className="w-full h-auto" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>
                </div>

                {/* Features Section */}
                <section className="mt-32">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {APP_FEATURES.map((item) => (
                            /* Card: Changed bg to a dark slate/black and border to subtle white */
                            <div key={item.id} className="p-8 bg-zinc-900/50 border border-white/5 rounded-3xl hover:border-purple-500/50 hover:bg-zinc-900 transition-all group">
                                <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">{item.title}</h3>
                                <p className="text-slate-400">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Auth Modal: You might need to update the Modal component itself to match the dark theme */}
            <Modal
                isOpen={openAuthModal}
                onClose={() => {
                    setOpenAuthModal(false);
                    setCurrentPage("login");
                }}
            >
                <div className="p-4 bg-zinc-900 text-white rounded-lg">
                    {currentPage === "login" ? (
                        <Login setCurrentPage={setCurrentPage} />
                    ) : (
                        <SignUp setCurrentPage={setCurrentPage} />
                    )}
                </div>
            </Modal>

            <footer className="py-10 text-center border-t border-white/5">
                <p className="text-slate-500 text-sm">Made with 💜 ...Happy Coding</p>
            </footer>
        </div>
    ); 
};

export default LandingPage;