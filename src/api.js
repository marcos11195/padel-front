export const API_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (endpoint, options = {}) => {
    const stored = localStorage.getItem("user");
    const token = stored ? JSON.parse(stored).token : null;

    const finalOptions = { ...options };

    // Si el body es FormData → NO poner Content-Type
    if (finalOptions.body instanceof FormData) {
        finalOptions.headers = {
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        };
    } else {
        finalOptions.headers = {
            ...(options.headers || {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        };
    }

    const res = await fetch(`${API_URL}${endpoint}`, finalOptions);

    if (res.status === 401) {
        localStorage.removeItem("user");
        window.location.href = "/login";
    }

    return res;
};
