import React from 'react';
import styles from './Button.module.css';
const Button = (propmt) => {
  return (
    <button className={styles.btn}>
        <span>{propmt.text}</span>
    </button>
  )
}

export default Button