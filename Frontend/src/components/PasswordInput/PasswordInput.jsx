import React, { useState } from 'react';
import styles from './PasswordInput.module.css';
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";


const PasswordInput = ({password, setPassword , placeholder}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.pass}>
        <i><FaLock /></i>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password} className='focus:ring-0'
          onChange={(e) => setPassword(e.target.value)}
          placeholder={placeholder}
        />
        <span className={styles['toggle-password']} onClick={handleTogglePassword}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
    </div>
  );
};

export default PasswordInput;