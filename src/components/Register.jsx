// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../contexts/UserContext';

// const Register = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//   const [isArtisan, setIsArtisan] = useState(false);
//   const [registering, setRegistering] = useState(false);
//   const navigate = useNavigate();
//   const { setToken, loadUser } = useContext(UserContext);

//   const { name, email, password } = formData;

//   const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

// //   const onSubmit = async (e) => {
// //     e.preventDefault();
// //     setRegistering(true);
    
// //     try {
// //       const res = await axios.post('http://localhost:5000/api/users/register', formData);

// //       // Save token in context + localStorage
// //       localStorage.setItem('craftconnect_token', res.data.token);
// //       setToken(res.data.token);

// //       // Load the user immediately
// //       await loadUser();
// // alert('Registration successful! Please verify your mobile and email.');
// // navigate('/verification');

// //       // if (isArtisan) {
// //       //   alert('Account created! Now fill your artisan details.');
// //       //   navigate('/artisan-application');
// //       // } else {
// //       //   alert('Registration successful!');
// //       //   navigate('/dashboard');
// //       // }
// //     } catch (err) {
// //       alert('Error: ' + err.response?.data.msg);
// //     } finally {
// //       setRegistering(false);
// //     }
// //   };

// //riya

// // const onSubmit = async (e) => {
// //   e.preventDefault();
// //   setRegistering(true);
  
// //   try {
// //     const res = await axios.post('http://localhost:5000/api/users/register', formData);

// //     // Save token
// //     localStorage.setItem('craftconnect_token', res.data.token);
// //     setToken(res.data.token);
// //     await loadUser();

// //     // ✅ ALWAYS GO TO VERIFICATION PAGE
// //     alert('Registration successful! Please verify your mobile and email.');
// //     navigate('/verification');

// //   } catch (err) {
// //     alert('Error: ' + err.response?.data.msg);
// //   } finally {
// //     setRegistering(false);
// //   }
// // };
// //riya 2

// const onSubmit = async (e) => {
//   e.preventDefault();
//   setRegistering(true);
  
//   try {
//     const res = await axios.post('http://localhost:5000/api/users/register', formData);

//     // Save token
//     localStorage.setItem('craftconnect_token', res.data.token);
//     setToken(res.data.token);
//     await loadUser();

//     // ✅ Save artisan registration intent
//     if (isArtisan) {
//       localStorage.setItem('isArtisanRegistration', 'true');
//     }

//     alert('Registration successful! Please verify your mobile and email.');
//     navigate('/verification');

//   } catch (err) {
//     alert('Error: ' + err.response?.data.msg);
//   } finally {
//     setRegistering(false);
//   }
// };
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 relative overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-1/2 -left-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute -bottom-1/2 -right-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
//       </div>

//       {/* Main container */}
//       <div className="relative bg-white/95 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition-all hover:scale-[1.01] duration-300">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-block p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-4 shadow-lg">
//             <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
//             </svg>
//           </div>
//           <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
//             Join CraftConnect
//           </h2>
//           <p className="text-gray-600 text-sm">Create your account and start connecting</p>
//         </div>

//         {/* Form */}
//         <form onSubmit={onSubmit} className="space-y-5">
//           {/* Name Input */}
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//               </svg>
//             </div>
//             <input
//               type="text"
//               placeholder="Full Name"
//               name="name"
//               value={name}
//               onChange={onChange}
//               required
//               className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 outline-none"
//             />
//           </div>

//           {/* Email Input */}
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//             </div>
//             <input
//               type="email"
//               placeholder="Email Address"
//               name="email"
//               value={email}
//               onChange={onChange}
//               required
//               className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 outline-none"
//             />
//           </div>

//           {/* Password Input */}
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//               </svg>
//             </div>
//             <input
//               type="password"
//               placeholder="Password (min. 6 characters)"
//               name="password"
//               value={password}
//               onChange={onChange}
//               minLength="6"
//               required
//               className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 outline-none"
//             />
//           </div>

//           {/* Artisan Checkbox */}
//           <div className="relative">
//             <div className="flex items-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-100 hover:border-indigo-300 transition-all duration-200 cursor-pointer">
//               <input
//                 type="checkbox"
//                 id="isArtisan"
//                 checked={isArtisan}
//                 onChange={(e) => setIsArtisan(e.target.checked)}
//                 className="w-5 h-5 text-indigo-600 bg-white border-gray-300 rounded focus:ring-indigo-500 focus:ring-2 cursor-pointer"
//               />
//               <label htmlFor="isArtisan" className="ml-3 flex-1 cursor-pointer">
//                 <span className="text-gray-800 font-medium">Become an Artisan</span>
//                 <p className="text-xs text-gray-500 mt-0.5">Showcase your skills and offer services</p>
//               </label>
//               <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={registering}
//             className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
//           >
//             {registering ? (
//               <>
//                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 <span>Creating Your Account...</span>
//               </>
//             ) : (
//               <>
//                 <span>Create Account</span>
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                 </svg>
//               </>
//             )}
//           </button>
//         </form>

//         {/* Footer */}
//         <div className="mt-6 text-center">
//           <p className="text-gray-600 text-sm">
//             Already have an account?{' '}
//             <button
//               onClick={() => navigate('/login')}
//               className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors duration-200 hover:underline"
//             >
//               Sign In
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

//riya

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Register = () => {
  const navigate = useNavigate();
  const { setToken, loadUser } = useContext(UserContext);
  
  // Step management
  const [step, setStep] = useState(1); // 1: Basic, 2: Mobile OTP, 3: Email OTP, 4: Artisan Details
  
  // Step 1: Basic Info
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isArtisan, setIsArtisan] = useState(false);
  
  // Step 2: Mobile OTP
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileOtp, setMobileOtp] = useState('');
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  
  // Step 3: Email OTP
  const [emailOtp, setEmailOtp] = useState('');
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  
  // Step 4: Artisan Info
  const [location, setLocation] = useState('');
  const [serviceCategory, setServiceCategory] = useState('');
  
  // UI State
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [userToken, setUserToken] = useState('');

  const categories = ['Pottery', 'Weaving', 'Carpentry', 'Painting', 'Jewelry Making', 'Leather Work', 'Metal Work', 'Glass Blowing', 'Embroidery', 'Stone Carving', 'Other'];

  // ============================
  // STEP 1: Basic Registration
  // ============================
  const handleBasicRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post('http://localhost:5000/api/users/register', formData);

      localStorage.setItem('craftconnect_token', res.data.token);
      setToken(res.data.token);
      setUserToken(res.data.token);
      await loadUser();
      
      setMessage('Account created! Now verify your mobile number.');
      setMessageType('success');
      setTimeout(() => {
        setStep(2);
        setMessage('');
      }, 1500);

    } catch (err) {
      setMessage(err.response?.data?.msg || 'Registration failed');
      setMessageType('error');
    }
    setLoading(false);
  };

  // ============================
  // STEP 2: Mobile OTP
  // ============================
  const sendMobileOTP = async () => {
    if (mobileNumber.length !== 10) {
      setMessage('Enter valid 10-digit mobile number');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post('http://localhost:5000/api/otp/send-otp', {
        phoneNumber: `+91${mobileNumber}`,
        purpose: 'REGISTRATION'
      });

      setMessage(res.data.msg);
      setMessageType('success');
      setMobileOtpSent(true);
      
      if (res.data.devOTP) {
        console.log('📱 DEV OTP:', res.data.devOTP);
        alert(`Development Mode - OTP: ${res.data.devOTP}`);
      }
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Failed to send OTP');
      setMessageType('error');
    }
    setLoading(false);
  };

  const verifyMobileOTP = async () => {
    if (mobileOtp.length !== 6) {
      setMessage('Enter valid 6-digit OTP');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Step 1: Verify OTP
      const verifyRes = await axios.post('http://localhost:5000/api/otp/verify-otp', {
        phoneNumber: `+91${mobileNumber}`,
        otp: mobileOtp,
        purpose: 'REGISTRATION'
      });

      if (verifyRes.data.success) {
        // Step 2: Link to user profile
        await axios.post(
          'http://localhost:5000/api/otp/verify-otp-complete',
          { phoneNumber: `+91${mobileNumber}` },
          { headers: { 'x-auth-token': userToken } }
        );

        setMessage('Mobile verified! Now verify your email.');
        setMessageType('success');
        
        setTimeout(() => {
          setStep(3);
          setMessage('');
        }, 1500);
      }
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Invalid OTP');
      setMessageType('error');
    }
    setLoading(false);
  };

  // ============================
  // STEP 3: Email OTP
  // ============================
  const sendEmailOTP = async () => {
    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post(
        'http://localhost:5000/api/email-verification/send-verification-email',
        {},
        { headers: { 'x-auth-token': userToken } }
      );

      setMessage(res.data.msg);
      setMessageType('success');
      setEmailOtpSent(true);
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Failed to send email OTP');
      setMessageType('error');
    }
    setLoading(false);
  };

  const verifyEmailOTP = async () => {
    if (emailOtp.length !== 6) {
      setMessage('Enter valid 6-digit OTP');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post(
        'http://localhost:5000/api/email-verification/verify-email-otp',
        { otp: emailOtp },
        { headers: { 'x-auth-token': userToken } }
      );

      if (res.data.success) {
        setMessage('Email verified successfully!');
        setMessageType('success');

        if (isArtisan) {
          setTimeout(() => {
            setStep(4);
            setMessage('');
          }, 1500);
        } else {
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        }
      }
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Invalid OTP');
      setMessageType('error');
    }
    setLoading(false);
  };

  // ============================
  // STEP 4: Artisan Details
  // ============================
  const submitArtisanDetails = async (e) => {
    e.preventDefault();
    
    if (!location || !serviceCategory) {
      setMessage('Please fill all fields');
      setMessageType('error');
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        'http://localhost:5000/api/users/artisan-application',
        {
          location,
          serviceCategory,
          verificationType: 'MOBILE_OTP'
        },
        { headers: { 'x-auth-token': userToken } }
      );

      alert('Artisan application submitted successfully!');
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Submission failed');
      setMessageType('error');
    }
    setLoading(false);
  };

  const autoDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await res.json();
            const detectedLocation = `${data.address.city || data.address.town}, ${data.address.state}, ${data.address.country}`;
            setLocation(detectedLocation);
          } catch {
            alert('Failed to detect location');
          }
        },
        () => alert('Location access denied')
      );
    }
  };

  // ============================
  // RENDER
  // ============================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        
        {/* Progress Indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2">
            {[1, 2, 3, isArtisan ? 4 : null].filter(Boolean).map((s, idx) => (
              <React.Fragment key={s}>
                {idx > 0 && <div className={`w-8 h-1 ${step > s - 1 ? 'bg-green-500' : 'bg-gray-300'}`}></div>}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step > s ? 'bg-green-500 text-white' : step === s ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {step > s ? '✓' : s}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {step === 1 && 'Create Account'}
            {step === 2 && '📱 Verify Mobile'}
            {step === 3 && '📧 Verify Email'}
            {step === 4 && '🎨 Artisan Details'}
          </h2>
          <p className="text-gray-600 text-sm">
            {step === 1 && 'Join CraftConnect today'}
            {step === 2 && 'Enter OTP sent to your mobile'}
            {step === 3 && 'Enter OTP sent to your email'}
            {step === 4 && 'Complete your artisan profile'}
          </p>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${
            messageType === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        {/* STEP 1: Basic Registration */}
        {step === 1 && (
          <form onSubmit={handleBasicRegistration} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none"
            />
            <input
              type="password"
              placeholder="Password (min. 6 characters)"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              minLength="6"
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none"
            />
            
            {/* Artisan Checkbox */}
            <div className="flex items-center p-4 bg-indigo-50 rounded-xl border-2 border-indigo-100">
              <input
                type="checkbox"
                id="isArtisan"
                checked={isArtisan}
                onChange={(e) => setIsArtisan(e.target.checked)}
                className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
              />
              <label htmlFor="isArtisan" className="ml-3 flex-1">
                <span className="text-gray-800 font-medium">Become an Artisan</span>
                <p className="text-xs text-gray-500">Showcase your skills and offer services</p>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Continue'}
            </button>
          </form>
        )}

        {/* STEP 2: Mobile OTP */}
        {step === 2 && (
          <div className="space-y-4">
            {!mobileOtpSent ? (
              <>
                <div className="flex">
                  <span className="px-3 py-3 bg-gray-100 border rounded-l-xl font-semibold text-gray-600">+91</span>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="flex-1 px-4 py-3 border rounded-r-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <button
                  onClick={sendMobileOTP}
                  disabled={loading || mobileNumber.length !== 10}
                  className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send OTP'}
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="000000"
                  value={mobileOtp}
                  onChange={(e) => setMobileOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-3 border rounded-xl text-center text-2xl tracking-widest font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <button
                  onClick={verifyMobileOTP}
                  disabled={loading || mobileOtp.length !== 6}
                  className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Verify Mobile'}
                </button>
                <button onClick={() => setMobileOtpSent(false)} className="w-full text-indigo-600 text-sm">
                  Change Number
                </button>
              </>
            )}
          </div>
        )}

        {/* STEP 3: Email OTP */}
        {step === 3 && (
          <div className="space-y-4">
            {!emailOtpSent ? (
              <button
                onClick={sendEmailOTP}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Email OTP'}
              </button>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="000000"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-3 border rounded-xl text-center text-2xl tracking-widest font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <p className="text-xs text-gray-500 text-center">Check inbox/spam folder</p>
                <button
                  onClick={verifyEmailOTP}
                  disabled={loading || emailOtp.length !== 6}
                  className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Verify Email'}
                </button>
                <button onClick={sendEmailOTP} className="w-full text-indigo-600 text-sm">
                  Resend OTP
                </button>
              </>
            )}
          </div>
        )}

        {/* STEP 4: Artisan Details */}
        {step === 4 && (
          <form onSubmit={submitArtisanDetails} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                placeholder="City, State, Country"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <button
                type="button"
                onClick={autoDetectLocation}
                className="mt-2 w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600"
              >
                📍 Auto-Detect Location
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Category</label>
              <select
                value={serviceCategory}
                onChange={(e) => setServiceCategory(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Complete Registration'}
            </button>
          </form>
        )}

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-indigo-600 font-semibold hover:underline">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
