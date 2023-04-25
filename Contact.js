import './Contact.css';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import React, { useState } from 'react'; //importation

const Contact = () => {
  const { register, handleSubmit } = useForm();
  const [isSent, setIsSent] = useState(false); // état initial : non envoyé

  const onSubmit = (data) => {
    emailjs.send(
      'service_mzhyczj',
      'template_fl68reo',
      {
        subject: data.subject,
        email: data.email,
        tel: data.tel,
        message: data.message,
      },
      'M6yFB16csDuGhD1Of'
    )
      .then(() => setIsSent(true)) // si l'envoi est réussi, mettre l'état à true
      .catch(() => setIsSent(false)); // sinon, mettre l'état à false
  };

  return (
    <div className="contact-map-container  contact-main">
      <div className="contact-form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="px-3">Contactez-nous</h2>
          <h1>N'ayez pas peur de nous contacter.Vous + Nous = prodigieux</h1>
          <input {...register('subject')} type="text" placeholder="Nom" id="subject" required />
          <input {...register('email')} type="email" placeholder="Email" id="email" required />
          <input {...register('tel')} type="tel" placeholder="Téléphone" id="tel" pattern="0(5|6|7)[0-9]{8}" required />
          <textarea {...register('message')} placeholder="Message" id="message" className="border resize-none" required></textarea>
          <button type="submit">Envoyer</button>
        </form>
        {isSent && <h4>Votre message a été envoyé avec succès !</h4>} {/* afficher le message si l'envoi est réussi */}
      </div>
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1636.2059742558288!2d-1.3495213419903447!3d34.896110195020576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzTCsDUzJzQ2LjAiTiAxwrAyMCc1NC4zIlc!5e0!3m2!1sfr!2sdz!4v1680298797299!5m2!1sfr!2sdz"
          width="650"
          height="400"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
