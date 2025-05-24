import { useState, useEffect, useMemo } from 'react'
import {
    Card,
    Avatar,
    Rate,
    Typography,
    Row,
    Col,
    Empty,
    Space,
    Statistic,
    Progress,
    Tooltip,
    Select,
    Skeleton
} from 'antd';
import {
    CalendarOutlined,
    StarFilled,
} from '@ant-design/icons'
import { fetchFeedBacks } from '../../services/adminService'

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const THEME = {
    primary: '#2563eb',
    secondary: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    purple: '#8b5cf6',
    indigo: '#6366f1',
    teal: '#14b8a6',
    text: {
        primary: '#1f2937',
        secondary: '#4b5563',
        light: '#6b7280'
    },
    border: {
        light: '#e5e7eb',
        highlight: '#dbeafe'
    },
    background: {
        base: '#ffffff',
        light: '#f8fafc',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        card: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
    },
    shadows: {
        small: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    borderRadius: {
        small: '8px',
        medium: '12px',
        large: '16px',
        xl: '20px'
    }
};

const stringToColor = (string) => {
    if (!string) return THEME.primary;
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [THEME.primary, THEME.secondary, THEME.purple, THEME.indigo, THEME.teal];
    return colors[Math.abs(hash) % colors.length];
};

const getRelativeTime = (dateString) => {
    if (!dateString) return 'Unknown';
    
    try {
        let date;
        if (dateString.includes('/')) {
            const parts = dateString.split(' ')[0].split('/');
            if (parts.length === 3) {
                date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
            }
        } else {
            date = new Date(dateString);
        }
        
        if (isNaN(date.getTime())) return 'Invalid date';
        
        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";
        if (diffDays < 7) return `${-diffDays} days ago`;
        if (diffDays < 30) return `${-Math.floor(diffDays / 7)} weeks ago`;
        return `${Math.floor(-diffDays / 30)} months ago`;
    } catch (error) {
        console.error('Date parsing error:', error);
        return 'Unknown';
    }
};

const FeedbackCard = ({ feedback }) => {
    if (!feedback) return null;

    const userColor = stringToColor(feedback.username);

    return (
        <Card
            style={{
                marginBottom: '24px',
                borderRadius: THEME.borderRadius.large,
                overflow: 'hidden',
                boxShadow: THEME.shadows.medium,
                transform: 'translateY(0)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                border: '1px solid rgba(37, 99, 235, 0.08)',
                background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
                position: 'relative'
            }}
            className="feedback-card-hover"
            hoverable
        >
            {/* Decorative gradient border */}
            <div 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${userColor}, ${THEME.secondary})`,
                    borderRadius: '16px 16px 0 0'
                }}
            />

            <Row
                gutter={16}
                align="middle"
                style={{
                    padding: '20px 24px 16px',
                    marginBottom: '16px',
                }}
            >
                <Col>
                    <div style={{ position: 'relative' }}>
                        <Avatar
                            size={60}
                            style={{
                                background: `linear-gradient(135deg, ${userColor}, ${userColor}dd)`,
                                border: '3px solid white',
                                boxShadow: THEME.shadows.medium,
                                fontSize: '20px',
                                fontWeight: '600'
                            }}
                            className="avatar-pulse"
                        >
                            {feedback.username?.charAt(0)?.toUpperCase() || '?'}
                        </Avatar>
                        <div 
                            style={{
                                position: 'absolute',
                                bottom: -2,
                                right: -2,
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                background: `linear-gradient(135deg, ${THEME.secondary}, ${THEME.teal})`,
                                border: '2px solid white',
                                boxShadow: THEME.shadows.small
                            }}
                        />
                    </div>
                </Col>

                <Col flex="auto">
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                        <Text 
                            strong 
                            style={{ 
                                fontSize: '18px', 
                                color: THEME.text.primary,
                                fontWeight: '600',
                                marginBottom: '4px'
                            }}
                        >
                            {feedback.username || 'Anonymous'}
                        </Text>
                        <Text 
                            type="secondary" 
                            style={{ 
                                fontSize: '14px',
                                color: THEME.text.light,
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <Tooltip title={feedback.dateTime || 'No date'}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <CalendarOutlined 
                                        style={{ 
                                            marginRight: '6px',
                                            color: THEME.primary
                                        }} 
                                    />
                                    {getRelativeTime(feedback.dateTime)}
                                </div>
                            </Tooltip>
                        </Text>
                    </div>
                </Col>

                <Col>
                    <div style={{
                        padding: '8px 12px',
                        background: `linear-gradient(135deg, ${THEME.warning}15, ${THEME.warning}25)`,
                        borderRadius: THEME.borderRadius.medium,
                        border: `1px solid ${THEME.warning}30`
                    }}>
                        <Rate
                            disabled
                            value={feedback.rating || 0}
                            style={{ fontSize: '20px' }}
                            className="custom-rate"
                        />
                    </div>
                </Col>
            </Row>

            <Row gutter={24} style={{ padding: '0 24px 24px' }}>
                <Col xs={24} md={feedback.imageUrl ? 15 : 24}>
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <div style={{
                            padding: '20px',
                            borderRadius: THEME.borderRadius.medium,
                            background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                            border: '1px solid rgba(148, 163, 184, 0.2)',
                            textAlign: 'left',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div 
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '4px',
                                    height: '100%',
                                    background: `linear-gradient(180deg, ${THEME.primary}, ${THEME.purple})`
                                }}
                            />
                            <Text 
                                strong 
                                style={{ 
                                    fontSize: '16px', 
                                    color: THEME.text.primary,
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                Feedback
                            </Text>
                            <Paragraph style={{
                                marginTop: '12px',
                                fontSize: '15px',
                                lineHeight: '1.7',
                                color: THEME.text.secondary,
                                marginBottom: 0
                            }}>
                                {feedback.feedback || 'No feedback provided'}
                            </Paragraph>
                        </div>

                        <div style={{
                            padding: '20px',
                            borderRadius: THEME.borderRadius.medium,
                            background: `linear-gradient(135deg, ${THEME.primary}08, ${THEME.primary}15)`,
                            border: `1px solid ${THEME.primary}20`,
                            textAlign: 'left',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div 
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '4px',
                                    height: '100%',
                                    background: `linear-gradient(180deg, ${THEME.secondary}, ${THEME.teal})`
                                }}
                            />
                            <Text 
                                strong 
                                style={{ 
                                    fontSize: '16px', 
                                    color: THEME.text.primary,
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                Caption
                            </Text>
                            <Paragraph style={{
                                marginTop: '12px',
                                fontSize: '15px',
                                lineHeight: '1.7',
                                color: THEME.text.secondary,
                                marginBottom: 0
                            }}>
                                {feedback.caption}
                            </Paragraph>
                        </div>
                    </Space>
                </Col>

                {feedback.imageUrl && (
                    <Col xs={24} md={9}>
                        <div style={{
                            borderRadius: THEME.borderRadius.medium,
                            overflow: 'hidden',
                            border: `2px solid ${THEME.border.light}`,
                            height: '100%',
                            minHeight: '320px',
                            boxShadow: THEME.shadows.medium,
                            position: 'relative',
                            background: `linear-gradient(135deg, ${THEME.background.light}, #ffffff)`
                        }}>
                            <img 
                                src={feedback.imageUrl} 
                                alt="Feedback image"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.3s ease'
                                }}
                                className="feedback-image"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                    </Col>
                )}
            </Row>
        </Card>
    );
};

const StatsOverview = ({ feedbacks, timeFilter, onTimeFilterChange }) => {
    const stats = useMemo(() => {
        if (!Array.isArray(feedbacks) || feedbacks.length === 0) {
            return {
                avgRating: 0,
                ratingCounts: [5, 4, 3, 2, 1].map(rating => ({
                    rating,
                    count: 0,
                    percentage: 0
                }))
            };
        }

        const avgRating = feedbacks.reduce((acc, curr) => acc + (curr.rating || 0), 0) / feedbacks.length;
        
        const ratingCounts = [5, 4, 3, 2, 1].map(rating => {
            const count = feedbacks.filter(f => f.rating === rating).length;
            return {
                rating,
                count,
                percentage: (count / feedbacks.length) * 100
            };
        });

        return { avgRating, ratingCounts };
    }, [feedbacks]);

    return (
        <Card
            style={{
                borderRadius: THEME.borderRadius.xl,
                marginBottom: '32px',
                boxShadow: THEME.shadows.large,
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                border: '1px solid rgba(37, 99, 235, 0.08)',
                overflow: 'hidden'
            }}
            className="stats-card"
        >

            <Row
                justify="space-between"
                align="middle"
                style={{
                    marginBottom: '32px',
                    paddingBottom: '16px',
                    borderBottom: `2px solid ${THEME.border.light}`
                }}
            >
                <Col>
                    <Title 
                        level={2} 
                        style={{ 
                            margin: 0, 
                            color: THEME.text.primary,
                            background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.purple})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: '700'
                        }}
                    >
                        Analytics Overview
                    </Title>
                </Col>
                <Col>
                    <Select
                        style={{ 
                            width: 160,
                            borderRadius: THEME.borderRadius.medium
                        }}
                        value={timeFilter}
                        onChange={onTimeFilterChange}
                        className="custom-select"
                    >
                        <Option value="all">All time</Option>
                        <Option value="today">Today</Option>
                        <Option value="week">This week</Option>
                        <Option value="month">This month</Option>
                    </Select>
                </Col>  
            </Row>
            
            <Row gutter={32}>
                <Col xs={24} md={10}>
                    <div style={{
                        padding: '24px',
                        borderRadius: THEME.borderRadius.large,
                        background: `linear-gradient(135deg, ${THEME.primary}10, ${THEME.primary}20)`,
                        border: `2px solid ${THEME.primary}30`,
                        textAlign: 'center'
                    }}>
                        <Statistic
                            title={
                                <Title level={4} style={{ 
                                    color: THEME.text.primary,
                                    marginBottom: '8px'
                                }}>
                                    Average Rating
                                </Title>
                            }
                            value={stats.avgRating}
                            precision={1}
                            valueStyle={{ 
                                color: THEME.primary, 
                                fontSize: '42px',
                                fontWeight: '700'
                            }}
                            prefix={<StarFilled className="star-pulse" />}
                            suffix={
                                <span style={{ 
                                    fontSize: '20px', 
                                    color: 'THEME.text.light',
                                    fontWeight: '500'
                                }}>
                                    / 5
                                </span>
                            }
                        />
                        <div style={{ marginTop: '16px' }}>
                            <Rate 
                                disabled 
                                allowHalf 
                                value={stats.avgRating} 
                                style={{ fontSize: '24px' }}
                                className="custom-rate"
                            />
                        </div>
                        <Text 
                            type="secondary" 
                            style={{ 
                                display: 'block', 
                                marginTop: '12px',
                                fontSize: '16px',
                                fontWeight: '500'
                            }}
                        >
                            Based on {feedbacks.length} reviews
                        </Text>
                    </div>
                </Col>

                <Col xs={24} md={14}>
                    <div style={{
                        padding: '24px',
                        borderRadius: THEME.borderRadius.large,
                        background: `linear-gradient(135deg, ${THEME.secondary}08, ${THEME.secondary}15)`,
                        border: `2px solid ${THEME.secondary}25`,
                        textAlign: 'center'
                    }}>
                        <Title level={4}  style={{ 
                            color: THEME.text.primary,
                            marginBottom: '20px',
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            Rating Distribution
                        </Title>
                        <Space direction="vertical" style={{ width: '100%' }} size="middle">
                            {stats.ratingCounts.map(item => (
                                <Row key={item.rating} align="middle" gutter={16}>
                                    <Col span={3}>
                                        <Space align="center">
                                            <span style={{ 
                                                color: THEME.text.primary,
                                                fontWeight: '600',
                                                fontSize: '16px'
                                            }}>
                                                {item.rating}
                                            </span>
                                            <StarFilled style={{ 
                                                color: THEME.warning,
                                                fontSize: '16px'
                                            }} />
                                        </Space>
                                    </Col>
                                    <Col span={15}>
                                        <Progress
                                            percent={item.percentage}
                                            showInfo={false}
                                            strokeColor={{
                                                from: item.rating >= 4 ? THEME.secondary : 
                                                      item.rating >= 3 ? THEME.primary :
                                                      item.rating >= 2 ? THEME.warning : THEME.error,
                                                to: item.rating >= 4 ? THEME.teal : 
                                                    item.rating >= 3 ? THEME.indigo :
                                                    item.rating >= 2 ? '#fb923c' : '#fca5a5'
                                            }}
                                            size="default"
                                            className="animate-progress"
                                            strokeWidth={8}
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <Text style={{ 
                                            color: THEME.text.secondary,
                                            fontWeight: '500',
                                            fontSize: '14px'
                                        }}>
                                            {item.count} reviews
                                        </Text>
                                    </Col>
                                </Row>
                            ))}
                        </Space>
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ratingFilter, setRatingFilter] = useState('all');
    const [timeFilter, setTimeFilter] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const feedbacksResponse = await fetchFeedBacks(localStorage.getItem('at'));
                setFeedbacks(Array.isArray(feedbacksResponse) ? feedbacksResponse : []);
            } catch (err) {
                console.error('Failed to fetch feedbacks:', err.message);
                setFeedbacks([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredFeedbacks = useMemo(() => {
        if (!Array.isArray(feedbacks)) return [];
        
        return feedbacks.filter(feedback => {
            if (ratingFilter !== 'all' && feedback.rating !== parseInt(ratingFilter)) {
                return false;
            }
            
            if (timeFilter !== 'all' && feedback.dateTime) {
                try {
                    let feedbackDate;
                    if (feedback.dateTime.includes('/')) {
                        const parts = feedback.dateTime.split(' ')[0].split('/');
                        if (parts.length === 3) {
                            feedbackDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
                        }
                    } else {
                        feedbackDate = new Date(feedback.dateTime);
                    }
                    
                    if (feedbackDate && !isNaN(feedbackDate.getTime())) {
                        const now = new Date();
                        const diffDays = Math.floor((now - feedbackDate) / (1000 * 60 * 60 * 24));
                        
                        switch (timeFilter) {
                            case 'today':
                                return diffDays === 0;
                            case 'week':
                                return diffDays <= 7;
                            case 'month':
                                return diffDays <= 30;
                            default:
                                return true;
                        }
                    }
                } catch (error) {
                    console.error('Date filter error:', error);
                }
            }
            
            return true;
        });
    }, [feedbacks, ratingFilter, timeFilter]);

    const handleRatingFilterChange = (value) => {
        setRatingFilter(value);
    };

    const handleTimeFilterChange = (value) => {
        setTimeFilter(value);
    };

    const renderSkeletons = () => {
        return Array(3).fill().map((_, index) => (
            <Card
                key={index}
                style={{
                    marginBottom: '24px',
                    borderRadius: THEME.borderRadius.large,
                    boxShadow: THEME.shadows.medium
                }}
            >
                <Skeleton active paragraph={{ rows: 4 }} />
            </Card>
        ));
    };

    return (
        <div style={{ 
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            minHeight: '100vh',
            padding: '24px'
        }}>
            <style jsx global>{`
                @keyframes star-pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.15); }
                    100% { transform: scale(1); }
                }
                
                @keyframes progress-animate {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                .feedback-card-hover:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: ${THEME.shadows.xl};
                    border-color: ${THEME.primary}40;
                }
                
                .feedback-image:hover {
                    transform: scale(1.05);
                }
                
                .star-pulse {
                    animation: star-pulse 2s infinite;
                }
                
                .avatar-pulse:hover {
                    transform: scale(1.1) rotate(5deg);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .animate-progress .ant-progress-bg {
                    transition: all 2s cubic-bezier(0.4, 0, 0.2, 1);
                    animation: progress-animate 2s;
                }
                
                .stats-card {
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .stats-card:hover {
                    box-shadow: ${THEME.shadows.xl};
                }
                
                .custom-rate .ant-rate-star {
                    margin-right: 4px;
                }
                
                .custom-rate .ant-rate-star-full .ant-rate-star-first {
                    color: ${THEME.warning};
                }
                
                .custom-select .ant-select-selector {
                    border-radius: ${THEME.borderRadius.medium}!important;
                    border: 2px solid ${THEME.border.light}!important;
                    transition: all 0.3s ease!important;
                }
                
                .custom-select:hover .ant-select-selector {
                    border-color: ${THEME.primary}!important;
                    box-shadow: ${THEME.shadows.small}!important;
                }
            `}</style>

            <StatsOverview 
                feedbacks={filteredFeedbacks} 
                timeFilter={timeFilter}
                onTimeFilterChange={handleTimeFilterChange}
            />

            {loading ? (
                renderSkeletons()
            ) : (
                <Card
                    style={{
                        borderRadius: THEME.borderRadius.xl,
                        overflow: 'hidden',
                        boxShadow: THEME.shadows.large,
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                        border: '1px solid rgba(37, 99, 235, 0.08)'
                    }}
                >
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        paddingBottom: '20px',
                        borderBottom: `3px solid ${THEME.border.light}`,
                        marginBottom: '24px'
                    }}>
                        <Title 
                            level={2} 
                            style={{ 
                                margin: 0, 
                                background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.secondary})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: '700'
                            }}
                        >
                            User Feedbacks
                        </Title>
                        <Select
                            style={{ width: 180 }}
                            value={ratingFilter}
                            onChange={handleRatingFilterChange}
                            className="custom-select"
                        >
                            <Option value="all">🌟 All Ratings</Option>
                            {[5, 4, 3, 2, 1].map(rating => (
                                <Option key={rating} value={`${rating}`}>
                                    <Space>
                                        <span>{rating}</span>
                                        <Rate disabled value={rating} style={{ fontSize: '12px' }} />
                                    </Space>
                                </Option>
                            ))}
                        </Select>
                    </div>
                
                    <div>
                        {filteredFeedbacks.length > 0 ? (
                            filteredFeedbacks.map((feedback, index) => (
                                <FeedbackCard 
                                    key={feedback.id || index} 
                                    feedback={feedback} 
                                />
                            ))
                        ) : (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_DEFAULT}
                                description={
                                    <span style={{
                                        fontSize: '16px',
                                        color: THEME.text.secondary
                                    }}>
                                        {feedbacks.length === 0 
                                            ? 'No feedback available' 
                                            : 'No feedback matches the selected filters'
                                        }
                                    </span>
                                }
                                style={{
                                    padding: '60px',
                                    background: `linear-gradient(135deg, ${THEME.background.light}, #ffffff)`,
                                    borderRadius: THEME.borderRadius.large,
                                    margin: '20px 0'
                                }}
                            />
                        )}
                    </div>
                </Card>
            )}
        </div>
    );
};

export default Feedback;