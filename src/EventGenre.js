import React from 'react';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Label, Cell, Legend, ResponsiveContainer } from 'recharts';

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

  const chartColors = ['#44ddd1', '#eb85ee', '#9daee0', '#28857d', '#6e6089', '#61b0c5'];

  return (

    <ResponsiveContainer height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label={({ percent }) =>
            `${(percent * 100).toFixed(0)}%`
          }>
          <Label value={`Total: ${events.length}`} offset={0} position="center" fill={chartColors[0]} />

          {data.map((entry, index) => (
            <Cell key={`cell-${index}`}
              fill={chartColors[index]}
              stroke={chartColors[index]} />
          ))
          }
        </Pie>
        <Legend verticalAlign="top" align="center" />
      </PieChart>
    </ResponsiveContainer>

  );
}

export default EventGenre;