import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';

import CriarTarefa from './CriarTarefa';
import EditarTarefa from './EditarTarefa';

//A função abaixo é usada para criar o array contendo os dados iniciais da listagem de tarefas.
function createData(
  idTarefa: number,
  tituloTarefa: string,
  descricaoTarefa: string,
  inicioTarefa: string,
  fimTarefa: string,
  statusTarefa: string,
  recursoTarefa: string,
) {
  return { idTarefa, tituloTarefa, descricaoTarefa, inicioTarefa, fimTarefa, statusTarefa, recursoTarefa };
}

//Definição do array contendo os dados iniciais da listagem de tarefas
const initialRows = [
  createData(1, 'Tela Login', 'Feito a tela de login com usuário e senha', '2024-06-02', '2024-06-02', 'Concluída', 'Recurso 1'),
  createData(2, 'Ajustes nos alinhamentos', 'Feito o alinhamento dos componentes', '2024-06-02', '2024-06-02', 'Concluída', 'Recurso 1'),
  createData(2, 'Ajuste botão Sair', 'Feito o ajuste no código para sair do sistema', '2024-06-02', '2024-06-02', 'Concluída', 'Recurso 1'),
];

//Componente ListarTarefa
const ListarTarefa = () => {
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState();
  const [idTarefaSelecionada, setIdTarefaSelecionada] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEditar = () => setOpenEditar(true);
  const handleCloseEditar = () => setOpenEditar(false);
  const navigate = useNavigate(); // Hook para navegação

  //O array definido acima é setado como conteúdo do state Tarefas na renderização inicial do componente.
  useEffect(() => {
    setTarefas(initialRows);
  },[]);

  const handleEditar = (id) => {
    setIdTarefaSelecionada(id);

    //Objeto local para armazenamento da tarefa filtrada de acordo com a seleção do usuário
    let tarefaParaEditar = tarefas.filter(obj => {
      return obj.idTarefa === id;
    })[0];

    //Atribuição do Objeto local, setado acima, ao state Tarefa
    setTarefa(tarefaParaEditar);

    //Seta como true o state responsável pela exibição do Model de Editar Tarefa
    setOpenEditar(true)
  };

  const handleDeletar = (id) => {
    setTarefas(current =>
      current.filter(tarefa => {
        return tarefa.idTarefa !== id;
      }),
    );
  };

  const handleVoltar = () =>{
    navigate('/'); // Redireciona para a página ListarTarefas
  };

    return(
    <>
    <Card>
        <CardHeader
          align="center"
          title="Tarefas"
          subheader="Listagem de Tarefas"
        /> 
        <CardContent>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Título</TableCell>
                    <TableCell align="left">Descrição</TableCell>
                    <TableCell align="left">Data de Início</TableCell>
                    <TableCell align="left">Data de Finalização</TableCell>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="left">Recurso</TableCell>
                    <TableCell align="left">Editar</TableCell>
                    <TableCell align="left">Excluir</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {tarefas.map((row, indice) => (
                    <TableRow
                    key={indice}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                          {row.idTarefa}
                      </TableCell>
                      <TableCell component="th" scope="row">
                          {row.tituloTarefa}
                      </TableCell>
                      <TableCell align="left">{row.descricaoTarefa}</TableCell>
                      <TableCell align="left">{row.inicioTarefa}</TableCell>
                      <TableCell align="left">{row.fimTarefa}</TableCell>
                      <TableCell align="left">{row.statusTarefa}</TableCell>
                      <TableCell align="left">{row.recursoTarefa}</TableCell>
                      <TableCell align="left">
                        <Button variant="contained" color="success" onClick={() => handleEditar(row.idTarefa)}><EditIcon fontSize="small" /></Button>            
                      </TableCell>
                      <TableCell align="left">
                        <Button variant="contained" color="error" onClick={() => handleDeletar(row.idTarefa)}><DeleteIcon fontSize="small" /></Button>            
                      </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </CardContent>
        <CardActions>
            <Button size="medium" variant="contained" onClick={handleOpen}>Nova Tarefa</Button>
            <Button size="medium" variant="outlined" onClick={handleVoltar}>Sair</Button>
      </CardActions> 
    </Card>
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <CriarTarefa handleClose={handleClose} tarefas={tarefas} setTarefas={setTarefas} />
        </div>
      </Modal>  
    </div>
    <div>
      <Modal
        open={openEditar}
        onClose={handleCloseEditar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <EditarTarefa handleCloseEditar={handleCloseEditar} idTarefaSelecionada={idTarefaSelecionada} tarefas={tarefas} tarefa={tarefa} setTarefas={setTarefas} />
        </div>
      </Modal>  
    </div>
  </>    
 );
};
 
export default ListarTarefa;