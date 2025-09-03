import { useEffect, useState } from 'react';

type School = {
  schoolName: string;
  schoolLevel: string;
  distance: number;
  rating: number;
  lowGrade: string;
  highGrade: string;
  latLong?: { latitude: number ; longitude: number  }; 
};

export default function SchoolList({ state, city }: { state: string; city: string }) {
  const [schools, setSchools] = useState<School[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch(`/api/schools?state=${state}&city=${city}`);
        if (!res.ok) throw new Error('');
        const data = await res.json();

        const mappedSchools = data.schoolList?.map((s: any) => ({
          schoolName: s.schoolName,
          schoolLevel: s.schoolLevel,
          distance: s.distanceInMiles,
          rating: s.schoolRating || null,
          lowGrade: s.lowGrade,
          highGrade: s.highGrade,
        })) || [];

        setSchools(mappedSchools);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchSchools();
  }, [state, city]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Nearby Schools</h2>
      {schools.length === 0 ? (
        <p>No schools found.</p>
      ) : (
        <ul>
          {schools.map((school, idx) => (
            <li key={idx}>
              <strong>{school.schoolName}</strong> ({school.lowGrade}–{school.highGrade})<br />
              Level: {school.schoolLevel}<br />
              Distance: {school.distance} miles<br />
              Rating: {school.rating ?? 'N/A'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
