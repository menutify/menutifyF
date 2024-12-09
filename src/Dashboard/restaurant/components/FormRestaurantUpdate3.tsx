import Parr from '@/components/my/Parr';
import Title2 from '@/components/my/Title2';
import { useDataGlobalContext } from '@/Context/GlobalContext';
import { restaurantData } from '@/data/text';

function FormRestaurantUpdate3() {
  const currencies = ["ARS", "USD", "BRL"]; // Opciones disponibles
  const {restaurant,setRestaurant} = useDataGlobalContext(); // Estado inicial con índice 0

  const handleCurrencyChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    const index = event.target.value; // Capturamos el índice seleccionado
    setRestaurant({...restaurant,currency:index});
  };

  return (
    <div className='w-full flex-complete flex-col gap-3 mb-3' style={{ textAlign: "center", marginTop: "20px" }}>
      <Title2 className='text-xl md:text-3xl'>{restaurantData.modal_currency}</Title2>
      <Parr className='text-md md:text-xl'>{restaurantData.modal_currency_text}</Parr>
      <select className='w-full'
        value={restaurant.currency}
        onChange={handleCurrencyChange}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      >
        {currencies.map((currency, index) => (
          <option key={index} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRestaurantUpdate3
