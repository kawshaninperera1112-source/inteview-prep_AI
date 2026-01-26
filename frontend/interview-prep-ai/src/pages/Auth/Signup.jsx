import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import SpinnerLoader from "../../components/Loader/SpinnerLoader"; // කලින් හදපු loader එක
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axioslnstance"; 
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";

const Signup = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state එකක් එකතු කළා

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    // 1. Frontend validation
    if (!fullName) return setError("Please enter full name.");
    if (!validateEmail(email)) return setError("Please enter a valid email address.");
    if (!password) return setError("Please enter the password.");

    setIsLoading(true);

    try {
      let profileImageUrl = "";

      // 2. Upload profile image (පින්තූරයක් තෝරා තිබේ නම් පමණක්)
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes?.imageUrl || "";
      }

      // 3. Register request
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });

      const token = response.data?.token || response.data?.data?.token;
      const user = response.data?.user || response.data?.data?.user;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-2 bg-zinc-900 text-white rounded-2xl">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white tracking-tight">
          Create an Account
        </h3>
        <p className="text-slate-400 mt-1.5 text-sm font-medium">
          Step up your interview prep game today.
        </p>
      </div>

      <form onSubmit={handleSignUp}>
        <ProfilePhotoSelector
          image={profilePic}
          setImage={setProfilePic}
        />

        <div className="space-y-4 mt-2">
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John Doe"
            type="text"
          />

          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="email"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="********"
            type="password"
          />
        </div>

        {error && (
          <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 py-2.5 px-3 rounded-xl mt-5 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center bg-purple-600 text-white py-3.5 mt-6 rounded-xl font-bold hover:bg-purple-700 transition-all active:scale-[0.98] shadow-lg shadow-purple-900/40 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <SpinnerLoader size="w-4 h-4" color="text-white" />
              <span>CREATING ACCOUNT...</span>
            </div>
          ) : (
            "SIGN UP"
          )}
        </button>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-400 font-medium">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setCurrentPage("login")}
              className="text-purple-400 font-bold hover:text-purple-300 hover:underline transition-colors ml-1"
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;