import axios from 'axios';
import { useEffect, useState } from 'react';
import type { DiaryEntry, NewDiaryEntry } from './types';
import { Weather, Visibility } from './types';
import { getAllDiaries, createDiary } from './services/diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
    date: '',
    weather: Weather.Sunny,
    visibility: Visibility.Great,
    comment: ''
  });

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewDiary({
      ...newDiary,
      [e.target.name]: e.target.value
    });
  };

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const added = await createDiary(newDiary);
      setDiaries(diaries.concat(added));
      setNewDiary({
        date: '',
        weather: Weather.Sunny,
        visibility: Visibility.Great,
        comment: ''
      });
      setErrorMessage(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data && typeof error.response.data === 'string') {
          setErrorMessage(error.response.data);
        } else if (error.response?.data?.error) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage('Something went wrong.');
        }
      } else {
        setErrorMessage('Unknown error occurred.');
      }
    }
  };
  return (
    <div>
      <h1>Flight Diary</h1>

      <h2>Add New Entry</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          Date: <input type="date" name="date" value={newDiary.date} onChange={handleChange} />
        </div>
        <div>
        <div>
          Weather:
          {Object.values(Weather).map(w => (
            <label key={w}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={newDiary.weather === w}
                onChange={handleChange}
              />
              {w}
            </label>
          ))}
        </div>

        <div>
          Visibility:
          {Object.values(Visibility).map(v => (
            <label key={v}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={newDiary.visibility === v}
                onChange={handleChange}
              />
              {v}
            </label>
          ))}
        </div>
          Comment: <input name="comment" value={newDiary.comment} onChange={handleChange} />
        </div>
        <button type="submit">Add Entry</button>
      </form>

      <h2>Entries</h2>
      {diaries.map(entry => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <p>Weather: {entry.weather}</p>
          <p>Visibility: {entry.visibility}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
