import { useState } from 'react';
import axios from 'axios';

const EmailVerification = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [isOtpSent, setIsOtpSent] = useState(false);

  const API_URL = 'http://localhost:5000/api/email-verification';

  const sendOTP = async () => {
    setLoading(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Please login first');
        setMessageType('error');
        setLoading(false);
        return;
      }

      const res = await axios.post(
        `${API_URL}/send-verification-email`,
        {},
        { headers: { 'x-auth-token': token } }
      );
      
      setMessage(res.data.msg);
      setMessageType('success');
      setIsOtpSent(true);
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Failed to send OTP');
      setMessageType('error');
    }
    setLoading(false);
  };

  const verifyOTP = async () => {
    if (otp.length !== 6) {
      setMessage('Please enter a valid 6-digit OTP');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${API_URL}/verify-email-otp`,
        { otp },
        { headers: { 'x-auth-token': token } }
      );
      
      setMessage(res.data.msg);
      setMessageType('success');
      
      // Success - redirect after 2 seconds
      setTimeout(() => {
        window.location.reload(); // Or redirect to dashboard
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Invalid OTP');
      setMessageType('error');
    }
    setLoading(false);
  };

  const resendOTP = async () => {
    setLoading(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${API_URL}/resend-verification-email`,
        {},
        { headers: { 'x-auth-token': token } }
      );
      
      setMessage(res.data.msg);
      setMessageType('success');
      setOtp(''); // Clear previous OTP
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Failed to resend OTP');
      setMessageType('error');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📧</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Email Verification
          </h2>
          <p className="text-gray-600 text-sm">
            {!isOtpSent 
              ? 'Verify your email to activate your account'
              : 'Enter the OTP sent to your email'
            }
          </p>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            messageType === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            <p className="text-sm font-medium">{message}</p>
          </div>
        )}

        {/* Send OTP Button */}
        {!isOtpSent && (
          <button
            onClick={sendOTP}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-semibold 
                     hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-md
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send Verification Email'}
          </button>
        )}

        {/* OTP Input & Verify Section */}
        {isOtpSent && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 6) setOtp(value);
                }}
                maxLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 
                         focus:border-transparent text-center text-2xl tracking-widest font-mono"
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                Check your email inbox and spam folder
              </p>
            </div>

            <button
              onClick={verifyOTP}
              disabled={loading || otp.length !== 6}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg font-semibold 
                       hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-md
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>

            {/* Resend OTP */}
            <div className="text-center">
              <button
                onClick={resendOTP}
                disabled={loading}
                className="text-purple-600 hover:text-purple-700 font-medium text-sm underline
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Didn't receive OTP? Resend
              </button>
            </div>
          </div>
        )}

        {/* Info Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            🔒 Your email will be kept secure and private
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;