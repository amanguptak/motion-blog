import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './contact.css';

const ContactSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(ContactSchema),
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);

  

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(emailLink, data);
      if (res?.data?.ok) {
        toast.success('Thanks we got your mail');
        setLoading(false);
        reset();
      } else {
        setLoading(false);
        toast.error('Something went wrong');
      }
    } catch (err) {
      setLoading(false);
      toast.error('Something went wrong');
      console.log(err);
    }
  };

  return (
    <article className="form-container">
      <section className="mapbox">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4896371.007648413!2d73.04757079956687!3d20.593684113356642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d3334d4df0e3d%3A0x9f1f7bbf9ed5e36c!2sIndia!5e0!3m2!1sen!2sus!4v1652710916405!5m2!1sen!2sus"
          className="mapIframe"
          loading="lazy"
        ></iframe>
      </section>

      <section className="contact-form">
        <h3>Contact Form</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="input-wrapper">
            <div className="input-group">
              <input
                type="text"
                className="form-input"
                placeholder="Full name"
                {...register("fullname")}
              />
              {errors.fullname && (
                <p className="error-message">{errors.fullname.message}</p>
              )}
            </div>

            <div className="input-group">
              <input
                type="email"
                className="form-input"
                placeholder="Email address"
                {...register("email")}
              />
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="input-group">
            <textarea
              className="form-textarea"
              placeholder="Your Message"
              {...register("message")}
            />
            {errors.message && (
              <p className="error-message">{errors.message.message}</p>
            )}
          </div>

          <button
            className="form-button"
            type="submit"
          >
            <FaPaperPlane />
            <span>{loading ? 'Sending...' : 'Send'}</span>
          </button>
        </form>
        <ToastContainer />
      </section>
    </article>
  );
}
