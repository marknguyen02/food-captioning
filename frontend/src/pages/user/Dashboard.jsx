import React, { useState, useEffect } from 'react'
import {
  PieChart, Pie, Cell, Legend,
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip
} from "recharts"
import {
  CheckCircle, Database, BarChart3, HardDrive
} from 'lucide-react'
import { countAlbums, computeSizeAlbum } from '../../services/albumService'
import { useSelector } from 'react-redux'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

function Dashboard() {
  const mode = useSelector((state) => state.app.mode)
  const isDarkMode = mode === 'dark'

  const [isLoading, setIsLoading] = useState(true)
  const [albumData, setAlbumData] = useState([])
  const [storageData, setStorageData] = useState([])

  const BASE_COLORS = [
    "#06b6d4", "#f59e0b", "#ec4899", "#14b8a6", "#3b82f6", "#8b5cf6",
    "#ef4444", "#10b981", "#f97316", "#6366f1", "#d946ef", "#0ea5e9",
    "#f43f5e", "#84cc16", "#64748b"
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('at')
        const count = await countAlbums(token)
        const storage = await computeSizeAlbum(token)

        setAlbumData(count)
        setStorageData(storage)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const totalPhotos = albumData.reduce((sum, item) => sum + item.photos, 0)
  const totalStorage = storageData.reduce((sum, item) => sum + item.size, 0)

  const getColorPair = (hexColor) => {
    const hex = hexColor.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)

    const lighter = (c) => Math.min(255, Math.floor(c + (255 - c) * 0.4))
    const lighterHex = `#${lighter(r).toString(16).padStart(2, '0')}${lighter(g).toString(16).padStart(2, '0')}${lighter(b).toString(16).padStart(2, '0')}`
    return { start: hexColor, end: lighterHex }
  }

  const getItemColor = (i) => BASE_COLORS[i % BASE_COLORS.length]

  const renderGradients = () => (
    <defs>
      {BASE_COLORS.map((color, i) => {
        const gradient = getColorPair(color)
        return (
          <linearGradient key={i} id={`gradient-${i}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={gradient.start} />
            <stop offset="100%" stopColor={gradient.end} />
          </linearGradient>
        )
      })}
    </defs>
  )

  const WidgetWrapper = ({ title, children, icon, iconColor }) => (
    <div className={`${isDarkMode ? 'bg-gray-900 border-gray-800 hover:shadow-[0_10px_30px_rgba(59,130,246,0.3)]' : 'bg-white border-gray-200 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)]'} 
        rounded-xl shadow-xl border transition-all duration-300 transform hover:-translate-y-2 hover:border-blue-500 group`}>
      <div className={`p-4 flex items-center ${isDarkMode ? 'bg-slate-700' : 'bg-blue-50'}`}>
        {React.cloneElement(icon, { className: `text-${iconColor} stroke-2` })}
        <h3 className="ml-3 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">{title}</h3>
      </div>
      <div className={`px-4 py-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} overflow-auto max-h-[700px]`}>
        {children}
      </div>
    </div>
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin indicator={<LoadingOutlined />} />
      </div>
    )
  }

  return (
    <div className={`flex flex-col gap-5 w-full h-full ${isDarkMode ? 'bg-[#20262E]' : 'bg-gray-100'} items-center overflow-auto py-5`}>
      <h1 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-400 mb-2.5 hidden md:block">
        Dashboard
      </h1>

      <div className="w-full max-w-7xl px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <WidgetWrapper title="Photo Count Percentage" icon={<CheckCircle />} iconColor="cyan-400">
            <div className="mb-3">
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm uppercase`}>Total Photos</p>
              <p className="text-4xl font-extrabold text-cyan-400">{totalPhotos}</p>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                {renderGradients()}
                <Pie
                  data={albumData}
                  cx="50%" cy="50%" innerRadius={70} outerRadius={90}
                  paddingAngle={3} dataKey="photos"
                  label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                >
                  {albumData.map((_, i) => (
                    <Cell key={i} fill={getItemColor(i)} />
                  ))}
                </Pie>
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </WidgetWrapper>

          {/* Storage Pie */}
          <WidgetWrapper title="Album Storage Percentage" icon={<Database />} iconColor="amber-400">
            <div className="mb-3">
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm uppercase`}>Total Storage</p>
              <p className="text-4xl font-extrabold text-amber-400">5 GB</p>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                {renderGradients()}
                <Pie
                  data={storageData}
                  cx="50%" cy="50%" innerRadius={70} outerRadius={90}
                  paddingAngle={3} dataKey="size"
                  label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                >
                  {storageData.map((_, i) => (
                    <Cell key={i} fill={getItemColor(i)} />
                  ))}
                </Pie>
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </WidgetWrapper>
        </div>

        {/* Bar & Details */}
        <div className="flex flex-col gap-6">
          <WidgetWrapper title="Photo Count by Album" icon={<BarChart3 />} iconColor="pink-400">
            <div className="mb-3">
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm uppercase`}>Photo Count Details</p>
              <p className="text-4xl font-extrabold text-pink-400">{totalPhotos}</p>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={albumData} layout="vertical" margin={{ left: 50, right: 30 }}>
                {renderGradients()}
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip 
                  cursor={{ fill: isDarkMode ? '#1f2937' : '#f0f0f0' }}
                  contentStyle={{ backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', borderRadius: 8, borderColor: '#e5e7eb' }}
                  labelStyle={{ color: isDarkMode ? '#f9fafb' : '#111827' }}
                  formatter={(value, name) => [`${value} photos`, null]}
                />
                <Bar dataKey="photos" barSize={20} background={{ fill: isDarkMode ? "#374151" : "#EDF2F7" }}>
                  {albumData.map((_, i) => (
                    <Cell key={i} fill={`url(#gradient-${i % BASE_COLORS.length})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </WidgetWrapper>

          <WidgetWrapper title="Album Storage Details" icon={<HardDrive />} iconColor="teal-400">
            <div className="mb-3">
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm uppercase`}>Used Storage</p>
              <p className="text-4xl font-extrabold text-teal-400">{totalStorage} GB</p>
            </div>
            <div className="space-y-4 h-[320px]">
              {storageData.map((item, i) => {
                const { start, end } = getColorPair(getItemColor(i))
                return (
                  <div key={i} className="relative pt-1 group">
                    <div className="flex justify-between mb-1 text-sm">
                      <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.name}</span>
                      <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.size} GB</span>
                    </div>
                    <div className={`h-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div
                        className="h-full rounded transition-all duration-500"
                        style={{
                          width: `${item.percentage.toFixed(1)}%`,
                          background: `linear-gradient(to right, ${start}, ${end})`
                        }}
                      ></div>
                    </div>
                  </div>
                )
              })}
              <div className={`pt-6 mt-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} py-4`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>Đã sử dụng:</span>
                  <span className="text-teal-400 font-bold">{totalStorage} GB / 5.0 GB</span>
                </div>
                <div className={`w-full h-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full`}>
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-pink-500"
                    style={{ width: `${Math.min(100, (totalStorage / 5) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </WidgetWrapper>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
