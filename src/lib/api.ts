import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://my-app-backend-lyart.vercel.app/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface Message {
  id: string;
  from: {
    address: string;
    name: string;
  } | string;
  subject: string;
  intro?: string;
  createdAt: string;
  date?: string;
  text?: string;
  html?: string[];
}

export const getDomains = async () => {
  const response = await api.get('/mail/domains');
  return response.data;
};

export const createAccount = async (address: string, pass: string, provider: string) => {
  const response = await api.post('/mail/accounts', { address, password: pass, provider });
  return response.data;
};

export const getToken = async (address: string, pass: string, provider: string) => {
  const response = await api.post('/mail/token', { address, password: pass, provider });
  return response.data.token;
};

export const createDropMailSession = async (email?: string) => {
  const response = await api.post('/mail/dropmail/session', { email });
  return response.data;
};

export const getMessages = async (params: {
  provider: string;
  token?: string;
  login?: string;
  domain?: string;
}) => {
  const response = await api.get('/mail/messages', { params });
  return response.data;
};

export const getMessageDetail = async (id: string, params: {
  provider: string;
  token?: string;
  login?: string;
  domain?: string;
}) => {
  const response = await api.get(`/mail/messages/${id}`, { params });
  return response.data;
};

export const subscribeNewsletter = async (email: string) => {
  const response = await api.post('/newsletter/subscribe', { email });
  return response.data;
};

export const getBlogs = async () => {
  const response = await api.get('/blog');
  return response.data;
};

export const getBlogBySlug = async (slug: string) => {
  const response = await api.get(`/blog/${slug}`);
  return response.data;
};

export const getFaviconUrl = (urlOrEmail: string) => {
  if (!urlOrEmail) return '';
  let domain = '';
  
  if (urlOrEmail.includes('@')) {
    domain = urlOrEmail.split('@')[1];
  } else {
    try {
      const url = new URL(urlOrEmail.startsWith('http') ? urlOrEmail : `https://${urlOrEmail}`);
      domain = url.hostname;
    } catch (e) {
      domain = urlOrEmail;
    }
  }
  
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
};
