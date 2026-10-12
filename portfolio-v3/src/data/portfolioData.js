export const developerData = {
  name: "Md Rabby Hasan",
  title: "Lead Software Engineer & Systems Architect",
  tagline: "Designing high-availability distributed systems, enterprise .NET ecosystem including microservices, high-throughput cloud infrastructure, and AI-native development.",
  location: "Dhaka, Bangladesh · Remote USA",
  email: "rabbyalone@gmail.com",
  secondaryEmail: "hasan@rabbyhasan.com.bd",
  phone: "+880-1767478013",
  resumePdf: "/doc/rabby_hasan_9_years_full_stack_dot_net_dev.pdf",
  status: "Available for Architecture & Lead Consulting",
  stats: [
    { value: "10+ YOE", label: "Engineering Leadership", detail: "Lead & Systems Architect Roles" },
    { value: "90%", label: "Downtime Reduction", detail: "Decoupled Microservice Architecture" },
    { value: "1,000 Yrs", label: "Arctic Archival Scope", detail: "Svalbard Arctic World Archive (Piql Norway)" },
    { value: "2nd Prize", label: "AI Hackathon Winner", detail: "Ethos Risk Autonomous Agent Engine" }
  ],
  socials: [
    { name: "GitHub", url: "https://github.com/rabbyalone", handle: "@rabbyalone" },
    { name: "StackOverflow", url: "https://stackoverflow.com/users/4238524/rabby-hasan", handle: "4238524" },
    { name: "Engineering Blog", url: "https://blog.rabbyhasan.com.bd/", handle: "blog.rabbyhasan.com.bd" },
    { name: "Twitter / X", url: "https://twitter.com/rabbyalone", handle: "@rabbyalone" },
    { name: "Facebook", url: "https://facebook.com/rabbyalone", handle: "rabbyalone" }
  ],
  bioNarrative: [
    "For over a decade, I have architected and delivered mission-critical software systems that operate under extreme constraints. My engineering journey spans high-security government archives in Svalbard (1,000-year cold storage), offshore North Sea oil rig telemetry, Big-4 global corporate taxation platforms, and high-concurrency commercial SaaS.",
    "Currently at Ethos Risk Services (USA, Remote), I lead the architectural transformation of legacy platforms into decoupled .NET 8 microservices, implement high-performance caching and query execution optimizations, and introduce spec-driven AI developer workflows.",
    "I believe in ruthless simplicity, verifiable fault tolerance, and measurable business outcomes over engineering vanity."
  ]
};

export const projectsData = [
  {
    id: "ethos-risk-management",
    index: "01",
    title: "Enterprise Risk Management & Modernization",
    client: "Ethos Risk Services (USA)",
    year: "2024 – Present",
    role: "Lead Systems Architect & Developer",
    category: "InsurTech · Enterprise Microservices",
    categoryFilter: "microservices",
    thumbnail: "/img/portfolio/insurance.jpg",
    fullImage: "/img/portfolio/insurance.jpg",
    summary: "Modernized core insurance risk platforms into decoupled .NET 8 microservices, eliminating 90% of production downtime.",
    challenge: "The existing legacy monolithic platform suffered from tight domain coupling, brittle deployments, and intermittent downtime during high-load policy audits, causing critical delays for insurance adjudicators.",
    solution: "Architected a domain-driven, decoupled .NET 8 microservices topology. Implemented CQRS patterns with MediatR, multi-tier Redis distributed caching, SQL Server query execution plan tuning, and automated CI/CD pipelines on Azure DevOps.",
    outcome: "Achieved a 90% drop in production downtime, boosted application query throughput by 20%, and reduced sprint release cycle times by 20%. Awarded 2nd Prize in the company AI Hackathon for designing autonomous developer agent workflows.",
    tech: [".NET 8", "C#", "Microservices", "CQRS / MediatR", "SQL Server", "Redis", "Azure DevOps", "Docker", "AI Agents"],
    liveUrl: ""
  },
  {
    id: "ey-taxation",
    index: "02",
    title: "Global Client & Engagement Tax Platform",
    client: "Ernst & Young (EY)",
    year: "2021 – 2022",
    role: "Senior Systems Engineer",
    category: "FinTech & Big-4 Compliance",
    categoryFilter: "enterprise",
    thumbnail: "/img/portfolio/EY-768x432.webp",
    fullImage: "/img/portfolio/EY-768x432.jpg",
    summary: "High-throughput gRPC & Azure Service Bus tax calculation engine managing international corporate compliance.",
    challenge: "Global tax calculation and cross-border filing required synchronized multi-jurisdictional compliance calculations across disconnected enterprise software modules under strict SLA deadlines.",
    solution: "Architected high-throughput .NET Core Web APIs and low-latency gRPC inter-service protocols. Built reliable asynchronous event choreographies using Azure Service Bus pub/sub topics and serverless Azure Functions.",
    outcome: "Handled hundreds of thousands of complex tax schedule events with zero data loss, guaranteed transactional consistency, and end-to-end security compliance.",
    tech: [".NET Core", "Angular 14", "gRPC", "Azure Service Bus", "Azure Functions", "Docker", "TDD"],
    liveUrl: ""
  },
  {
    id: "piql-connect",
    index: "03",
    title: "Piql Connect (1,000-Year Arctic Preservation)",
    client: "Arctic World Archive (Piql Norway)",
    year: "2020 – 2021",
    role: "Backend Architect & Web API Lead",
    category: "Gov & Archival · Arctic Vault",
    categoryFilter: "infrastructure",
    thumbnail: "/img/portfolio/piql_thumb.jpg",
    fullImage: "/img/portfolio/piql.jpg",
    summary: "Secure digital ingestion engine preserving humanity's mission-critical records for 1,000 years in Svalbard.",
    challenge: "Physical photosensitive film archival in deep permafrost mines requires unassailable cryptographic integrity, verifiable multi-part chunk ingestion, and zero bitrot or corruption.",
    solution: "Engineered secure chunked upload ingestion pipelines with SHA-256 cryptographic verification protocols, multi-tenant governance APIs in .NET Core, and administrative management portals in Vue 3.",
    outcome: "Successfully integrated international government and institutional data ingestion onto permanent physical optical storage in the Arctic World Archive.",
    tech: [".NET Core", "Vue 3", "Cryptographic Checksums", "Microservices", "AWS S3 Archival", "Cosmos DB", "Docker"],
    liveUrl: ""
  },
  {
    id: "geologiq-oil-rig",
    index: "04",
    title: "Offshore Oil Rig Telemetry & Spatial Mapper",
    client: "Informatiq / GeologiQ (Norway)",
    year: "2020 – 2021",
    role: "Lead Telemetry Engineer",
    category: "Energy · Real-Time Telemetry",
    categoryFilter: "infrastructure",
    thumbnail: "/img/portfolio/oil-rig-thumb.jpg",
    fullImage: "/img/portfolio/geologiq.jpg",
    summary: "Real-time North Sea offshore drilling telemetry ingestion and geospatial tracking on AKS and Cosmos DB.",
    challenge: "North Sea drilling operations emit high-velocity sensor data streams that must be parsed, geo-indexed, and displayed to offshore geological engineers with sub-second latency.",
    solution: "Implemented robust .NET Core background worker services, Cosmos DB geospatial coordinate partitioning, and containerized microservice clusters orchestrated on Azure Kubernetes Service (AKS).",
    outcome: "Delivered continuous zero-loss streaming telemetry visualization across live North Sea exploration rigs with automatic failover.",
    tech: [".NET Core", "Azure Kubernetes (AKS)", "Cosmos DB", "Angular", "Azure Service Bus", "Docker"],
    liveUrl: ""
  },
  {
    id: "smilecare-chamber",
    index: "05",
    title: "SmileCare Chamber — Clinical Operations ERP",
    client: "SmileCare Health / Techyzz",
    year: "2023 – 2024",
    role: "Principal Full Stack Architect",
    category: "Healthcare · Clinical ERP (Live)",
    categoryFilter: "saas",
    thumbnail: "/img/portfolio/smilecare.png",
    fullImage: "/img/portfolio/smilecare.png",
    summary: "Doctor practice ERP featuring offline-first React PWA, IndexedDB synchronization, and ASP.NET Web API.",
    challenge: "Clinics in emerging regions frequently suffer sudden internet drops during active doctor consultations, which historically caused patient prescription loss and clinic queue freezes.",
    solution: "Engineered an offline-first architecture utilizing IndexedDB for instantaneous local state persistence paired with background bi-directional synchronization to a containerized ASP.NET Web API and PostgreSQL cluster.",
    outcome: "Empowered medical chambers with seamless sub-50ms prescription drafting, automated appointments, dynamic Rx templates, and reliable revenue collection.",
    tech: ["C# ASP.NET Web API", "PostgreSQL", "Redis", "IndexedDB", "React PWA", "Docker"],
    liveUrl: "https://bdc.techyzz.com"
  },
  {
    id: "barqo-ecommerce",
    index: "06",
    title: "Barqo — High-Performance E-Commerce Engine",
    client: "Barqo Bangladesh",
    year: "2023 – 2024",
    role: "Lead Architect & Developer",
    category: "Retail · High-Concurrency Marketplace",
    categoryFilter: "saas",
    thumbnail: "/img/portfolio/barqo.png",
    fullImage: "/img/portfolio/barqo.png",
    summary: "High-concurrency retail e-commerce platform built with .NET 10 microservices, Polly circuit breakers, and rate limiting.",
    challenge: "Flash sale campaigns created extreme concurrency spikes that overloaded database connections, caused cart dropouts, and risked double-inventory checkout allocations.",
    solution: "Constructed decoupled C# ASP.NET 10 microservices with Polly circuit breakers, Redis distributed locking for cart operations, and custom token-bucket rate limiting middleware.",
    outcome: "Supported smooth flash sale surges with zero inventory concurrency anomalies and sub-100ms checkout response times.",
    tech: [".NET 10 Microservices", "PostgreSQL", "Redis Locking", "Circuit Breakers (Polly)", "Rate Limiter", "React PWA"],
    liveUrl: "https://barqo.bd"
  },
  {
    id: "employee-mobility",
    index: "07",
    title: "Field Workforce Mobility (SAP ERP OData)",
    client: "Berger Paints (Global Color Group)",
    year: "2019 – 2020",
    role: "Senior Integration Engineer",
    category: "Manufacturing · Enterprise Middleware",
    categoryFilter: "enterprise",
    thumbnail: "/img/portfolio/mobility_thumb.jpg",
    fullImage: "/img/portfolio/mobility.jpg",
    summary: "Field workforce automation and route telemetry integrated with corporate SAP ERP via OData.",
    challenge: "Over 1,000 field sales executives submitted daily nationwide purchase orders through legacy overnight batch jobs, causing 24-hour manufacturing lag.",
    solution: "Engineered high-speed ASP.NET Core middleware interfacing directly with corporate SAP ERP via the OData protocol, backed by fault-tolerant retry queues and geolocation verification.",
    outcome: "Cut order processing lag from 24-hour batch runs to near real-time synchronization, drastically speeding up warehouse dispatch.",
    tech: ["ASP.NET Core", "SAP OData API", "Angular", "Worker Services", "MSSQL", "Azure Web Apps"],
    liveUrl: ""
  },
  {
    id: "expiry-control",
    index: "08",
    title: "Algorithmic Short-Expiry Control System",
    client: "Pharmaceutical Industry",
    year: "2018 – 2019",
    role: "Systems Developer",
    category: "Pharma · Inventory Optimization",
    categoryFilter: "enterprise",
    thumbnail: "/img/portfolio/expiry_thumb.jpg",
    fullImage: "/img/portfolio/expiry.jpg",
    summary: "Algorithmic FIFO batch routing engine eliminating short-expiry pharmaceutical wastage across national depots.",
    challenge: "Short-expiry drug batches frequently spoiled in regional depots due to static warehouse routing rules, costing millions in regulatory waste.",
    solution: "Designed an algorithmic FIFO dynamic allocation engine factoring in transit duration, shelf-life thresholds, and regional prescription demand.",
    outcome: "Eliminated short-expiry waste across participating supply chains and automated depot audit reporting.",
    tech: ["ASP.NET Core", "MSSQL", "Entity Framework Core", "Razor Pages", "Docker"],
    liveUrl: ""
  },
  {
    id: "bcps-registration",
    index: "09",
    title: "Apex Medical Examination & Hall Allocation",
    client: "Bangladesh College of Physicians & Surgeons",
    year: "2018 – 2019",
    role: "Development Lead",
    category: "Public Sector · High Concurrency",
    categoryFilter: "enterprise",
    thumbnail: "/img/portfolio/bcps_thumb.jpg",
    fullImage: "/img/portfolio/bcps.jpg",
    summary: "High-concurrency registration and conflict-free automated seat planning engine for apex medical doctor fellowships.",
    challenge: "Tens of thousands of doctors applied concurrently in tight registration windows, previously overwhelming servers and causing seat planning errors.",
    solution: "Architected a scalable registration pipeline with automated algorithmic conflict-free seat allocation, instant payment verification, and automated admit card PDF generation.",
    outcome: "Flawlessly processed fellowship admissions with zero server downtime and instant digital admit card issuance.",
    tech: ["ASP.NET Core", "MSSQL", "Payment Gateway Integration", "SMS Gateway", "PDF Generation"],
    liveUrl: ""
  },
  {
    id: "posm-distribution",
    index: "10",
    title: "POSM Supply Chain Logistics & Audit",
    client: "British American Tobacco",
    year: "2017 – 2018",
    role: "Software Engineer",
    category: "FMCG · Supply Chain & Audit",
    categoryFilter: "enterprise",
    thumbnail: "/img/portfolio/posm_thumb.jpg",
    fullImage: "/img/portfolio/posm.jpg",
    summary: "Nationwide Point-of-Sale material inventory allocation and photo-verified field auditing platform.",
    challenge: "High loss rates during nationwide point-of-sale material deployment across thousands of retail outlets with lack of audit visibility.",
    solution: "Built a centralized inventory allocation tracking system with mobile photo verification and discrepancy auditing.",
    outcome: "Provided complete visibility into national trade marketing expenditures and depot stock balances.",
    tech: ["ASP.NET Core", "MSSQL", "RESTful APIs", "jQuery", "Crystal Reports"],
    liveUrl: ""
  },
  {
    id: "idim-security",
    index: "11",
    title: "IDIM — Air-Gapped Security & Access RBAC",
    client: "Security Force Headquarters",
    year: "2016 – 2017",
    role: "Software Engineer",
    category: "Defense · Security & Access RBAC",
    categoryFilter: "enterprise",
    thumbnail: "/img/portfolio/idim_thumb.jpg",
    fullImage: "/img/portfolio/idim.jpg",
    summary: "Air-gapped security credential and personnel records platform with tamper-proof audit trails.",
    challenge: "Strict air-gapped security guidelines requiring granular role-based access control (RBAC) and immutable personnel verification logs.",
    solution: "Engineered secure biometric credential indexing, strict permission matrix enforcement, and encrypted audit logging.",
    outcome: "Delivered a rock-solid, air-gapped access management system passing all defense audit evaluations.",
    tech: ["ASP.NET MVC", "MSSQL", "Entity Framework", "RBAC", "Cryptographic Audit"],
    liveUrl: ""
  }
];

export const servicesData = [
  {
    number: "01",
    title: "Modern AI & Engineering Workflows",
    headline: "AI strategy, spec-driven development, custom agents, and process automation.",
    description: "Transform development velocity and product operations by integrating pragmatic AI systems. From spec-driven workflows to custom autonomous task agents and telemetry intelligence.",
    capabilities: [
      { name: "AI Strategy & SDD", detail: "Spec-Driven Development workflows compressing cycle times from schema to production." },
      { name: "Process Automation", detail: "Automated workflow engines and CI/CD pipelines cutting deployment duration by 20%." },
      { name: "Autonomous Agents", detail: "2nd Prize internal AI hackathon winner for autonomous task execution engines." },
      { name: "Data Intelligence", detail: "Real-time telemetry pipelines and analytics on Cosmos DB, SQL Server, and Redis." }
    ]
  },
  {
    number: "02",
    title: "Distributed Core & Backend Architecture",
    headline: "High-availability .NET 8 microservices, CQRS, and contract-first Web APIs.",
    description: "Architecting decoupled, high-availability backends engineered for 99.99% uptime. Memory-efficient asynchronous runtimes, domain-driven boundaries, and reliable event messaging.",
    capabilities: [
      { name: "C# / .NET 8 & .NET Core", detail: "10+ years mastery of clean architecture, memory management, and asynchronous runtimes." },
      { name: "Microservices & CQRS", detail: "Decoupled domain handlers using MediatR, event-driven contracts, and outbox patterns." },
      { name: "RESTful & gRPC APIs", detail: "Contract-first APIs, protobuf serialization, and low-latency HTTP/2 microservice communication." },
      { name: "SOLID & Design Patterns", detail: "Extensible domain models, dependency injection, and clean architectural boundaries." }
    ]
  },
  {
    number: "03",
    title: "Cloud-Native Infrastructure & DevOps",
    headline: "Azure cloud topologies, container orchestration, and zero-downtime pipelines.",
    description: "Designing reliable cloud foundations across Microsoft Azure and AWS. Containerized microservices, pub/sub queues, and automated test/build/deploy pipelines.",
    capabilities: [
      { name: "Azure Cloud Solutions", detail: "App Services, Functions, Key Vault, Virtual Networks, Service Bus topics & queues." },
      { name: "Docker & Kubernetes (AKS)", detail: "Multi-stage minimal Dockerfiles, pod orchestration, rolling updates, and health probes." },
      { name: "CI/CD Pipeline Automation", detail: "Azure DevOps & GitHub Actions automated testing, vulnerability scanning, and deployment." },
      { name: "Fault Tolerance Policies", detail: "Polly circuit breakers, exponential backoff retries, and distributed rate limiting." }
    ]
  },
  {
    number: "04",
    title: "High-Concurrency Data & Distributed Caching",
    headline: "Query plan optimization, indexing strategies, and distributed in-memory stores.",
    description: "Tuning data access layers for sub-50ms query latency under heavy concurrency. Strategic partitioning, cache-aside replication, and relational integrity.",
    capabilities: [
      { name: "MS SQL Server & T-SQL", detail: "10+ years deep query execution plan analysis, index tuning, and stored procedures." },
      { name: "Entity Framework Core 8", detail: "Compiled queries, projection optimization, split queries, and idempotent migrations." },
      { name: "Redis In-Memory Caching", detail: "Distributed cache-aside patterns, session replication, and distributed locks." },
      { name: "Cosmos DB & PostgreSQL", detail: "Spatial geo-indexing, partition keys, ACID transactional compliance, and NoSQL stores." }
    ]
  },
  {
    number: "05",
    title: "Enterprise Integrations & Modern Frontend",
    headline: "Reactive web applications, ERP middleware, and cross-system data sync.",
    description: "Connecting enterprise cores with modern, responsive user interfaces and third-party systems. SAP OData enterprise adapters and offline-first progressive web apps.",
    capabilities: [
      { name: "Modern React & Angular", detail: "Component architecture, RxJS reactive state, custom hooks, and performant state trees." },
      { name: "SAP OData Middleware", detail: "Bidirectional enterprise ERP data exchange with reliable background synchronization." },
      { name: "Offline-First PWAs", detail: "IndexedDB client persistence allowing seamless operations across network drops." },
      { name: "Design Systems", detail: "Minimalist, accessibility-focused UI systems with fluid typography and micro-interactions." }
    ]
  }
];

export const experienceData = [
  {
    company: "Ethos Risk Services",
    role: "Senior Software Developer / Lead",
    location: "USA (Remote)",
    period: "March 2024 – Present",
    current: true,
    summary: "Architecting core enterprise risk management systems across distributed .NET 8 backends and cloud environments.",
    highlights: [
      "Modernized legacy monolithic services into decoupled .NET 8 microservices, reducing production downtime by 90% and elevating system maintainability.",
      "Engineered backend query optimizations and Redis caching strategies, improving application throughput by 20%.",
      "Awarded 2nd Prize in company-wide internal AI Hackathon for designing autonomous task automation engines and developer agent workflows.",
      "Streamlined CI/CD deployment pipelines in collaboration with DevOps and QA, reducing deployment cycle times by 20% while leading code reviews."
    ],
    tech: [".NET 8", "C#", "Microservices", "CQRS / MediatR", "SQL Server", "Redis", "Azure DevOps", "Docker", "AI Agents"]
  },
  {
    company: "Independent Engineering Consultant",
    role: "Lead Full Stack .NET Engineer",
    location: "Remote",
    period: "May 2023 – February 2024",
    current: false,
    summary: "Full-lifecycle software architecture and development for healthcare, retail, and API-driven headless CMS platforms.",
    highlights: [
      "Led full-lifecycle software architecture and development for a pioneer veterinary telemedicine platform in Bangladesh.",
      "Architected Barqo e-commerce engine on ASP.NET 10 microservices with Polly circuit breakers and rate limiting.",
      "Delivered SmileCare clinical ERP with offline-first React PWA and IndexedDB synchronization for zero network disruptions."
    ],
    tech: [".NET Core", "React", "Node.js", "TypeScript", "RESTful APIs", "PostgreSQL", "Redis"]
  },
  {
    company: "Softensity Inc, USA",
    role: "Senior Software Engineer",
    location: "USA (Remote)",
    period: "August 2022 – June 2023",
    current: false,
    summary: "Enterprise microservices engineering using .NET 6, Angular 14, and MS SQL Server following strict TDD standards.",
    highlights: [
      "Engineered enterprise microservices adhering to strict Test-Driven Development (TDD) guidelines.",
      "Participated in Agile Scrum ceremonies and mentored mid-level engineers in clean architecture.",
      "Enforced Information Security standards and conducted technical code reviews across distributed endpoints."
    ],
    tech: [".NET 6", "Angular 14", "Microservices", "TDD", "MS SQL Server", "Azure", "Docker"]
  },
  {
    company: "Brainstation-23 Ltd.",
    role: "Senior Software Engineer",
    location: "Dhaka, Bangladesh",
    period: "January 2020 – August 2022",
    current: false,
    summary: "Architected backend microservices and Web APIs for global enterprise clients including Ernst & Young and Piql Norway.",
    highlights: [
      "Architected backend microservices and Web APIs for global enterprise clients: EY CEM Taxation and Piql Connect (Norway).",
      "Engineered real-time background worker services for offshore North Sea oil rig telemetry mapping in GeologiQ (Norway).",
      "Integrated Azure Service Bus event messaging, Cosmos DB spatial telemetry storage, and automated CI/CD pipelines."
    ],
    tech: [".NET Core", "Vue 3", "Angular", "Docker", "Cosmos DB", "Azure Service Bus", "Azure DevOps"]
  },
  {
    company: "Brainstation-23 Ltd.",
    role: "Software Engineer",
    location: "Dhaka, Bangladesh",
    period: "February 2018 – December 2019",
    current: false,
    summary: "Developed enterprise web applications and RESTful APIs across pharmaceutical and banking sectors.",
    highlights: [
      "Implemented Entity Framework Core data access layers, secure token-based authentication, and automated integration tests.",
      "Engineered algorithmic pharmaceutical short-expiry inventory control systems.",
      "Collaborated closely with technical leads, solution architects, and product managers to meet strict performance SLAs."
    ],
    tech: ["ASP.NET MVC", "C#", "SQL Server", "EF Core", "REST APIs", "JavaScript"]
  },
  {
    company: "Ha-Meem Group",
    role: "Software Engineer",
    location: "Dhaka, Bangladesh",
    period: "September 2017 – January 2018",
    current: false,
    summary: "Developed real-time Thread Management ERP modules for industrial garments manufacturing.",
    highlights: [
      "Engineered land management government record indexing systems with fast search and audit logging.",
      "Developed manufacturing floor tracking modules integrated with SQL Server relational tables."
    ],
    tech: ["ASP.NET", "C#", "SQL Server", "ERP Architecture", "Crystal Reports"]
  },
  {
    company: "Unisoft Systems Ltd.",
    role: "Software Engineer",
    location: "Dhaka, Bangladesh",
    period: "March 2016 – September 2017",
    current: false,
    summary: "Engineered Sales & Distribution ERP modules featuring high-volume POS checkout and item catalog engines.",
    highlights: [
      "Optimized complex SQL stored procedures, relational table schemas, and automated financial reconciliation scripts.",
      "Developed rule-based POS discount calculation engine for nationwide retail distribution."
    ],
    tech: ["ASP.NET WebForms", "MSSQL", "jQuery", "POS Architecture", "Stored Procedures"]
  },
  {
    company: "Systech Unimax Ltd.",
    role: "Jr. Software Engineer",
    location: "Dhaka, Bangladesh",
    period: "October 2015 – March 2016",
    current: false,
    summary: "Developed Supply Chain Management (SCM) modules tracking millions of product serial numbers.",
    highlights: [
      "Built automated SFTP synchronization between SCM and CRM systems for real-time warranty activation.",
      "Created transactional reporting tools with MSSQL and WCF services."
    ],
    tech: ["ASP.NET MVC", "WCF", "MSSQL", "SCM", "SFTP Sync"]
  }
];

export const educationData = [
  {
    degree: "Master of Science in Computer Science (M.Sc CS)",
    institution: "Jahangirnagar University",
    period: "2017 – 2018",
    details: "Advanced study in Software Engineering, Distributed Systems, Object-Oriented Architecture, Data Structures, Computer Networks, Network Security, and Advanced DBMS."
  },
  {
    degree: "Enterprise System Analysis & Design Using C#",
    institution: "Daffodil Institute of IT (DIIT / IDB-BISEW)",
    period: "2014 – 2015",
    details: "Intensive professional software engineering diploma covering C#, Microsoft SQL Server, UML Object-Oriented Analysis, ASP.NET MVC, WCF Services, and Windows Azure Web Applications."
  },
  {
    degree: "Master of Science in Chemistry (M.Sc)",
    institution: "National University",
    period: "2010 – 2011",
    details: "Postgraduate degree focusing on analytical methodology, quantitative research logic, and systematic empirical problem-solving."
  },
  {
    degree: "Bachelor of Science in Chemistry (B.Sc)",
    institution: "National University",
    period: "2007 – 2010",
    details: "Undergraduate foundation building mathematical rigor, physical logic, and quantitative empirical analysis."
  }
];

export const testimonialsData = [
  {
    quote: "Excellent excellent work — very helpful and cooperative and has done a wonderful job architecting our critical systems!",
    author: "Howard Davidson",
    role: "Executive Client",
    company: "Enterprise Software Group",
    avatar: "HD",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face"
  },
  {
    quote: "Mr Hasan did an amazing job on custom calculation engines and backend logic. He beat the timeline we set and created complex logic which tested out perfectly when we put the code through our QA process. Extremely happy with his work and very pleasant in communication.",
    author: "Tony",
    role: "Project Director",
    company: "Digital Solutions",
    avatar: "TO",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=face"
  },
  {
    quote: "Very satisfied with the job done. Delivered high quality code on time and went above and beyond to ensure our deployment was completely seamless and production-ready.",
    author: "Mike",
    role: "Tech Lead",
    company: "Cloud Systems",
    avatar: "MK",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop&crop=face"
  }
];

export const articlesData = [
  {
    id: "engineering-journal",
    title: "Software Engineering & Enterprise Architecture Journal",
    summary: "Production case studies and technical notes covering distributed architecture, high-availability microservices, and software delivery.",
    category: "Architecture Journal",
    readTime: "Live Engineering Blog",
    url: "https://blog.rabbyhasan.com.bd/",
    tags: ["Enterprise Systems", "Distributed Microservices", ".NET 8"]
  },
  {
    id: "blog-catalog",
    title: "Technical Articles & Systems Design Notes",
    summary: "In-depth explorations of .NET 8 runtime internals, distributed event streaming, and cloud infrastructure patterns.",
    category: "Technical Deep Dives",
    readTime: "Recent Posts",
    url: "https://blog.rabbyhasan.com.bd/blog",
    tags: ["Cloud Architecture", "Event Streaming", "Performance Tuning"]
  },
  {
    id: "topics-tags",
    title: "Architecture, Database Tuning & Modern AI Workflows",
    summary: "Curated technical notes on LINQ query optimization, Redis cache strategies, Azure cloud services, and developer automation.",
    category: "Topics Index",
    readTime: "Curated Topics",
    url: "https://blog.rabbyhasan.com.bd/tags",
    tags: ["Database Tuning", "Azure Cloud", "AI Workflows"]
  }
];
