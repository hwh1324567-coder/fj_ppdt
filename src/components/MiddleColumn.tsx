import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';
import { trendData, cityData } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import fujianGeoJson from '../data/fujian.json';

interface MiddleColumnProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  activeCity: string | null;
  setActiveCity: React.Dispatch<React.SetStateAction<string | null>>;
}

export const MiddleColumn: React.FC<MiddleColumnProps> = ({ 
  activeFilter, 
  setActiveFilter,
  activeCity,
  setActiveCity
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const lineChartRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<echarts.ECharts | null>(null);
  const [trendScale, setTrendScale] = useState<'week' | 'month' | 'year'>('year');

  // Init map once
  useEffect(() => {
    if (!mapRef.current) return;
    
    echarts.registerMap('fujian', fujianGeoJson as any);
    const chart = echarts.init(mapRef.current);
    mapInstance.current = chart;

    const handleResize = () => {
      chart.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
      mapInstance.current = null;
    };
  }, []);

  // Update map option on state change
  useEffect(() => {
    if (!mapInstance.current) return;
    const chart = mapInstance.current;

    const cityCoords: Record<string, [number, number]> = {
      '福州市': [119.306239, 26.075302],
      '厦门市': [118.089425, 24.479833],
      '莆田市': [119.007558, 25.431011],
      '三明市': [117.635001, 26.265444],
      '泉州市': [118.589421, 24.908853],
      '漳州市': [117.661801, 24.510897],
      '南平市': [118.178459, 26.643626],
      '龙岩市': [117.02978, 25.091603],
      '宁德市': [119.527082, 26.65924]
    };

    const maxCases = Math.max(...cityData.map(d => d.cases));

    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        show: false
      },
      geo3D: {
        map: 'fujian',
        roam: true,
        regionHeight: 2,
        itemStyle: {
          color: 'rgba(2, 12, 30, 0.5)',
          opacity: 0.7,
          borderWidth: 1,
          borderColor: '#48cae4'
        },
        shading: 'lambert',
        light: {
          main: {
            intensity: 1.5,
            shadow: true,
            alpha: 40,
            beta: -30
          },
          ambient: {
            intensity: 0.8
          }
        },
        viewControl: {
          distance: 75,
          alpha: 45,
          beta: 0,
          panMouseButton: 'left',
          rotateMouseButton: 'right'
        },
        emphasis: {
          itemStyle: {
            color: 'rgba(72, 202, 228, 0.3)'
          },
          label: { show: false }
        }
      },
      series: [
        // Pillars
        {
          type: 'bar3D',
          coordinateSystem: 'geo3D',
          shading: 'lambert',
          barSize: 1.2,
          itemStyle: {
            color: '#48cae4',
            opacity: 0.8
          },
          label: {
            show: true,
            formatter: '{b}',
            textStyle: {
              color: '#48cae4',
              fontSize: 12,
              fontWeight: 'bold',
              backgroundColor: 'transparent'
            }
          },
          data: cityData.map(item => {
            const coord = cityCoords[item.city];
            const multiplier = activeFilter === '全部' ? 1 : (activeFilter === '商标侵权' ? 0.6 : 0.2);
            const displayCases = Math.floor(item.cases * multiplier);
            const height = (displayCases / maxCases) * 12 + 2; 
            const isSelected = activeCity === item.city;
            return {
              name: item.city,
              value: [coord[0], coord[1], height],
              itemStyle: {
                color: isSelected ? '#e2c285' : '#48cae4',
                opacity: isSelected ? 1 : 0.8
              },
              label: {
                textStyle: {
                  color: isSelected ? '#e2c285' : '#48cae4'
                }
              }
            };
          })
        },
        // Glowing Tops
        {
          type: 'scatter3D',
          coordinateSystem: 'geo3D',
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            color: '#fff',
            opacity: 1
          },
          data: cityData.map(item => {
            const coord = cityCoords[item.city];
            const multiplier = activeFilter === '全部' ? 1 : (activeFilter === '商标侵权' ? 0.6 : 0.2);
            const displayCases = Math.floor(item.cases * multiplier);
            const height = (displayCases / maxCases) * 12 + 2; 
            const isSelected = activeCity === item.city;
            return {
              name: item.city,
              value: [coord[0], coord[1], height],
              itemStyle: {
                color: isSelected ? '#e9c46a' : '#ffffff'
              }
            };
          })
        },
        // Particle Beams
        {
          type: 'lines3D',
          coordinateSystem: 'geo3D',
          effect: {
            show: true,
            trailWidth: 2,
            trailLength: 0.5,
            trailOpacity: 1,
            trailColor: '#fff'
          },
          blendMode: 'lighter',
          lineStyle: {
            width: 1,
            color: '#48cae4',
            opacity: 0.2
          },
          data: cityData.map(item => {
            const coord = cityCoords[item.city];
            const multiplier = activeFilter === '全部' ? 1 : (activeFilter === '商标侵权' ? 0.6 : 0.2);
            const displayCases = Math.floor(item.cases * multiplier);
            const height = (displayCases / maxCases) * 12 + 2; 
            const isSelected = activeCity === item.city;
            return {
              coords: [
                [coord[0], coord[1], height],
                [coord[0], coord[1], height + 8]
              ],
              lineStyle: {
                color: isSelected ? '#e2c285' : '#48cae4'
              }
            };
          })
        },
        // Internal light points
        {
          type: 'scatter3D',
          coordinateSystem: 'geo3D',
          symbol: 'circle',
          symbolSize: 3,
          itemStyle: {
            color: '#48cae4',
            opacity: 0.6
          },
          data: cityData.flatMap(item => {
            const coord = cityCoords[item.city];
            return Array.from({ length: 4 }).map(() => ({
              value: [
                coord[0] + (Math.random() - 0.5) * 1.2, 
                coord[1] + (Math.random() - 0.5) * 1.2, 
                2.1
              ]
            }));
          })
        }
      ]
    };

    chart.setOption(option);
    
    // Handle click event on the map
    chart.off('click');
    chart.on('click', (params: any) => {
      if (params.name && cityCoords[params.name]) {
        setActiveCity(prev => prev === params.name ? null : params.name);
      }
    });

  }, [activeFilter, activeCity, setActiveCity]);  

  // Init Line Chart
  useEffect(() => {
    if (!lineChartRef.current) return;
    const chart = echarts.init(lineChartRef.current);
    
    const currentTrendData = trendData[trendScale];
    
    const option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(2, 8, 20, 0.9)',
        borderColor: '#48cae4',
        textStyle: { color: '#fff' }
      },
      grid: {
        left: '2%',
        right: '4%',
        bottom: '10%',
        top: '28%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: currentTrendData.labels,
        axisLine: { lineStyle: { color: 'rgba(72,202,228,0.5)' } },
        axisLabel: { color: '#a0aec0' }
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
        axisLabel: { color: '#a0aec0' }
      },
      series: [
        {
          name: '案件数量',
          type: 'line',
          smooth: 0.6,
          data: currentTrendData.values,
          symbolSize: 8,
          itemStyle: { 
            color: '#84fab0',
            shadowBlur: 10,
            shadowColor: 'rgba(132, 250, 176, 0.8)'
          },
          lineStyle: { 
            width: 3, 
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#48cae4' },
              { offset: 0.5, color: '#84fab0' },
              { offset: 1, color: '#e2c285' }
            ]),
            shadowBlur: 10,
            shadowColor: 'rgba(132, 250, 176, 0.5)'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(132, 250, 176, 0.4)' },
              { offset: 0.5, color: 'rgba(72, 202, 228, 0.2)' },
              { offset: 1, color: 'rgba(72, 202, 228, 0.0)' }
            ])
          },
          label: {
            show: true,
            position: 'top',
            color: '#fff',
            formatter: (params: any) => {
              const idx = params.dataIndex;
              const yoy = currentTrendData.yoy[idx];
              const yoySign = yoy >= 0 ? '+' : '';
              return `{val|${params.value}}\n{yoy|同比 ${yoySign}${yoy}%}`;
            },
            rich: {
              val: { color: '#fff', fontSize: 13, fontWeight: 'bold', padding: [0, 0, 2, 0] },
              yoy: { color: '#e2c285', fontSize: 10 }
            }
          }
        }
      ]
    };
    
    chart.setOption(option);
    
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [trendScale]);

  const filters = ['全部', '商标侵权', '著作权纠纷', '专利纠纷'];

  return (
    <div className="w-[50%] flex flex-col h-full relative gap-2">
      {/* Top Filter Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-[#020814]/80 px-2 py-1 rounded-full border border-[#48cae4]/50 backdrop-blur-md shadow-[0_0_15px_rgba(72,202,228,0.3)] h-[44px]"
      >
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-5 py-1 rounded-full text-sm font-medium transition-all duration-300 h-full flex items-center ${
              activeFilter === f 
                ? 'bg-[#48cae4] text-[#020814] shadow-[0_0_10px_#48cae4]' 
                : 'text-[#a0aec0] hover:text-white hover:bg-[#48cae4]/20'
            }`}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* Map Area */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8 }}
        className="w-full relative"
        style={{ height: '78%' }}
      >
        {/* Map Container with Sea Background */}
        <div className="w-full h-full absolute inset-0 bg-[rgba(2,12,30,0.2)] shadow-[inset_0_0_80px_rgba(72,202,228,0.05)] rounded-xl overflow-hidden backdrop-blur-sm">
          <div ref={mapRef} className="w-full h-full absolute inset-0"></div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#48cae4]/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Info Card Overlay */}
        <AnimatePresence>
          {activeCity && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-4 right-4 z-30 bg-gradient-to-br from-[rgba(2,12,30,0.8)] to-[rgba(2,8,20,0.9)] rounded-lg p-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] pointer-events-none backdrop-blur-md w-52 border border-[rgba(72,202,228,0.1)]"
            >
              <div className="text-[#48cae4] font-bold text-lg mb-2 border-b border-[#48cae4]/20 pb-2 drop-shadow-[0_0_5px_rgba(72,202,228,0.5)]">
                {activeCity}
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs">总案件量</span>
                  <span className="text-white font-mono font-bold text-sm drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]">
                    {cityData.find(d => d.city === activeCity)?.cases.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs">同比增长</span>
                  <span className="text-[#e2c285] font-mono font-bold text-sm drop-shadow-[0_0_2px_#e2c285]">
                    +{cityData.find(d => d.city === activeCity)?.yoy}%
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-[#48cae4]/10">
                  <div className="text-[10px] text-[#48cae4]/70 mb-2">主要案件类型</div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-1.5 py-0.5 bg-[rgba(226,194,133,0.1)] text-[#e2c285] rounded text-[10px]">商标侵权</span>
                    <span className="px-1.5 py-0.5 bg-[rgba(72,202,228,0.1)] text-[#48cae4] rounded text-[10px]">专利纠纷</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bottom Timeline */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full relative overflow-hidden glass-panel hud-glow"
        style={{ 
          height: 'calc(22% - 8px)'
        }}
      >
        {/* Delicate floating corners */}
        <svg className="absolute top-0 left-0 w-3 h-3 text-[#48cae4] opacity-60 drop-shadow-[0_0_4px_#48cae4]" viewBox="0 0 12 12" fill="none">
          <path d="M0 12V0H12" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <svg className="absolute top-0 right-0 w-3 h-3 text-[#48cae4] opacity-60 drop-shadow-[0_0_4px_#48cae4]" viewBox="0 0 12 12" fill="none">
          <path d="M0 0H12V12" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-3 h-3 text-[#48cae4] opacity-60 drop-shadow-[0_0_4px_#48cae4]" viewBox="0 0 12 12" fill="none">
          <path d="M12 12H0V0" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <svg className="absolute bottom-0 right-0 w-3 h-3 text-[#48cae4] opacity-60 drop-shadow-[0_0_4px_#48cae4]" viewBox="0 0 12 12" fill="none">
          <path d="M0 12H12V0" stroke="currentColor" strokeWidth="1.5" />
        </svg>

        {/* Subtle top glow line */}
        <div className="absolute top-0 left-[10%] w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#48cae4] to-transparent opacity-30"></div>
        
        <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-10">
          <div className="flex items-center">
            <span className="text-[#48cae4] mr-3 text-sm leading-none drop-shadow-[0_0_3px_#48cae4] opacity-80">◈</span>
            <span 
              className="font-bold tracking-[0.1em] text-sm text-white/90 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
            >
              案件历史趋势
            </span>
          </div>
          
          <div className="flex items-center bg-[#020814]/60 border border-[rgba(72,202,228,0.2)] rounded-sm overflow-hidden p-0.5 pointer-events-auto">
            {[
              { id: 'week', label: '本周' },
              { id: 'month', label: '本月' },
              { id: 'year', label: '本年' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setTrendScale(tab.id as any)}
                className={`px-3 py-0.5 text-[10px] rounded-[1px] transition-all duration-300 cursor-pointer ${
                  trendScale === tab.id 
                    ? 'bg-[#48cae4]/20 text-[#48cae4] border border-[#48cae4]/30' 
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        <div ref={lineChartRef} className="w-full h-full pt-8"></div>
      </motion.div>
    </div>
  );
};
