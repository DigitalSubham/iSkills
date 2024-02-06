import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";

const ContactFormSection = () => {
  return (
    <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 md:p-14 flex gap-3 flex-col  ">
      <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
        Got a Idea? We&apos;ve got the skills. Let&apos;s team up
      </h1>
      <p>We’d love to here for you, Please fill out this form.</p>
      <div className="mt-7">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;
