import './Rv.css';
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import { fr } from 'date-fns/locale';

Modal.setAppElement('#root');

const Rv = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disabledTimes, setDisabledTimes] = useState([]);
  const [reservationStatus, setReservationStatus] = useState(null);

  useEffect(() => {
    const disabledTimesFromLocalStorage = JSON.parse(localStorage.getItem('disabledTimes')) || [];
    setDisabledTimes(disabledTimesFromLocalStorage);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    openModal();
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAppointmentSubmit = () => {
    if (selectedDate && selectedTime) {
      const rendezvousData = {
        date: format(selectedDate, 'yyyy-MM-dd', { locale: fr }),
        heure: selectedTime
      };

      fetch('http://localhost:8081/rendez_vous', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rendezvousData)
      })
        .then(response => {
          if (response.ok) {
            console.log('Rendez-vous enregistré avec succès');

            // Ajouter l'heure sélectionnée aux heures désactivées
            const newDisabledTime = { date: selectedDate.toISOString(), time: selectedTime };
            const updatedDisabledTimes = [...disabledTimes, newDisabledTime];

            // Mettre à jour les heures désactivées dans le stockage local
            localStorage.setItem('disabledTimes', JSON.stringify(updatedDisabledTimes));

            setDisabledTimes(updatedDisabledTimes);
            closeModal();
            setReservationStatus({
              date: selectedDate,
              time: selectedTime
            });
          } else {
            console.log("Erreur lors de l'enregistrement du rendez-vous");
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const generateAvailableTimes = () => {
    const availableTimes = [];
    const startTime = 8; // Start hour (8 AM)
    const endTime = 16; // End hour (4 PM)

    for (let hour = startTime; hour <= endTime; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        const time = `${formattedHour}:${formattedMinute}`;

        const isDisabled =
          selectedDate &&
          disabledTimes.some(
            (disabledTime) =>
              disabledTime.date === selectedDate.toISOString() &&
              disabledTime.time === time
          );

        if (!isDisabled) {
          availableTimes.push(time);
        }
      }
    }

    return availableTimes;
  };

  return (
    <div className="container">
      <h2>Rendez-Vous</h2>
      <div className="calendar-container"> {/* Ajout de la classe calendar-container */}
        <Calendar className="react-calendar" onChange={handleDateChange} value={selectedDate} />
        {reservationStatus && (
          <div className="reservation-status">
            <h4>Vous avez réservé un rendez-vous pour le {format(reservationStatus.date, 'dd/MM/yyyy', { locale: fr })} à {reservationStatus.time}h.</h4>
          </div>
        )}
      </div>
      <Modal
        className="react-modal"
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Appointment Modal"
      >
        <h3>Confirmer votre rendez-vous</h3>
        <p>La date sélectionnée: {selectedDate && format(selectedDate, 'dd/MM/yyyy', { locale: fr })}</p>
        <select className="modal-select" value={selectedTime} onChange={(e) => handleTimeChange(e.target.value)}>
          <option value="">choisir l'heure</option>
          {generateAvailableTimes().map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        <button className="modal-button" onClick={handleAppointmentSubmit} disabled={!selectedTime}>
          Confirmer
        </button>
        <button className="modal-button" onClick={closeModal}>Annuler</button>
      </Modal>
    </div>
  );
};

export default Rv;
