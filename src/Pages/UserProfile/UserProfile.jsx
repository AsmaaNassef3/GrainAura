import { useContext, useState, useRef, useEffect } from "react";
import { Card, CardBody, Input, Button, Avatar } from "@heroui/react";
import { motion as Motion } from "framer-motion";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineCamera,
  HiOutlineCheck,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import { UserContext } from "../../context/UserDataContext";
import { toast } from "react-toastify";
import { changePassword } from "../../services/authServices";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerChildren = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function UserProfile() {
  const { userData, setUserData } = useContext(UserContext);

  const [username, setUsername] = useState(userData?.username || "");
  const [name, setName] = useState(
    userData?.name || userData?.firstName
      ? `${userData.firstName || ""} ${userData.lastName || ""}`.trim()
      : ""
  );
  const [email, setEmail] = useState(userData?.email || "");
  const [avatarPreview, setAvatarPreview] = useState(
    userData?.image || userData?.avatar || ""
  );
  const [_avatarFile, setAvatarFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  // Change password state
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (userData) {
      setUsername(userData.username || userData.name || "");
      setName(
        userData.name ||
          (userData.firstName
            ? `${userData.firstName || ""} ${userData.lastName || ""}`.trim()
            : "")
      );
      setEmail(userData.email || "");
      setAvatarPreview(userData.image || userData.avatar || "");
    }
  }, [userData]);

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  async function handleSave() {
    if (!username.trim()) {
      toast.error("Username cannot be empty.");
      return;
    }
    if (!email.trim()) {
      toast.error("Email cannot be empty.");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));

    setUserData((prev) => ({
      ...prev,
      username,
      name,
      email,
      image: avatarPreview,
      avatar: avatarPreview,
    }));
    setSaving(false);
    toast.success("Profile updated successfully! 🎉");
  }

  function validatePassword() {
    const errors = {};

    if (!passwordData.currentPassword) {
      errors.currentPassword = "Current password is required";
    }

    if (!passwordData.newPassword) {
      errors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters";
    }

    if (!passwordData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleChangePassword(e) {
    e.preventDefault();

    if (!validatePassword()) {
      return;
    }

    setChangingPassword(true);
    setPasswordErrors({});

    try {
      const response = await changePassword(passwordData);

      if (response.data.message === "success") {
        toast.success("Password changed successfully! 🔒");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setShowPasswordSection(false);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to change password";
      toast.error(errorMessage);
      setPasswordErrors({ general: errorMessage });
    } finally {
      setChangingPassword(false);
    }
  }

  const displayName =
    name ||
    (userData?.firstName && userData?.lastName
      ? `${userData.firstName} ${userData.lastName}`
      : userData?.name || userData?.username || "User");

  return (
    <Motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 py-12 px-4 flex items-start justify-center"
    >
      <div className="w-full max-w-3xl space-y-6">
        {/* Page Title */}
        <Motion.div variants={fadeUp} className="text-center space-y-1">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            My Profile
          </h1>
          <p className="text-base text-gray-600">
            Manage your personal information and security
          </p>
        </Motion.div>

        {/* Avatar Card */}
        <Motion.div variants={fadeUp}>
          <Card className="rounded-3xl shadow-lg border-0 bg-white overflow-hidden">
            <CardBody className="p-10">
              <div className="flex flex-col items-center gap-5">
                <div className="relative group">
                  <Avatar
                    src={
                      avatarPreview ||
                      userData?.image ||
                      userData?.avatar ||
                      `https://i.pravatar.cc/150?img=${userData?.id || 1}`
                    }
                    className="w-32 h-32 ring-4 ring-emerald-100 shadow-xl text-large"
                    isBordered
                    color="success"
                  />
                  <Motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-full p-3 shadow-lg transition-all"
                    title="Change avatar"
                  >
                    <HiOutlineCamera size={18} />
                  </Motion.button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>

                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {displayName}
                  </p>
                  <span className="inline-block mt-2 px-4 py-1 text-sm font-semibold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                    {userData?.role || "Member"}
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Motion.div>

        {/* Edit Form Card */}
        <Motion.div
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
        >
          <Card className="rounded-3xl shadow-lg border-0 bg-white overflow-hidden">
            <CardBody className="p-10 space-y-6">
              <Motion.h2
                variants={fadeUp}
                className="text-xl font-bold text-gray-900 pb-3 border-b-2 border-gray-100"
              >
                Personal Information
              </Motion.h2>

              {/* User ID — read-only */}
              {userData?.id && (
                <Motion.div variants={fadeUp} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <HiOutlineUser className="text-emerald-600" size={18} />
                    User ID
                    <span className="text-xs text-gray-400 font-normal">
                      (read-only)
                    </span>
                  </label>
                  <Input
                    value={String(userData.id)}
                    isReadOnly
                    variant="bordered"
                    radius="lg"
                    size="lg"
                    classNames={{
                      inputWrapper: "border-gray-200 bg-gray-50 cursor-default",
                      input: "text-gray-500",
                    }}
                    startContent={
                      <HiOutlineUser className="text-gray-300" size={20} />
                    }
                  />
                </Motion.div>
              )}

              {/* Full Name field */}
              <Motion.div variants={fadeUp} className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <HiOutlineUser className="text-emerald-600" size={18} />
                  Full Name
                </label>
                <Input
                  value={name}
                  onValueChange={setName}
                  placeholder="Enter your full name"
                  variant="bordered"
                  radius="lg"
                  size="lg"
                  classNames={{
                    inputWrapper:
                      "border-gray-200 hover:border-emerald-400 data-[hover=true]:border-emerald-400 group-data-[focus=true]:border-emerald-600",
                    input: "text-gray-900",
                  }}
                  startContent={
                    <HiOutlineUser className="text-gray-400" size={20} />
                  }
                />
              </Motion.div>

              {/* Username field */}
              <Motion.div variants={fadeUp} className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <HiOutlineUser className="text-emerald-600" size={18} />
                  Username
                </label>
                <Input
                  value={username}
                  onValueChange={setUsername}
                  placeholder="Enter your username"
                  variant="bordered"
                  radius="lg"
                  size="lg"
                  classNames={{
                    inputWrapper:
                      "border-gray-200 hover:border-emerald-400 data-[hover=true]:border-emerald-400 group-data-[focus=true]:border-emerald-600",
                    input: "text-gray-900",
                  }}
                  startContent={
                    <HiOutlineUser className="text-gray-400" size={20} />
                  }
                />
              </Motion.div>

              {/* Email field */}
              <Motion.div variants={fadeUp} className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <HiOutlineMail className="text-emerald-600" size={18} />
                  Email Address
                </label>
                <Input
                  value={email}
                  onValueChange={setEmail}
                  placeholder="Enter your email"
                  type="email"
                  variant="bordered"
                  radius="lg"
                  size="lg"
                  classNames={{
                    inputWrapper:
                      "border-gray-200 hover:border-emerald-400 data-[hover=true]:border-emerald-400 group-data-[focus=true]:border-emerald-600",
                    input: "text-gray-900",
                  }}
                  startContent={
                    <HiOutlineMail className="text-gray-400" size={20} />
                  }
                />
              </Motion.div>

              {/* Avatar URL field */}
              <Motion.div variants={fadeUp} className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <HiOutlineCamera className="text-emerald-600" size={18} />
                  Avatar URL
                  <span className="text-xs text-gray-500 font-normal">
                    (or use the camera button above)
                  </span>
                </label>
                <Input
                  value={avatarPreview}
                  onValueChange={setAvatarPreview}
                  placeholder="https://example.com/avatar.jpg"
                  variant="bordered"
                  radius="lg"
                  size="lg"
                  classNames={{
                    inputWrapper:
                      "border-gray-200 hover:border-emerald-400 data-[hover=true]:border-emerald-400 group-data-[focus=true]:border-emerald-600",
                    input: "text-gray-900",
                  }}
                  startContent={
                    <HiOutlineCamera className="text-gray-400" size={20} />
                  }
                />
              </Motion.div>

              {/* Save Button */}
              <Motion.div variants={fadeUp} className="pt-2">
                <Button
                  onPress={handleSave}
                  isLoading={saving}
                  className="w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl h-12 text-base shadow-lg hover:shadow-xl transition-all"
                  startContent={!saving && <HiOutlineCheck size={20} />}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </Motion.div>
            </CardBody>
          </Card>
        </Motion.div>

        {/* Change Password Section */}
        <Motion.div variants={fadeUp}>
          <Card className="rounded-3xl shadow-lg border-0 bg-white overflow-hidden">
            <CardBody className="p-10 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b-2 border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">
                  Security Settings
                </h2>
                <Button
                  onPress={() => setShowPasswordSection(!showPasswordSection)}
                  size="sm"
                  variant="flat"
                  className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold"
                >
                  {showPasswordSection ? "Cancel" : "Change Password"}
                </Button>
              </div>

              {showPasswordSection && (
                <Motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleChangePassword}
                  className="space-y-5"
                >
                  {/* Current Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <HiOutlineLockClosed
                        className="text-emerald-600"
                        size={18}
                      />
                      Current Password
                    </label>
                    <Input
                      value={passwordData.currentPassword}
                      onValueChange={(val) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          currentPassword: val,
                        }))
                      }
                      type={showPasswords.current ? "text" : "password"}
                      placeholder="Enter current password"
                      variant="bordered"
                      radius="lg"
                      size="lg"
                      isInvalid={!!passwordErrors.currentPassword}
                      errorMessage={passwordErrors.currentPassword}
                      classNames={{
                        inputWrapper:
                          "border-gray-200 hover:border-emerald-400 data-[hover=true]:border-emerald-400 group-data-[focus=true]:border-emerald-600",
                        input: "text-gray-900",
                      }}
                      startContent={
                        <HiOutlineLockClosed
                          className="text-gray-400"
                          size={20}
                        />
                      }
                      endContent={
                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswords((prev) => ({
                              ...prev,
                              current: !prev.current,
                            }))
                          }
                          className="focus:outline-none"
                        >
                          {showPasswords.current ? (
                            <HiOutlineEyeOff
                              className="text-gray-400"
                              size={20}
                            />
                          ) : (
                            <HiOutlineEye className="text-gray-400" size={20} />
                          )}
                        </button>
                      }
                    />
                  </div>

                  {/* New Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <HiOutlineLockClosed
                        className="text-emerald-600"
                        size={18}
                      />
                      New Password
                    </label>
                    <Input
                      value={passwordData.newPassword}
                      onValueChange={(val) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          newPassword: val,
                        }))
                      }
                      type={showPasswords.new ? "text" : "password"}
                      placeholder="Enter new password"
                      variant="bordered"
                      radius="lg"
                      size="lg"
                      isInvalid={!!passwordErrors.newPassword}
                      errorMessage={passwordErrors.newPassword}
                      classNames={{
                        inputWrapper:
                          "border-gray-200 hover:border-emerald-400 data-[hover=true]:border-emerald-400 group-data-[focus=true]:border-emerald-600",
                        input: "text-gray-900",
                      }}
                      startContent={
                        <HiOutlineLockClosed
                          className="text-gray-400"
                          size={20}
                        />
                      }
                      endContent={
                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswords((prev) => ({
                              ...prev,
                              new: !prev.new,
                            }))
                          }
                          className="focus:outline-none"
                        >
                          {showPasswords.new ? (
                            <HiOutlineEyeOff
                              className="text-gray-400"
                              size={20}
                            />
                          ) : (
                            <HiOutlineEye className="text-gray-400" size={20} />
                          )}
                        </button>
                      }
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <HiOutlineLockClosed
                        className="text-emerald-600"
                        size={18}
                      />
                      Confirm New Password
                    </label>
                    <Input
                      value={passwordData.confirmPassword}
                      onValueChange={(val) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          confirmPassword: val,
                        }))
                      }
                      type={showPasswords.confirm ? "text" : "password"}
                      placeholder="Confirm new password"
                      variant="bordered"
                      radius="lg"
                      size="lg"
                      isInvalid={!!passwordErrors.confirmPassword}
                      errorMessage={passwordErrors.confirmPassword}
                      classNames={{
                        inputWrapper:
                          "border-gray-200 hover:border-emerald-400 data-[hover=true]:border-emerald-400 group-data-[focus=true]:border-emerald-600",
                        input: "text-gray-900",
                      }}
                      startContent={
                        <HiOutlineLockClosed
                          className="text-gray-400"
                          size={20}
                        />
                      }
                      endContent={
                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswords((prev) => ({
                              ...prev,
                              confirm: !prev.confirm,
                            }))
                          }
                          className="focus:outline-none"
                        >
                          {showPasswords.confirm ? (
                            <HiOutlineEyeOff
                              className="text-gray-400"
                              size={20}
                            />
                          ) : (
                            <HiOutlineEye className="text-gray-400" size={20} />
                          )}
                        </button>
                      }
                    />
                  </div>

                  {/* Error Message */}
                  {passwordErrors.general && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {passwordErrors.general}
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    isLoading={changingPassword}
                    className="w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl h-12 text-base shadow-lg hover:shadow-xl transition-all"
                    startContent={
                      !changingPassword && <HiOutlineLockClosed size={20} />
                    }
                  >
                    {changingPassword ? "Updating..." : "Update Password"}
                  </Button>
                </Motion.form>
              )}

              {!showPasswordSection && (
                <p className="text-sm text-gray-600 text-center py-4">
                  Keep your account secure by updating your password regularly
                </p>
              )}
            </CardBody>
          </Card>
        </Motion.div>

        {/* Read-only Info Card */}
        {userData && (
          <Motion.div variants={fadeUp}>
            <Card className="rounded-3xl shadow-lg border-0 bg-linear-to-br from-gray-50 to-white overflow-hidden">
              <CardBody className="p-10">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">
                  Account Details
                </h3>
                <div className="grid grid-cols-2 gap-6 text-sm">
                  {[
                    { label: "First Name", value: userData.firstName },
                    { label: "Last Name", value: userData.lastName },
                    { label: "Gender", value: userData.gender },
                    { label: "Age", value: userData.age },
                    { label: "Phone", value: userData.phone },
                    { label: "University", value: userData.university },
                  ]
                    .filter((item) => item.value)
                    .map((item) => (
                      <div key={item.label} className="space-y-1">
                        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">
                          {item.label}
                        </p>
                        <p className="text-gray-900 font-semibold text-base">
                          {item.value}
                        </p>
                      </div>
                    ))}
                </div>
              </CardBody>
            </Card>
          </Motion.div>
        )}
      </div>
    </Motion.div>
  );
}
