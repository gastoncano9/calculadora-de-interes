import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from './componentes/Input';
import Boton from './componentes/Boton';
import { useState } from 'react';

const Conteiner = styled.div
` 
  display:flex;
  justify-content:center;
  height:100%;
  align-items:center;
`;

const Tarjeta = styled.section
`
  background:#eee;
  border-top:2px solid palevioletred;
  padding:20px 25px;
  box-shadow: 0px 2px 3px rgb(0,0,0,0.3);
  width:500px;
`;

const Balance = styled.span
` 
  margin-top:15px;
  font-size:20px;
  color:black;
  display:inline-block;
`;

const formato = new Intl.NumberFormat('en-US', 
{
  style:'currency',
  currency:'USD',
  minimumFractionDigits:2,
  maximumFractionDigits:2
});

const calcularInteres = (deposito, contribucion, years, interes) =>
{
  let total = deposito;

  for(let i = 0;i<years;i++)
  {
    total = (total + contribucion) * (interes + 1)
  }

  return Math.round(total);
}

function App() {

  const [balance, setBalance] = useState(0);

  const submit = ({deposito, contribucion, years, interes}) =>
  {
    let valor = calcularInteres(parseFloat(deposito), parseFloat(contribucion), parseFloat(years), parseFloat(interes));

    setBalance(formato.format(valor));
  }

  return (
    <Conteiner>
      <Tarjeta>
        <Formik
          initialValues={{
            deposito:'',
            contribucion:'',
            years:'',
            interes:''
          }}

          onSubmit={submit}

          validationSchema = {Yup.object(
          {
            deposito: Yup.number().required('Requerido').typeError('Solo ingrese numeros'),
            contribucion: Yup.number().required('Requerido').typeError('Solo ingrese numeros'),
            years: Yup.number().required('Requerido').typeError('Solo ingrese numeros'),
            interes: Yup.number().required('Requerido').typeError('Solo ingrese numeros').
            min(0, 'El valor minimo es cero').max(1, 'El valor maximo es 1')
          })}
        >
          <Form>
            <Input name = "deposito" label = "Deposito inicial"/>
            <Input name = "contribucion" label = "Contribución"/>
            <Input name = "years" label = "Años"/>
            <Input name = "interes" label = "Interes"/>
            <Boton type = "submit">Calcular</Boton>
          </Form>
        </Formik>
        {balance !== 0 ? <Balance>Balance final: {balance}</Balance> : null}
      </Tarjeta>
    </Conteiner>
  );
}

export default App;
