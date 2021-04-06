import axios, { AxiosResponse } from 'axios';
import { Publisher, PublisherDTO, PublisherForm } from './types';

interface GetPublishersResponse extends AxiosResponse {
    data: PublisherDTO[];
}

interface GetPublisherResponse extends AxiosResponse {
    data: PublisherDTO;
}

export const getPublishersQuery: () => Promise<Publisher[]> = () =>
    axios.get('/api/publishers').then((res: GetPublishersResponse) => {
        return res.data.map((val: PublisherDTO) => {
            return {
                id: val._id,
                name: val.name,
                createdAt: new Date(val.createdAt),
            };
        });
    });

export const createPublisherQuery: (
    body: PublisherForm,
) => Promise<Publisher> = (body: PublisherForm) =>
    axios.post('/api/publishers', body).then((res: GetPublisherResponse) => {
        return {
            id: res.data._id,
            name: res.data.name,
            createdAt: new Date(res.data.createdAt),
        };
    });
