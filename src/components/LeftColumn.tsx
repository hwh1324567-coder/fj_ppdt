import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Panel } from './Panel';
import { CityDetailModal } from './CityDetailModal';
import { coreMetrics, caseTypeDistribution, cityData } from '../data/mockData';
import { motion } from 'framer-motion';

interface LeftColumnProps {
  activeCity: string | null;
}

export const LeftColumn: React.FC<LeftColumnProps> = ({ activeCity }) => {
  const pieChartRef = useRef<HTMLDivElement>(null);
  const barChartRef = useRef<HTMLDivElement>(null);
  const [selectedCityInfo, setSelectedCityInfo] = useState<any>(null);

  useEffect(() => {
    if (!pieChartRef.current) return;
    const chart = echarts.init(pieChartRef.current);

    // Aggregate statistics by industry
    const industryStats: Record<string, { total: number; patent: number; trademark: number; copyright: number }> = {};
    cityData.forEach(city => {
      city.categories.forEach(cat => {
        if (!industryStats[cat.name]) {
            industryStats[cat.name] = { total: 0, patent: 0, trademark: 0, copyright: 0 };
        }
        industryStats[cat.name].patent += cat.details.patent;
        industryStats[cat.name].trademark += cat.details.trademark;
        industryStats[cat.name].copyright += cat.details.copyright;
        industryStats[cat.name].total += cat.details.patent + cat.details.trademark + cat.details.copyright;
      });
    });

    const pieData = Object.keys(industryStats).map(key => ({
      name: key,
      value: industryStats[key].total,
      details: industryStats[key]
    })).sort((a, b) => b.value - a.value);
    
    // Calculate total explicitly for accurate percentage mapping
    const totalCases = pieData.reduce((sum, item) => sum + item.value, 0);
    
    // Assign specific colors for industries to match the bottom stack chart if possible
    const colorMap: Record<string, any> = {
      '鞋服纺织': new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#37A2DA' }, { offset: 1, color: '#166fb5' }]),
      '厨卫家居': new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#FF9F7F' }, { offset: 1, color: '#d97d5b' }]),
      '食品饮料': new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#FB7293' }, { offset: 1, color: '#d44e70' }]),
      '电子电器': new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#8378EA' }, { offset: 1, color: '#6257c7' }]),
      '信息技术': new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#9FE6B8' }, { offset: 1, color: '#7bc996' }]),
      '医药健康': new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#FFDB5C' }, { offset: 1, color: '#d4b33a' }]),
      '其他': new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(255,255,255,0.6)' }, { offset: 1, color: 'rgba(255,255,255,0.2)' }])
    };

    const option = {
      tooltip: {
        trigger: 'item',
        appendToBody: true,
        backgroundColor: 'rgba(2, 12, 30, 0.95)',
        borderColor: '#48cae4',
        borderWidth: 1,
        textStyle: { color: '#fff' },
        position: function (pos: any, params: any, el: HTMLElement, elRect: any, size: any) {
          // X: Always slightly to the right of the cursor
          const left = pos[0] + 15;
          const viewportHeight = window.innerHeight;
          // Estimate height roughly 120px for this specific tooltip
          const tooltipHeight = el.offsetHeight || size.contentSize[1] || 120; 

          // Y: Place the tooltip strictly ABOVE the cursor (top-right quadrant)
          let top = pos[1] - tooltipHeight;

          // Prevent top overflow
          if (top < 10) {
            top = 10;
          }
          
          // Prevent bottom overflow
          if (top + tooltipHeight > viewportHeight - 10) {
            top = viewportHeight - tooltipHeight - 10;
          }

          return [left, top];
        },
        formatter: (params: any) => {
          const data = params.data;
          let html = `<div style="padding: 6px 4px; min-width: 140px;">`;
          // Keep the category title in its own thematic color
          html += `<div style="font-size: 15px; font-weight: bold; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px; color: ${params.color.colorStops[0].color};">${data.name}（共 ${data.value} 起）</div>`;
          
          // Unify numbers to clean white to reduce visual noise
          html += `<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="color: #cbd5e1; font-size: 12px;">专利纠纷案件</span>
            <span style="color: #ffffff; font-size: 16px; font-weight: bold; margin-left: 20px;">${data.details.patent}<span style="font-size: 11px; font-weight: normal; margin-left: 2px; color: #94a3b8;">起</span></span>
          </div>`;
          
          html += `<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="color: #cbd5e1; font-size: 12px;">商标侵权案件</span>
            <span style="color: #ffffff; font-size: 16px; font-weight: bold; margin-left: 20px;">${data.details.trademark}<span style="font-size: 11px; font-weight: normal; margin-left: 2px; color: #94a3b8;">起</span></span>
          </div>`;
          
          html += `<div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="color: #cbd5e1; font-size: 12px;">著作纠纷案件</span>
            <span style="color: #ffffff; font-size: 16px; font-weight: bold; margin-left: 20px;">${data.details.copyright}<span style="font-size: 11px; font-weight: normal; margin-left: 2px; color: #94a3b8;">起</span></span>
          </div>`;

          html += `</div>`;
          return html;
        }
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: '10%',
        top: 'center',
        textStyle: { 
          color: '#a0aec0', 
          fontSize: 11,
          rich: {
            name: { width: 55, color: '#a0aec0' },
            percent: { width: 40, color: '#e2e8f0', fontWeight: 'bold', align: 'right' }
          }
        },
        itemWidth: 8,
        itemHeight: 8,
        formatter: (name: string) => {
          const item = pieData.find(d => d.name === name);
          const percent = item ? ((item.value / totalCases) * 100).toFixed(1) : 0;
          return `{name|${name}}{percent|${percent}%}`;
        }
      },
      series: [
        {
          name: '案件类型',
          type: 'pie',
          radius: ['45%', '75%'],
          center: ['28%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 2,
            borderColor: '#020611',
            borderWidth: 4,
            color: (params: any) => colorMap[params.data.name] || colorMap['其他']
          },
          label: { 
            show: true,
            position: 'inner',
            formatter: (params: any) => {
              // Hide label if slice is too thin to avoid overlap
              return params.percent > 4 ? `${Math.round(params.percent)}%` : '';
            },
            color: '#ffffff',
            fontSize: 10,
            fontWeight: 'bold',
            textBorderColor: 'rgba(0,0,0,0.6)',
            textBorderWidth: 1,
            textShadowColor: 'rgba(0,0,0,0.8)',
            textShadowBlur: 2
          },
          labelLine: { show: false },
          data: pieData
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
  }, []);

  useEffect(() => {
    if (!barChartRef.current) return;
    const chart = echarts.init(barChartRef.current);
    
    // Sort data for horizontal bar chart (bottom to top)
    const sortedData = [...cityData].sort((a, b) => a.cases - b.cases);
    
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(2, 12, 30, 0.95)',
        borderColor: '#48cae4',
        borderWidth: 1,
        textStyle: { color: '#fff' },
        confine: true,
        appendToBody: true,
        position: function (pos: any, params: any, el: HTMLElement, elRect: any, size: any) {
          // X: Always slightly to the right of the cursor
          const left = pos[0] + 15;
          const viewportHeight = window.innerHeight;
          // Accurately get height, default to larger size to be safe if unmeasured
          const tooltipHeight = el.offsetHeight || size.contentSize[1] || 280; 

          // Y: Place the tooltip strictly ABOVE the cursor (top-right quadrant)
          // so its bottom edge rests near the cursor point. This guarantees it won't overflow the bottom.
          let top = pos[1] - tooltipHeight;

          // If placing it strictly above the cursor overflows the top of the window,
          // then push it down gently, but never let its bottom edge exceed the viewport bottom.
          if (top < 10) {
            top = 10;
          }
          
          if (top + tooltipHeight > viewportHeight - 10) {
            top = viewportHeight - tooltipHeight - 10;
          }

          return [left, top];
        },
        formatter: (params: any) => {
          const cityName = params[0].name;
          let html = `<div style="padding: 4px; min-width: 160px;">`;
          html += `<div style="font-size: 14px; font-weight: bold; margin-bottom: 12px; color: #48cae4;">${cityName}</div>`;

          const stackParams = params.filter((p: any) => p.seriesName !== '案件数');
          const caseParam = params.find((p: any) => p.seriesName === '案件数');
          const totalBrands = stackParams.reduce((sum: number, p: any) => sum + p.value, 0);

          html += `<div style="margin-bottom: 6px; display: flex; justify-content: space-between;">
            <span>品牌总数 <span style="font-size: 10px; color: #a0aec0;">(行业堆叠)</span></span>
            <span style="font-weight: bold; color: #fff; margin-left: 16px;">${totalBrands}</span>
          </div>`;

          stackParams.forEach((p: any) => {
            html += `<div style="margin-bottom: 2px; display: flex; justify-content: space-between; font-size: 11px; padding-left: 10px; color: #cbd5e1;">
              <span>${p.marker} ${p.seriesName}</span>
              <span style="font-weight: bold; color: #e2e8f0; margin-left: 16px;">${p.value}</span>
            </div>`;
          });

          if (caseParam) {
            html += `<div style="margin-top: 8px; margin-bottom: 6px; display: flex; justify-content: space-between;">
              <span>${caseParam.marker} ${caseParam.seriesName}</span>
              <span style="font-weight: bold; color: #fff; margin-left: 16px;">${caseParam.value}</span>
            </div>`;
          }
          html += `</div>`;
          return html;
        }
      },
      legend: {
        type: 'plain',
        top: 0,
        textStyle: { color: '#a0aec0', fontSize: 10 },
        itemWidth: 10,
        itemHeight: 10,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '25%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
        axisLabel: { color: '#a0aec0' }
      },
      yAxis: {
        type: 'category',
        data: sortedData.map(d => d.city),
        axisLabel: { 
          color: (value: string) => {
            if (activeCity && value === activeCity) return '#fff';
            return value === '泉州市' ? '#e2c285' : '#a0aec0';
          },
          fontWeight: (value: string) => value === '泉州市' || value === activeCity ? 'bold' : 'normal',
          fontSize: (value: string) => value === activeCity ? 14 : 12
        },
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
      },
      series: [
        ...(() => {
          const categories = ['鞋服纺织', '厨卫家居', '食品饮料', '电子电器', '信息技术', '医药健康', '其他'];
          const categoryColors = [
            '#37A2DA', // 蓝色 - 鞋服纺织
            '#FF9F7F', // 珊瑚橙 - 厨卫家居
            '#FB7293', // 粉红色 - 食品饮料
            '#8378EA', // 紫色 - 电子电器
            '#9FE6B8', // 薄荷绿 - 信息技术
            '#FFDB5C', // 黄色 - 医药健康
            'rgba(255,255,255,0.3)' // 灰色半透明 - 其他
          ];
          
          const generateBreakdown = (total: number, str: string) => {
              let remaining = total;
              return categories.map((cat, i) => {
                  if (i === categories.length - 1) return remaining;
                  const fraction = ((str.charCodeAt(0) * (i + 1)) % 15 + 5) / 100;
                  const val = Math.round(total * fraction);
                  remaining -= val;
                  return val;
              });
          };

          const breakdowns = sortedData.map(d => generateBreakdown(d.brands, d.city));

          return categories.map((cat, catIndex) => ({
            name: cat,
            type: 'bar',
            stack: '品牌数',
            barWidth: '40%',
            itemStyle: { 
              color: categoryColors[catIndex],
              borderRadius: catIndex === categories.length - 1 ? [0, 4, 4, 0] : 0
            },
            data: breakdowns.map(b => b[catIndex])
          }));
        })(),
        {
          name: '案件数',
          type: 'bar',
          barWidth: '40%',
          itemStyle: {
            borderRadius: [0, 4, 4, 0],
            color: (params: any) => {
              if (activeCity && params.name === activeCity) {
                return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  { offset: 0, color: '#ffffff' },
                  { offset: 0.8, color: 'rgba(255,255,255,0.3)' },
                  { offset: 1, color: 'rgba(255,255,255,0.05)' }
                ]);
              }
              if (params.name === '泉州市') {
                return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  { offset: 0, color: '#f6d365' },
                  { offset: 0.8, color: 'rgba(226,194,133,0.4)' },
                  { offset: 1, color: 'rgba(226,194,133,0.05)' }
                ]);
              }
              return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                { offset: 0, color: '#f6d365' },
                { offset: 0.8, color: 'rgba(233,196,106,0.4)' },
                { offset: 1, color: 'rgba(233,196,106,0.05)' }
              ]);
            },
            shadowBlur: 8,
            shadowColor: 'rgba(0,0,0,0.5)'
          },
          data: sortedData.map(d => d.cases)
        }
      ]
    };
    chart.setOption(option);
    
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    
    // Add click handler to switch to modal
    chart.off('click');
    chart.on('click', (params: any) => {
      const cityName = params.name || (params[0] && params[0].name);
      if (!cityName) return;
      const info = sortedData.find(d => d.city === cityName);
      if (info && info.categories) {
        setSelectedCityInfo(info);
      }
    });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [activeCity]);

  return (
    <div className="w-[22%] flex flex-col gap-4 h-full relative">
      <CityDetailModal 
        cityInfo={selectedCityInfo} 
        onClose={() => setSelectedCityInfo(null)} 
      />
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex-none">
        <Panel title="全省核心指标" className="h-auto">
          <div className="flex flex-col gap-2 justify-center">
            <div className="grid grid-cols-2 gap-2 mt-1">
              {/* 品牌总数 */}
              <div className="p-2 relative group transition-all duration-500 rounded-lg bg-gradient-to-br from-[rgba(72,202,228,0.1)] to-[rgba(72,202,228,0.02)] hover:from-[rgba(72,202,228,0.15)] hover:to-[rgba(72,202,228,0.05)] shadow-[0_4px_10px_rgba(0,0,0,0.3)] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(72,202,228,0.5)] to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div style={{ fontSize: '10px', color: 'rgba(150,200,255,0.7)', letterSpacing: '1px', textTransform: 'uppercase' }} className="mb-0.5">品牌总数</div>
                <div style={{ 
                  fontSize: '26px', 
                  fontWeight: 700, 
                  color: '#ffffff', 
                  textShadow: '0 0 10px rgba(72,202,228,0.5), 0 0 20px rgba(72,202,228,0.2)',
                  letterSpacing: '1px',
                  fontFamily: "'DIN Alternate', 'Arial Narrow', sans-serif",
                  lineHeight: 1.1
                }}>{coreMetrics.totalBrands.toLocaleString()}</div>
              </div>

              {/* 涉案品牌数 */}
              <div className="p-2 relative group transition-all duration-500 rounded-lg bg-gradient-to-br from-[rgba(226,194,133,0.1)] to-[rgba(226,194,133,0.02)] hover:from-[rgba(226,194,133,0.15)] hover:to-[rgba(226,194,133,0.05)] shadow-[0_4px_10px_rgba(0,0,0,0.3)] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(226,194,133,0.5)] to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute -right-4 -top-4 w-12 h-12 bg-[#e2c285]/20 rounded-full blur-xl"></div>
                <div style={{ fontSize: '10px', color: 'rgba(226,194,133,0.7)', letterSpacing: '1px', textTransform: 'uppercase' }} className="mb-0.5">涉案品牌数</div>
                <div style={{ 
                  fontSize: '22px', 
                  fontWeight: 700, 
                  color: '#e2c285', 
                  textShadow: '0 0 10px rgba(226,194,133,0.5), 0 0 20px rgba(226,194,133,0.2)',
                  fontFamily: "'DIN Alternate', 'Arial Narrow', sans-serif",
                  lineHeight: 1.1
                }}>{coreMetrics.involvedBrands.toLocaleString()}</div>
              </div>
              
              {/* 归属公司总数 */}
              <div className="p-2 relative group transition-all duration-500 rounded-lg bg-gradient-to-br from-[rgba(72,202,228,0.1)] to-[rgba(72,202,228,0.02)] hover:from-[rgba(72,202,228,0.15)] hover:to-[rgba(72,202,228,0.05)] shadow-[0_4px_10px_rgba(0,0,0,0.3)] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(72,202,228,0.5)] to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div style={{ fontSize: '10px', color: 'rgba(150,200,255,0.7)', letterSpacing: '1px', textTransform: 'uppercase' }} className="mb-0.5">归属公司总数</div>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: 600, 
                  color: '#ffffff',
                  fontFamily: "'DIN Alternate', 'Arial Narrow', sans-serif",
                  lineHeight: 1.1
                }}>{coreMetrics.totalCompanies.toLocaleString()}</div>
              </div>

              {/* Top品牌城市 */}
              <div className="p-2 relative group transition-all duration-500 rounded-lg bg-gradient-to-br from-[rgba(233,196,106,0.1)] to-[rgba(233,196,106,0.02)] hover:from-[rgba(233,196,106,0.15)] hover:to-[rgba(233,196,106,0.05)] shadow-[0_4px_10px_rgba(0,0,0,0.3)] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(233,196,106,0.5)] to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div style={{ fontSize: '10px', color: 'rgba(233,196,106,0.7)', letterSpacing: '1px', textTransform: 'uppercase' }} className="mb-0.5">Top品牌城市</div>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: 600, 
                  color: '#e9c46a',
                  textShadow: '0 0 8px rgba(233,196,106,0.4)',
                  lineHeight: 1.1
                }}>{coreMetrics.topCity}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[rgba(72,202,228,0.1)]">
              <div className="text-center p-1.5 relative group transition-all duration-500 rounded-lg bg-gradient-to-br from-[rgba(226,194,133,0.1)] to-[rgba(226,194,133,0.02)] hover:from-[rgba(226,194,133,0.15)] hover:to-[rgba(226,194,133,0.05)] shadow-[0_4px_8px_rgba(0,0,0,0.3)] overflow-hidden">
                <div className="text-[#e2c285] font-bold text-base drop-shadow-[0_0_5px_rgba(226,194,133,0.4)]" style={{ fontFamily: "'DIN Alternate', 'Arial Narrow', sans-serif" }}>{coreMetrics.cases.trademark}</div>
                <div style={{ fontSize: '10px', color: 'rgba(226,194,133,0.7)', letterSpacing: '1px', marginTop: '1px' }}>商标侵权</div>
              </div>
              <div className="text-center p-1.5 relative group transition-all duration-500 rounded-lg bg-gradient-to-br from-[rgba(72,202,228,0.1)] to-[rgba(72,202,228,0.02)] hover:from-[rgba(72,202,228,0.15)] hover:to-[rgba(72,202,228,0.05)] shadow-[0_4px_8px_rgba(0,0,0,0.3)] overflow-hidden">
                <div className="text-[#48cae4] font-bold text-base drop-shadow-[0_0_5px_rgba(72,202,228,0.4)]" style={{ fontFamily: "'DIN Alternate', 'Arial Narrow', sans-serif" }}>{coreMetrics.cases.copyright}</div>
                <div style={{ fontSize: '10px', color: 'rgba(150,200,255,0.7)', letterSpacing: '1px', marginTop: '1px' }}>著作权纠纷</div>
              </div>
              <div className="text-center p-1.5 relative group transition-all duration-500 rounded-lg bg-gradient-to-br from-[rgba(233,196,106,0.1)] to-[rgba(233,196,106,0.02)] hover:from-[rgba(233,196,106,0.15)] hover:to-[rgba(233,196,106,0.05)] shadow-[0_4px_8px_rgba(0,0,0,0.3)] overflow-hidden">
                <div className="text-[#e9c46a] font-bold text-base drop-shadow-[0_0_5px_rgba(233,196,106,0.4)]" style={{ fontFamily: "'DIN Alternate', 'Arial Narrow', sans-serif" }}>{coreMetrics.cases.patent}</div>
                <div style={{ fontSize: '10px', color: 'rgba(233,196,106,0.7)', letterSpacing: '1px', marginTop: '1px' }}>专利纠纷</div>
              </div>
            </div>
          </div>
        </Panel>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex-1 min-h-0">
        <Panel title="案件类型分布" className="h-full">
          <div ref={pieChartRef} className="w-full h-full"></div>
        </Panel>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex-[1.1] min-h-0">
        <Panel title="九地市案件对比" className="h-full">
          <div ref={barChartRef} className="w-full h-full"></div>
        </Panel>
      </motion.div>
    </div>
  );
};
