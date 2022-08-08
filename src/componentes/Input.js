import styled from 'styled-components';
import { useField } from 'formik';

const Control = styled.div
`
    margin-bottom:20px;
`;

const Label = styled.label
`
    color:black;
    display:block;
    margin-bottom:5px;
`;

const MiInput = styled.input
`
    width:100%;
    padding:10px;
    margin-bottom:5px;
`;

const MensajeError = styled.div
`
    color:red;
`;

const Input = ({label, ...props}) =>
{
    //Field devuelve las funciones, los valores etc
    //meta devuelve si hay error y si el elemento fue tocado o no
    const [field, meta] = useField(props);

    return (
        <Control>
            <Label>{label}</Label>
            <MiInput {...field} {...props}/>
            {meta.touched && meta.error ? <MensajeError>{meta.error}</MensajeError>:
                null
            }
        </Control>
    );
}

export default Input;