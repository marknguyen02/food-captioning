import React, { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
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
    Select, 
    Spin,
} from 'antd';
import { 
    Camera, 
    Users, 
    MessageSquare, 
    Star, 
    RefreshCw, 
    Clock, 
    CheckCircle, 
    Utensils,
} from 'lucide-react';

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('week');
    const [captionTimeData, setCaptionTimeData] = useState([]);
    const [captionTypeData, setCaptionTypeData] = useState([]);
    const [ratingData, setRatingData] = useState([]);
    const [foodTypeData, setFoodTypeData] = useState([]);
    const [performanceData, setPerformanceData] = useState([]);
    const [feedbackData, setFeedbackData] = useState([]);
    const [feedbackCategories, setFeedbackCategories] = useState([]);
    const [totalStats, setTotalStats] = useState({
        totalImages: 0,
        foodImages: 0,
        nonFoodImages: 0,
        avgRating: 0,
        avgProcessingTime: 0,
        captionsToday: 0,
        totalUsers: 0,
        successRate: 0,
        pendingImages: 0,
    });

    const COLORS = [
        '#1F77B4',
        '#26A69A',
        '#FF9800',
        '#E91E63',
        '#9C27B0',
        '#673AB7',
        '#3F51B5',
    ];
    
    const RADIAN = Math.PI / 180;

    useEffect(() => {
        setTimeout(() => {
            const mockCaptionTimeData = [
                { date: '30/04', total: 65, food: 42, nonFood: 23 },
                { date: '01/05', total: 78, food: 51, nonFood: 27 },
                { date: '02/05', total: 82, food: 56, nonFood: 26 },
                { date: '03/05', total: 70, food: 48, nonFood: 22 },
                { date: '04/05', total: 54, food: 35, nonFood: 19 },
                { date: '05/05', total: 93, food: 64, nonFood: 29 },
                { date: '06/05', total: 86, food: 59, nonFood: 27 },
            ];

            const mockCaptionTypeData = [
                { type: 'Chỉ Caption', count: 324, percentage: 37.5 },
                { type: 'Caption + Tên món', count: 245, percentage: 28.3 },
                { type: 'Caption + Tên món + Nguyên liệu', count: 186, percentage: 21.5 },
                { type: 'Đầy đủ (+ Hướng dẫn)', count: 110, percentage: 12.7 },
            ];

            const mockRatingData = [
                { rating: '1 sao', count: 12, value: 1, color: '#FF5252' },
                { rating: '2 sao', count: 25, value: 2, color: '#FF9800' },
                { rating: '3 sao', count: 87, value: 3, color: '#FFC107' },
                { rating: '4 sao', count: 143, value: 4, color: '#8BC34A' },
                { rating: '5 sao', count: 102, value: 5, color: '#4CAF50' },
            ];

            const mockFoodTypeData = [
                { category: 'Món Việt', value: 235 },
                { category: 'Món Á', value: 187 },
                { category: 'Món Âu', value: 164 },
                { category: 'Đồ uống', value: 98 },
                { category: 'Món tráng miệng', value: 65 },
            ];

            const mockPerformanceData = [
                { name: 'Thứ 2', latency: 2.8, successRate: 96.5 },
                { name: 'Thứ 3', latency: 2.5, successRate: 97.2 },
                { name: 'Thứ 4', latency: 3.1, successRate: 95.8 },
                { name: 'Thứ 5', latency: 2.9, successRate: 96.3 },
                { name: 'Thứ 6', latency: 2.7, successRate: 97.5 },
                { name: 'Thứ 7', latency: 2.3, successRate: 98.2 },
                { name: 'Chủ nhật', latency: 2.0, successRate: 98.7 },
            ];

            const mockFeedbackData = [
                { month: 'T1', positive: 120, negative: 18, neutral: 25 },
                { month: 'T2', positive: 145, negative: 12, neutral: 30 },
                { month: 'T3', positive: 170, negative: 22, neutral: 35 },
                { month: 'T4', positive: 210, negative: 15, neutral: 28 },
                { month: 'T5', positive: 240, negative: 10, neutral: 32 },
            ];

            const mockFeedbackCategories = [
                { name: 'Caption chính xác', value: 45 },
                { name: 'Nguyên liệu đầy đủ', value: 25 },
                { name: 'Hướng dẫn rõ ràng', value: 15 },
                { name: 'Tốc độ nhanh', value: 10 },
                { name: 'Khác', value: 5 },
            ];

            const mockTotalStats = {
                totalImages: 3871,
                foodImages: 2640,
                nonFoodImages: 1231,
                avgRating: 4.2,
                avgProcessingTime: 2.7,
                captionsToday: 86,
                totalUsers: 324,
                successRate: 96.5,
                pendingImages: 14,
            };

            setCaptionTimeData(mockCaptionTimeData);
            setCaptionTypeData(mockCaptionTypeData);
            setRatingData(mockRatingData);
            setFoodTypeData(mockFoodTypeData);
            setPerformanceData(mockPerformanceData);
            setFeedbackData(mockFeedbackData);
            setFeedbackCategories(mockFeedbackCategories);
            setTotalStats(mockTotalStats);
            setLoading(false);
        }, 1500);
    }, []);

    const handleTimeRangeChange = (value) => {
        setTimeRange(value);
        setLoading(true);

        setTimeout(() => {
            if (value === 'day') {
                setCaptionTimeData([
                    { date: '09:00', total: 12, food: 8, nonFood: 4 },
                    { date: '10:00', total: 18, food: 12, nonFood: 6 },
                    { date: '11:00', total: 15, food: 10, nonFood: 5 },
                    { date: '12:00', total: 8, food: 5, nonFood: 3 },
                    { date: '13:00', total: 10, food: 7, nonFood: 3 },
                    { date: '14:00', total: 14, food: 9, nonFood: 5 },
                    { date: '15:00', total: 9, food: 6, nonFood: 3 },
                ]);
            } else if (value === 'week') {
                setCaptionTimeData([
                    { date: '30/04', total: 65, food: 42, nonFood: 23 },
                    { date: '01/05', total: 78, food: 51, nonFood: 27 },
                    { date: '02/05', total: 82, food: 56, nonFood: 26 },
                    { date: '03/05', total: 70, food: 48, nonFood: 22 },
                    { date: '04/05', total: 54, food: 35, nonFood: 19 },
                    { date: '05/05', total: 93, food: 64, nonFood: 29 },
                    { date: '06/05', total: 86, food: 59, nonFood: 27 },
                ]);
            } else if (value === 'month') {
                setCaptionTimeData([
                    { date: 'Tuần 1', total: 310, food: 210, nonFood: 100 },
                    { date: 'Tuần 2', total: 285, food: 185, nonFood: 100 },
                    { date: 'Tuần 3', total: 340, food: 230, nonFood: 110 },
                    { date: 'Tuần 4', total: 298, food: 198, nonFood: 100 },
                ]);
            }
            setLoading(false);
        }, 800);
    };

    const customTooltipStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        border: '1px solid #e0e0e0',
        borderRadius: '6px',
        padding: '10px 14px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    };

    const CustomRatingTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div style={customTooltipStyle}>
                    <p className="font-semibold mb-2">{data.rating}</p>
                    <p className="m-0">
                        <span className="text-gray-600">Số lượt: </span>
                        <span className="font-medium">{data.count}</span>
                    </p>
                    <p className="mt-1 mb-0">
                        <span className="text-gray-600">Tỷ lệ: </span>
                        <span className="font-medium">
                            {(
                                (data.count /
                                    ratingData.reduce((acc, item) => acc + item.count, 0)) *
                                100
                            ).toFixed(1)}
                            %
                        </span>
                    </p>
                </div>
            );
        }
        return null;
    };

    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="flex flex-col gap-6 max-w-full bg-gray-50">
            <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Thống kê chi tiết</h2>
                <button 
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
                    onClick={() => {
                        setLoading(true);
                        setTimeout(() => setLoading(false), 1000);
                    }}
                >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Làm mới
                </button>
            </div>

            <Spin className="min-h-screen" spinning={loading}>
                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase mb-1">Tổng số ảnh</p>
                                <p className="text-2xl font-bold">{totalStats.totalImages.toLocaleString()}</p>
                                <div className="flex items-center mt-2">
                                    <div className="flex items-center mr-4">
                                        <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                                        <span className="text-xs text-gray-600">Ảnh đồ ăn: {totalStats.foodImages}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                                        <span className="text-xs text-gray-600">Ảnh khác: {totalStats.nonFoodImages}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-full">
                                <Camera className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase mb-1">Người dùng</p>
                                <p className="text-2xl font-bold">{totalStats.totalUsers}</p>
                                <p className="text-xs text-gray-600 mt-2">
                                    <span className="text-green-500">+24</span> trong tuần này
                                </p>
                            </div>
                            <div className="bg-purple-100 p-3 rounded-full">
                                <Users className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-500 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase mb-1">Đánh giá trung bình</p>
                                <p className="text-2xl font-bold">{totalStats.avgRating} <span className="text-base font-normal text-gray-500">/ 5</span></p>
                                <div className="flex mt-2">
                                    {[1, 2, 3, 4].map((star) => (
                                        <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                                    ))}
                                    <Star className="h-4 w-4 text-yellow-400" strokeWidth={1} />
                                </div>
                            </div>
                            <div className="bg-amber-100 p-3 rounded-full">
                                <Star className="h-6 w-6 text-amber-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase mb-1">Thời gian xử lý</p>
                                <p className="text-2xl font-bold">{totalStats.avgProcessingTime}s</p>
                                <div className="flex items-center mt-2">
                                    <span className="text-xs text-gray-600">Tỷ lệ thành công: {totalStats.successRate}%</span>
                                </div>
                            </div>
                            <div className="bg-green-100 p-3 rounded-full">
                                <Clock className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Time Filter */}
                <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold">Thống kê chi tiết</h2>
                    <Select
                        defaultValue="week"
                        onValueChange={handleTimeRangeChange}
                        className="w-40"
                    >
                        <option value="day">Hôm nay</option>
                        <option value="week">Tuần này</option>
                        <option value="month">Tháng này</option>
                    </Select>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-4">Số lượng ảnh được caption theo thời gian</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <ComposedChart
                                data={captionTimeData}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorFood" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip
                                    contentStyle={customTooltipStyle}
                                    formatter={(value, name) => {
                                        const display =
                                            name === 'total'
                                                ? 'Tổng số'
                                                : name === 'food'
                                                ? 'Ảnh đồ ăn'
                                                : 'Ảnh khác';
                                        return [value, display];
                                    }}
                                />
                                <Legend
                                    formatter={(value) =>
                                        value === 'total'
                                            ? 'Tổng số'
                                            : value === 'food'
                                            ? 'Ảnh đồ ăn'
                                            : 'Ảnh khác'
                                    }
                                />
                                <Area
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#8884d8"
                                    fillOpacity={1}
                                    fill="url(#colorTotal)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="food"
                                    stroke="#4CAF50"
                                    fillOpacity={1}
                                    fill="url(#colorFood)"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="nonFood"
                                    stroke="#1F77B4"
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-4">Phân bố đánh giá</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={ratingData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={110}
                                    innerRadius={60}
                                    fill="#8884d8"
                                    dataKey="count"
                                >
                                    {ratingData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    formatter={(value, entry) => {
                                        const { color } = entry;
                                            return <span style={{ color }}>{value}</span>;
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-4">Hiệu năng hệ thống</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                                data={performanceData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis yAxisId="left" orientation="left" stroke="#FF9800" />
                                <YAxis yAxisId="right" orientation="right" stroke="#4CAF50" />
                                <Tooltip
                                    contentStyle={customTooltipStyle}
                                    formatter={(value, name) => {
                                        const display =
                                            name === 'latency'
                                                ? 'Độ trễ (s)'
                                                : 'Tỷ lệ thành công (%)';
                                        return [value, display];
                                    }}
                                />
                                <Legend
                                    formatter={(value) =>
                                        value === 'latency'
                                            ? 'Độ trễ (s)'
                                            : 'Tỷ lệ thành công (%)'
                                    }
                                />
                                <Line
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="latency"
                                    stroke="#FF9800"
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="successRate"
                                    stroke="#4CAF50"
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-4">Xu hướng feedback người dùng</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart
                                data={feedbackData}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FF5252" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#FF5252" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FFC107" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#FFC107" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip
                                    contentStyle={customTooltipStyle}
                                    formatter={(value, name) => {
                                        const display =
                                        name === 'positive'
                                        ? 'Tích cực'
                                        : name === 'negative'
                                        ? 'Tiêu cực'
                                        : 'Trung lập';
                                return [value, display];
                            }}
                        />
                        <Legend
                            formatter={(value) =>
                                value === 'positive'
                                    ? 'Tích cực'
                                    : value === 'negative'
                                    ? 'Tiêu cực'
                                    : 'Trung lập'
                            }
                        />
                        <Area
                            type="monotone"
                            dataKey="positive"
                            stroke="#4CAF50"
                            fillOpacity={1}
                            fill="url(#colorPositive)"
                        />
                        <Area
                            type="monotone"
                            dataKey="negative"
                            stroke="#FF5252"
                            fillOpacity={1}
                            fill="url(#colorNegative)"
                        />
                        <Area
                            type="monotone"
                            dataKey="neutral"
                            stroke="#FFC107"
                            fillOpacity={1}
                            fill="url(#colorNeutral)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 mt-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Phản hồi nổi bật</h3>
                    <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                        <MessageSquare className="h-5 w-5 text-blue-600" />
                    </div>
                </div>
                <div className="overflow-y-auto max-h-64">
                    {feedbackCategories.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                        >
                            <div className="flex items-center">
                                <div
                                    className="w-2 h-2 rounded-full mr-2"
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                ></div>
                                <span className="text-sm">{item.name}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-sm font-medium">
                                    {item.value}
                                </span>
                                <span className="text-xs text-gray-500 ml-1">
                                    ({(
                                        (item.value /
                                            feedbackCategories.reduce(
                                                (acc, i) => acc + i.value,
                                                0
                                            )) *
                                        100
                                    ).toFixed(1)}
                                    %)
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Thống kê hôm nay</h3>
                    <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Số ảnh đã xử lý:</span>
                        <span className="text-sm font-medium">{totalStats.captionsToday}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Số ảnh đang chờ:</span>
                        <span className="text-sm font-medium">{totalStats.pendingImages}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Tốc độ trung bình:</span>
                        <span className="text-sm font-medium">{totalStats.avgProcessingTime}s</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Tỷ lệ thành công:</span>
                        <span className="text-sm font-medium">{totalStats.successRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Đánh giá trung bình:</span>
                        <div className="flex items-center">
                            <span className="text-sm font-medium mr-1">{totalStats.avgRating}</span>
                            <div className="flex">
                                {[1, 2, 3, 4].map((star) => (
                                    <Star
                                        key={star}
                                        className="h-3 w-3 text-yellow-400 fill-current"
                                    />
                                ))}
                                <Star className="h-3 w-3 text-yellow-400" strokeWidth={1} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Trạng thái hệ thống</h3>
                    <div className="flex-shrink-0 bg-purple-100 p-2 rounded-full">
                        <Utensils className="h-5 w-5 text-purple-600" />
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-600">CPU</span>
                            <span className="text-xs font-medium">72%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: '72%' }}
                            ></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-600">RAM</span>
                            <span className="text-xs font-medium">65%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: '65%' }}
                            ></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-600">GPU</span>
                            <span className="text-xs font-medium">89%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-purple-600 h-2 rounded-full"
                                style={{ width: '89%' }}
                            ></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-600">Disk</span>
                            <span className="text-xs font-medium">45%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-amber-600 h-2 rounded-full"
                                style={{ width: '45%' }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Spin>
</div>
);
}

export default Dashboard;