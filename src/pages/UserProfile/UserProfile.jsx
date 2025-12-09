
import { useState, useContext } from "react";
import { updateProfile, changePassword } from "../../services/authServices";
import Sidebar from "../../components/sidebar/Sidebar";
import { authContext } from "../../context/AuthContext";
import { Button, Input, Card, Tabs, Tab } from "@heroui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function UserProfile() {
 
  const { userData } = useContext(authContext);

  const [profileData, setProfileData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    photo: userData?.photo || "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await updateProfile(profileData);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await changePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });

      setMessage("Password changed successfully!");
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Error changing password");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (

   
    <>
      <title>UserProfile | SocialApp</title>
      <main className="min-h-screen  from-gray-50 to-gray-100">
      <div className="container mx-auto p-5">
        <div className="grid grid-cols-4 gap-6">
          <Sidebar className="col-span-1" />

          <div className="col-span-2">
            <Card className="shadow-lg relative p-8">
              <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
              <p className="text-gray-600 mb-8">
                Manage your profile and security
              </p>

              {message && (
                <div className="mb-6 p-4 bg-green-50 border text-green-700 rounded-lg">
                  ✓ {message}
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 border text-red-700 rounded-lg">
                  ✕ {error}
                </div>
              )}

      
              {profileData.photo && (
                <img
                  src={profileData.photo}
                  alt="profile"
                  className="w-24 h-24 object-cover rounded-lg absolute top-8 right-8"
                />
              )}

              <Tabs color="primary" className="mb-6">
                <Tab key="profile" title="Profile Information">
                  <form
                    onSubmit={handleProfileSubmit}
                    className="space-y-6 py-6"
                  >
                    <Input
                      label="Full Name"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      size="lg"
                      variant="bordered"
                    />

                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      size="lg"
                      variant="bordered"
                    />

                    <Button
                      type="submit"
                      disabled={loading}
                      size="lg"
                      className="w-full bg-blue-600 text-white"
                    >
                      {loading ? "Updating..." : "Save Changes"}
                    </Button>
                  </form>
                </Tab>

                <Tab key="password" title="Change Password">
                  <form
                    onSubmit={handlePasswordSubmit}
                    className="space-y-6 py-6"
                  >
                    {/* OLD PASSWORD */}
                    <div className="relative">
                      <Input
                        label="Current Password"
                        name="oldPassword"
                        type={showPasswords.old ? "text" : "password"}
                        value={passwordData.oldPassword}
                        onChange={handlePasswordChange}
                        size="lg"
                        variant="bordered"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("old")}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showPasswords.old ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )}
                      </button>
                    </div>

                    {/* NEW PASSWORD */}
                    <div className="relative">
                      <Input
                        label="New Password"
                        name="newPassword"
                        type={showPasswords.new ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        size="lg"
                        variant="bordered"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("new")}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showPasswords.new ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )}
                      </button>
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div className="relative">
                      <Input
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showPasswords.confirm ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        size="lg"
                        variant="bordered"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("confirm")}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showPasswords.confirm ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )}
                      </button>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      size="lg"
                      className="w-full bg-blue-600 text-white"
                    >
                      {loading ? "Updating..." : "Change Password"}
                    </Button>
                  </form>
                </Tab>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </main>
    </>
  
  );
}
