/*
* CHALLENGE progresso do formulário

* INSTRUÇÕES
Neste desafio sua missão é criar um formulário e seus 4 campos (com controlled inputs),
juntamente com uma barra de progresso que altera-se conforme o usuário preenche os campos.
- Crie também validações para cada campo conforme instruções abaixo.

* BARRA DE PROGRESSO
Para aproveitar estilização já definida, crie:
- a barra com um elemento pai chamado .bar-container e seu filho .bar

* CAMPOS DO FORMULÁRIO:
input - nome completo - válido se digitar no mínimo dois nomes,
input - email - válido se digitar um e-mail,
select - estado civil,
radio - gênero

Para validação de e-mail use a seguinte RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

* FUNCIONAMENTO
Espera-se que o formulário tenha 4 campos ao todo. Portanto, quando o usuário preencher
o primeiro campo, a barra de progresso deve assumir 25% do tamanho total;
o segundo campo, 50% e assim por diante...

Caso o usuário não tenha definido valores para os elementos de select e radio,
os mesmos não devem ser considerados como preenchidos até então.

Se o usuário preencher um campo e apagar seu valor, este campo deve ser considerado como vazio,
fazendo com que a barra de progresso regrida novamente.

Desabilitar o botão de enviar caso todos os campos não estejam preenchidos/válidos.

Ao enviar, deve-se apresentar um alert javascript com sucesso, limpar todos os campos
do formulário e zerar a barra de progresso novamente.
*/
"use client";
import { useEffect, useState } from "react";
import { data, returnData } from "./types";

export default function Home() {
  const [data, setData] = useState<data>({
    fullName: "",
    email: "",
    maritalStatus: "",
    genre: null,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(name, value);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newData = event.target.value;
    setData((prev) => ({
      ...prev,

      genre: event.target.value as null | "masculino" | "feminino",
    }));

    console.log(newData);
  };

  const calculateProgress = () => {
    let value = 0;
    let amount = 25;

    if (data.email) {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (pattern.test(data.email)) {
        value += amount;
      }
    }

    if (data.fullName) {
      const explodedString = data.fullName.split(" ");
      console.log(explodedString);

      if (explodedString[1]) {
        value += amount;
      }
    }

    if (data.genre) {
      value += amount;
    }

    if (data.maritalStatus) {
      value += amount;
    }

    return value;
  };

  const sendForm = () => {
    alert("enviado com sucesso");
    setData({
      fullName: "",
      email: "",
      maritalStatus: "",
      genre: null,
    });
  };

  return (
    <div className="App">
      <h3>desafio fernandev</h3>
      <h1>progresso do formulário</h1>

      <main>
        {/* crie a barra de progresso aqui */}

        <div className="bar-container">
          <div
            className="bar"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        <div className="form-group">
          <label htmlFor="">Nome Completo</label>
          <input
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">E-mail</label>
          <input name="email" value={data.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="">Estado Civil</label>
          <select
            name="maritalStatus"
            value={data.maritalStatus}
            onChange={handleChange}
          >
            <option value="">- selecione...</option>
            <option value="solteiro">Solteiro</option>
            <option value="casado">Casado</option>
            <option value="divorciado">Divorciado</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="">Gênero</label>
          <div className="radios-container">
            <span>
              <input
                type="radio"
                name="genre"
                value="masculino"
                checked={data.genre === "masculino"}
                onChange={handleRadioChange}
              />{" "}
              Masculino
            </span>
            <span>
              <input
                type="radio"
                name="genre"
                value="feminino"
                checked={data.genre === "feminino"}
                onChange={handleRadioChange}
              />{" "}
              Feminino
            </span>
          </div>
        </div>
        <button onClick={sendForm} disabled={calculateProgress() !== 100}>
          Enviar Formulário
        </button>
      </main>
    </div>
  );
}
