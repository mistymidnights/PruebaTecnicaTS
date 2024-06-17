import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Space, Select } from 'antd';
import { IoArrowBackCircle } from 'react-icons/io5';
import { useDataContext } from './DataContext';
import { DataStructure, Content } from './Types';

const { TextArea } = Input;

const NewModelForm: React.FC = () => {
  const { data, addModel } = useDataContext();
  const navigate = useNavigate();

  const getNextAvailableId = useCallback(() => {
    const lastId = data.length > 0 ? data[data.length - 1].info.id : 0; //Busca el siguiente ID disponible
    return lastId + 1;
  }, [data]);

  // Estructura del nuevo item que se agrega a la lista con sus estados iniciales. Primeramente en blanco ya que si no... no se mostrarian en el formulario
  const [newModel, setNewModel] = useState<DataStructure>(() => ({
    info: {
      id: getNextAvailableId(),
      position: [0, 0, 0],
    },
    content: [{ title: '', desc: '', type: '', url: '', miniature: '' }],
  }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewModel((prevModel) => ({
      ...prevModel,
      info: {
        ...prevModel.info,
        [name]: name === 'position' ? value.split(',').map(Number) : value,
      },
    }));
  };

  // Hacemos una copia del estado del modelo anterior y se actualiza con el nuevo contenido e index
  const handleContentChange = (
    index: number,
    key: keyof Content,
    value: string
  ) => {
    setNewModel((prevModel) => ({
      ...prevModel,
      content: prevModel.content.map((c, i) =>
        i === index ? { ...c, [key]: value } : c
      ),
    }));
  };

  // Al utilizar la funcion se agrega un nuevo modelo a la lista
  const handleSubmit = () => {
    addModel(newModel);
    console.log('Nuevo modelo:', newModel);
    navigate('/'); // Redirigir a la página principal o a la lista de modelos
  };

  return (
    <>
      <div className='header-back'>
        <Link to='/'>
          <IoArrowBackCircle />
        </Link>
        <p className='back-btn-text'>Volver</p>
      </div>
      <h2>Nuevo Modelo</h2>
      <Form
        layout='vertical'
        name='nest-messages'
        onFinish={handleSubmit}
        style={{
          maxWidth: '90%',
          margin: '0 auto',
          padding: '0 0 40px 0',
          height: '650px',
          overflowY: 'auto',
        }}
      >
        <Form.Item label='ID'>
          <Input
            type='number'
            name='id'
            value={newModel.info.id}
            onChange={handleInputChange}
            disabled // Deshabilitar la edición del ID para que no pueda ser editado ya que se asigna el siguiente ID disponible
          />
        </Form.Item>
        <Form.Item label='Posición'>
          <Input
            type='text'
            name='position'
            value={newModel.info.position.join(', ')}
            onChange={handleInputChange}
          />
        </Form.Item>
        {newModel.content.map((content, index) => (
          <React.Fragment key={index}>
            <Form.Item label={'Título'}>
              <Input
                type='text'
                name={'title'}
                value={content.title}
                onChange={(e) =>
                  handleContentChange(index, 'title', e.target.value)
                }
              />
            </Form.Item>
            <Form.Item label={`Descripción`}>
              <TextArea
                name={'desc'}
                value={content.desc}
                onChange={(e) =>
                  handleContentChange(index, 'desc', e.target.value)
                }
              />
            </Form.Item>
            <Form.Item label={`Tipo`} style={{ width: 120, flex: 'none' }}>
              <Select
                style={{ width: 200 }}
                onChange={(selectedValue) =>
                  handleContentChange(index, 'type', selectedValue)
                }
                options={[
                  { value: 'image', label: 'Imagen' },
                  { value: 'modelo2d', label: '2D' },
                  { value: 'modelo3d', label: '3D' },
                  { value: 'video', label: 'Video' },
                ]}
              />
            </Form.Item>
            <Form.Item label={`Url`}>
              <Input
                type='url'
                name={'url'}
                value={content.url}
                onChange={(e) =>
                  handleContentChange(index, 'url', e.target.value)
                }
              />
            </Form.Item>
          </React.Fragment>
        ))}
        <Form.Item className='centered'>
          <Space>
            <Button type='primary' htmlType='submit'>
              Crear Nuevo Modelo
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default NewModelForm;
