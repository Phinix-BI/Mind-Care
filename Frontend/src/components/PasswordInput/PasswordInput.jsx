import React, { useState } from 'react';
import styles from './PasswordInput.module.css';
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";


const PasswordInput = ({password, setPassword}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.pass}>
        <i><FaLock /></i>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <span className={styles['toggle-password']} onClick={handleTogglePassword}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
    </div>
  );
};

export default PasswordInput;