import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient, Entry } from "../types";
import axios from "axios";

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data } = await axios.get<Patient>(`http://localhost:3000/api/patients/${id}`);
        setPatient(data);
      } catch (e) {
        console.error("Failed to fetch patient:", e);
      }
    };
    fetchPatient();
  }, [id]);

  if (!patient) return <div>Loading patient info...</div>;

  const renderGenderIcon = () => {
    switch (patient.gender) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      case "other":
        return <TransgenderIcon />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>
        {patient.name} {renderGenderIcon()}
      </h2>
      <p><strong>SSN:</strong> {patient.ssn}</p>
      <p><strong>Occupation:</strong> {patient.occupation}</p>
      <p><strong>Date of Birth:</strong> {patient.dateOfBirth}</p>

      <h3>Entries</h3>
      {patient.entries.length === 0 ? (
        <p>No entries</p>
      ) : (
        <ul>
          {patient.entries.map((entry: Entry) => (
            <li key={entry.id}>
              <p><strong>{entry.date}</strong>: {entry.description}</p>
              {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                <ul>
                  {entry.diagnosisCodes.map(code => (
                    <li key={code}>{code}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientDetailPage;
