import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Check } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 pt-20 pb-12">
      <div className="max-w-5xl mx-auto p-4 py-8">
        <div className="bg-base-100 rounded-2xl shadow-lg overflow-hidden border border-base-300">
          {/* Header with gradient background */}
          <div className="px-8 py-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-base-200">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <p className="text-base-content/70">Manage your personal information</p>
          </div>

          {/* Profile Content - Horizontal Layout */}
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column - Avatar Upload Section */}
              <div className="flex flex-col items-center gap-4 md:w-1/3">
                <div className="relative">
                  <div className="w-36 h-36 rounded-full border-4 border-base-100 shadow-lg overflow-hidden bg-gradient-to-br from-base-200 to-base-300">
                    <img
                      src={selectedImg || authUser.profilePic || "/avatar.png"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label
                    htmlFor="avatar-upload"
                    className={`
                      absolute bottom-2 right-2
                      bg-primary text-primary-content 
                      hover:bg-primary-focus hover:scale-105
                      p-3 rounded-full cursor-pointer shadow-lg
                      transition-all duration-200 ease-in-out
                      ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                    `}
                  >
                    <Camera className="w-5 h-5" />
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUpdatingProfile}
                    />
                  </label>
                </div>
                <div className="text-center">
                  <p className="text-sm text-base-content/70">
                    {isUpdatingProfile ? (
                      <span className="flex items-center gap-2">
                        <span className="loading loading-spinner loading-xs"></span>
                        Uploading...
                      </span>
                    ) : (
                      "Click the camera icon to update your photo"
                    )}
                  </p>
                </div>
              </div>

              {/* Right Column - User Information */}
              <div className="md:w-2/3 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="text-sm font-medium flex items-center gap-2 px-1">
                      <User className="w-4 h-4 text-primary" />
                      Full Name
                    </div>
                    <div className="px-5 py-4 bg-base-100 rounded-xl border border-base-300 shadow-sm font-medium">
                      {authUser?.fullName}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium flex items-center gap-2 px-1">
                      <Mail className="w-4 h-4 text-primary" />
                      Email Address
                    </div>
                    <div className="px-5 py-4 bg-base-100 rounded-xl border border-base-300 shadow-sm font-medium">
                      {authUser?.email}
                    </div>
                  </div>
                </div>

                {/* Account Information */}
                <div className="bg-base-100 rounded-xl p-6 border border-base-200 shadow-sm bg-gradient-to-br from-base-100 to-base-100/80">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-primary rounded mr-1"></span>
                    Account Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between py-3 border-b md:border-b-0 md:border-r border-base-200 pr-4">
                      <span className="font-medium text-base-content/80">Member Since</span>
                      <span className="bg-base-200 px-3 py-1 rounded-full text-sm">{formatDate(authUser.createdAt)}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 pl-4">
                      <span className="font-medium text-base-content/80">Account Status</span>
                      <span className="bg-success/20 text-success px-3 py-1 rounded-full text-sm flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;