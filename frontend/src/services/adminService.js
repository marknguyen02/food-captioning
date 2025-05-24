import { API } from './config'
import dayjs from 'dayjs';

export async function fetchStatistics(token) {
    try {
        const response = await API.get('/admin/statistics', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })

        return response.data;
    } catch (err) {
        throw err
    }
}

export async function fetchAllUsers(token) {
    try {
        const response = await API.get('/admin/users', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const transformed = response.data.map(user => ({
            key: user.user_id,
            username: user.username,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            locked: user.locked,
            createdAt: user.created_at
        }));

        return transformed
    } catch (err) {
        throw err
    }
}

export async function fetchStar(token) {
    try {
        const response = await API.get('/admin/star', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const starColors = {
            5: '#22c55e',
            4: '#4ade80',
            3: '#fbbf24',
            2: '#f97316',
            1: '#ef4444',
        };

        const data = response.data;
        const result = [5, 4, 3, 2, 1].map((star) => ({
            rating: star === 1 ? '1 Star' : `${star} Stars`,
            count: data[star] || 0,
            value: star,
            color: starColors[star],
        }));

        return result;
    } catch (err) {
        throw err;
    }
}


export async function fetchStarSummary(token) {
    try {
        const response = await API.get('/admin/star-summary', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })

        return response.data;
    } catch (err) {
        throw err
    }
}

export async function fetchFeedBacks(token) {
    try {
        const response = await API.get('/admin/feedback', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return response.data.map((item, index) => ({
            id: index + 1,
            username: item.full_name,
            rating: item.rating,
            feedback: item.feedback,
            caption: item.caption,
            imageUrl: item.media_url,
            dateTime: dayjs(item.created_at).format('DD/MM/YYYY HH:mm:ss'),
        }));
    } catch (err) {
        throw err;
    }
}

export async function changeRole(formData, token) {
    try {
        await API.post('/admin/role', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    } catch (err) {
        throw err
    }
}

export async function lockOrUnlockUser(userId, token) {
    try {
        await API.post('/admin/lock', null, {
            params: { user_id: userId },
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    } catch (err) {
        throw err;
    }
}