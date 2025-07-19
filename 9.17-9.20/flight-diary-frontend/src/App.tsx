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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Flight Diary</h1>

      <h2>Add New Entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Date: <input type="date" name="date" value={newDiary.date} onChange={handleChange} />
        </div>
        <div>
          Weather:
          <select name="weather" value={newDiary.weather} onChange={handleChange}>
            {Object.values(Weather).map(w => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>
        <div>
          Visibility:
          <select name="visibility" value={newDiary.visibility} onChange={handleChange}>
            {Object.values(Visibility).map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
        <div>
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
