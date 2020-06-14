import React, { useContext } from 'react';
import ThemeContext from '../../utils/ThemeContext';

const Footer = () => {

  const themeContext = useContext(ThemeContext);

  return (
    <div className="fixed-bottom">
      <div>
        <div className={`bg-${themeContext.backgroundColor} p-2`}>

          <small className={`text-${themeContext.textColor}`}>simple weather by phaggio</small>

        </div>
      </div>
    </div>
  )
}

export default Footer;