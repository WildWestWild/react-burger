import './App.css';
import { Data } from './utils/data'
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <div className=''>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
        <div className="App-Body">
          <BurgerIngredients data={Data}/>
          <BurgerConstructor bun={Data.filter(item => item.type === 'bun')[0]} ingredients={Data.filter(item => item.type === 'main')} onOrderClick={null} />
        </div>
      </div>
    </div>
  );
}

export default App;
