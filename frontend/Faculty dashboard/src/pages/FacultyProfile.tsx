import React, { useState } from 'react';
import { UserIcon, CameraIcon,  LinkedinIcon, TwitterIcon, SaveIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
interface SocialLink {
  platform: string;
  url: string;
}
interface ProfileData {
  title: string;
  department: string;
  email: string;
  phone: string;
  officeLocation: string;
  officeHours: string;
  bio: string;
  expertise: string[];
  socialLinks: SocialLink[];
  privacySettings: {
    phone: boolean;
    email: boolean;
    officeHours: boolean;
  };
}
const FacultyProfile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    title: 'Professor',
    department: 'Computer Science',
    email: 'dr.johnson@university.edu',
    phone: '(555) 123-4567',
    officeLocation: 'Room 401, Science Building',
    officeHours: 'Monday & Wednesday 2:00 PM - 4:00 PM',
    bio: 'Experienced professor specializing in Computer Science with a focus on artificial intelligence and machine learning.',
    expertise: ['Artificial Intelligence', 'Machine Learning', 'Data Science'],
    socialLinks: [{
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/drjohnson'
    }, {
      platform: 'Twitter',
      url: 'https://twitter.com/drjohnson'
    }],
    privacySettings: {
      phone: false,
      email: true,
      officeHours: true
    }
  });
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handlePrivacyToggle = (field: keyof ProfileData['privacySettings']) => {
    setProfileData(prev => ({
      ...prev,
      privacySettings: {
        ...prev.privacySettings,
        [field]: !prev.privacySettings[field]
      }
    }));
  };
  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };
  return <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Faculty Profile</h1>
        <p className="text-gray-600">
          Manage your personal and professional information
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Profile Information */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between mb-6">
              <h2 className="text-lg font-semibold">Profile Information</h2>
              <button onClick={() => setIsEditing(!isEditing)} className="text-blue-600 hover:text-blue-800">
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input type="text" value={profileData.title} disabled={!isEditing} className="w-full border rounded-md p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <input type="text" value={profileData.department} disabled={!isEditing} className="w-full border rounded-md p-2" />
                </div>
              </div>
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-md font-medium">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="flex items-center">
                      <input type="email" value={profileData.email} disabled={!isEditing} className="w-full border rounded-md p-2" />
                      <button onClick={() => handlePrivacyToggle('email')} className="ml-2">
                        {profileData.privacySettings.email ? <EyeIcon className="text-green-600" size={20} /> : <EyeOffIcon className="text-gray-400" size={20} />}
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <div className="flex items-center">
                      <input type="tel" value={profileData.phone} disabled={!isEditing} className="w-full border rounded-md p-2" />
                      <button onClick={() => handlePrivacyToggle('phone')} className="ml-2">
                        {profileData.privacySettings.phone ? <EyeIcon className="text-green-600" size={20} /> : <EyeOffIcon className="text-gray-400" size={20} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Office Information */}
              <div className="space-y-4">
                <h3 className="text-md font-medium">Office Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Office Location
                    </label>
                    <input type="text" value={profileData.officeLocation} disabled={!isEditing} className="w-full border rounded-md p-2" />
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Office Hours
                    </label>
                    <div className="flex items-center">
                      <input type="text" value={profileData.officeHours} disabled={!isEditing} className="w-full border rounded-md p-2" />
                      <button onClick={() => handlePrivacyToggle('officeHours')} className="ml-2">
                        {profileData.privacySettings.officeHours ? <EyeIcon className="text-green-600" size={20} /> : <EyeOffIcon className="text-gray-400" size={20} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Professional Bio
                </label>
                <textarea value={profileData.bio} disabled={!isEditing} rows={4} className="w-full border rounded-md p-2" />
              </div>
              {isEditing && <button onClick={handleSave} className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <SaveIcon size={20} className="mr-2" />
                  Save Changes
                </button>}
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-6">
          {/* Profile Photo */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Profile Photo</h2>
            <div className="text-center">
              <div className="mb-4">
                {profileImage ? <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full mx-auto object-cover" /> : <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto flex items-center justify-center">
                    <UserIcon size={48} className="text-gray-400" />
                  </div>}
              </div>
              {isEditing && <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Upload new photo
                  </label>
                  <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <CameraIcon size={20} className="mr-2" />
                    Choose Photo
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                </div>}
            </div>
          </div>
          {/* Social Links */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Social Links</h2>
            <div className="space-y-4">
              {profileData.socialLinks.map((link, index) => <div key={index} className="flex items-center">
                  {link.platform === 'LinkedIn' ? <LinkedinIcon size={20} className="text-blue-600 mr-2" /> : <TwitterIcon size={20} className="text-blue-400 mr-2" />}
                  <input type="url" value={link.url} disabled={!isEditing} className="flex-1 border rounded-md p-2 text-sm" />
                </div>)}
              {isEditing && <button className="w-full border border-gray-300 text-gray-600 py-2 rounded-md hover:bg-gray-50">
                  Add Social Link
                </button>}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default FacultyProfile;