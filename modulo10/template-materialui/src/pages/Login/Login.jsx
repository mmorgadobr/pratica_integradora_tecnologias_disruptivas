import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, Input, FormHelperText, colors } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Login = () => {
    const [usuario, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        if (usuario === 'admin' && senha === 'admin') {
            navigate('/listar-tarefas'); // Redireciona para a página ListarTarefas
        } else {
            setError('Usuário ou senha inválidos');
            setOpen(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Card sx={style}> 
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <FormHelperText id="login_usuario">Usuário</FormHelperText>
                        <Input  id="login_usu" aria-describedby="login_usuario_helper_text" value={usuario} onChange={e => { setLogin(e.target.value) }} />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <FormHelperText id="login_senha">Senha</FormHelperText>
                        <Input  id="login_pass" aria-describedby="login_senha_helper_text" value={senha} onChange={e => { setSenha(e.target.value) }} type="password"  />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button size="small" variant="contained" onClick={handleLogin} sx={{ marginRight: 1 }}>Login</Button>
                    <Button size="small" variant="contained" onClick={() => navigate('/')}>Cancelar</Button>
                </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </MuiAlert>
            </Snackbar>
        </Card>
    );
}

const style = {

    bgcolor: 'background.paper',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    p: 3,
    border: "1px solid gray"
};


export default Login;
