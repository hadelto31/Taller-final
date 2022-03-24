import './App.css';
import React from 'react';
import { firebase } from './firebase';

function App() {

  const [nombres, setNombres]     = React.useState('')
  const [apellidos, setApellidos] = React.useState('')
  const [edad, setEdad]           = React.useState('')
  const [posicion, setPosicion]   = React.useState('')
  const [dorsal, setDorsal]       = React.useState('')
  const [telefono, setTelefono]   = React.useState('')
  const [correo, setCorreo]       = React.useState('')

  const [jugadores, setJugadores] = React.useState([])
  const [id, setId] = React.useState('')
  const [error, setError] = React.useState(null)
  const [modoEdicion, setModoEdicion] = React.useState(false)

  const obtenerDatos = async () => {
   try{
    const db = firebase.firestore()
    const data = await db.collection('jugadores').get()
    const arrayData = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setJugadores(arrayData)
    console.log(arrayData)
  }
  
  catch(error){
    console.log(error)
  }
 }

 React.useEffect(()=>{
    
  obtenerDatos()

 }, [])

  const agregarJugador = async (e) => {
   e.preventDefault()

  
   if(!nombres.trim()&&apellidos.trim()&&edad.trim()&&posicion.trim()&&dorsal.trim()&&telefono.trim()&&correo.trim()){
     setError('Digite los datos')
     return
    }

   try{
      const db = firebase.firestore()
      const nuevoJugador = {
          nombreJugador:nombres, 
          apellidosJugador:apellidos, 
          edadJugador:edad, 
          posicionJugador:posicion,
          dorsalJugador:dorsal, 
          telefonoJugador:telefono, 
          correoJugador:correo, 
          
        }

        const data = await db.collection('jugadores').add(nuevoJugador)

        setJugadores([
        ...jugadores,
        {id: data(), nombreJugador:nombres, apellidosJugador:apellidos, edadJugador:edad, posicionJugador:posicion, dorsalJugador:dorsal, telefonoJugador:telefono, correoJugador:correo}
        ])

        setNombres('')
        setApellidos('')  
        setEdad('')
        setPosicion('')
        setDorsal('')
        setTelefono('')
        setCorreo('')
        setError(null)
      
    }  

    catch(error){
      console.log(error)
    }
 }

 const eliminarJugador = async(id) => {
  try{
    const db = firebase.firestore()
    await db.collection('jugadores').doc(id).delete()
    const arrayFiltrado = jugadores.filter(item => item.id !== id)
    setJugadores(arrayFiltrado)
    setModoEdicion(false)
    setNombres('')
    setApellidos('')
    setEdad('')
    setId('')
    setPosicion('')
    setDorsal('')
    setTelefono('')
    setCorreo('')
    setError(null)  
  }
    
  catch(error){
    console.log(error)  
  } 
  
 }

 const editar = item =>{
    setError(null)
    setModoEdicion(true)
    setNombres(item.nombreJugador)
    setApellidos(item.apellidosJugador)
    setEdad(item.edadJugador)
    setPosicion(item.posicionJugador)
    setDorsal(item.dorsalJugador)
    setTelefono(item.telefonoJugador)
    setCorreo(item.correoJugador)
    setId(item.id)
  }

  const editarJugador = async(e) =>{
    if(!nombres.trim()&&apellidos.trim()&&edad.trim()&&posicion.trim()&&dorsal.trim()&&telefono.trim()&&correo.trim()){
      console.log('Digite los datos')
      setError('Digite los datos')
      return
    }

    try{
     const db = firebase.firestore()
     await db.collection('jugadores').doc(id).update({
       nombreJugador:nombres, 
       apellidosJugador:apellidos, 
       edadJugador:edad, 
       posicionJugador:posicion,
       dorsalJugador:dorsal, 
       telefonoJugador:telefono, 
       correoJugador:correo,
      })

      const arrayEditado = jugadores.map(
        item => item.id === id ? {id:id, nombreJugador:nombres, apellidosJugador:apellidos, edadJugador:edad, posicionJugador:posicion, dorsalJugador:dorsal, telefonoJugador:telefono, correoJugador:correo} : item
      )
      
      setJugadores(arrayEditado)
      setModoEdicion(false)
      setNombres('')
      setApellidos('')
      setEdad('')
      setId('')
      setPosicion('')
      setDorsal('')
      setTelefono('')
      setCorreo('')
      setError(null)
    }
    catch(error){
      console.log(error)
    }
  }

  const cancelar = () =>{
    setModoEdicion(false)
    setNombres('')
    setApellidos('')
    setEdad('')
    setId('')
    setPosicion('')
    setDorsal('')
    setTelefono('')
    setCorreo('')
    setError(null)
  }

  

  

  return (
    <div className="container mt-5">
      <h1 className="text-center">LISTA DE JUGADORES</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">PLANTILLA JUGADORES</h4>
          <ul className="list-group">
            {
              jugadores.map(item => (
                <li className="list-group-item" key={item.id}>
                  <span className="lead">{item.nombreJugador}</span>
                  
                      <button 
                        className='btn btn-danger btn-sm float-end mx-2'
                        onClick={() => eliminarJugador(item.id)}>Eliminar</button>
                      <button 
                      className='btn btn-warning btn-sm float-end'
                      onClick ={() => editar(item)}>Editar</button>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {
              modoEdicion ? 'Editar Jugador' : 'Informacion Jugador'
            }
          </h4>
          <form onSubmit={modoEdicion ? editarJugador : agregarJugador}>
            {
              error ? <span className='text-danger'>{error}</span> : null
            }
            <input
              type="text"
              className='form-control mb-2'
              placeholder='Ingrese Nombres'
              onChange={e => setNombres(e.target.value)}
              value = {nombres}
            />

            <input
              type="text"
              className='form-control mb-2'
              placeholder='Ingrese Apellidos'
              onChange={e => setApellidos(e.target.value)}
              value = {apellidos}
            />

            <input
              type="number"
              className='form-control mb-2'
              placeholder='Ingrese edad'
              onChange={e => setEdad(e.target.value)}
              value = {edad}
            />

            <input
              type="text"
              className='form-control mb-2'
              placeholder='Ingrese Posicion'
              onChange={e => setPosicion(e.target.value)}
              value = {posicion}
            />

            <input
              type="number"
              className='form-control mb-2'
              placeholder='Ingrese # Dorsal'
              onChange={e => setDorsal(e.target.value)}
              value = {dorsal}
            />

            <input
              type="number"
              className='form-control mb-2'
              placeholder='Ingrese # Telefonico'
              onChange={e => setTelefono(e.target.value)}
              value = {telefono}
            />

            <input
              type="mail"
              className='form-control mb-2'
              placeholder='Ingrese correo'
              onChange={e => setCorreo(e.target.value)}
              value = {correo}
            />

            

            {
              modoEdicion ?
               (<>
                 <button
                className="btn btn-warning btn-block" 
                type='submit'>Editar</button>
                <button
                className="btn btn-dark btn-block mx-2" 
                onClick ={() => cancelar()}>Cancelar</button>
               </>)
                : 
                (<button
                  className="btn btn-dark btn-block" 
                  type='submit'>Agregar</button>
                  )
            }
            
          </form>
        </div>
      </div>
      
    </div>
  );
}

export default App;
