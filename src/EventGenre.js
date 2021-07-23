import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Label, Cell, ResponsiveContainer } from 'recharts';

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
      const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS', 'Angular'];
      const data = genres.map((genre) => {
        const value = events.filter(({ summary }) =>
          summary
            .replace('.js', '') //Node.js 
            .replace(',', '') //jQuery, 
            .replace('!!', '') //JavaScript!! 
            .replace('-Remote', '') //AngularJS-Remote
            .split(' ')
            .includes(genre),
        ).length;
        return { name: genre, value };
      });
      return data.filter((data) => data.value !== 0);
    };
    setData(() => getData());
  }, [events]);

  return (
    <ResponsiveContainer height={400}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="200"
          cy="200"
          labelLine={false}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
        </Pie>
      </PieChart>
    </ResponsiveContainer>

  )
}

export default EventGenre;