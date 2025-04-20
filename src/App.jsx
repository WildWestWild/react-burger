import './App.css';
import { ingredientsJsonLink } from './Constants'
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import { useEffect, useState } from 'react';

function App() {
  const [response, setResponse] = useState({success: false, data : []});
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

  return (
    <div className="App">
      <AppHeader/>
      <div className=''>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
        <div className="App-Body">
        {hasData ? (
            <>
              <BurgerIngredients data={response.data} />
              <BurgerConstructor
                bun={response.data.find(item => item.type === 'bun')}
                ingredients={response.data.filter(item => item.type === 'main')}
                onOrderClick={null}
              />
            </>
          ) : (
            <p className="text text_type_main-medium">Загрузка ингредиентов...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
