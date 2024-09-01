import { useEffect, useState } from 'react';
import { axiosInstance } from '../config/axios';

export const useData = <T,>({
  url,
  method = 'get',
}: {
  url: string;
  method?: string;
}) => {
  const [data, setData] = useState<T[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState();
  useEffect(() => {
    function refetch() {
      axiosInstance
        .get(url)
        .then((response) => {
          setData(response.data.data);
          setLoading(false);
        })
        .catch((error) => setError(error));
    }
    if (method === 'get') refetch();
  }, [url, method]);
  return { data, loading, error };
};

export const usePost = (dispatch) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState();
  const postData = async (url: string, data: unknown) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(url, data);
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      dispatch({ type: 'open', data: error.message, mode: 'error' });
      setError(error);
      setLoading(false);
    }
  };
  return { postData, loading, error, data };
};
