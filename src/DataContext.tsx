// DataContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { DataStructure, DataContextType } from './Types';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataContextProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<DataStructure[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch('/jsonEjemplo.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setData(data.json);
      setLoading(false);
    } catch (error) {
      setError((error as Error).message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); //

  const updateData = (updatedModel: DataStructure) => {
    const updatedData = data.map((m) =>
      m.info.id === updatedModel.info.id
        ? { ...m, content: updatedModel.content }
        : m
    );
    setData(updatedData);
  };

  const deleteModel = (id: number) => {
    const updatedData = data.filter((model) => model.info.id !== id);
    setData(updatedData);
  };

  const addModel = (newModel: DataStructure) => {
    setData((prevData) => [...prevData, newModel]);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        loading,
        error,
        fetchData,
        updateData,
        deleteModel,
        addModel,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
