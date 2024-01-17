import React, { useState } from 'react';
import styles from './PasswordInput.module.css';
import { FaLock, FaLockOpen } from "react-icons/fa";


const PasswordInput = ({password, setPassword}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.pass}>
      <label htmlFor="password">Password</label>
      <div className={styles.passwordContainer}>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <span className={styles['toggle-password']} onClick={handleTogglePassword}>
          {showPassword ? <FaLockOpen /> : <FaLock />}
        </span>
      </div>
    </div>
  );
};

export default PasswordInput;