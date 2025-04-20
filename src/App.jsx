import './App.css';
import { ingredientsJsonLink, orderInformation } from './Constants'
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import { useEffect, useState } from 'react';

function UpdateCountersInResponse(response, selectedBun, selectedOtherIngredients){
    return response.map(item => {
      if(item._id === selectedBun._id || selectedOtherIngredients.some(ingredient => ingredient._id === item._id)) {
        item.count = 1;
      }

      return item;
    });
}

function App() {
  const [response, setResponse] = useState({success: false, data : []});
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const getProductData = async () => {
      try {
        const res = await fetch(ingredientsJsonLink);
        const data = await res.json();
        setResponse(data);
      } catch (error) {
        console.log(error);
      } 
    }

    getProductData();
  }, []);

  const hasData = response.success;
  const bun = response.data.find(item => item.type === 'bun');

  const mains = response.data.filter(item => item.type === 'main');

  const shownIngredientsWithCounters = UpdateCountersInResponse(response.data, bun, mains);

  return (
    <div className="App">
      <AppHeader/>
      <div className="App-h1">
          <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      </div>
      
      <div className="App-Body">
        {hasData ? (
            <>
              <BurgerIngredients data={shownIngredientsWithCounters} />
              <BurgerConstructor
                bun={bun}
                ingredients={mains}
                isModalOpen={isModalOpen}
                setIsModelOpen={setIsModalOpen}
                orderInformation={orderInformation}
              />
            </>
          ) : (
            <p className="text text_type_main-medium">Загрузка ингредиентов...</p>
          )}
        </div>
      </div>
  );
}

export default App;
