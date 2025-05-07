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
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ComposedChart,
} from 'recharts';
import {
    Card,
    Row,
    Col,
    Typography,
    Spin,
    Select,
    Button,
    Tag,
} from 'antd';
import {
    PictureOutlined,
    StarOutlined,
    FireOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloudUploadOutlined,
    ReloadOutlined,
    SettingOutlined,
    TeamOutlined,
    EyeOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('week');
    const [captionTimeData, setCaptionTimeData] = useState([]);
    const [captionLengthData, setCaptionLengthData] = useState([]);
    const [ratingData, setRatingData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [performanceData, setPerformanceData] = useState([]);
    const [platformData, setPlatformData] = useState([]);
    const [trendData, setTrendData] = useState([]);
    const [accuracyData, setAccuracyData] = useState(null);
    const [totalStats, setTotalStats] = useState({
        totalImages: 0,
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
                { date: '30/04', total: 65, success: 60, failed: 5 },
                { date: '01/05', total: 78, success: 74, failed: 4 },
                { date: '02/05', total: 82, success: 76, failed: 6 },
                { date: '03/05', total: 70, success: 65, failed: 5 },
                { date: '04/05', total: 54, success: 51, failed: 3 },
                { date: '05/05', total: 93, success: 89, failed: 4 },
                { date: '06/05', total: 86, success: 84, failed: 2 },
            ];

            const mockCaptionLengthData = [
                { range: '1-5 từ', count: 120, percentage: 17.6 },
                { range: '6-10 từ', count: 235, percentage: 34.5 },
                { range: '11-15 từ', count: 187, percentage: 27.5 },
                { range: '16-20 từ', count: 97, percentage: 14.2 },
                { range: '21+ từ', count: 42, percentage: 6.2 },
            ];

            const mockRatingData = [
                { rating: '1 sao', count: 12, value: 1, color: '#FF5252' },
                { rating: '2 sao', count: 25, value: 2, color: '#FF9800' },
                { rating: '3 sao', count: 87, value: 3, color: '#FFC107' },
                { rating: '4 sao', count: 143, value: 4, color: '#8BC34A' },
                { rating: '5 sao', count: 102, value: 5, color: '#4CAF50' },
            ];

            const mockCategoryData = [
                { category: 'Phong cảnh', value: 235 },
                { category: 'Con người', value: 187 },
                { category: 'Động vật', value: 164 },
                { category: 'Đồ vật', value: 142 },
                { category: 'Thực phẩm', value: 98 },
                { category: 'Kiến trúc', value: 65 },
            ];

            const mockPerformanceData = [
                { name: 'Thứ 2', latency: 2.8, throughput: 85, load: 45 },
                { name: 'Thứ 3', latency: 2.5, throughput: 88, load: 53 },
                { name: 'Thứ 4', latency: 3.1, throughput: 76, load: 68 },
                { name: 'Thứ 5', latency: 2.9, throughput: 80, load: 62 },
                { name: 'Thứ 6', latency: 2.7, throughput: 90, load: 76 },
                { name: 'Thứ 7', latency: 2.3, throughput: 95, load: 48 },
                { name: 'Chủ nhật', latency: 2.0, throughput: 98, load: 41 },
            ];

            const mockPlatformData = [
                { name: 'Web App', value: 45 },
                { name: 'Mobile App', value: 30 },
                { name: 'API', value: 25 },
            ];

            const mockTrendData = [
                { month: 'T1', value: 220 },
                { month: 'T2', value: 380 },
                { month: 'T3', value: 450 },
                { month: 'T4', value: 520 },
                { month: 'T5', value: 610 },
            ];

            const mockAccuracyData = {
                overall: 87,
                detailed: [
                    { subject: 'Mô tả chi tiết', A: 85, fullMark: 100 },
                    { subject: 'Phát hiện chủ thể', A: 92, fullMark: 100 },
                    { subject: 'Bối cảnh', A: 88, fullMark: 100 },
                    { subject: 'Màu sắc', A: 95, fullMark: 100 },
                    { subject: 'Hành động', A: 83, fullMark: 100 },
                    { subject: 'Quan hệ không gian', A: 80, fullMark: 100 },
                ],
            };

            const mockTotalStats = {
                totalImages: 3871,
                avgRating: 4.2,
                avgProcessingTime: 2.7,
                captionsToday: 86,
                totalUsers: 324,
                successRate: 96.5,
                pendingImages: 14,
            };

            setCaptionTimeData(mockCaptionTimeData);
            setCaptionLengthData(mockCaptionLengthData);
            setRatingData(mockRatingData);
            setCategoryData(mockCategoryData);
            setPerformanceData(mockPerformanceData);
            setPlatformData(mockPlatformData);
            setTrendData(mockTrendData);
            setAccuracyData(mockAccuracyData);
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
                    { date: '09:00', total: 12, success: 11, failed: 1 },
                    { date: '10:00', total: 18, success: 17, failed: 1 },
                    { date: '11:00', total: 15, success: 14, failed: 1 },
                    { date: '12:00', total: 8, success: 8, failed: 0 },
                    { date: '13:00', total: 10, success: 9, failed: 1 },
                    { date: '14:00', total: 14, success: 13, failed: 1 },
                    { date: '15:00', total: 9, success: 8, failed: 1 },
                ]);
            } else if (value === 'week') {
                setCaptionTimeData([
                    { date: '30/04', total: 65, success: 60, failed: 5 },
                    { date: '01/05', total: 78, success: 74, failed: 4 },
                    { date: '02/05', total: 82, success: 76, failed: 6 },
                    { date: '03/05', total: 70, success: 65, failed: 5 },
                    { date: '04/05', total: 54, success: 51, failed: 3 },
                    { date: '05/05', total: 93, success: 89, failed: 4 },
                    { date: '06/05', total: 86, success: 84, failed: 2 },
                ]);
            } else if (value === 'month') {
                setCaptionTimeData([
                    { date: 'Tuần 1', total: 310, success: 296, failed: 14 },
                    { date: 'Tuần 2', total: 285, success: 275, failed: 10 },
                    { date: 'Tuần 3', total: 340, success: 328, failed: 12 },
                    {

 date: 'Tuần 4', total: 298, success: 290, failed: 8 },
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
                    <p style={{ fontWeight: 600, marginBottom: '8px' }}>{data.rating}</p>
                    <p style={{ margin: 0 }}>
                        <span style={{ color: '#666' }}>Số lượt: </span>
                        <span style={{ fontWeight: 500 }}>{data.count}</span>
                    </p>
                    <p style={{ margin: '5px 0 0 0' }}>
                        <span style={{ color: '#666' }}>Tỷ lệ: </span>
                        <span style={{ fontWeight: 500 }}>
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
        index,
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

    const renderCards = () => (
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6}>
                <Card
                    variant={false}
                    className="stat-card shadow-md hover:shadow-lg transition-all duration-300"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <Text
                                type="secondary"
                                className="text-xs uppercase font-medium mb-1 block"
                            >
                                Tổng số ảnh
                            </Text>
                            <Title level={3} className="m-0 font-semibold">
                                {totalStats.totalImages.toLocaleString()}
                            </Title>
                        </div>
                        <div className="stat-icon bg-blue-50 rounded-full p-3">
                            <PictureOutlined className="text-blue-600 text-2xl" />
                        </div>
                    </div>
                </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
                <Card
                    variant={false}
                    className="stat-card shadow-md hover:shadow-lg transition-all duration-300"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <Text
                                type="secondary"
                                className="text-xs uppercase font-medium mb-1 block"
                            >
                                Caption hôm nay
                            </Text>
                            <Title level={3} className="m-0 font-semibold">
                                {totalStats.captionsToday}
                            </Title>
                        </div>

                        <div className="stat-icon bg-green-50 rounded-full p-3">
                            <FireOutlined className="text-green-600 text-2xl" />
                        </div>
                    </div>
                </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
                <Card
                    variant={false}
                    className="stat-card shadow-md hover:shadow-lg transition-all duration-300"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <Text
                                type="secondary"
                                className="text-xs uppercase font-medium mb-1 block"
                            >
                                Tỉ lệ thành công
                            </Text>
                            <Title level={3} className="m-0 font-semibold">
                                {totalStats.successRate}%
                            </Title>
                        </div>
                        <div className="stat-icon bg-green-50 rounded-full p-3">
                            <CheckCircleOutlined className="text-green-600 text-2xl" />
                        </div>
                    </div>
                </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
                <Card
                    variant={false}
                    className="stat-card shadow-md hover:shadow-lg transition-all duration-300"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <Text
                                type="secondary"
                                className="text-xs uppercase font-medium mb-1 block"
                            >
                                Đánh giá trung bình
                            </Text>
                            <Title level={3} className="m-0 font-semibold">
                                {totalStats.avgRating}{' '}
                                <span className="text-base font-normal text-gray-500">/ 5</span>
                            </Title>
                        </div>
                        <div className="stat-icon bg-yellow-50 rounded-full p-3">
                            <StarOutlined className="text-yellow-500 text-2xl" />
                        </div>
                    </div>
                </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
                <Card
                    variant={false}
                    className="stat-card shadow-md hover:shadow-lg transition-all duration-300"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <Text
                                type="secondary"
                                className="text-xs uppercase font-medium mb-1 block"
                            >
                                Thời

 gian xử lý
                            </Text>
                            <Title level={3} className="m-0 font-semibold">
                                {totalStats.avgProcessingTime}{' '}
                                <span className="text-base font-normal text-gray-500">giây</span>
                            </Title>
                        </div>
                        <div className="stat-icon bg-purple-50 rounded-full p-3">
                            <ClockCircleOutlined className="text-purple-600 text-2xl" />
                        </div>
                    </div>
                </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
                <Card
                    variant={false}
                    className="stat-card shadow-md hover:shadow-lg transition-all duration-300"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <Text
                                type="secondary"
                                className="text-xs uppercase font-medium mb-1 block"
                            >
                                Người dùng
                            </Text>
                            <Title level={3} className="m-0 font-semibold">
                                {totalStats.totalUsers}
                            </Title>
                        </div>
                        <div className="stat-icon bg-indigo-50 rounded-full p-3">
                            <TeamOutlined className="text-indigo-600 text-2xl" />
                        </div>
                    </div>
                </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
                <Card
                    variant={false}
                    className="stat-card shadow-md hover:shadow-lg transition-all duration-300"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <Text
                                type="secondary"
                                className="text-xs uppercase font-medium mb-1 block"
                            >
                                Đang xử lý
                            </Text>
                            <Title level={3} className="m-0 font-semibold">
                                {totalStats.pendingImages}
                            </Title>
                        </div>
                        <div className="stat-icon bg-orange-50 rounded-full p-3">
                            <CloudUploadOutlined className="text-orange-500 text-2xl" />
                        </div>
                    </div>
                </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
                <Card
                    variant={false}
                    className="stat-card shadow-md hover:shadow-lg transition-all duration-300"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <Text
                                type="secondary"
                                className="text-xs uppercase font-medium mb-1 block"
                            >
                                Độ chính xác
                            </Text>
                            <Title level={3} className="m-0 font-semibold">
                                {accuracyData?.overall || 0}%
                            </Title>
                        </div>
                        <div className="stat-icon bg-blue-50 rounded-full p-3">
                            <EyeOutlined className="text-blue-600 text-2xl" />
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>
    );

    return (
        <div className="flex flex-col gap-4 max-w-[2048px]">
            <div className="flex justify-between items-center p-4 bg-white rounded-sm shadow-md">
                <p className="text-2xl font-semibold">Tổng quan</p>
                <Button
                    type="default"
                    icon={<ReloadOutlined />}
                    onClick={() => {
                        setLoading(true);
                        setTimeout(() => setLoading(false), 1000);
                    }}
                >
                    Làm mới
                </Button>
            </div>

            <Spin className="!h-full !w-full" spinning={loading} tip="Đang tải dữ liệu...">
                {renderCards()}

                <div className="my-6 flex justify-between items-center flex-wrap bg-white p-4 rounded-sm shadow-md">
                    <p className="text-2xl font-semibold">Thống kê chi tiết</p>
                    <Select
                        defaultValue="week"
                        style={{ width: 160 }}
                        onChange={handleTimeRangeChange}
                        className="rounded-md"
                    >
                        <Option value="day">Hôm nay</Option>
                        <Option value="week">Tuần này</Option>
                        <Option value="month">Tháng này</Option>
                        <Option value="custom">Tùy chỉnh</Option>
                    </Select>
                </div>

                <Row gutter={[16, 16]}>
                    <Col xs={24} lg={16}>
                        <Card
                            title={
                                <div className="flex justify-center items-center">
                                    <span>Số lượng ảnh được caption theo thời gian</span>
                                </div>
                            }
                            variant={false}
                            className="shadow-md card-chart"
                        >
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
                                        <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
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
                                                    : name === 'success'
                                                    ? 'Thành công'
                                                    : 'Thất bại';
                                            return [value, display];
                                        }}
                                    />
                                    <Legend
                                        formatter={(value) =>
                                            value === 'total'
                                                ? 'Tổng số'
                                                : value === 'success'
                                                ? 'Thành công'
                                                : 'Thất bại'
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
                                        dataKey="success"
                                        stroke="#82ca9d"
                                        fillOpacity={1}
                                        fill="url(#colorSuccess)"
                                    />
                                    <Bar dataKey="failed" fill="#ff4d4f" barSize={5} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </Card>
                    </Col>

                    <Col xs={24} lg={8}>
                        <Card
                            title="Phân bố đánh giá"
                            className="shadow-md card-chart"
                        >
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
                                    <Tooltip content={<CustomRatingTooltip />} />
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
                        </Card>
                    </Col>

                    <Col xs={24} lg={12}>
                        <Card
                            title="Phân bố độ dài caption"
                            variant={false}
                            className="shadow-md card-chart"
                        >
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={captionLengthData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="range" />
                                    <YAxis />
                                    <Tooltip
                                        contentStyle={customTooltipStyle}
                                        formatter={(value, name) =>
                                            [value, name === 'count' ? 'Số lượng' : 'Phần trăm']
                                        }
                                    />
                                    <Legend
                                        formatter={(value) =>
                                            value === 'count' ? 'Số lượng' : 'Phần trăm'
                                        }
                                    />
                                    <Bar
                                        dataKey="count"
                                        fill="#4CAF50"
                                        radius={[4, 4, 0, 0]}
                                        barSize={30}
                                        animationDuration={1500}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </Card>
                    </Col>

                    <Col xs={24} lg={12}>
                        <Card
                            title="Phân bố theo danh mục ảnh"
                            variant={false}
                            className="shadow-md card-chart"
                        >
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={categoryData}
                                    layout="vertical"
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                    <XAxis type="number" />
                                    <YAxis type="category" dataKey="category" width={80} />
                                    <Tooltip
                                        contentStyle={customTooltipStyle}
                                        formatter={(value, name, props) =>
                                            [`${value} ảnh`, props.payload.category]
                                        }
                                        labelFormatter={() => 'Danh mục'}
                                    />
                                    <Bar
                                        dataKey="value"
                                        fill="#1F77B4"
                                        radius={[0, 4, 4, 0]}
                                        barSize={18}
                                        animationDuration={1500}
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </Card>
                    </Col>

                    <Col xs={24} lg={16}>
                        <Card
                            title={
                                <div className="flex justify-center items-center">
                                    <span>Hiệu năng hệ thống</span>
                                </div>
                            }
                            variant={false}
                            className="shadow-md card-chart"
                        >
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart
                                    data={performanceData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip
                                        contentStyle={customTooltipStyle}
                                        formatter={(value, name) => {
                                            const display =
                                                name === 'latency'
                                                    ? 'Độ trễ (s)'
                                                    : name === 'throughput'
                                                    ? 'Thông lượng (%)'
                                                    : 'Tải CPU (%)';
                                            return [value, display];
                                        }}
                                    />
                                    <Legend
                                        formatter={(value) =>
                                            value === 'latency'
                                                ? 'Độ trễ (s)'
                                                : value === 'throughput'
                                                ? 'Thông lượng (%)'
                                                : 'Tải CPU (%)'
                                        }
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="latency"
                                        stroke="#FF9800"
                                        strokeWidth={2}
                                        dot={{ r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="throughput"
                                        stroke="#4CAF50"
                                        strokeWidth={2}
                                        dot={{ r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="load"
                                        stroke="#F44336"
                                        strokeWidth={2}
                                        dot={{ r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Card>
                    </Col>

                    <Col xs={24} lg={8}>
                        <Card
                            title="Độ chính xác theo tiêu chí"
                            variant={false}
                            className="shadow-md card-chart"
                        >
                            <ResponsiveContainer width="100%" height={300}>
                                <RadarChart
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="80%"
                                    data={accuracyData?.detailed || []}
                                >
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="subject" />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                                    <Radar
                                        name="Điểm số"
                                        dataKey="A"
                                        stroke="#8884d8"
                                        fill="#8884d8"
                                        fillOpacity={0.6}
                                    />
                                    <Tooltip
                                        contentStyle={customTooltipStyle}
                                        formatter={(value) => [`${value}%`, 'Điểm số']}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </Card>
                    </Col>

                    <Col xs={24} lg={12}>
                        <Card
                            title="Xu hướng phát triển"
                            variant={false}
                            className="shadow-md card-chart"
                        >
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart
                                    data={trendData}
                                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                >
                                    <defs>
                                        <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2196F3" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#2196F3" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip
                                        contentStyle={customTooltipStyle}
                                        formatter={(value) => [`${value} caption`, 'Số lượng']}
                                        labelFormatter={(label) => `Tháng ${label}`}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#2196F3"
                                        fillOpacity={1}
                                        fill="url(#colorTrend)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Card>
                    </Col>
                </Row>
            </Spin>
        </div>
    );
}

export default Dashboard;