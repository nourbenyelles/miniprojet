import React, { useState, useEffect } from 'react';
import './Dossier.css';

const DossierForm = ({ onSave, onCancel  }) => {
  const [numeroDossier, setNumeroDossier] = useState('');
  const [date, setDate] = useState('');
  const [typeAffaire, setTypeAffaire] = useState('');
  const [numeroTelephone, setNumeroTelephone] = useState('');
  const [titre, setTitre] = useState('');
  const [nomClient, setNomClient] = useState('');
  const [contenu, setContenu] = useState('');
  const [showDossierForm, setShowDossierForm] = useState(true); // État pour afficher/masquer le formulaire
 
  const handleNumeroDossierChange = (e) => {
    setNumeroDossier(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTypeAffaireChange = (e) => {
    setTypeAffaire(e.target.value);
  };

  const handleNumeroTelephoneChange = (e) => {
    setNumeroTelephone(e.target.value);
  };

  const handleTitreChange = (e) => {
    setTitre(e.target.value);
  };

  const handleNomClientChange = (e) => {
    setNomClient(e.target.value);
  };

  const handleContenuChange = (e) => {
    setContenu(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dossier = {
      numeroDossier,
      date,
      typeAffaire,
      numeroTelephone,
      titre,
      nomClient,
      contenu,
    };

    onSave(dossier);

    setNumeroDossier('');
    setDate('');
    setTypeAffaire('');
    setNumeroTelephone('');
    setTitre('');
    setNomClient('');
    setContenu('');
  };

  const handleCancelClick = () => {
    setShowDossierForm(false); 
    onCancel();// Masquer le formulaire en mettant l'état à false
  };

  if (!showDossierForm) {
    return null; // Ne rien rendre si showDossierForm est false
  }

  return (
    <div className="form-container">
      <form className="dossier-form" onSubmit={handleSubmit}>
        <h2>Créer un dossier</h2>
        <div className="form-group">
          <label htmlFor="numeroDossier">Numéro du dossier:</label>
          <input
            type="text"
            id="numeroDossier"
            value={numeroDossier}
            onChange={handleNumeroDossierChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="text"
            id="date"
            value={date}
            onChange={handleDateChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="typeAffaire">Type d'affaire:</label>
          <input
            type="text"
            id="typeAffaire"
            value={typeAffaire}
            onChange={handleTypeAffaireChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="numeroTelephone">Numéro de téléphone du client:</label>
          <input
            type="text"
            id="numeroTelephone"
            value={numeroTelephone}
            onChange={handleNumeroTelephoneChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="titre">Titre D'affaire:</label>
          <input
            type="text"
            id="titre"
            value={titre}
            onChange={handleTitreChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nomClient">Nom du client:</label>
          <input
            type="text"
            id="nomClient"
            value={nomClient}
            onChange={handleNomClientChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contenu">Contenu:</label>
          <textarea
            id="contenu"
            value={contenu}
            onChange={handleContenuChange}
          ></textarea>
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-button">Créer</button>
          <button type="button" onClick={handleCancelClick} className="close-button"> Annuler</button>
        </div>
      </form>
    </div>
  );
};




const DossierList = ({ dossiers, onDossierClick, onConsultDossierClick, onDossierDelete  }) => {
  const redirectToDetails = (dossier) => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    onDossierClick(dossier);
  };

  const redirectToConsult = (dossier) => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    onConsultDossierClick(dossier);
  };
  return (
    <div className="dossier-list">
    
    {dossiers.map((dossier, index) => (
      <div className="dossier-item" key={index}>
        <p className="dossier-name"><h4>{dossier.titre}</h4></p>
     
        <button onClick={() => redirectToDetails(dossier)} >Modifier</button>
          <button onClick={() => redirectToConsult(dossier)}>Consulter</button>
        <button onClick={() => onDossierDelete(dossier)}>Supprimer</button>
      </div>
    ))}
  </div>
  );
};

const DossierDetails = ({ dossier, onClose, onUpdate }) => {
  const [numeroDossier, setNumeroDossier] = useState(dossier.numeroDossier);
  const [date, setDate] = useState(dossier.date);
  const [typeAffaire, setTypeAffaire] = useState(dossier.typeAffaire);
  const [numeroTelephone, setNumeroTelephone] = useState(dossier.numeroTelephone);
  const [titre, setTitre] = useState(dossier.titre);
  const [nomClient, setNomClient] = useState(dossier.nomClient);
  const [contenu, setContenu] = useState(dossier.contenu);
  const redirectToDossiers = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onClose();
  };
  const handleNumeroDossierChange = (e) => {
    setNumeroDossier(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTypeAffaireChange = (e) => {
    setTypeAffaire(e.target.value);
  };

  const handleNumeroTelephoneChange = (e) => {
    setNumeroTelephone(e.target.value);
  };

  const handleTitreChange = (e) => {
    setTitre(e.target.value);
  };

  const handleNomClientChange = (e) => {
    setNomClient(e.target.value);
  };

  const handleContenuChange = (e) => {
    setContenu(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedDossier = {
      ...dossier,
      numeroDossier,
      date,
      typeAffaire,
      numeroTelephone,
      titre,
      nomClient,
      contenu,
    };

    onUpdate(updatedDossier);
  };
  const handleCloseClick = () => {
    
      onClose();
    
  };

  return (
    <div className="dossier-details">
      <h2>Détails du dossier</h2>
     
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="numeroDossier">Numéro du dossier:</label>
          <input
            type="text"
            id="numeroDossier"
            value={numeroDossier}
            onChange={handleNumeroDossierChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="text"
            id="date"
            value={date}
            onChange={handleDateChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="typeAffaire">Type d'affaire:</label>
          <input
            type="text"
            id="typeAffaire"
            value={typeAffaire}
            onChange={handleTypeAffaireChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="numeroTelephone">Numéro de téléphone du client:</label>
          <input
            type="text"
            id="numeroTelephone"
            value={numeroTelephone}
            onChange={handleNumeroTelephoneChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="titre">Titre D'affaire:</label>
          <input
            type="text"
            id="titre"
            value={titre}
            onChange={handleTitreChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nomClient">Nom du client:</label>
          <input
            type="text"
            id="nomClient"
            value={nomClient}
            onChange={handleNomClientChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contenu">Contenu:</label>
          <textarea
            id="contenu"
            value={contenu}
            onChange={handleContenuChange}
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Enregistrer</button>
        <button type="button" className="close-button" onClick={handleCloseClick}>Fermer</button>

      </form>
    </div>
  );
};

const App = () => {
    const [dossiers, setDossiers] = useState([]);
    const [selectedDossier, setSelectedDossier] = useState(null);
    const [showDossierForm, setShowDossierForm] = useState(false);
    const [showDossiers, setShowDossiers] = useState(false);
  
    useEffect(() => {
      const savedDossiers = localStorage.getItem('dossiers');
  
      if (savedDossiers) {
        setDossiers(JSON.parse(savedDossiers));
      }
    }, []);
    const handleDossierDelete = (dossier) => {
      const updatedDossiers = dossiers.filter((d) => d !== dossier);
      setDossiers(updatedDossiers);
      localStorage.setItem('dossiers', JSON.stringify(updatedDossiers));
    };
  
    const handleSaveDossier = (dossier) => {
      const updatedDossiers = [...dossiers, dossier];
      setDossiers(updatedDossiers);
      localStorage.setItem('dossiers', JSON.stringify(updatedDossiers));
      setShowDossierForm(false);
      setShowDossiers(true);
    };
  
    const handleDossierClick = (dossier) => {
      setSelectedDossier(dossier);
    };
  
    const handleDossierUpdate = (updatedDossier) => {
      const updatedDossiers = dossiers.map((d) => (d === selectedDossier ? updatedDossier : d));
      setDossiers(updatedDossiers);
      localStorage.setItem('dossiers', JSON.stringify(updatedDossiers));
      setSelectedDossier(updatedDossier);
    };
  
    const handleDossierClose = () => {
      setSelectedDossier(null);
    };
  
    const handleCreateDossierClick = () => {
      setShowDossierForm(true);
      setShowDossiers(false);
    };
  
    const handleVosDossiersClick = () => {
      setShowDossierForm(false);
      setShowDossiers(!showDossiers); // Toggle the value of showDossiers
    };
    const handleCancelDossierForm = () => {
        setShowDossierForm(false);
        setShowDossiers(true);
      };
      const handleConsultDossierClick = (dossier) => {
        setSelectedDossier(dossier);
      };
      
      
    return (
      <div className="app-container">
        
        {!showDossierForm && (
          <button onClick={handleCreateDossierClick}>Créer un dossier</button>
        )}
        {showDossierForm && (
          <DossierForm onSave={handleSaveDossier} onCancel={handleCancelDossierForm} />
        )}
        {!showDossierForm && (
          <button onClick={handleVosDossiersClick}>Mes dossiers</button>
        )}
        {showDossiers && (
         
          <DossierList
          dossiers={dossiers}
          onDossierClick={handleDossierClick}
          onConsultDossierClick={handleConsultDossierClick}
          onDossierDelete={handleDossierDelete}
        />
        )}
        {selectedDossier && (
          <DossierDetails
            dossier={selectedDossier}
            onClose={handleDossierClose}
            onUpdate={handleDossierUpdate}
          />
        )}
   
      </div>
    );
  };
  
  export default App;
  
  
  