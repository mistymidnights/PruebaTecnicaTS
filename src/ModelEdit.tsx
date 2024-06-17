// ModelEdit.tsx
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDataContext } from './DataContext';
import { DataStructure, Content } from './Types';
import { Button, Form, Input, notification, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { IoArrowBackCircle } from 'react-icons/io5';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const ModelEdit: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // Obtener el ID de los parámetros de la URL
  const { data, loading, error, updateData } = useDataContext(); // Obtener datos y funciones del contexto
  const [model, setModel] = useState<DataStructure | null>(null);
  const [editedContent, setEditedContent] = useState<Content[]>([]); // Estado para los contenidos editados
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: 'Cambios guardados exitosamente',
    });
  };

  useEffect(() => {
    console.log(data);
    if (id && data) {
      const idNumber = parseInt(id, 10);
      // Buscar el modelo correspondiente al ID en los datos
      const selectedModel = data.find((m) => m.info.id === idNumber);
      if (selectedModel) {
        setModel(selectedModel);
        setEditedContent(selectedModel.content);
      } else {
        setModel(null);
        setEditedContent([]);
      }
    }
  }, [data, id]);

  const handleSave = () => {
    if (model) {
      const updatedModel: DataStructure = { ...model, content: editedContent };
      updateData(updatedModel); // Actualizar los datos utilizando la función del contexto

      openNotificationWithIcon('success');
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error || !model) {
    return <div>Error: {error ? error : 'Modelo no encontrado'}</div>;
  }

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
  };

  return (
    <>
      <div className='header-back'>
        <Link to={'/'}>
          <IoArrowBackCircle />
        </Link>
        <p className='back-btn-text'>Volver</p>
      </div>
      <h2>Editar Modelo {model.info.id}</h2>
      <Form
        {...layout}
        name='nest-messages'
        style={{
          maxWidth: '90%',
          margin: '0 auto',
          padding: '0 0 40px 0',
          height: '650px',
          overflowY: 'auto',
        }}
      >
        {editedContent.map((content, index) => (
          <div key={index} className='item'>
            {model.info.position ? (
              <p>
                <span>Posición {index}:</span> {model.info.position.join(', ')}
              </p>
            ) : null}
            {content.title ? (
              <Form.Item name={['title']} label={`Título ${index}`}>
                {' '}
                <Input
                  type='text'
                  value={content.title}
                  onChange={(e) =>
                    setEditedContent((prevContent) =>
                      prevContent.map((c, i) =>
                        i === index ? { ...c, title: e.target.value } : c
                      )
                    )
                  }
                />
              </Form.Item>
            ) : null}
            {content.desc ? (
              <Form.Item name={['Desc']} label={`Descripción ${index}`}>
                {' '}
                <TextArea
                  value={content.desc}
                  onChange={(e) =>
                    setEditedContent((prevContent) =>
                      prevContent.map((c, i) =>
                        i === index ? { ...c, desc: e.target.value } : c
                      )
                    )
                  }
                />
              </Form.Item>
            ) : null}
            {content.type ? (
              <p>
                <span>Tipo : </span> {content.type}
              </p>
            ) : null}
            {content.url ? (
              <p>
                <span>Url {index}:</span> {content.url}
              </p>
            ) : null}
            {content.miniature ? (
              <p>
                <span>Miniatura {index}:</span> {content.miniature}
              </p>
            ) : null}
          </div>
        ))}{' '}
        {contextHolder}
        <Form.Item className='centered'>
          <Space>
            <Button type='primary' onClick={handleSave}>
              Guardar Cambios
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default ModelEdit;
