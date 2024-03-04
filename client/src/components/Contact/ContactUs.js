import React, { useRef, useState } from 'react';

import Sidebar2 from '../MainBody/SideBar/Sidebar2';
import emailjs from '@emailjs/browser';
import Notification from '../utils/Notification/Notification';

const ContactUs = () => {

const [message,setMessages]=useState("");
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_5fowasj', 'template_a5d9ror', form.current, {
        publicKey: 't_T3sujISqn4wnljA',
      })
      .then(
        () => {
          setMessages("Mail has been sent to u successfully")
        },
        (error) => {
          setMessages("Failed to sent u the mail");
        },
      );
      e.target.reset();
      setTimeout(() => {
        setMessages("");
      }, 2000);
  };
  const onClose=()=>{
    setMessages("");
  }
  const uid=localStorage.getItem('uid');
  return (
   
    <div className="w-full relative h-[695px] text-left text-[88px] text-white font-inconsolata">
      {uid && <Sidebar2/>}
      {message && (<Notification message={message} onClose={onClose}/>)}
      <div className="absolute top-[90px] left-[390px] w-[761px] h-[571px]">
      <div style={{ position: 'absolute', top: '0px', left: '0px', backgroundColor: '#221F1FAB', width: '761px', height: '571px' }} />
        <div className="absolute top-[52px] left-[176px] font-extrabold">
          Contact Us
        </div>
        <form ref={form} onSubmit={sendEmail}>
        <input
          className="[border:none] [outline:none] font-inconsolata text-[25px] bg-[#d8b5b5] absolute top-[180px] left-[189px] w-[407px] h-[49px] pt-1.5 px-3 pb-4 box-border text-black"
          placeholder="Name"
          name="user_name"
          type="text"
        />
        <input
          className="[border:none] [outline:none] font-inconsolata text-[25px] bg-[#d8b5b5] absolute top-[249px] left-[189px] w-[407px] h-[49px] pt-1.5 px-3 pb-[17px] box-border text-[#000]"
          placeholder="Email"
          name="user_email"
          type="text"
        />
        <textarea className="[border:none] bg-[#d8b5b5] [outline:none] absolute top-[318px] left-[189px] w-[407px] h-[131px] text-[25px]  text-[#000]" placeholder="Message...." name="message" />
        <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[485px] left-[280px] w-[201px] h-16">
          <div className="absolute top-[0px] left-[0px] rounded-[17px] bg-[#f15b5b] w-[201px] h-16" />
          <button className="cursor-pointer [border:none] pb-5 bg-[transparent] absolute top-[3px] left-[60px] text-[35px] font-semibold font-inconsolata text-white text-left inline-block">
            SEND
          </button>
        </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
