import { enableGlobalCursorStyles } from 'react-resizable-panels';
import { DEFAULT_FIELD_ORDER } from '.';
import {
  GlobalSettings,
  DEFAULT_CONFIG,
  ResumeData,
  albums,
} from '../types/resume';
import { Description } from '@radix-ui/react-dialog';
const initialGlobalSettings: GlobalSettings = {
  baseFontSize: 16,
  pagePadding: 32,
  paragraphSpacing: 12,
  lineHeight: 1.5,
  sectionSpacing: 10,
  headerSize: 18,
  subheaderSize: 16,
  useIconMode: true,
  themeColor: '#000000',
  centerSubtitle: true,
};

export const initialResumeState = {
  title: '新建金汤历',
  basic: {
    name: '匿名',
    title: '...',
    employementStatus: '...',
    email: '...',
    phone: '...',
    location: '...',
    birthDate: '2000/11/11',
    fieldOrder: DEFAULT_FIELD_ORDER,
    icons: {
      email: 'Mail',
      phone: 'Phone',
      birthDate: 'CalendarRange',
      employementStatus: 'Briefcase',
      location: 'MapPin',
    },
    photoConfig: DEFAULT_CONFIG,
    customFields: [
      {
        id: 'personal',
        label: '个人网站',
        value: '...',
        icon: 'Globe',
      },
    ],
    photo: '/avatar.jpg',
    githubKey: '',
    githubUseName: '',
    githubContributionsVisible: false,
  },
  education: [
    {
      id: '1',
      school: '北京大学',
      major: '计算机科学与技术',
      degree: '本科',
      startDate: '2019-09',
      endDate: '2023-06',
      visible: true,
      gpa: '',
      description: `<ul class="custom-list">
        <li>主修课程：数据结构、算法设计、操作系统、计算机网络、Web开发技术</li>
        <li>专业排名前 5%，连续三年获得一等奖学金</li>
        <li>担任计算机协会技术部部长，组织多次技术分享会</li>
        <li>参与开源项目贡献，获得 GitHub Campus Expert 认证</li>
      </ul>`,
    },
  ],
  skillContent: `<div class="skill-content">
  <ul class="custom-list">
    <li>前端框架：熟悉 React、Vue.js，熟悉 Next.js、Nuxt.js 等 SSR 框架</li>
    <li>开发语言：TypeScript、JavaScript(ES6+)、HTML5、CSS3</li>
    <li>UI/样式：熟悉 TailwindCSS、Sass/Less、CSS Module、Styled-components</li>
    <li>状态管理：Redux、Vuex、Zustand、Jotai、React Query</li>
    <li>工程化工具：Webpack、Vite、Rollup、Babel、ESLint</li>
    <li>测试工具：Jest、React Testing Library、Cypress</li>
    <li>性能优化：熟悉浏览器渲染原理、性能指标监控、代码分割、懒加载等优化技术</li>
    <li>版本控制：Git、SVN</li>
    <li>技术管理：具备团队管理经验，主导过多个大型项目的技术选型和架构设计</li>
  </ul>
</div>`,
  albumInfoContent: `<div class="skill-content">
  <ul class="custom-list">
    <li>Do whatever i like.</li>
  </ul>
</div>`,
  experience: [
    {
      id: '1',
      company: 'xxx',
      position: 'xxx',
      date: '2035/7 - 至今',
      visible: true,
      details: `<ul class="custom-list">
      <li>负责抖音创作者平台的开发与维护，主导多个核心功能的技术方案设计</li>
      <li>优化项目工程化配置，将构建时间从 8 分钟优化至 2 分钟，提升团队开发效率</li>
      <li>设计并实现组件库，提升代码复用率达 70%，显著减少开发时间</li>
      <li>主导性能优化项目，使平台首屏加载时间减少 50%，接入 APM 监控系统</li>
      <li>指导初级工程师，组织技术分享会，提升团队整体技术水平</li>
    </ul>`,
    },
  ],
  draggingProjectId: null,
  projects: [
    {
      id: 'p1',
      name: '抖音创作者中台',
      role: '前端负责人',
      date: '2022/6 - 2023/12',
      description: `<ul class="custom-list">
        <li>基于 React 开发的创作者数据分析和内容管理平台，服务百万级创作者群体</li>
        <li>包含数据分析、内容管理、收益管理等多个子系统</li>
        <li>使用 Redux 进行状态管理，实现复杂数据流的高效处理</li>
        <li>采用 Ant Design 组件库，确保界面设计的一致性和用户体验</li>
        <li>实施代码分割和懒加载策略，优化大规模应用的加载性能</li>
      </ul>`,
      visible: true,
    },
    {
      id: 'p2',
      name: '微信小程序开发者工具',
      role: '核心开发者',
      date: '2020/3 - 2021/6',
      description: `<ul class="custom-list">
        <li>为开发者提供小程序开发、调试和发布的一站式解决方案</li>
        <li>基于 Electron 构建的跨平台桌面应用</li>
        <li>支持多平台开发，包括 Windows、macOS 和 Linux</li>
        <li>提供实时的错误日志和性能分析工具</li>
        <li>集成第三方插件和 SDK，支持开发者自定义功能</li>
      </ul>`,
      visible: true,
    },
    {
      id: 'p3',
      name: '前端监控平台',
      role: '技术负责人',
      date: '2021/9 - 2022/3',
      description: `<ul class="custom-list">
        <li>一个完整的前端监控解决方案，包含错误监控、性能监控、用户行为分析等功能。</li>
        <li>基于 Vue 和 Element UI 构建，提供实时的监控数据和可视化分析工具。</li>
        <li>支持多种监控指标，包括错误日志、性能指标、用户行为分析等。</li>
        <li>提供详细的错误日志和性能分析工具，帮助开发者定位和优化问题。</li>
        <li>集成第三方插件和 SDK，支持开发者自定义功能。</li>
      </ul>`,
      visible: true,
    },
  ],
  menuSections: [
    { id: 'basic', title: '基本信息', icon: '💿️', enabled: true, order: 0 },
    { id: 'albumInfo', title: '关于', icon: 'ℹ️', enabled: true, order: 1 },
    {
      id: 'officialReview',
      title: '官媒评价',
      icon: '📰',
      enabled: true,
      order: 2,
    },
    {
      id: 'personalReview',
      title: '个人评价',
      icon: '🗣️',
      enabled: true,
      order: 3,
    },
  ],
  customData: {
    // 可以在这里添加自定义数据
    // 例如：officialReview: [], personalReview: []
    officialReview: [
      {
        id: 'official1',
        title: '',
        subtitle: '',
        dataRange: '',
        visible: '',
        description: '这是一段官方评价内容。',
      },
    ],
    personalReview: [
      {
        id: 'personal1',
        description: '这是一段个人评价内容。',
        title: '',
        subtitle: '',
        dataRange: '',
        visible: '',
      },
    ],
  },
  activeSection: 'basic',
  globalSettings: initialGlobalSettings,
};

export const initialResumeStateEn = {
  title: 'New reZume',
  basic: {
    name: '...',
    title: '...',
    employementStatus: 'Available',
    email: '...',
    phone: '...',
    location: '...',
    birthDate: '...',
    fieldOrder: DEFAULT_FIELD_ORDER,
    icons: {
      email: 'Mail',
      phone: 'Phone',
      birthDate: 'CalendarRange',
      employementStatus: 'Briefcase',
      location: 'MapPin',
    },
    photoConfig: DEFAULT_CONFIG,
    customFields: [],
    photo: '/avatar.jpg',
    githubKey: '',
    githubUseName: '',
    githubContributionsVisible: false,
  },
  education: [
    {
      id: '1',
      school: 'Stanford University',
      major: 'Computer Science',
      degree: '',
      startDate: '2043-09',
      endDate: '2047-06',
      visible: true,
      gpa: '',
      description: `<ul class="custom-list">
        <li>Core courses: Data Structures, Algorithms, Operating Systems, Computer Networks, Web Development</li>
        <li>Top 5% of class, received Dean's List honors for three consecutive years</li>
        <li>Served as Technical Director of the Computer Science Association, organized multiple tech workshops</li>
        <li>Contributed to open-source projects, earned GitHub Campus Expert certification</li>
      </ul>`,
    },
  ],
  skillContent: `<div class="skill-content">
  <ul class="custom-list">
    <li>Frontend Frameworks: React, Vue.js, Next.js, Nuxt.js and other SSR frameworks</li>
    <li>Languages: TypeScript, JavaScript(ES6+), HTML5, CSS3</li>
    <li>UI/Styling: TailwindCSS, Sass/Less, CSS Modules, Styled-components</li>
    <li>State Management: Redux, Vuex, Zustand, Jotai, React Query</li>
    <li>Build Tools: Webpack, Vite, Rollup, Babel, ESLint</li>
    <li>Testing: Jest, React Testing Library, Cypress</li>
    <li>Performance: Browser rendering principles, performance metrics monitoring, code splitting, lazy loading</li>
    <li>Version Control: Git, SVN</li>
    <li>Technical Leadership: Team management experience, led technology selection and architecture design for large projects</li>
  </ul>
</div>`,
  albumInfoContent: `<div class="skill-content">
  <ul class="custom-list">
    <li>Do whatever i like.</li>
  </ul>
</div>`,
  experience: [
    {
      id: '1',
      company: 'ByteDance',
      position: 'Senior Frontend Engineer',
      date: '2035/7 - Present',
      visible: true,
      details: `<ul class="custom-list">
      <li>Responsible for development and maintenance of TikTok Creator Platform, leading technical solution design for core features</li>
      <li>Optimized build configuration, reducing build time from 8 minutes to 2 minutes, improving team development efficiency</li>
      <li>Designed and implemented component library, increasing code reuse by 70%, significantly reducing development time</li>
      <li>Led performance optimization project, reducing platform first-screen loading time by 50%, integrated APM monitoring system</li>
      <li>Mentored junior engineers, organized technical sharing sessions to improve overall team technical capabilities</li>
    </ul>`,
    },
  ],
  draggingProjectId: null,
  projects: [
    {
      id: 'p1',
      name: 'TikTok Creator Platform',
      role: 'Frontend Lead',
      date: '2022/6 - 2023/12',
      description: `<ul class="custom-list">
        <li>React-based analytics and content management platform serving millions of creators</li>
        <li>Includes data analytics, content management, and revenue management subsystems</li>
        <li>Implemented Redux for state management, enabling efficient handling of complex data flows</li>
        <li>Used Ant Design component library to ensure UI consistency and user experience</li>
        <li>Implemented code splitting and lazy loading strategies to optimize loading performance</li>
      </ul>`,
      visible: true,
    },
    {
      id: 'p2',
      name: 'WeChat Mini Program Developer Tools',
      role: 'Core Developer',
      date: '2020/3 - 2021/6',
      description: `<ul class="custom-list">
        <li>All-in-one solution for mini program development, debugging, and publishing</li>
        <li>Cross-platform desktop application built with Electron</li>
        <li>Supports multiple platforms including Windows, macOS, and Linux</li>
        <li>Provides real-time error logging and performance analysis tools</li>
        <li>Integrates third-party plugins and SDKs for custom functionality</li>
      </ul>`,
      visible: true,
    },
    {
      id: 'p3',
      name: 'Frontend Monitoring Platform',
      role: 'Technical Lead',
      date: '9/2021 - 5/2022',
      description: `<ul class="custom-list">
        <li>Complete frontend monitoring solution including error tracking, performance monitoring, and user behavior analysis</li>
        <li>Built with Vue and Element UI, providing real-time monitoring data and visualization tools</li>
        <li>Supports various monitoring metrics including error logs, performance indicators, and user behavior analysis</li>
        <li>Provides detailed error logs and performance analysis tools to help developers identify and optimize issues</li>
        <li>Integrates third-party plugins and SDKs for custom functionality</li>
      </ul>`,
      visible: true,
    },
  ],
  menuSections: [
    {
      id: 'basic',
      title: 'Profile',
      icon: '💿️',
      enabled: true,
      order: 0,
    },
    {
      id: 'albumInfo',
      title: 'About',
      icon: 'ℹ️',
      enabled: true,
      order: 1,
    },
    {
      id: 'officialReview',
      title: 'Official Review',
      icon: '📰',
      enabled: true,
      order: 2,
    },
    {
      id: 'personalReview',
      title: 'Personal Review',
      icon: '🗣️',
      enabled: true,
      order: 3,
    },
  ],
  customData: {
    // Custom data can be added here
    // e.g. officialReview: [], personalReview: []
    officialReview: [
      {
        id: 'official1',
        description: 'This is an official review content.',
        title: '',
        subtitle: '',
        dataRange: '',
        visible: '',
      },
    ],
    personalReview: [
      {
        id: 'personal1',
        description: 'This is a personal review content.',
        title: '',
        subtitle: '',
        dataRange: '',
        visible: '',
      },
    ],
  },
  activeSection: 'basic',
  globalSettings: initialGlobalSettings,
};

export const albumData: albums[] = [
  { id: '1', img: '/albums/ybar_k.jpg', title: 'alright, kid' },
  { id: '2', img: '/albums/jumpbp.jpg', title: 'jump' },
  { id: '3', img: '/albums/ivesecret.jpg', title: 'Ive Secret' },
  { id: '4', img: '/albums/thisis4.jpg', title: 'This is 4' },
  { id: '5', img: '/avatar.jpg', title: 'Avatar' },
  { id: '6', img: '/albums/Midwest.jpg', title: 'Midwest' },
  { id: '7', img: '/albums/RDR2.png', title: 'RDR2' },
  { id: '8', img: '/albums/Strategy.jpg', title: 'Strategy' },
  { id: '9', img: '/albums/GNX.jpg', title: 'GNX' },
  { id: '10', img: '/albums/brat.jpg', title: 'Brat' },
  { id: '11', img: '/albums/IveTried.jpg', title: 'Ive Tried' },
];
