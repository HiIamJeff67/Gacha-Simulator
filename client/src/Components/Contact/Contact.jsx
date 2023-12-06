import React from 'react'
import './Contact.css'

import { CgMail } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";
import { MdOutgoingMail } from "react-icons/md";

const Contact = () => {
  return (
    <div className='contact-container'>
      <div className='gmail-link'>
        <a href='mailto:iamjeffhi67@gmail.com'>
          <CgMail className='contact-icon'/>Gmail_1
        </a>
      </div>
      <div className='gmail-link'>
        <a href='mailto:flash1234567890555@gmail.com'>
          <CgMail className='contact-icon'/>Gmail_2
        </a>
      </div>
      <div className='github-link'>
        <a href='https://github.com/HiIamJeff67/Gacha-Simulator' target='_blank'>
          <FaGithub className='contact-icon'/>Github
        </a>
      </div>
    </div>
  )
}

export default Contact