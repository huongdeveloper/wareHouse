import axios from 'axios';


export const axiosJWT = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

axios.interceptors.request.use((config) => {
    console.log('Request URL:', config.url);
    return config;
});

axiosJWT.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosJWT.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;


        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (refreshToken) {
                    const { accessToken } = await refreshToken(refreshToken);
                    localStorage.setItem('accessToken', accessToken);
                    axiosJWT.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
                    return axiosJWT(originalRequest);
                }
            } catch (refreshError) {
                console.error('Token refresh failed', refreshError);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export const loginUser = async (data) => {
    try {
        const res = await axiosJWT.post('/auth/login', data);
        const { accessToken, refreshToken } = res.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        return res.data;
    } catch (error) {
        console.error('Login failed', error);
        throw error;
    }
};

export const refreshToken = async (refreshToken) => {
    try {
        const res = await axiosJWT.post('/auth/refreshToken', {}, {
            headers: {
                'Authorization': `Bearer ${refreshToken}`,
            }
        });
        return res.data;
    } catch (error) {
        console.error('Refresh token failed', error);
        throw error;
    }
};

export const getCreateNew = async (accessToken, data) => {
    try {
        const res = await axiosJWT.post('/posts', data, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        return res.data;
    } catch (error) {
        console.error('Get details failed', error);
        throw error;
    }
};

export const getDetails = async (accessToken) => {
    try {
        const res = await axiosJWT.get('/posts', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        return res.data;
    } catch (error) {
        console.error('Get details failed', error);
        throw error;
    }
};

export const getDelete = async (accessToken, postId) => {
    try {
        const res = await axiosJWT.delete(`/posts/${postId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        return res.data;
    } catch (error) {
        console.error('Get Delete failed', error);
        throw error;
    }
};

export const getUpdate = async (accessToken, postId, updateData) => {
    try {
        const res = await axiosJWT.patch(`/posts/${postId}`, updateData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        return res.data;
    } catch (error) {
        console.error('Get Update failed', error);
        throw error;
    }
};

export const getTags = async (accessToken) => {
    try {
        const res = await axiosJWT.get('/posts/tags', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        return res.data;
    } catch (error) {
        console.error('Get Tags failed', error);
        throw error;
    }
};

export const getTitle = async (accessToken, title = '', page = 1) => {
    try {
        const res = await axiosJWT.get('/posts', {
            params: {
                title,
                page,
            },
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        return res.data;
    } catch (error) {
        console.error('Get title failed', error);
        throw error;
    }
};
