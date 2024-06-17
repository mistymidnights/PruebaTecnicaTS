// ModelList.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MdRemoveCircle } from 'react-icons/md';
import { RiEditCircleFill } from 'react-icons/ri';
import { BsPlusSquare } from 'react-icons/bs';
import { useDataContext } from './DataContext';
import type { PopconfirmProps } from 'antd';
import { message, Popconfirm } from 'antd';

const ModelList: React.FC = () => {
  const { data, loading, error, deleteModel } = useDataContext();

  // Confirm y Cancel se utilizan para abrir el popup antes de borrar el item de la lista de modelos. Necesita una confirmación
  const confirm =
    (id: number): PopconfirmProps['onConfirm'] =>
    () => {
      deleteModel(id);
      message.success('Borrado correctamente');
    };

  const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e);
    message.error('Borrado cancelado');
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Asegurar que data sea un array antes de mapearlo
  if (!Array.isArray(data)) {
    console.error('Data is not an array:', data);
    return <div>Error: Datos no válidos</div>;
  }

  return (
    <>
      <header className='App-header'>
        <Link to={'/new'} className='new-btn'>
          <BsPlusSquare className='icon-btn' />
          <p className='text-btn'>Nuevo modelo</p>
        </Link>
      </header>
      <h1>Lista de modelos</h1>
      <div className='scrolleable'>
        {data.map((model) => (
          <div className='model-card' key={model.info.id}>
            <h3>Modelo {model.info.id}</h3>
            <div className='btn-container'>
              <Link to={`/edit/${model.info.id}`} className='edit-btn'>
                <RiEditCircleFill />
              </Link>

              <button className='remove-btn red'>
                <Popconfirm
                  title='Eliminar modelo'
                  description='¿Estás seguro de que quieres eliminar el modelo?'
                  onConfirm={confirm(model.info.id)}
                  onCancel={cancel}
                  okText='Sí'
                  cancelText='No'
                >
                  <MdRemoveCircle />
                </Popconfirm>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ModelList;
