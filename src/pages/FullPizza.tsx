import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
    description: string;
  }>();

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://6315a6a55b85ba9b11e3fc35.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        console.log(error);
        alert('Ошибка при получении пиццы');
      }
    })();
  }, []);

  if (!pizza) {
    return <div className="container">Загрузка...</div>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="Пицца" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
      <p>{pizza.description || ''}</p>
    </div>
  );
};

export default FullPizza;
