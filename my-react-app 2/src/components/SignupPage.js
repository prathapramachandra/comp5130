import React, { useState } from 'react';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePasswordChange = (e) => {
    const newPass = e.target.value;
    setPassword(newPass);

    // Update password strength
    if (newPass.length >= 8 && /[A-Z]/.test(newPass) && /[0-9]/.test(newPass)) {
      setPasswordStrength('Strong');
    } else if (newPass.length >= 6) {
      setPasswordStrength('Moderate');
    } else {
      setPasswordStrength('Weak');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      setErrorMessage('You must agree to the terms and conditions.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    localStorage.setItem('signupUsername', username);
    localStorage.setItem('signupPassword', password);
    alert('Account created successfully! Please log in.');
    window.location.href = '/login';
  };

  return (
    <div className="signup-container">
      <h2>Create Your Account</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          required
        />
        <div className={`password-strength ${passwordStrength.toLowerCase()}`}>
          {passwordStrength} Password
        </div>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <label>
          <input type="checkbox" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} />
          I agree to the terms and conditions
        </label>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Create Account</button>
      </form>
      <a href="/login">Already have an account? Login</a>
    </div>
  );
};

export default SignupPage;
