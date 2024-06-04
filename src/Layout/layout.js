import axios from 'axios';
import {useState } from 'react';


export default function InfoPanel(){

    const [query, setQuery] = useState(''); // Guarda el input 
    const [facts, setFacts] = useState([]); // Guarda la lista de facts con sus atributos
    const [loading, setLoading] = useState(false); // Estado para cuando se este cargando la peticion
    const [favorites, setFavorites] = useState([]); // Guarda los favoritos
    const [showFavorites, setShowFavorites] = useState(false); // Toggle para mostrar los favoritos


    const searchFacts = async () => {
          if (!query.trim()) {
            alert('Por favor ingresa un valor para buscar');
            return;
        }
        setLoading(true);
        const result = await axios.get(`https://api.chucknorris.io/jokes/search?query=${query}`);
        if (result.status === 200) {
          setFacts(result.data.result);
        }
        setLoading(false);
        if(showFavorites){  // Si esta en favoritos y se busca alguna palabra se pone en false los favoritos
          setShowFavorites(false);
        }
      };
      
      const addToFavorites = (fact) => {  //Cada vez que se apreta un boton se agrega un fact a favoritos
        setFavorites([...favorites, fact]);
      };
      
      const toggleFavorites = () => {    //Toggle para mostrar los favoritos
        setShowFavorites(!showFavorites);
      }; 

    return(
      <div className="container mx-auto bg-gray-100 text-gray-800">
      <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
      />
      <button onClick={searchFacts} disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search</button>
      <button onClick={toggleFavorites} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Ver mis favoritos</button>
      {loading && <p>Loading...</p>}
      {!loading && !showFavorites && (facts.length > 0 ? 
        facts.map((fact, index) => (
            <div key={index} className="flex justify-between flex-col bg-white p-4 my-2 rounded shadow">
                <p>{fact.value}</p>
                <div className="flex justify-between">
                    <p>Creado en: {new Date(fact.created_at).toLocaleDateString()}</p>
                    {fact.categories.length > 0 && <p>Categorías: {fact.categories.join(', ')}</p>}
                </div>
                <button onClick={() => addToFavorites(fact)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Like</button>
            </div>
        )) : 
        <p className='mb-4'>No se ha encontrado nada</p>
    )}
      {!loading && showFavorites && (favorites.length > 0 ? 
        favorites.map((fact, index) => (
            <p key={index} className="bg-white p-4 my-2 rounded shadow">{fact.value}</p>
        )) : 
        <p className='mb-4'>Todavía no has like a ningun fact</p>
      )}
  </div>
    )
} 