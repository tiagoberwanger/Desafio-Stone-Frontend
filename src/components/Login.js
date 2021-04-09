import React, { useState, useEffect } from 'react';
import { Form, Button, ButtonGroup, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
const axios = require('axios');

function Login () {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  })

  const handleClick = (e) => {
    e.preventDefault();
    try {
      axios({
        method: 'post',
        url: 'http://localhost:3001/login',
        headers: {'Content-Type': 'application/json'}, 
        data: {
           email: email,
           password: password
        }
      })
        .then((response) => {
          console.log(response.data);
          localStorage.setItem('token', JSON.stringify(response.data.token))
          localStorage.setItem('user', JSON.stringify({email}))
          history.push('/home');
        })
        .catch((err) =>{
          if (err && err.response.status === 400) {
            setError('Usuário não cadastrado!')
            console.log('Usuário não cadastrado!')
          }
        })
    } catch (err) {
      console.log(err.message)
    }
   
  }

  return (
    <div className="container mt-5 p-5 text-center bg-light">
        <Image src='marvel-logo.png' fluid />
        <Form className="mt-5">
        <Form.Group className='col-lg-offset-12'>
          <Form.Label htmlFor="email-input">Email</Form.Label>
          <Form.Control type="email" placeholder="Digite seu email" onChange={(e) => setEmail(e.target.value)} />
          <Form.Text id="email-help" className="text-muted">Deve ser um email válido</Form.Text>
        </Form.Group>
          <span>{error}</span>
        <Form.Group className='col-lg-offset-12'>
          <Form.Label htmlFor="password-input">Senha</Form.Label>
          <Form.Control type="password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)} />
          <Form.Text id="password-help" className="form-text text-muted">Deve ter no mínimo 6 caracteres</Form.Text>
        </Form.Group>
        <ButtonGroup size="lg" vertical>
          <Button variant='dark' className='mb-2' onClick={(e) => handleClick(e)}>Entrar</Button>
          <Link to='/register'>
            <Button type="button" variant='secondary'>Ainda não tenho conta</Button>
          </Link>
        </ButtonGroup>
      </Form>
    </div>
  );
};

export default Login;