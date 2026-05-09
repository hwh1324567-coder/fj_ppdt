export const coreMetrics = {
  totalBrands: 50234,
  involvedBrands: 4256,
  totalCompanies: 38102,
  topCity: '泉州市',
  cases: {
    trademark: 1489,
    copyright: 1064,
    patent: 851,
  }
};

export const caseTypeDistribution = [
  { value: 1489, name: '商标侵权' },
  { value: 1064, name: '著作权纠纷' },
  { value: 851, name: '专利纠纷' },
  { value: 425, name: '地理标志' },
  { value: 427, name: '其他' }
];

export const cityData = [
  { 
    city: '泉州市', brands: 18500, cases: 1800, yoy: 12.5,
    categories: [
      { name: '鞋服纺织', details: { patent: 120, trademark: 350, copyright: 80 } },
      { name: '厨卫家居', details: { patent: 85, trademark: 150, copyright: 45 } },
      { name: '食品饮料', details: { patent: 20, trademark: 190, copyright: 30 } },
      { name: '电子电器', details: { patent: 40, trademark: 80, copyright: 15 } },
      { name: '信息技术', details: { patent: 10, trademark: 30, copyright: 120 } },
      { name: '医药健康', details: { patent: 15, trademark: 50, copyright: 5 } },
      { name: '其他', details: { patent: 50, trademark: 180, copyright: 165 } }
    ]
  },
  { 
    city: '福州市', brands: 16200, cases: 1650, yoy: 8.2,
    categories: [
      { name: '鞋服纺织', details: { patent: 40, trademark: 160, copyright: 50 } },
      { name: '厨卫家居', details: { patent: 30, trademark: 90, copyright: 25 } },
      { name: '食品饮料', details: { patent: 15, trademark: 210, copyright: 40 } },
      { name: '电子电器', details: { patent: 180, trademark: 120, copyright: 150 } },
      { name: '信息技术', details: { patent: 210, trademark: 90, copyright: 320 } },
      { name: '医药健康', details: { patent: 60, trademark: 110, copyright: 20 } },
      { name: '其他', details: { patent: 70, trademark: 110, copyright: 150 } }
    ]
  },
  { 
    city: '厦门市', brands: 15800, cases: 1520, yoy: -3.4,
    categories: [
      { name: '鞋服纺织', details: { patent: 25, trademark: 80, copyright: 40 } },
      { name: '厨卫家居', details: { patent: 45, trademark: 70, copyright: 30 } },
      { name: '食品饮料', details: { patent: 10, trademark: 140, copyright: 50 } },
      { name: '电子电器', details: { patent: 220, trademark: 150, copyright: 180 } },
      { name: '信息技术', details: { patent: 190, trademark: 80, copyright: 250 } },
      { name: '医药健康', details: { patent: 100, trademark: 60, copyright: 30 } },
      { name: '其他', details: { patent: 50, trademark: 130, copyright: 80 } }
    ]
  },
  { 
    city: '漳州市', brands: 14100, cases: 1380, yoy: 5.1,
    categories: [
      { name: '鞋服纺织', details: { patent: 15, trademark: 110, copyright: 20 } },
      { name: '厨卫家居', details: { patent: 60, trademark: 180, copyright: 60 } },
      { name: '食品饮料', details: { patent: 40, trademark: 310, copyright: 90 } },
      { name: '电子电器', details: { patent: 80, trademark: 60, copyright: 40 } },
      { name: '信息技术', details: { patent: 20, trademark: 30, copyright: 70 } },
      { name: '医药健康', details: { patent: 35, trademark: 90, copyright: 15 } },
      { name: '其他', details: { patent: 120, trademark: 280, copyright: 240 } }
    ]
  },
  { 
    city: '莆田市', brands: 12800, cases: 1250, yoy: 15.6,
    categories: [
      { name: '鞋服纺织', details: { patent: 30, trademark: 420, copyright: 80 } },
      { name: '厨卫家居', details: { patent: 20, trademark: 70, copyright: 15 } },
      { name: '食品饮料', details: { patent: 10, trademark: 80, copyright: 20 } },
      { name: '电子电器', details: { patent: 40, trademark: 50, copyright: 30 } },
      { name: '信息技术', details: { patent: 15, trademark: 20, copyright: 60 } },
      { name: '医药健康', details: { patent: 110, trademark: 140, copyright: 50 } },
      { name: '其他', details: { patent: 80, trademark: 230, copyright: 110 } }
    ]
  },
  { 
    city: '宁德市', brands: 11500, cases: 1100, yoy: 2.3,
    categories: [
      { name: '鞋服纺织', details: { patent: 10, trademark: 60, copyright: 15 } },
      { name: '厨卫家居', details: { patent: 25, trademark: 80, copyright: 20 } },
      { name: '食品饮料', details: { patent: 10, trademark: 150, copyright: 30 } },
      { name: '电子电器', details: { patent: 280, trademark: 90, copyright: 60 } },
      { name: '信息技术', details: { patent: 30, trademark: 40, copyright: 80 } },
      { name: '医药健康', details: { patent: 15, trademark: 50, copyright: 10 } },
      { name: '其他', details: { patent: 120, trademark: 210, copyright: 150 } }
    ]
  },
  { 
    city: '南平市', brands: 9800, cases: 950, yoy: -1.2,
    categories: [
      { name: '鞋服纺织', details: { patent: 15, trademark: 80, copyright: 20 } },
      { name: '厨卫家居', details: { patent: 40, trademark: 160, copyright: 90 } },
      { name: '食品饮料', details: { patent: 20, trademark: 210, copyright: 50 } },
      { name: '电子电器', details: { patent: 35, trademark: 60, copyright: 25 } },
      { name: '信息技术', details: { patent: 10, trademark: 20, copyright: 45 } },
      { name: '医药健康', details: { patent: 25, trademark: 70, copyright: 15 } },
      { name: '其他', details: { patent: 60, trademark: 180, copyright: 140 } }
    ]
  },
  { 
    city: '三明市', brands: 8500, cases: 820, yoy: 0.5,
    categories: [
      { name: '鞋服纺织', details: { patent: 10, trademark: 50, copyright: 25 } },
      { name: '厨卫家居', details: { patent: 30, trademark: 90, copyright: 40 } },
      { name: '食品饮料', details: { patent: 15, trademark: 180, copyright: 50 } },
      { name: '电子电器', details: { patent: 45, trademark: 70, copyright: 30 } },
      { name: '信息技术', details: { patent: 15, trademark: 25, copyright: 50 } },
      { name: '医药健康', details: { patent: 70, trademark: 120, copyright: 40 } },
      { name: '其他', details: { patent: 55, trademark: 160, copyright: 130 } }
    ]
  },
  { 
    city: '龙岩市', brands: 7200, cases: 700, yoy: -0.8,
    categories: [
      { name: '鞋服纺织', details: { patent: 15, trademark: 60, copyright: 20 } },
      { name: '厨卫家居', details: { patent: 25, trademark: 80, copyright: 35 } },
      { name: '食品饮料', details: { patent: 20, trademark: 140, copyright: 40 } },
      { name: '电子电器', details: { patent: 110, trademark: 90, copyright: 50 } },
      { name: '信息技术', details: { patent: 20, trademark: 30, copyright: 60 } },
      { name: '医药健康', details: { patent: 30, trademark: 50, copyright: 15 } },
      { name: '其他', details: { patent: 40, trademark: 130, copyright: 80 } }
    ]
  }
];

export const trendData = {
  year: {
    labels: ['2022', '2023', '2024', '2025', '2026'],
    values: [2850, 3120, 3980, 5100, 5800],
    yoy: [14.2, 9.5, 27.5, 28.1, 13.7]
  },
  month: {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    values: [420, 380, 450, 510, 490, 550, 600, 580, 620, 650, 680, 720],
    yoy: [8.5, 7.2, 12.1, 15.4, 11.2, 18.5, 20.1, 16.8, 19.4, 22.1, 23.5, 25.0]
  },
  week: {
    labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    values: [85, 92, 78, 105, 98, 45, 38],
    yoy: [5.2, 6.8, 3.1, 10.4, 8.2, -2.1, -4.5]
  }
};

export const brandDetails = [
  { id: 1, city: '泉州市', district: '晋江市', brand: '安踏(主品牌)', parentGroup: '安踏集团', company: '安踏体育用品集团', caseCount: 45, breakdown: { patent: 5, trademark: 35, copyright: 5 }, status: '立案调查', type: '鞋服纺织' },
  { id: 11, city: '泉州市', district: '晋江市', brand: 'Fila (斐乐)', parentGroup: '安踏集团', company: '安踏体育用品集团', caseCount: 12, breakdown: { patent: 1, trademark: 8, copyright: 3 }, status: '调解中', type: '鞋服纺织' },
  { id: 12, city: '厦门市', district: '思明区', brand: 'Descente (迪桑特)', parentGroup: '安踏集团', company: '安踏体育用品集团', caseCount: 8, breakdown: { patent: 2, trademark: 5, copyright: 1 }, status: '已宣判', type: '鞋服纺织' },
  
  { id: 2, city: '泉州市', district: '南安市', brand: '九牧核心系列', parentGroup: '九牧集团', company: '九牧厨卫股份有限公司', caseCount: 32, breakdown: { patent: 25, trademark: 5, copyright: 2 }, status: '调解中', type: '厨卫家居' },
  { id: 13, city: '泉州市', district: '南安市', brand: '小牧优选', parentGroup: '九牧集团', company: '九牧厨卫股份有限公司', caseCount: 7, breakdown: { patent: 3, trademark: 3, copyright: 1 }, status: '立案调查', type: '厨卫家居' },
  
  { id: 3, city: '厦门市', district: '思明区', brand: '瑞幸标准店', parentGroup: '瑞幸咖啡', company: '瑞幸咖啡(中国)有限公司', caseCount: 28, breakdown: { patent: 0, trademark: 25, copyright: 3 }, status: '已宣判', type: '食品饮料' },
  { id: 14, city: '厦门市', district: '湖里区', brand: '瑞幸精选(Luckin Selected)', parentGroup: '瑞幸咖啡', company: '瑞幸咖啡(中国)有限公司', caseCount: 5, breakdown: { patent: 0, trademark: 4, copyright: 1 }, status: '立案调查', type: '食品饮料' },
  
  { id: 4, city: '福州市', district: '仓山区', brand: '植护纸巾', parentGroup: '植护', company: '福建植护网络科技有限公司', caseCount: 22, breakdown: { patent: 2, trademark: 8, copyright: 12 }, status: '立案调查', type: '其他' },
  { id: 5, city: '泉州市', district: '晋江市', brand: '361°经典款', parentGroup: '361度', company: '三六一度(中国)有限公司', caseCount: 19, breakdown: { patent: 4, trademark: 12, copyright: 3 }, status: '调解中', type: '鞋服纺织' },
  { id: 6, city: '福州市', district: '马尾区', brand: 'AOC 显示器', parentGroup: '冠捷科技', company: '冠捷电子(福建)有限公司', caseCount: 15, breakdown: { patent: 12, trademark: 2, copyright: 1 }, status: '已宣判', type: '电子电器' },
  { id: 7, city: '泉州市', district: '晋江市', brand: '特步系列', parentGroup: '特步集团', company: '特步(中国)有限公司', caseCount: 14, breakdown: { patent: 2, trademark: 10, copyright: 2 }, status: '立案调查', type: '鞋服纺织' },
  { id: 8, city: '泉州市', district: '丰泽区', brand: '匹克篮球', parentGroup: '匹克集团', company: '匹克体育用品有限公司', caseCount: 11, breakdown: { patent: 6, trademark: 4, copyright: 1 }, status: '调解中', type: '鞋服纺织' },
  { id: 9, city: '厦门市', district: '湖里区', brand: '银鹭八宝粥', parentGroup: '银鹭食品', company: '厦门银鹭食品集团', caseCount: 8, breakdown: { patent: 0, trademark: 7, copyright: 1 }, status: '已宣判', type: '食品饮料' },
  { id: 10, city: '莆田市', district: '城厢区', brand: '三棵树涂料', parentGroup: '三棵树', company: '三棵树涂料股份有限公司', caseCount: 6, breakdown: { patent: 4, trademark: 1, copyright: 1 }, status: '立案调查', type: '医药健康' },
];

export const aiAnalysis = "基于全省知识产权大数据研判：当前【泉州市】为案件高发核心区，特别是晋江市鞋服产业带的【商标侵权】案件频发，占比达全省35%。【福州市】与【厦门市】在电子科技领域的【专利纠纷】呈现上升趋势（同比+15%）。预警提示：近期跨区域电商平台的商标侵权行为激增，建议加强线上线下的联合执法与品牌保护宣导。";

export const latestDynamics = [
  { id: 1, time: '10:23', content: '泉州晋江市新立案一起涉嫌伪造「安踏」商标案', level: 'danger' },
  { id: 2, time: '09:45', content: '福州仓山区「植护」包装外观著作权纠纷达成调解', level: 'success' },
  { id: 3, time: '08:30', content: '厦门思明区法院对某咖啡品牌商标侵权案进行宣判', level: 'normal' },
  { id: 4, time: '昨日', content: '漳州龙海区查处一批假冒地理标志农产品', level: 'warning' },
  { id: 5, time: '昨日', content: '宁德蕉城区新能源电池专利侵权案进入取证阶段', level: 'warning' },
  { id: 6, time: '前日', content: '莆田城厢区破获跨省制售假冒运动鞋服大案', level: 'danger' },
  { id: 7, time: '前日', content: '南平建阳区查获一批侵权建盏，涉案金额超百万', level: 'danger' },
  { id: 8, time: '04-12', content: '龙岩新罗区查处一起假冒知名机械品牌配件案', level: 'warning' },
  { id: 9, time: '04-11', content: '三明沙县区小吃同业公会发起商标维权专项行动', level: 'normal' },
  { id: 10, time: '04-10', content: '厦门湖里区「银鹭」商标侵权案二审维持原判', level: 'success' },
  { id: 11, time: '04-09', content: '福州马尾区某电子企业专利无效宣告请求被驳回', level: 'success' },
  { id: 12, time: '04-08', content: '泉州南安市「九牧」卫浴外观设计侵权案开庭审理', level: 'warning' },
];
