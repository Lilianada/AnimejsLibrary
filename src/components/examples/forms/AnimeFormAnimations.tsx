import React from "react";
import FloatingLabelInput from "./FloatingLabelInput";
import { Button } from "@/components/ui/button";
import { CodeToggle } from "../CodeToggle";
import "./forms.css";

const AnimeFormAnimations = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-3">Form Animations</h2>
        <p className="text-muted-foreground">
          Interactive form animations that enhance the user experience using
          anime.js.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CodeToggle
          previewContent={
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">Form Entrance Animation</h3>
              <form className="space-y-4 form-entrance">
                <FloatingLabelInput 
                  label="Name" 
                  type="text" 
                  className="bg-transparent border-border text-foreground" 
                />
                <FloatingLabelInput 
                  label="Email" 
                  type="email" 
                  className="bg-transparent border-border text-foreground" 
                />
                <FloatingLabelInput 
                  label="Password" 
                  type="password" 
                  className="bg-transparent border-border text-foreground" 
                />
                <Button className="w-full">Submit</Button>
              </form>
            </div>
          }
          codeContent={`import React, { useEffect, useRef } from "react";
import * as anime from "animejs";

// Form Entrance Animation
const FormEntrance = () => {
  const formRef = useRef(null);
  
  useEffect(() => {
    const formElements = formRef.current.querySelectorAll(".form-item");
    
    anime({
      targets: formElements,
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(100),
      easing: "easeOutQuad",
      duration: 500
    });
  }, []);
  
  return (
    <form ref={formRef} className="space-y-4">
      <div className="form-item">
        <FloatingLabelInput label="Name" type="text" />
      </div>
      <div className="form-item">
        <FloatingLabelInput label="Email" type="email" />
      </div>
      <div className="form-item">
        <FloatingLabelInput label="Password" type="password" />
      </div>
      <div className="form-item">
        <Button className="w-full">Submit</Button>
      </div>
    </form>
  );
};`}
          className="w-full"
          minHeightClass="min-h-[350px]"
        />
        
        <CodeToggle
          previewContent={
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">Field Focus Animation</h3>
              <form className="space-y-4">
                <div className="focus-animation-container">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 border rounded-md bg-transparent border-border text-foreground"
                  />
                </div>
                <div className="focus-animation-container">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 border rounded-md bg-transparent border-border text-foreground"
                  />
                </div>
                <div className="focus-animation-container">
                  <textarea
                    placeholder="Your Message"
                    className="w-full p-3 border rounded-md h-24 resize-none bg-transparent border-border text-foreground"
                  ></textarea>
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </div>
          }
          codeContent={`import React, { useEffect } from "react";
import * as anime from "animejs";

// Field Focus Animation
const FocusAnimation = () => {
  useEffect(() => {
    const inputFields = document.querySelectorAll('.focus-animation-container input, .focus-animation-container textarea');
    
    inputFields.forEach(field => {
      field.addEventListener('focus', () => {
        anime({
          targets: field.parentElement,
          scale: [1, 1.02],
          boxShadow: ['0 0 0 rgba(0,0,0,0)', '0 4px 16px rgba(0,0,0,0.1)'],
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
      
      field.addEventListener('blur', () => {
        anime({
          targets: field.parentElement,
          scale: [1.02, 1],
          boxShadow: ['0 4px 16px rgba(0,0,0,0.1)', '0 0 0 rgba(0,0,0,0)'],
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
    });
  }, []);
  
  return (
    <form className="space-y-4">
      <div className="focus-animation-container">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 border rounded-md"
        />
      </div>
      {/* Additional fields... */}
      <Button className="w-full">Send Message</Button>
    </form>
  );
};`}
          className="w-full"
          minHeightClass="min-h-[350px]"
        />
      </div>
    </div>
  );
};

export default AnimeFormAnimations;
