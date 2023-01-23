import axios from 'axios';
import { useState, useEffect } from 'react';
import { ResourceEntries, ResourceEndpointObject, Entries } from '../types';

export const useEndpoints = () => {
  const [endpoints, setEndpoints] = useState<ResourceEntries[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get<ResourceEndpointObject>(
        'https://pokeapi.co/api/v2/'
      );

      setEndpoints(Object.entries(res.data) as ResourceEntries[]);
    };

    getData();
  }, []);

  return endpoints;
};
