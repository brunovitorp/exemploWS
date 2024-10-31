import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const API_KEY = ``
  const basePoint = `http://localhost:3000/nomes`;
  const [nomes, setNomes] = useState([]); 
  const [novoNome, setNovoNome] = useState({
    nome: "",
  }); //utilizado para manipular os nomes e enviar ao server

  const inserirNome = async () => {
    try {
      const response = await axios.post(basePoint, novoNome); // Enviando novoNome
      setNomes([...nomes, response.data]); // Atualiza a lista de nomes
      console.log('Nome inserdo', response.data)
      setNovoNome({ nome: "" }); // Limpa o campo de entrada
    } catch (error) {
      console.log(`Error`, error);
    }
  };

  const getGeoCode = async (endereco) =>{
    try{

      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        address: endereco,   // Endereço a ser geocodificado
        key: API_KEY        // Chave de API para autenticação
      }
    });

    const location = response.data.results[0].geometry.location;
    const latitude = location.lat;
    const longitude = location.lng;

    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    console.log(response.data)

    }catch(error){
      console.log(`Error`, error);
    }
  }

getGeoCode('54774400')



  const carregarDados = async () => {
    try {
      const response = await axios.get(basePoint);
      setNomes(response.data); // Atualiza o estado com os dados recebidos
    } catch (error) {
      console.log(`erro ao carregar nomes`, error);
    }
  };

  const apagarNome = async (id) => {
    try {
      const response = await axios.delete(`${basePoint}/${id}`);
      console.log("Nome excluido",response.data);
    } catch (error) {
      console.log(`erro ao apagar nomes`, error);
    }
  };

  useEffect(() => {
    carregarDados();
  });

  return (
    <>
      <div className="form">
        <label htmlFor="nome">Nome: </label>
        <input
          type="text"
          name="nome"
          id="nome"
          value={novoNome.nome}
          onChange={(e) => setNovoNome({ ...novoNome, nome: e.target.value })}
        />
        <button type="button" onClick={inserirNome}>
          Enviar
        </button>
      </div>

      <div className="card-container">
        {Array.isArray(nomes) &&
          nomes.map((nome) => (
            <div className="card" key={nome.id}>
              <p>{nome.nome}</p>
              {/* <button type="button" onClick={()=> editarNome(nome)}>Editar</button> */}
              <button type="button" onClick={()=> apagarNome(nome.id)}>Apagar</button> 
            </div>
            
          ))}
      </div>
    </>
  );
}

export default App;
