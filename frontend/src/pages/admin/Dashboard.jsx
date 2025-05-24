import React, { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
    ComposedChart,
} from 'recharts';
import { 
    Camera, 
    Users, 
    Star, 
    RefreshCw, 
    CheckCircle, 
    TrendingUp,
    Activity
} from 'lucide-react'
import { Spin } from 'antd'
import {
    LoadingOutlined
} from '@ant-design/icons'
import { fetchStatistics, fetchStar } from '../../services/adminService';

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('week');
    const [totalImage, setTotalImage] = useState(0);
    const [numUsers, setNumUsers] = useState(0);
    const [rating, setRating] = useState(0);
    const [ratingData, setRatingData] = useState([
         { rating: '5 Stars', count: 0, value: 5, color: '#059669' },
         { rating: '4 Stars', count: 0, value: 4, color: '#16A34A' },
         { rating: '3 Stars', count: 0, value: 3, color: '#D97706' },
         { rating: '2 Stars', count: 0, value: 2, color: '#EA580C' },
         { rating: '1 Star', count: 0, value: 1, color: '#DC2626' },
    ]);

    const fetchData = async () => {
        try {
            setLoading(true)
            const { medias_count, users_count, avg_rating } = await fetchStatistics(localStorage.getItem('at'))
            setTotalImage(medias_count)
            setNumUsers(users_count)
            setRating(avg_rating)
            const ratingResponse = await fetchStar(localStorage.getItem('at'))
            setRatingData(ratingResponse)
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const COLORS = ['#6B7280', '#8B9DC3', '#94A3B8', '#A3A3A3', '#9CA3AF', '#B8C5D1', '#C1C9D2'];
    const SOFT_COLORS = {
        slate: '#64748B',
        gray: '#6B7280', 
        stone: '#78716C',
        neutral: '#737373',
        zinc: '#71717A',
        blue: '#64748B',
        indigo: '#6366F1',
        violet: '#8B5CF6',
        teal: '#0D9488',
        emerald: '#059669',
        green: '#16A34A',
        amber: '#D97706',
        orange: '#EA580C',
        red: '#DC2626'
    };

   const GRADIENT_COLORS = {
  primary: 'from-slate-400 to-slate-600',
  secondary: 'from-gray-500 to-gray-600',
  accent: 'from-stone-500 to-stone-700',
  success: 'from-emerald-500 to-emerald-700',
  warning: 'from-cyan-600 to-cyan-800',
  info: 'from-cyan-600 to-cyan-800',
};


    const captionTimeData = [
        { date: '04/30', total: 65, food: 42, nonFood: 23 },
        { date: '05/01', total: 78, food: 51, nonFood: 27 },
        { date: '05/02', total: 82, food: 56, nonFood: 26 },
        { date: '05/03', total: 70, food: 48, nonFood: 22 },
        { date: '05/04', total: 54, food: 35, nonFood: 19 },
        { date: '05/05', total: 93, food: 64, nonFood: 29 },
        { date: '05/06', total: 86, food: 59, nonFood: 27 },
    ];

    const performanceData = [
        { name: 'Mon', latency: 2.8, successRate: 96.5 },
        { name: 'Tue', latency: 2.5, successRate: 97.2 },
        { name: 'Wed', latency: 3.1, successRate: 95.8 },
        { name: 'Thu', latency: 2.9, successRate: 96.3 },
        { name: 'Fri', latency: 2.7, successRate: 97.5 },
        { name: 'Sat', latency: 2.3, successRate: 98.2 },
        { name: 'Sun', latency: 2.0, successRate: 98.7 },
    ];

    const feedbackData = [
        { month: 'Jan', positive: 120, negative: 18, neutral: 25 },
        { month: 'Feb', positive: 145, negative: 12, neutral: 30 },
        { month: 'Mar', positive: 170, negative: 22, neutral: 35 },
        { month: 'Apr', positive: 210, negative: 15, neutral: 28 },
        { month: 'May', positive: 240, negative: 10, neutral: 32 },
    ];

    const systemStatus = [
        { name: 'CPU', value: 72, color: 'bg-gradient-to-r from-slate-400 to-slate-500' },
        { name: 'RAM', value: 65, color: 'bg-gradient-to-r from-emerald-400 to-emerald-500' },
        { name: 'GPU', value: 89, color: 'bg-gradient-to-r from-violet-400 to-violet-500' },
        { name: 'Disk', value: 45, color: 'bg-gradient-to-r from-amber-400 to-amber-500' },
    ];

    const customTooltipStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '12px 16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        fontSize: '14px'
    };

    const handleRefresh = async () => {
        await fetchData()
    };

    const StatCard = ({ title, value, icon: Icon, gradient, trend, suffix = '' }) => (
        <div className={`bg-gradient-to-br ${gradient} p-6 rounded-xl shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 text-white relative overflow-hidden border border-white/10`}>
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-16 h-16 bg-white/5 rounded-full"></div>
            <div className="flex items-center justify-between relative z-10">
                <div>
                    <p className="text-white/90 text-sm font-medium mb-1">{title}</p>
                    <p className="text-2xl font-semibold">{value?.toLocaleString()}{suffix}</p>
                    {trend && (
                        <div className="flex items-center mt-2 text-white/80">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            <span className="text-xs">{trend}</span>
                        </div>
                    )}
                </div>
                <div className="bg-white/15 p-3 rounded-lg">
                    <Icon className="h-6 w-6 text-white" />
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <Spin className='!h-full !w-full !flex !items-center !justify-center' indicator={<LoadingOutlined/>} />
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <style jsx='true'>{`
                .chart-container {
                    background: rgba(255,255,255,0.8);
                    border: 1px solid rgba(229,231,235,0.8);
                }
                
                .glass-effect {
                    background-color: rgba(255, 255, 255, 0.9);
                    border: 1px solid rgba(229, 231, 235, 0.8);
                }
                
                .animate-pulse-soft {
                    animation: pulse-soft 3s ease-in-out infinite;
                }
                
                @keyframes pulse-soft {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }
            `}</style>

            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-800">
                            Analytics Dashboard
                        </h1>
                    </div>
                    <button 
                        className="flex items-center px-5 py-2.5 bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
                        onClick={handleRefresh}
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh Data
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Images"
                        value={totalImage}
                        icon={Camera}
                        gradient={GRADIENT_COLORS.primary}
                        trend="+12% from last month"
                    />
                    <StatCard
                        title="Active Users"
                        value={numUsers}
                        icon={Users}
                        gradient={GRADIENT_COLORS.secondary}
                        trend="+8% from last month"
                    />
                    <StatCard
                        title="Average Rating"
                        value={rating}
                        icon={Star}
                        gradient={GRADIENT_COLORS.warning}
                        suffix=" / 5"
                        trend="↑ 0.3 from last month"
                    />
                    <StatCard
                        title="System Uptime"
                        value={99.8}
                        icon={Activity}
                        gradient={GRADIENT_COLORS.success}
                        suffix="%"
                        trend="Last 30 days"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2 glass-effect rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-medium text-gray-800">Image Processing Trends</h3>
                            <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent">
                                <option value="day">Today</option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                            </select>
                        </div>
                        <ResponsiveContainer width="100%" height={350}>
                            <ComposedChart data={captionTimeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#64748B" stopOpacity={0.6} />
                                        <stop offset="95%" stopColor="#64748B" stopOpacity={0.1} />
                                    </linearGradient>
                                    <linearGradient id="foodGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#059669" stopOpacity={0.6} />
                                        <stop offset="95%" stopColor="#059669" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                                <YAxis stroke="#6b7280" fontSize={12} />
                                <Tooltip contentStyle={customTooltipStyle} />
                                <Legend />
                                <Area
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#64748B"
                                    fill="url(#totalGradient)"
                                    strokeWidth={2}
                                    name="Total Images"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="food"
                                    stroke="#059669"
                                    fill="url(#foodGradient)"
                                    strokeWidth={2}
                                    name="Food Images"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="nonFood"
                                    stroke="#D97706"
                                    strokeWidth={2}
                                    dot={{ r: 4, fill: '#D97706' }}
                                    activeDot={{ r: 5, fill: '#D97706' }}
                                    name="Non-Food Images"
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="glass-effect rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-medium text-gray-800">Rating Distribution</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="font-medium">{rating?.toFixed(1)}/5.0</span>
                    </div>
                </div>
    
                <div className="relative mb-6">
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <defs>
                                {ratingData.map((entry, index) => (
                                    <linearGradient key={`gradient-${index}`} id={`gradient-${entry.value}`} x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor={entry.color} stopOpacity={0.9} />
                                        <stop offset="100%" stopColor={entry.color} stopOpacity={0.6} />
                                    </linearGradient>
                                ))}
                            </defs>
                            <Pie
                                data={ratingData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                innerRadius={55}
                                dataKey="count"
                                stroke="#fff"
                                strokeWidth={3}
                                paddingAngle={2}
                            >
                                {ratingData.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={`url(#gradient-${entry.value})`}
                                        className="hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                                    />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '12px',
                                    padding: '12px 16px',
                                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                                    fontSize: '14px'
                                }}
                                formatter={(value, name) => [
                                    `${value} reviews (${((value / ratingData.reduce((sum, r) => sum + r.count, 0)) * 100)?.toFixed(1)}%)`,
                                    name
                                ]}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-sm">
                            <div className="text-2xl font-bold text-gray-800">
                                {ratingData.reduce((sum, item) => sum + item.count, 0)}
                            </div>
                            <div className="text-sm text-gray-500 font-medium">Reviews</div>
                            <div className="flex items-center justify-center mt-1">
                                <Star className="w-3 h-3 text-amber-500 fill-amber-500 mr-1" />
                                <span className="text-sm font-semibold text-gray-700">{rating?.toFixed(1)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                    {ratingData.slice().reverse().map((item, index) => {
                        const totalReviews = ratingData.reduce((sum, r) => sum + r.count, 0);
                        const percentage = totalReviews > 0 ? (item.count / totalReviews) * 100 : 0;
                        
                        return (
                            <div key={item.value} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                <div className="flex items-center space-x-3">
                                    <div 
                                        className="w-4 h-4 rounded-full shadow-sm"
                                        style={{ backgroundColor: item.color }}
                                    ></div>
                                    <div className="flex items-center space-x-2">
                                        {[...Array(5)].map((_, starIndex) => (
                                            <Star
                                                key={starIndex}
                                                className={`w-3 h-3 ${
                                                    starIndex < item.value
                                                        ? 'text-amber-400 fill-amber-400'
                                                        : 'text-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">
                                        {item.value} {item.value === 1 ? 'Star' : 'Stars'}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm font-semibold text-gray-800">
                                        {item.count}
                                    </span>
                                    <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                                        {percentage.toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="glass-effect rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-medium text-gray-800 mb-6">System Performance</h3>
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                                <YAxis yAxisId="left" orientation="left" stroke="#D97706" fontSize={12} />
                                <YAxis yAxisId="right" orientation="right" stroke="#059669" fontSize={12} />
                                <Tooltip contentStyle={customTooltipStyle} />
                                <Legend />
                                <Line
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="latency"
                                    stroke="#D97706"
                                    strokeWidth={2}
                                    dot={{ r: 4, fill: '#D97706' }}
                                    activeDot={{ r: 5 }}
                                    name="Latency (s)"
                                />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="successRate"
                                    stroke="#059669"
                                    strokeWidth={2}
                                    dot={{ r: 4, fill: '#059669' }}
                                    activeDot={{ r: 5 }}
                                    name="Success Rate (%)"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="glass-effect rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-medium text-gray-800 mb-6">User Feedback Trends</h3>
                        <ResponsiveContainer width="100%" height={280}>
                            <AreaChart data={feedbackData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="positiveGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#059669" stopOpacity={0.6} />
                                        <stop offset="95%" stopColor="#059669" stopOpacity={0.1} />
                                    </linearGradient>
                                    <linearGradient id="negativeGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#DC2626" stopOpacity={0.6} />
                                        <stop offset="95%" stopColor="#DC2626" stopOpacity={0.1} />
                                    </linearGradient>
                                    <linearGradient id="neutralGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#D97706" stopOpacity={0.6} />
                                        <stop offset="95%" stopColor="#D97706" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                                <YAxis stroke="#6b7280" fontSize={12} />
                                <Tooltip contentStyle={customTooltipStyle} />
                                <Legend />
                                <Area
                                    type="monotone"
                                    dataKey="positive"
                                    stackId="1"
                                    stroke="#059669"
                                    fill="url(#positiveGradient)"
                                    name="Positive"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="neutral"
                                    stackId="1"
                                    stroke="#D97706"
                                    fill="url(#neutralGradient)"
                                    name="Neutral"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="negative"
                                    stackId="1"
                                    stroke="#DC2626"
                                    fill="url(#negativeGradient)"
                                    name="Negative"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="glass-effect rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-medium text-gray-800">Today's Activity</h3>
                            <div className="bg-emerald-500 p-2 rounded-lg">
                                <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                <span className="text-sm font-medium text-gray-700">Processed Images</span>
                                <span className="text-lg font-semibold text-slate-600">86</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                                <span className="text-sm font-medium text-gray-700">Pending Images</span>
                                <span className="text-lg font-semibold text-amber-600">14</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                                <span className="text-sm font-medium text-gray-700">Success Rate</span>
                                <span className="text-lg font-semibold text-emerald-600">98.7%</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-violet-50 rounded-lg">
                                <span className="text-sm font-medium text-gray-700">Avg Processing Time</span>
                                <span className="text-lg font-semibold text-violet-600">2.7s</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-effect rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-medium text-gray-800">System Resources</h3>
                            <div className="bg-violet-500 p-2 rounded-lg">
                                <Activity className="h-4 w-4 text-white" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            {systemStatus.map((item, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-gray-700">{item.name}</span>
                                        <span className="text-sm font-semibold text-gray-800">{item.value}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                        <div
                                            className={`h-2 rounded-full ${item.color} transition-all duration-700 ease-out`}
                                            style={{ width: `${item.value}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-effect rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-medium text-gray-800">Quick Stats</h3>
                            <div className="bg-slate-500 p-2 rounded-lg animate-pulse-soft">
                                <TrendingUp className="h-4 w-4 text-white" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-200">
                                <div className="text-xl font-semibold text-slate-600 mb-1">
                                    {((totalImage / 1000) * 100).toFixed(1)}%
                                </div>
                                <div className="text-sm text-slate-600">Growth Rate</div>
                            </div>
                            <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                                <div className="text-xl font-semibold text-emerald-600 mb-1">
                                    {(rating * 20).toFixed(0)}%
                                </div>
                                <div className="text-sm text-emerald-600">Satisfaction</div>
                            </div>
                            <div className="text-center p-4 bg-violet-50 rounded-lg border border-violet-200">
                                <div className="text-xl font-semibold text-violet-600 mb-1">
                                    {numUsers > 100 ? '100+' : numUsers}
                                </div>
                                <div className="text-sm text-violet-600">Active Users</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;