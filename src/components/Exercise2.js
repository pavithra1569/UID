import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// User Profile Component using props
const UserProfile = ({ user, onEditProfile }) => (
  <div className="profile-card">
    <div className="profile-header">
      <img 
        src={user.profileImageUrl} 
        alt={user.fullName}
        className="profile-avatar"
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${user.fullName}&size=120&background=4f46e5&color=fff`;
        }}
      />
      <h2 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>{user.fullName}</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{user.jobTitle}</p>
    </div>
    
    <div className="profile-info">
      <div className="profile-field">
        <span className="profile-label">Email:</span>
        <span className="profile-value">{user.emailAddress}</span>
      </div>
      
      <div className="profile-field">
        <span className="profile-label">Phone:</span>
        <span className="profile-value">{user.phoneNumber}</span>
      </div>
      
      <div className="profile-field">
        <span className="profile-label">Location:</span>
        <span className="profile-value">{user.userLocation}</span>
      </div>
      
      <div className="profile-field">
        <span className="profile-label">Company:</span>
        <span className="profile-value">{user.companyName}</span>
      </div>
      
      <div className="profile-field">
        <span className="profile-label">Department:</span>
        <span className="profile-value">{user.departmentName}</span>
      </div>
      
      <div className="profile-field">
        <span className="profile-label">Experience:</span>
        <span className="profile-value">{user.yearsOfExperience} years</span>
      </div>
      
      <div className="profile-field">
        <span className="profile-label">Skills:</span>
        <span className="profile-value">
          {user.technicalSkills.map((skill, index) => (
            <span 
              key={index}
              style={{
                background: 'var(--primary-color)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '0.8rem',
                margin: '0 4px 4px 0',
                display: 'inline-block'
              }}
            >
              {skill}
            </span>
          ))}
        </span>
      </div>]
      
      <div className="profile-field">
        <span className="profile-label">Bio:</span>
        <span className="profile-value" style={{ textAlign: 'justify' }}>
          {user.userBio}
        </span>
      </div>
    </div>
    
    <div style={{ textAlign: 'center', marginTop: '32px' }}>
      <button className="btn" onClick={onEditProfile}>
        Edit Profile
      </button>
    </div>
  </div>
);

// Profile Edit Form Component
const ProfileEditForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState(user);

  // Update form data when user prop changes
  React.useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          profileImageUrl: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="profile-card">
      <h2 style={{ textAlign: 'center', marginBottom: '32px', color: '#333' }}>
        Edit Profile
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <div style={{ marginBottom: '16px' }}>
            <img 
              src={formData.profileImageUrl} 
              alt="Profile Preview"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid var(--primary-color)',
                margin: '0 auto 16px'
              }}
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${formData.fullName}&size=120&background=4f46e5&color=fff`;
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
              Profile Image:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{
                width: '100%',
                padding: '8px',
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
            <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
              Supported formats: JPG, PNG, GIF
            </p>
          </div>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text-primary)' }}>
            Full Name:
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid var(--bg-accent)',
              borderRadius: 'var(--radius-md)',
              fontSize: '16px'
            }}
            required
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text-primary)' }}>
            Job Title:
          </label>
          <input
            type="text"
            value={formData.jobTitle}
            onChange={(e) => handleChange('jobTitle', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid var(--bg-accent)',
              borderRadius: 'var(--radius-md)',
              fontSize: '16px'
            }}
            required
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text-primary)' }}>
            Email Address:
          </label>
          <input
            type="email"
            value={formData.emailAddress}
            onChange={(e) => handleChange('emailAddress', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid var(--bg-accent)',
              borderRadius: 'var(--radius-md)',
              fontSize: '16px'
            }}
            required
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text-primary)' }}>
            Phone Number:
          </label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid var(--bg-accent)',
              borderRadius: 'var(--radius-md)',
              fontSize: '16px'
            }}
            required
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text-primary)' }}>
            Location:
          </label>
          <input
            type="text"
            value={formData.userLocation}
            onChange={(e) => handleChange('userLocation', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid var(--bg-accent)',
              borderRadius: 'var(--radius-md)',
              fontSize: '16px'
            }}
            required
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text-primary)' }}>
            Company:
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => handleChange('companyName', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid var(--bg-accent)',
              borderRadius: 'var(--radius-md)',
              fontSize: '16px'
            }}
            required
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text-primary)' }}>
            Department:
          </label>
          <input
            type="text"
            value={formData.departmentName}
            onChange={(e) => handleChange('departmentName', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid var(--bg-accent)',
              borderRadius: 'var(--radius-md)',
              fontSize: '16px'
            }}
            required
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text-primary)' }}>
            Years of Experience:
          </label>
          <input
            type="number"
            value={formData.yearsOfExperience}
            onChange={(e) => handleChange('yearsOfExperience', parseInt(e.target.value) || 0)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid var(--bg-accent)',
              borderRadius: 'var(--radius-md)',
              fontSize: '16px'
            }}
            required
            min="0"
            max="50"
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text-primary)' }}>
            Bio:
          </label>
          <textarea
            value={formData.userBio}
            onChange={(e) => handleChange('userBio', e.target.value)}
            rows="4"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid var(--bg-accent)',
              borderRadius: 'var(--radius-md)',
              fontSize: '16px',
              resize: 'vertical'
            }}
            required
          />
        </div>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button type="submit" className="btn">
            Save Changes
          </button>
          <button type="button" className="btn" onClick={onCancel} style={{
            background: '#dc3545',
            border: 'none'
          }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// User Stats Component
const UserStats = ({ user }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '32px'
  }}>
    <div className="card" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: '8px' }}>📊</div>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
        {user.completedProjects} Projects
      </div>
    </div>
    
    <div className="card" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: '8px' }}>⭐</div>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
        {user.userRating} Rating
      </div>
    </div>
    
    <div className="card" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: '8px' }}>🏆</div>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
        {user.earnedAwards} Awards
      </div>
    </div>
  </div>
);

function Exercise2() {
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  
  // Default profile data
  const defaultProfileData = {
    fullName: "John Doe",
    jobTitle: "Senior React Developer",
    emailAddress: "john.doe@example.com",
    phoneNumber: "+1 (555) 123-4567",
    userLocation: "San Francisco, CA",
    companyName: "TechCorp Inc.",
    departmentName: "Engineering",
    yearsOfExperience: 5,
    profileImageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
    technicalSkills: ["React", "JavaScript", "TypeScript", "Node.js", "CSS", "HTML"],
    userBio: "Passionate React developer with 5+ years of experience building modern web applications. I love creating user-friendly interfaces and solving complex problems with clean, maintainable code.",
    completedProjects: 25,
    userRating: 4.8,
    earnedAwards: 3
  };

  // Load profile data from localStorage or use default
  const [userProfileData, setUserProfileData] = useState(() => {
    const savedProfile = localStorage.getItem('userProfileData');
    return savedProfile ? JSON.parse(savedProfile) : defaultProfileData;
  });

  const handleEditProfileClick = () => {
    setIsProfileEditing(true);
  };

  const handleSaveProfileChanges = (updatedProfileData) => {
    console.log('Saving profile data:', updatedProfileData);
    setUserProfileData(updatedProfileData);
    // Save to localStorage for persistence
    localStorage.setItem('userProfileData', JSON.stringify(updatedProfileData));
    setIsProfileEditing(false);
  };

  const handleCancelProfileEdit = () => {
    setIsProfileEditing(false);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Are you sure you want to reset your profile to default? This will delete all your saved changes.')) {
      setUserProfileData(defaultProfileData);
      localStorage.removeItem('userProfileData');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--text-primary)' }}>
          Exercise 2: User Profile with Props
        </h1>
        <p style={{ textAlign: 'center', fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          This exercise demonstrates the use of React props to create a dynamic user profile page.
        </p>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '32px',
          padding: '8px 16px',
          background: 'var(--bg-accent)',
          borderRadius: 'var(--radius-md)',
          display: 'inline-block',
          margin: '0 auto 32px',
          fontSize: '14px',
          color: 'var(--text-secondary)'
        }}>
          💾 Profile data is automatically saved to your browser's local storage
        </div>
        
        <UserStats user={userProfileData} />
        
        {isProfileEditing ? (
          <ProfileEditForm 
            user={userProfileData}
            onSave={handleSaveProfileChanges}
            onCancel={handleCancelProfileEdit}
          />
        ) : (
          <UserProfile 
            user={userProfileData}
            onEditProfile={handleEditProfileClick}
          />
        )}
        
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link to="/" className="btn">
            Back to Home
          </Link>
          <button 
            className="btn btn-outline" 
            onClick={handleResetToDefault}
            style={{ marginLeft: '16px' }}
          >
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
}

export default Exercise2; 