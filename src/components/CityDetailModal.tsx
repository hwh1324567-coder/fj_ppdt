import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import * as echarts from 'echarts';
import { Panel } from './Panel';
import { X } from 'lucide-react';

interface CityDetailModalProps {
  cityInfo: any;
  onClose: () => void;
}

export const CityDetailModal: React.FC<CityDetailModalProps> = ({ cityInfo, onClose }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || !cityInfo || !cityInfo.categories) return;

    const ALL_CATEGORIES = ['厨卫家居', '食品饮料', '电子电器', '鞋服纺织', '信息技术', '医药健康', '其他'];
    
    // Normalize categories to ensure all 7 exist, in visual top-to-bottom order
    // We reverse it because Echarts yAxis category data renders from bottom to top,
    // meaning index 0 is at the bottom (which should be '其他').
    const orderedCategories = [...ALL_CATEGORIES].reverse().map(catName => {
      const existing = cityInfo.categories.find((c: any) => c.name === catName);
      return existing || { name: catName, details: { trademark: 0, patent: 0, copyright: 0 } };
    });

    const chart = echarts.init(chartRef.current);

    const options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(2, 12, 30, 0.95)',
        borderColor: '#00e5ff',
        borderWidth: 1,
        textStyle: { color: '#fff' },
        confine: true,
        appendToBody: true
      },
      legend: {
        top: 0,
        textStyle: { color: '#a0aec0' },
        data: ['商标侵权', '专利纠纷', '著作权纠纷']
      },
      grid: {
        left: '2%',
        right: '12%', // Give space for total labels
        bottom: '3%',
        top: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
        axisLabel: { color: '#a0aec0' }
      },
      yAxis: {
        type: 'category',
        data: orderedCategories.map((c: any) => c.name),
        axisLabel: { color: '#fff', fontSize: 13, fontWeight: 500 }
      },
      series: [
        {
          name: '商标侵权',
          type: 'bar',
          stack: 'total',
          barWidth: '45%',
          itemStyle: { 
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              { offset: 0, color: '#00e5ff' },
              { offset: 1, color: '#007ea7' }
            ]),
            borderRadius: [0, 0, 0, 0] 
          },
          data: orderedCategories.map((c: any) => c.details.trademark)
        },
        {
          name: '专利纠纷',
          type: 'bar',
          stack: 'total',
          itemStyle: { 
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              { offset: 0, color: '#ffaa00' },
              { offset: 1, color: '#cc5500' }
            ]),
            borderRadius: [0, 0, 0, 0] 
          },
          data: orderedCategories.map((c: any) => c.details.patent)
        },
        {
          name: '著作权纠纷',
          type: 'bar',
          stack: 'total',
          itemStyle: { 
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              { offset: 0, color: '#b366ff' },
              { offset: 1, color: '#7a00cc' }
            ]),
            borderRadius: [0, 4, 4, 0] 
          },
          label: {
              show: true,
              position: 'right',
              color: '#ffffff',
              fontSize: 16,
              fontWeight: 'bold',
              textShadowColor: 'rgba(0,0,0,0.8)',
              textShadowBlur: 4,
              formatter: (params: any) => {
                  const cat = orderedCategories[params.dataIndex];
                  const total = cat.details.trademark + cat.details.patent + cat.details.copyright;
                  return total > 0 ? total : '';
              }
          },
          data: orderedCategories.map((c: any) => c.details.copyright)
        }
      ]
    };

    chart.setOption(options);

    // Initial resize to ensure chart bounds correctly
    setTimeout(() => chart.resize(), 50);

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [cityInfo]);

  if (!cityInfo) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div 
        className="w-[600px] h-[450px] shadow-[0_0_50px_rgba(72,202,228,0.2)] rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Panel title={`${cityInfo.city} - 行业案件分布`} className="w-full h-full relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-[#48cae4] hover:text-white transition-colors z-20 p-1"
          >
            <X size={20} />
          </button>
          <div className="flex-1 w-full h-full min-h-0 relative mt-4">
            <div ref={chartRef} className="absolute inset-0 w-full h-full"></div>
          </div>
        </Panel>
      </div>
    </div>,
    document.body
  );
};
