import {Router} from 'express'
import {agregarAlumno, borrarAlumno, editarAlumno, verAlumnoId, verAlumnos} from '../controllers/alumnos.controller'
import {agregarCasino, borrarCasino, editarCasino, verCasinoId, verCasinos} from '../controllers/casinos.controller'
import {canjeAlumno, verCanjeRut} from '../controllers/canjes.controller'
import {loginUsuario, agregarUsuario, verUsuarios, borrarUsuario, verUsuarioId} from '../controllers/login.controller'
import { checkToken, checkUser} from '../middlewares/auth'

const router = Router()

//endpoint alumnos
router.get('/alumnos', checkToken, verAlumnos);
router.get('/alumnos/:id', checkUser, verAlumnoId);
router.post('/alumnos', checkUser, agregarAlumno);
router.delete('/alumnos/:id', checkUser, borrarAlumno);
router.put('/alumnos/:id', checkUser, editarAlumno);

//endpoint casinos
router.get('/casinos', checkToken, verCasinos);
router.get('/casinos/:id', checkUser, verCasinoId);
router.post('/casinos', checkUser, agregarCasino);
router.delete('/casinos/:id', checkUser, borrarCasino);
router.put('/casinos/:id', checkUser, editarCasino);

//endpoint canjes en la raspberry
router.get('/canjes/:rut/:idCasino', verCanjeRut);
router.patch('/canjes/:rut/:idCasino', canjeAlumno);

//endpoint login
router.post('/login', loginUsuario);

//endpoint admin
router.get('/admin', checkUser, verUsuarios);
router.get('/admin/:id', checkUser, verUsuarioId);
router.post('/admin',checkUser, agregarUsuario);
router.delete('/admin/:id',checkUser, borrarUsuario);

export default router;