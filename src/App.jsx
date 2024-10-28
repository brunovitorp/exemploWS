import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const basePoint = `http://localhost:3000/nomes`;
  const [nomes, setNomes] = useState([]); 
  const [novoNome, setNovoNome] = useState({
    nome: "",
  }); //utilizado para manipular os nomes e enviar ao server

  const inserirNome = async () => {
    try {
      const response = await axios.post(basePoint, novoNome); // Enviando novoNome
      setNomes([...nomes, response.data]); // Atualiza a lista de nomes
      setNovoNome({ nome: "" }); // Limpa o campo de entrada
    } catch (error) {
      console.log(`Error`, error);
    }
  };

  const carregarDados = async () => {
    try {
      const response = await axios.get(basePoint);
      setNomes(response.data); // Atualiza o estado com os dados recebidos
    } catch (error) {
      console.log(`erro ao carregar nomes`, error);
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
              {/* <button type="button">Editar</button>
              <button type="button">Apagar</button> */}
            </div>
            
          ))}
      </div>
    </>
  );
}

export default App;
