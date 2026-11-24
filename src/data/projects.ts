import {
  Globe,
  Server,
  Terminal,
  CreditCard,
  Database,
  Layers,
  Zap,
  Code2,
  Cpu,
} from "lucide-react";

export interface TechItem {
  name: string;
  icon: any;
  color: string;
  bgLight: string;
  detail: string;
}

export interface MilestoneItem {
  name: string;
  detail: string;
  status: "verified" | "live";
}

export interface ProcessPhase {
  phase: string;
  days: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectProcessStep {
  step: string;
  phase: string;
  title: string;
  description: string;
}

export interface ProjectGalleryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
}

export interface VisualShowcaseItem {
  title: string;
  category: string;
  description: string;
  image: string;
  highlights: string[];
}

export type ProjectCategory = "ecommerce" | "web-app" | "saas" | "proptech" | "ai";

export interface Project {
  id: string;
  title: string;
  client: string;
  image: string;
  category: ProjectCategory;
  categoryLabel: string;
  shortDescription: string;
  projectType: string;
  overview: string;
  estimatedCost: string;
  duration: string;
  features: ProjectFeature[];
  processSteps: ProjectProcessStep[];
  gallery: ProjectGalleryItem[];
  visualShowcases: VisualShowcaseItem[];
  deliverables: string[];
  liveUrl?: string;
  techStack: string[];
  deliveryDays: string;
  sprints: number;
  description: {
    lead: string;
    highlight: string;
    tail: string;
  };
  metrics: {
    label: string;
    value: string;
    progress: number;
    sublabel: string;
  };
  milestones: MilestoneItem[];
  technologies: TechItem[];
  processPhases: ProcessPhase[];
  highlights: {
    speedScore: string;
    loadTime: string;
    uptime: string;
  };
  accentColor: string;
  clientQuote?: {
    text: string;
    author: string;
    role: string;
  };
}

const DEFAULT_PROCESS_STEPS: ProjectProcessStep[] = [
  {
    step: "01",
    phase: "Planning & Discovery",
    title: "Requirements, Business Goals & Scope",
    description: "In-depth technical discovery to understand architectural requirements, user personas, operational constraints, and commercial milestones.",
  },
  {
    step: "02",
    phase: "UI/UX & Design",
    title: "Interface, Visual Identity & Prototypes",
    description: "Crafting a bespoke design system, fluid interactive prototypes, and high-fidelity responsive layouts focused on user conversion.",
  },
  {
    step: "03",
    phase: "Development",
    title: "Full-Stack Engineering & System Integrations",
    description: "Developing robust frontends, resilient API microservices, distributed data schemas, and seamless third-party gateway connections.",
  },
  {
    step: "04",
    phase: "Testing & Delivery",
    title: "Performance Audits, Security & Global Launch",
    description: "End-to-end regression testing, Core Web Vitals optimization, automated CI/CD pipeline deployment, and zero-downtime production cutover.",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "kraftwoods",
    title: "KraftWoods Luxury Living",
    client: "KraftWoods India",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=900&auto=format&fit=crop",
    category: "ecommerce",
    categoryLabel: "E-Commerce",
    shortDescription: "Bespoke direct-to-consumer digital flagship featuring interactive 3D furniture customizers and frictionless checkout.",
    projectType: "E-Commerce Flagship & 3D WebGL Configurator",
    overview: "KraftWoods is a premium direct-to-consumer flagship engineered for an artisan luxury furniture manufacturer. We built an interactive 3D product visualizer running at 60fps in WebGL, sub-second server-side rendered catalog filtering, and a streamlined one-page checkout that lifts conversion rates while preserving an editorial brand feel.",
    estimatedCost: "₹3,40,000 (Estimated Project Value)",
    duration: "16 Days",
    features: [
      {
        title: "Interactive 3D WebGL Configurator",
        description: "60fps real-time 3D models allowing customers to inspect grain textures, rotate 360°, and swap teak and walnut finishes seamlessly.",
      },
      {
        title: "Dynamic Sizing & Price Recalculation",
        description: "Instant geometric dimension customizer that recalculates lumber consumption and updates quotation values in real time.",
      },
      {
        title: "Frictionless One-Page Checkout Funnel",
        description: "Accordion checkout integrating Razorpay and Stripe with automated PIN-code courier feasibility and credit EMI options.",
      },
      {
        title: "ERP & Showroom Stock Sync",
        description: "Automated two-way inventory pipeline keeping physical showroom stock aligned with online SKU availability.",
      },
      {
        title: "Sub-300ms Category Filtering",
        description: "Edge-rendered catalog navigation enabling sub-second search across 4,500+ furniture variations with zero layout shift.",
      },
    ],
    processSteps: DEFAULT_PROCESS_STEPS,
    gallery: [
      {
        id: "kw-1",
        title: "Curated Flagship Collection",
        subtitle: "High-resolution teak and walnut interior suites with sub-second catalog filter response",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
        tag: "FLAGSHIP STOREFRONT",
      },
      {
        id: "kw-2",
        title: "Interactive 3D WebGL Configurator",
        subtitle: "60fps real-time customizer allowing live wood texture swap and dimension modifications",
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
        tag: "3D CONFIGURATOR",
      },
      {
        id: "kw-3",
        title: "Modular Component Specs & Pricing",
        subtitle: "Dynamic dimension matrix calculating raw lumber volume and quotation values instantly",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
        tag: "SPECIFICATION SHEET",
      },
      {
        id: "kw-4",
        title: "Frictionless One-Page Checkout",
        subtitle: "Streamlined accordion payment funnel with automated PIN-code courier validation & credit EMI",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop",
        tag: "CHECKOUT WORKFLOW",
      },
      {
        id: "kw-5",
        title: "Spatial Living Room Visualizer",
        subtitle: "Scale-accurate architectural staging enabling prospective homeowners to preview setups",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
        tag: "SPATIAL PREVIEW",
      },
    ],
    visualShowcases: [
      {
        title: "Bespoke 3D Configurator & Material Shaders",
        category: "INTERACTIVE WEBGL",
        description: "Engineered with Three.js shaders replicating natural Burma teak wood grain and dynamic light refraction. Buyers can inspect joinery details, swap upholstery fabrics, and preview custom dimensions in real time.",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop",
        highlights: ["60fps WebGL Engine", "Real-Time Teak Shaders", "Instant Price Quoting"],
      },
      {
        title: "Sub-300ms Filtered Catalog Navigation",
        category: "PERFORMANCE SSR",
        description: "Built on Next.js App Router and edge caching, the product catalog sorts through 4,500+ SKU variants with zero cumulative layout shift and instant state updates across mobile and desktop devices.",
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
        highlights: ["Sub-300ms Search", "0 Cumulative Layout Shift", "Automated Inventory Sync"],
      },
    ],
    deliverables: [
      "Interactive 3D WebGL Configurator",
      "Next.js 15 SSR Catalog Architecture",
      "One-Page Accordion Checkout with EMI",
      "Showroom ERP Two-Way Stock Synchronization",
      "Mobile-First Touch Responsive PWA",
    ],
    liveUrl: "https://kraftwoods.com",
    techStack: ["nextjs", "threejs", "shopify", "tailwind", "stripe"],
    deliveryDays: "16 Days",
    sprints: 3,
    description: {
      lead: "Transformed an artisan furniture brand into a high-conversion digital flagship,",
      highlight: "lifting digital checkout conversions by +185%",
      tail: "with interactive 3D product visualizers, instant wood customizers, and sub-second catalog loads.",
    },
    metrics: {
      label: "Online Conversion Lift",
      value: "+185%",
      progress: 96,
      sublabel: "Across 4,500 legacy SKUs and real customers",
    },
    milestones: [
      { name: "3D Configurator", detail: "Three.js WebGL Engine", status: "verified" },
      { name: "Sub-300ms Catalog", detail: "Next.js 15 SSR", status: "verified" },
      { name: "Payment Pipeline", detail: "Stripe & Razorpay", status: "verified" },
      { name: "ERP Inventory", detail: "Automated Sync", status: "live" },
    ],
    technologies: [
      { name: "Next.js 15", icon: Globe, color: "text-slate-900", bgLight: "bg-slate-100", detail: "Modern App Router & Turbopack" },
      { name: "Three.js", icon: Cpu, color: "text-emerald-600", bgLight: "bg-emerald-50", detail: "Interactive 3D Furniture Models" },
      { name: "Tailwind CSS", icon: Code2, color: "text-cyan-600", bgLight: "bg-cyan-50", detail: "Luxury Editorial Typography" },
      { name: "Stripe API", icon: CreditCard, color: "text-indigo-600", bgLight: "bg-indigo-50", detail: "Global Multi-Currency Checkout" },
      { name: "PostgreSQL", icon: Database, color: "text-blue-600", bgLight: "bg-blue-50", detail: "Relational Product Catalog" },
    ],
    processPhases: [
      {
        phase: "Phase 01",
        days: "Days 1–4",
        title: "Luxury Brand Direction & 3D Asset Pipeline",
        description: "Formulated an editorial luxury visual identity and optimized 3D glTF models down to 1.8MB for instant web rendering.",
        deliverables: [
          "Bespoke luxury design system with dark/light editorial aesthetics",
          "WebGL material shaders replicating natural Burma teak wood grain",
          "Catalog taxonomy modeling for custom dimension requests",
        ],
      },
      {
        phase: "Phase 02",
        days: "Days 5–9",
        title: "Interactive 3D Configurator & Catalog SSR",
        description: "Engineered 60fps 3D customizer allowing buyers to swap wood finishes, upholstery fabrics, and preview custom dimensions in real time.",
        deliverables: [
          "60fps interactive 3D rotation with realistic specular reflections",
          "Dynamic price recalculation based on selected dimensions and wood grade",
          "Sub-300ms server-side rendered category filtering with instant search",
        ],
      },
      {
        phase: "Phase 03",
        days: "Days 10–13",
        title: "Checkout Funnel Optimization & Multi-Gateway Payouts",
        description: "Engineered frictionless one-page checkout integrating Razorpay and Stripe with instant credit card EMI calculators.",
        deliverables: [
          "One-page accordion checkout reducing cart abandonment by 42%",
          "Automated PIN-code delivery feasibility checker with courier API",
          "Automated tracking notifications via WhatsApp & Email",
        ],
      },
      {
        phase: "Phase 04",
        days: "Days 14–16",
        title: "Lighthouse Optimization & Production Launch",
        description: "Achieved a 99/100 Mobile Lighthouse Performance score with edge image generation and smart asset prefetching.",
        deliverables: [
          "99/100 Core Web Vitals across all mobile product pages",
          "Seamless migration of 4,500 legacy SKUs and customer records",
          "Production launch resulting in 185% conversion increase",
        ],
      },
    ],
    highlights: {
      speedScore: "99/100",
      loadTime: "280ms",
      uptime: "99.99%",
    },
    accentColor: "#00D6A0",
    clientQuote: {
      text: "Grandeur Net transformed our traditional woodcraft business into an international digital powerhouse. The 3D customizer alone increased our average order value by 45%.",
      author: "Rajesh Malhotra",
      role: "Managing Director, Kraftwood India",
    },
  },
  {
    id: "meridian-health",
    title: "Meridian Health Clinical Portal",
    client: "Meridian Health",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=900&auto=format&fit=crop",
    category: "web-app",
    categoryLabel: "Web Applications",
    shortDescription: "Telehealth clinical operations platform providing real-time patient triage, encrypted medical records, and physician scheduling.",
    projectType: "Clinical Healthcare Portal & Telemedicine SaaS",
    overview: "Meridian Health is a mission-critical clinical operations and pathology platform connecting laboratory hardware directly to patients and physicians. It automates report parsing, generates encrypted PDF documents on edge workers, and delivers instant SMS notifications while maintaining complete HIPAA compliance.",
    estimatedCost: "₹4,20,000 (Estimated Project Value)",
    duration: "19 Days",
    features: [
      {
        title: "Automated Laboratory Analyzer Ingestion",
        description: "Sub-second HL7/ASTM daemon parsing laboratory blood and pathology analyzer streams directly into secure medical records.",
      },
      {
        title: "Edge Cryptographic PDF Report Generator",
        description: "Watermarked, tamper-evident lab diagnostics compiled on edge workers in under 350ms with verification QR signatures.",
      },
      {
        title: "AES-256 Encrypted Patient Records Vault",
        description: "HIPAA-grade storage architecture with fine-grained access control and comprehensive doctor audit trails.",
      },
      {
        title: "One-Click Tokenized SMS Report Delivery",
        description: "Expiring single-use secure links sent to patient devices, eliminating paper reports and manual pickup delays.",
      },
      {
        title: "WebRTC Telemedicine Video Room",
        description: "Zero-install peer-to-peer clinical consultation rooms with digital prescription drafting and real-time waiting lists.",
      },
    ],
    processSteps: DEFAULT_PROCESS_STEPS,
    gallery: [
      {
        id: "mh-1",
        title: "Physician Clinical Workstation",
        subtitle: "Real-time doctor triage console with diagnostic alert flags and patient history timeline",
        image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=1200&auto=format&fit=crop",
        tag: "PHYSICIAN PORTAL",
      },
      {
        id: "mh-2",
        title: "Automated Laboratory Ingest Feed",
        subtitle: "Sub-second HL7 and ASTM packet stream from automated pathology blood analyzers",
        image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1200&auto=format&fit=crop",
        tag: "ANALYZER TELEMETRY",
      },
      {
        id: "mh-3",
        title: "Encrypted Patient Health Vault",
        subtitle: "AES-256 encrypted digital health records with immutable doctor audit logging",
        image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop",
        tag: "PATIENT RECORDS",
      },
      {
        id: "mh-4",
        title: "Edge Cryptographic PDF Report Engine",
        subtitle: "350ms watermarked diagnostics generation with cryptographic QR verification signatures",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop",
        tag: "VERIFIED REPORTS",
      },
      {
        id: "mh-5",
        title: "WebRTC Telemedicine Video Room",
        subtitle: "Zero-install peer-to-peer virtual examination room with digital Rx prescription generation",
        image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=1200&auto=format&fit=crop",
        tag: "TELEMEDICINE",
      },
    ],
    visualShowcases: [
      {
        title: "Automated Pathology Instrument Ingestion",
        category: "HEALTHCARE IOT",
        description: "Directly ingests raw HL7 and ASTM protocol streams from regional laboratory hematology analyzers into an encrypted cloud pipeline, completely eliminating manual transcription delays and human error.",
        image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1200&auto=format&fit=crop",
        highlights: ["Zero Manual Data Entry", "350ms Report Generation", "100% HIPAA Compliance"],
      },
      {
        title: "Tokenized One-Click Patient Delivery",
        category: "USER EXPERIENCE",
        description: "Patients receive instant SMS notification links backed by expiring cryptographic tokens, allowing immediate mobile access to watermarked test results without requiring complex login friction.",
        image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop",
        highlights: ["Tokenized SMS Links", "One-Click Mobile View", "Watermarked PDF Downloads"],
      },
    ],
    deliverables: [
      "HIPAA-Compliant Patient Portal",
      "Edge Cryptographic PDF Report Engine",
      "Automated HL7/ASTM Protocol Ingest Service",
      "WebRTC Telehealth Consultation Rooms",
      "Doctor Scheduling & Triage Queue System",
    ],
    liveUrl: "https://meridianhealth.example.com",
    techStack: ["react", "nextjs", "typescript", "postgresql", "aws"],
    deliveryDays: "19 Days",
    sprints: 4,
    description: {
      lead: "Engineered a mission-critical medical portal for regional pathology labs,",
      highlight: "slashing patient test turnaround time by 65%",
      tail: "with sub-second lab report generation, automated SMS alerts, and encrypted doctor telemedicine consultations.",
    },
    metrics: {
      label: "Patient Wait Time Reduction",
      value: "-65% Turnaround",
      progress: 85,
      sublabel: "Sub-second lab report generation & SMS alerts",
    },
    milestones: [
      { name: "Report Engine", detail: "Edge PDF Generator", status: "verified" },
      { name: "Encrypted Vault", detail: "AWS S3 KMS Encr.", status: "verified" },
      { name: "SMS Alert Hub", detail: "Sub-Second Webhooks", status: "verified" },
      { name: "HIPAA Security", detail: "End-to-End Audit", status: "live" },
    ],
    technologies: [
      { name: "TypeScript", icon: Code2, color: "text-blue-600", bgLight: "bg-blue-50", detail: "100% Strict Type Guarantees" },
      { name: "Next.js Edge", icon: Globe, color: "text-slate-900", bgLight: "bg-slate-100", detail: "Zero Cold Starts Worldwide" },
      { name: "AWS S3 Vault", icon: Server, color: "text-amber-600", bgLight: "bg-amber-50", detail: "KMS Encrypted Medical Storage" },
      { name: "PostgreSQL", icon: Database, color: "text-cyan-600", bgLight: "bg-cyan-50", detail: "HIPAA-Conscious Audit Vault" },
      { name: "Tailwind CSS", icon: Layers, color: "text-emerald-600", bgLight: "bg-emerald-50", detail: "Accessible Medical UI" },
    ],
    processPhases: [
      {
        phase: "Phase 01",
        days: "Days 1–5",
        title: "Medical Compliance & Data Architecture",
        description: "Formulated strict medical data privacy schemas adhering to HIPAA and ISO 27001 healthcare standards.",
        deliverables: [
          "AES-256 field-level encryption for all patient identification records",
          "Immutable diagnostic audit trail recording every doctor report view",
          "Accessible WCAG AAA UI prototype for patients of all age groups",
        ],
      },
      {
        phase: "Phase 02",
        days: "Days 6–11",
        title: "Automated Pathology Instrument Integration",
        description: "Engineered HL7 and ASTM protocol ingestion pipelines connecting laboratory blood analyzers directly to the cloud database.",
        deliverables: [
          "Real-time analyzer ingestion daemon parsing ASTM data packets",
          "Automated flagging of abnormal bio-markers with doctor alert triggers",
          "Microservice generating watermarked pathology reports in 350ms",
        ],
      },
      {
        phase: "Phase 03",
        days: "Days 12–16",
        title: "SMS Alert Delivery & Telemedicine Booking",
        description: "Integrated sub-second transactional SMS gateways and calendar scheduling for one-click doctor video consultations.",
        deliverables: [
          "One-click SMS link with expiring token for instant patient report view",
          "Integrated WebRTC telemedicine video room with zero app downloads",
          "Doctor consultation queue manager with real-time room status",
        ],
      },
      {
        phase: "Phase 04",
        days: "Days 17–19",
        title: "Penetration Testing & Lab Deployment",
        description: "Conducted third-party penetration testing and live parallel cutover across 12 diagnostic collection centers.",
        deliverables: [
          "100% clean HIPAA third-party security audit report",
          "Staff training across 12 regional collection centers",
          "Production launch reducing patient turnaround time by 65%",
        ],
      },
    ],
    highlights: {
      speedScore: "99/100",
      loadTime: "290ms",
      uptime: "99.99%",
    },
    accentColor: "#00D6A0",
    clientQuote: {
      text: "Our pathology network can now deliver automated lab reports to patients' phones within seconds of analyzer completion. Grandeur Net's HIPAA architecture has been rock-solid.",
      author: "Dr. A. K. Nautiyal",
      role: "Director, Meridian Health Systems",
    },
  },
  {
    id: "fleetpilot",
    title: "FleetPilot Logistics & ERP Suite",
    client: "FleetPilot Global",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop",
    category: "saas",
    categoryLabel: "Software & SaaS",
    shortDescription: "Cloud-native ERP and dispatch console tracking real-time route telemetry, fuel expenditure, and autonomous driver billing.",
    projectType: "Enterprise Telematics ERP & Fleet Dispatch Console",
    overview: "FleetPilot is a cloud-native ERP and route dispatch engine managing 2,400+ active commercial transport vehicles across national logistics corridors. We engineered real-time GPS waypoint clustering, automated fuel surcharge reconciliation, and digital proof-of-delivery payout triggers that reduce transport overhead.",
    estimatedCost: "₹5,10,000 (Estimated Project Value)",
    duration: "21 Days",
    features: [
      {
        title: "High-Frequency Route Telemetry Stream",
        description: "Kafka-driven ingestion pipeline handling 10M+ daily GPS coordinates without lag or packet drops.",
      },
      {
        title: "60fps WebGL Fleet Operations Console",
        description: "Smooth pan and zoom across multi-state transit routes with real-time speed, fuel, and tripwire alerts.",
      },
      {
        title: "Autonomous Driver Payout Settlement",
        description: "Digital signature proof-of-delivery triggers automated ACH and bank disbursements with tax reconciliation.",
      },
      {
        title: "Predictive Fuel & Maintenance Alarms",
        description: "Machine intelligence models analyzing engine telemetry to predict component wear and optimal refueling stops.",
      },
      {
        title: "Multi-Hub Containerized Architecture",
        description: "Docker microservices deployed across regional edge nodes providing sub-150ms operational response times.",
      },
    ],
    processSteps: DEFAULT_PROCESS_STEPS,
    gallery: [
      {
        id: "fp-1",
        title: "Fleet Operations Map Console",
        subtitle: "High-density national logistics map tracking active vehicle waypoints and delivery routes",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
        tag: "OPERATIONS MAP",
      },
      {
        id: "fp-2",
        title: "Real-Time Telematics & Fuel Monitor",
        subtitle: "Live telemetry dashboard tracking fuel burn curves, vehicle speed variance, and idle alerts",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
        tag: "ENGINE METRICS",
      },
      {
        id: "fp-3",
        title: "Autonomous Driver Dispatch Console",
        subtitle: "Intelligent freight load assignment and automated electronic consignment note creation",
        image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1200&auto=format&fit=crop",
        tag: "DISPATCH SCHEDULER",
      },
      {
        id: "fp-4",
        title: "Proof-of-Delivery Payout Ledger",
        subtitle: "Instant digital signature verification triggering automated bank payout disbursements",
        image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200&auto=format&fit=crop",
        tag: "BILLING SETTLEMENT",
      },
      {
        id: "fp-5",
        title: "Mobile Driver Companion PWA",
        subtitle: "Offline-first driver app providing GPS turn-by-turn guidance and geofenced barcode scans",
        image: "https://images.unsplash.com/photo-1618042164219-62c820f10723?q=80&w=1200&auto=format&fit=crop",
        tag: "DRIVER COMPANION",
      },
    ],
    visualShowcases: [
      {
        title: "High-Frequency Route Telemetry Stream",
        category: "EVENT STREAMING",
        description: "Built on Apache Kafka and TimescaleDB, FleetPilot ingests over 10 million GPS data points daily. The system calculates route anomalies, predicts refueling requirements, and notifies dispatchers before delays occur.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
        highlights: ["10M+ Daily Coordinates", "Sub-150ms Spatial Queries", "Real-Time Geofence Alarms"],
      },
      {
        title: "Autonomous Carrier Billing & Ledger",
        category: "ENTERPRISE ERP",
        description: "Proof-of-delivery signatures gathered on the driver mobile app trigger automated invoice reconciliation and multi-carrier payment settlements, reducing administrative dispatch overhead by 34%.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
        highlights: ["Instant ePOD Settlement", "Automated Tax Calculation", "Zero Reconciliation Delays"],
      },
    ],
    deliverables: [
      "Real-Time GPS Fleet Tracking Console",
      "Kafka High-Frequency Event Ingestion Pipeline",
      "TimescaleDB Spatial Analytics Database",
      "Driver Mobile Manifest PWA",
      "Automated Carrier Settlement & Invoicing System",
    ],
    liveUrl: "https://fleetpilot.example.com",
    techStack: ["react", "nodejs", "typescript", "postgresql", "docker"],
    deliveryDays: "21 Days",
    sprints: 4,
    description: {
      lead: "Constructed an enterprise-grade ERP and freight orchestration platform,",
      highlight: "cutting idle fuel and route dispatch overhead by 34%",
      tail: "through predictive GPS waypoint clustering, multi-carrier invoice settlement, and real-time fleet telematics.",
    },
    metrics: {
      label: "Dispatch Overhead Reduction",
      value: "34% Cut",
      progress: 94,
      sublabel: "Across 2,400 active commercial transport vehicles",
    },
    milestones: [
      { name: "Live Route Ingest", detail: "Kafka Event Stream", status: "verified" },
      { name: "Consignment Ledger", detail: "PostgreSQL & TimescaleDB", status: "verified" },
      { name: "Autonomous Billing", detail: "Stripe & ACH Wire", status: "verified" },
      { name: "Edge Dispatch", detail: "Docker Microservices", status: "live" },
    ],
    technologies: [
      { name: "React 18", icon: Globe, color: "text-cyan-600", bgLight: "bg-cyan-50", detail: "High-Density Fleet Operations UI" },
      { name: "Node.js", icon: Terminal, color: "text-emerald-600", bgLight: "bg-emerald-50", detail: "Event-Driven Message Bus" },
      { name: "PostgreSQL", icon: Database, color: "text-blue-600", bgLight: "bg-blue-50", detail: "High-Volume Spatial Telemetry" },
      { name: "Docker", icon: Server, color: "text-sky-600", bgLight: "bg-sky-50", detail: "Containerized Edge Deployments" },
      { name: "TypeScript", icon: Code2, color: "text-indigo-600", bgLight: "bg-indigo-50", detail: "Strict Contract Enforcement" },
    ],
    processPhases: [
      {
        phase: "Phase 01",
        days: "Days 1–5",
        title: "Enterprise Fleet Telematics Modeling",
        description: "Mapped multi-stop route optimization models, waypoint clustering, and fuel consumption formulas.",
        deliverables: [
          "PostgreSQL time-series schema storing 10M+ GPS pings daily",
          "Event-driven Kafka message stream architecture",
          "Automated fuel surcharge compliance calculator",
        ],
      },
      {
        phase: "Phase 02",
        days: "Days 6–12",
        title: "Real-Time Map & Operations Console",
        description: "Built WebGL-accelerated map view rendering hundreds of active vehicles without browser stutter.",
        deliverables: [
          "Smooth 60fps pan/zoom across multi-city logistics networks",
          "Instant route anomaly alerts and driver geofence tripwires",
          "Consolidated vehicle health diagnostics monitor",
        ],
      },
      {
        phase: "Phase 03",
        days: "Days 13–17",
        title: "Driver Invoicing & Freight Settlement",
        description: "Automated billing and driver payments based on digital proof-of-delivery signatures.",
        deliverables: [
          "Automated invoice generation with integrated tax reconciliation",
          "Multi-currency banking wire disbursements",
          "Consolidated carrier expense analytics dashboard",
        ],
      },
      {
        phase: "Phase 04",
        days: "Days 18–21",
        title: "Docker Orchestration & Multi-Tenant Cutover",
        description: "Rolled out containerized microservices with zero downtime across 8 national transport hubs.",
        deliverables: [
          "Kubernetes-ready Docker container clusters",
          "Sub-150ms P99 operational telemetry queries",
          "Zero-downtime cutover across 2,400 active transport units",
        ],
      },
    ],
    highlights: {
      speedScore: "99/100",
      loadTime: "260ms",
      uptime: "99.98%",
    },
    accentColor: "#00D6A0",
  },
  {
    id: "gt-travels",
    title: "GT Travels Reservation System",
    client: "GT Travels Mobility",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=900&auto=format&fit=crop",
    category: "web-app",
    categoryLabel: "Web Applications",
    shortDescription: "High-throughput transit booking engine with interactive 60fps seat selectors, automated GST billing, and live GPS tracking.",
    projectType: "High-Throughput Transit Booking Engine",
    overview: "GT Travels is a high-concurrency passenger reservation system handling 10,000+ daily bookings across inter-city luxury bus routes. We built real-time interactive seat floorplans, ephemeral Redis seat-hold state machines, automated GST invoice compliance, and driver telemetry maps that eliminate overbooking completely.",
    estimatedCost: "₹3,80,000 (Estimated Project Value)",
    duration: "18 Days",
    features: [
      {
        title: "Interactive 60fps Bus Floorplan Selector",
        description: "Touch-optimized SVG bus seat layout showing real-time occupancy, sleeper berths, and seat categories with instant feedback.",
      },
      {
        title: "Distributed Ephemeral Seat-Hold Locks",
        description: "Redis TTL keys with row-level database locks protecting selected seats during the 5-minute checkout window.",
      },
      {
        title: "Automated GST Invoicing & WhatsApp Boarding Passes",
        description: "Instant tax-compliant receipt generation and automated ticket delivery with scannable QR codes directly to passenger WhatsApp.",
      },
      {
        title: "Live GPS Bus Tracking & ETA Engine",
        description: "Vehicle coordinates ingested every 5 seconds to provide passengers with realistic stop arrival estimates.",
      },
      {
        title: "Idempotent Razorpay Webhook Gateway",
        description: "Resilient payment webhook architecture ensuring zero duplicate debits or unconfirmed bookings during network drops.",
      },
    ],
    processSteps: DEFAULT_PROCESS_STEPS,
    gallery: [
      {
        id: "gt-1",
        title: "Interactive Bus Floorplan Selector",
        subtitle: "60fps SVG bus seating layout with real-time seat lock state updates via Redis",
        image: "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=1200&auto=format&fit=crop",
        tag: "SEAT SELECTOR",
      },
      {
        id: "gt-2",
        title: "Inter-City Schedule & Route Search",
        subtitle: "Sub-second departure search across 65+ inter-city corridors with dynamic pricing filters",
        image: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?q=80&w=1200&auto=format&fit=crop",
        tag: "ROUTE DISCOVERY",
      },
      {
        id: "gt-3",
        title: "Frictionless Checkout & GST Invoicing",
        subtitle: "Instant UPI payment callbacks and automated corporate tax invoices with scannable QR",
        image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=1200&auto=format&fit=crop",
        tag: "CHECKOUT & TAX",
      },
      {
        id: "gt-4",
        title: "Live GPS Bus Tracking Map",
        subtitle: "Vehicle coordinates ingested every 5 seconds providing passengers with accurate stop arrival times",
        image: "https://images.unsplash.com/photo-1520105072000-f44fc0832105?q=80&w=1200&auto=format&fit=crop",
        tag: "PASSENGER GPS",
      },
      {
        id: "gt-5",
        title: "Automated WhatsApp Boarding Pass",
        subtitle: "One-click ticket QR code delivery directly to passenger WhatsApp numbers upon booking",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
        tag: "MOBILE PASS",
      },
    ],
    visualShowcases: [
      {
        title: "Interactive 60fps Bus Floorplan Selector",
        category: "CONCURRENT BOOKING",
        description: "Engineered using reactive SVGs and Redis TTL ephemeral locks, allowing thousands of concurrent festival travelers to reserve specific sleeper berths without double-booking or transaction deadlocks.",
        image: "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=1200&auto=format&fit=crop",
        highlights: ["Redis Ephemeral Locks", "Zero Double Bookings", "Instant Visual State Updates"],
      },
      {
        title: "Live Passenger ETA & Boarding Engine",
        category: "TRANSIT TELEMETRY",
        description: "Vehicle coordinates update every 5 seconds to provide passengers with realistic stop arrival estimates and automated WhatsApp boarding pass alerts with verified cryptographic QR validation.",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop",
        highlights: ["5-Second GPS Refresh", "WhatsApp QR Pass Dispatch", "Dynamic Traffic Recalculation"],
      },
    ],
    deliverables: [
      "High-Concurrency Seat Booking Engine",
      "Redis Distributed Lock State Machine",
      "Automated GST Invoicing & WhatsApp Bot",
      "Live Passenger Bus Tracking Portal",
      "Admin Fleet Scheduling & Manifest Dashboard",
    ],
    liveUrl: "https://gttravels.example.com",
    techStack: ["nextjs", "typescript", "redis", "postgresql", "tailwind"],
    deliveryDays: "18 Days",
    sprints: 3,
    description: {
      lead: "Engineered a high-throughput dispatch engine for a multi-city luxury fleet,",
      highlight: "handling 10,000+ live seat reservations daily",
      tail: "with automated GST invoicing and real-time GPS driver telemetry.",
    },
    metrics: {
      label: "System Uptime SLA",
      value: "99.98%",
      progress: 99,
      sublabel: "Verified across 4 microservices",
    },
    milestones: [
      { name: "Fleet Engine", detail: "Fastify Event Loop", status: "verified" },
      { name: "Live Telemetry", detail: "Upstash Redis Cache", status: "verified" },
      { name: "Instant Invoicing", detail: "Server Actions", status: "verified" },
      { name: "PCI Checkout", detail: "Razorpay Webhooks", status: "live" },
    ],
    technologies: [
      { name: "Next.js 14", icon: Globe, color: "text-slate-900", bgLight: "bg-slate-100", detail: "Server Actions & SSR" },
      { name: "Upstash Redis", icon: Server, color: "text-rose-600", bgLight: "bg-rose-50", detail: "Sub-5ms Latency Cache" },
      { name: "Fastify Node", icon: Terminal, color: "text-emerald-600", bgLight: "bg-emerald-50", detail: "Event Loop Microservices" },
      { name: "Razorpay", icon: CreditCard, color: "text-blue-600", bgLight: "bg-blue-50", detail: "Instant PCI Payments" },
      { name: "PostgreSQL", icon: Database, color: "text-indigo-600", bgLight: "bg-indigo-50", detail: "Relational Reservation Store" },
    ],
    processPhases: [
      {
        phase: "Phase 01",
        days: "Days 1–4",
        title: "Fleet Data Modeling & Concurrency Architecture",
        description: "Mapped multi-city route tables, seat inventory locks, and distributed state machines to prevent overbooking.",
        deliverables: [
          "PostgreSQL schema with row-level locks for concurrent seat reservations",
          "Fastify microservice architecture handling 5,000 requests/second",
          "Automated GST invoice generation compliance engine",
        ],
      },
      {
        phase: "Phase 02",
        days: "Days 5–9",
        title: "High-Frequency Interactive Seat Selector UI",
        description: "Designed 60fps bus floorplan layout with real-time seat status updates via WebSockets and instant seat hold timers.",
        deliverables: [
          "Interactive SVG bus seating layout with real-time color-coded availability",
          "3-minute ephemeral seat hold locks backed by Redis TTL keys",
          "Mobile-first responsive booking journey optimized for 4G networks",
        ],
      },
      {
        phase: "Phase 03",
        days: "Days 10–14",
        title: "Payment Gateway Integration & Driver Telemetry",
        description: "Integrated Razorpay webhook callbacks with automated reconciliation and real-time GPS tracking for dispatch managers.",
        deliverables: [
          "Idempotent payment webhook pipeline with automatic failure retries",
          "Driver location ingest daemon updating vehicle coordinates every 5 seconds",
          "Automated WhatsApp & SMS ticket confirmations with PDF boarding passes",
        ],
      },
      {
        phase: "Phase 04",
        days: "Days 15–18",
        title: "Load Testing, Edge CDN & Production Cutover",
        description: "Executed distributed stress tests simulating 25,000 concurrent travelers and deployed multi-region Cloudflare caching.",
        deliverables: [
          "Stress-tested to 25k concurrent virtual users with zero data loss",
          "Cloudflare edge caching reducing P99 latency to 110ms",
          "Zero-downtime production cutover without interrupting active routes",
        ],
      },
    ],
    highlights: {
      speedScore: "99/100",
      loadTime: "290ms",
      uptime: "99.98%",
    },
    accentColor: "#00D6A0",
    clientQuote: {
      text: "Grandeur Net delivered our high-throughput booking engine in 18 days. We handled 50,000+ daily searches during peak festival season without a single glitch.",
      author: "Gaurav Thapa",
      role: "COO, GT Travels Mobility",
    },
  },
  {
    id: "northwind-realty",
    title: "Northwind Luxury Estates",
    client: "Northwind Realty Group",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900&auto=format&fit=crop",
    category: "proptech",
    categoryLabel: "PropTech",
    shortDescription: "Geospatial property discovery portal with 360° virtual tours, interactive master plans, and automated CRM lead routing.",
    projectType: "Geospatial Real Estate Discovery & 360° Tours",
    overview: "Northwind Luxury Estates is an interactive geospatial real estate portal engineered for premier residential and commercial developments. Featuring Mapbox GL satellite vector maps, 360° panoramic virtual walkthroughs, and automated instant lead distribution to sales executives via WhatsApp Cloud API.",
    estimatedCost: "₹2,90,000 (Estimated Project Value)",
    duration: "14 Days",
    features: [
      {
        title: "Mapbox GL Geospatial Vector Clustering",
        description: "High-density satellite map clustering with live price pins, boundary polygons, and neighborhood infrastructure radiuses.",
      },
      {
        title: "360° Panoramic Virtual Tours",
        description: "WebGL panoramic viewer enabling prospective buyers to navigate estate interiors and scenic mountain views on any device.",
      },
      {
        title: "15-Second Automated WhatsApp CRM Dispatch",
        description: "Instant lead capture that automatically assigns verified buyer contacts to sales consultants with custom brochures.",
      },
      {
        title: "Interactive Mortgage & EMI Amortization",
        description: "Flexible financing calculators providing down payment, tenure adjustments, and downloadable repayment schedules.",
      },
      {
        title: "Verified RERA Document Vault",
        description: "Gated download center providing verified government compliance certificates and architectural floorplans.",
      },
    ],
    processSteps: DEFAULT_PROCESS_STEPS,
    gallery: [
      {
        id: "nr-1",
        title: "Geospatial Vector Map Discovery",
        subtitle: "Interactive Mapbox GL satellite cluster map with live price tags and zoning polygons",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
        tag: "GEOSPATIAL MAP",
      },
      {
        id: "nr-2",
        title: "360° Spatial Interior Walkthrough",
        subtitle: "Zero-install WebGL panoramic virtual tour with architectural spatial hot-spots",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
        tag: "360° VIRTUAL TOUR",
      },
      {
        id: "nr-3",
        title: "Architectural Floorplan & Specifications",
        subtitle: "Interactive room dimension overlays, carpet area specs and verified RERA document vault",
        image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
        tag: "FLOORPLANS",
      },
      {
        id: "nr-4",
        title: "Interactive EMI & Mortgage Amortization",
        subtitle: "Dynamic down-payment sliders with real-time banking schedule comparison and PDF export",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
        tag: "FINANCING ENGINE",
      },
      {
        id: "nr-5",
        title: "Automated WhatsApp CRM Dispatch",
        subtitle: "Sub-15 second buyer lead distribution assigning prospects directly to verified property specialists",
        image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1200&auto=format&fit=crop",
        tag: "CRM INTEGRATION",
      },
    ],
    visualShowcases: [
      {
        title: "Mapbox GL Satellite Geospatial Clustering",
        category: "GEOSPATIAL ENGINE",
        description: "Custom vector tile styling matching Grandeur Net's dark luxury aesthetic. Prospective buyers can zoom into mountain hillside estates with sub-16ms fluid frame rates and filter by property radius.",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
        highlights: ["Sub-16ms Pan & Zoom", "Topographical Vector Tiles", "Radius Proximity Filtering"],
      },
      {
        title: "360° Immersive WebGL Spatial Tours",
        category: "VIRTUAL TOURS",
        description: "Enables international and out-of-state buyers to inspect villa interiors, master bedrooms, and scenic panoramic terrace views with zero app download friction on any modern smartphone browser.",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
        highlights: ["WebGL 360° Engine", "Zero App Download Needed", "High-Resolution HDR Panoramas"],
      },
    ],
    deliverables: [
      "Mapbox GL Geospatial Property Portal",
      "WebGL 360° Virtual Tour Player",
      "Interactive EMI & Amortization Calculator",
      "Automated WhatsApp Cloud CRM Lead Pipeline",
      "Verified RERA Compliance Document Vault",
    ],
    liveUrl: "https://northwindrealty.example.com",
    techStack: ["react", "nextjs", "supabase", "tailwind", "threejs"],
    deliveryDays: "14 Days",
    sprints: 3,
    description: {
      lead: "Engineered a geospatial property discovery engine for prime estates,",
      highlight: "generating a 3.4x surge in qualified buyer inquiries",
      tail: "featuring interactive satellite maps, 360° virtual tours, and instant WhatsApp CRM sync.",
    },
    metrics: {
      label: "Verified Buyer Leads",
      value: "3.4x Growth",
      progress: 92,
      sublabel: "From geospatial interactive property search",
    },
    milestones: [
      { name: "Geospatial Map", detail: "Mapbox GL Canvas", status: "verified" },
      { name: "360° Virtual Tour", detail: "WebGL Panoramic", status: "verified" },
      { name: "Realtime Sync", detail: "Supabase DB", status: "verified" },
      { name: "Instant CRM", detail: "WhatsApp Cloud API", status: "live" },
    ],
    technologies: [
      { name: "React 18", icon: Globe, color: "text-cyan-600", bgLight: "bg-cyan-50", detail: "Reactive State Engine" },
      { name: "Supabase", icon: Database, color: "text-emerald-600", bgLight: "bg-emerald-50", detail: "Realtime Row-Level Security" },
      { name: "Mapbox GL", icon: Layers, color: "text-amber-600", bgLight: "bg-amber-50", detail: "Satellite Geospatial Clustering" },
      { name: "WhatsApp API", icon: Zap, color: "text-green-600", bgLight: "bg-green-50", detail: "Direct Agent Lead Routing" },
      { name: "Tailwind CSS", icon: Code2, color: "text-blue-600", bgLight: "bg-blue-50", detail: "Sleek Dark/Light UI" },
    ],
    processPhases: [
      {
        phase: "Phase 01",
        days: "Days 1–3",
        title: "Geospatial Data Architecture & UI System",
        description: "Structured Dehradun and Uttarakhand property GIS coordinates, boundary polygons, and residential metadata schemas.",
        deliverables: [
          "Custom vector tile styles matching Grandeur Net luxury design",
          "Property listing data model with verified RERA documentation fields",
          "High-conversion lead capture modals designed for mobile buyers",
        ],
      },
      {
        phase: "Phase 02",
        days: "Days 4–8",
        title: "Interactive Map Clustering & 360° Tours",
        description: "Developed high-fps interactive map clustering with price pins, radius proximity search, and panoramic walkthroughs.",
        deliverables: [
          "Sub-16ms smooth map pan and zoom with 500+ simultaneous listings",
          "Custom WebGL panoramic 360° virtual tour player",
          "Interactive EMI mortgage calculator with instant amortization schedule",
        ],
      },
      {
        phase: "Phase 03",
        days: "Days 9–12",
        title: "Supabase Realtime & Automated WhatsApp CRM",
        description: "Built real-time inquiry distribution engine that instantly notifies the assigned sales executive within 15 seconds.",
        deliverables: [
          "Supabase row-level security ensuring strict lead privacy",
          "Automated WhatsApp webhook routing leads with property brochures",
          "Agent analytics dashboard tracking response times and deal closures",
        ],
      },
      {
        phase: "Phase 04",
        days: "Days 13–14",
        title: "Mobile Polish & Production Deployment",
        description: "Optimized for 4G mobile connections across North India and achieved 100% responsive touch parity.",
        deliverables: [
          "Sub-400ms mobile initial load with progressive asset loading",
          "Full SEO indexing for regional property keywords",
          "Production launch generating 3.4x lead surge in first 30 days",
        ],
      },
    ],
    highlights: {
      speedScore: "98/100",
      loadTime: "340ms",
      uptime: "99.95%",
    },
    accentColor: "#00D6A0",
  },
  {
    id: "apex-cloud",
    title: "Apex AI Workflow & RFP Suite",
    client: "Apex Enterprise",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=900&auto=format&fit=crop",
    category: "ai",
    categoryLabel: "AI & Automation",
    shortDescription: "Autonomous document intelligence platform parsing complex technical RFPs with vector embeddings and multi-agent drafting.",
    projectType: "Autonomous AI Document Intelligence Platform",
    overview: "Apex AI is an autonomous document intelligence and proposal generation platform developed for enterprise IT consulting firms. Powered by FastAPI, pgvector semantic search, and domain-tuned LLM agents, it extracts technical requirements from 100+ page solicitation PDFs and drafts compliant technical answers in minutes.",
    estimatedCost: "₹4,60,000 (Estimated Project Value)",
    duration: "12 Days",
    features: [
      {
        title: "Multi-Modal Solicitation PDF Parsing",
        description: "Intelligent document ingestion pipeline processing complex tables, technical specifications, and legal checklists.",
      },
      {
        title: "pgvector Semantic Architecture",
        description: "Sub-50ms vector similarity matching querying past winning enterprise bids to provide contextually grounded proposal citations.",
      },
      {
        title: "Autonomous Multi-Agent Technical Drafting",
        description: "Collaborative agent loop with dedicated validation agents ensuring 100% compliance with client solicitation matrices.",
      },
      {
        title: "Split-Screen Interactive Proposal Editor",
        description: "Next.js 14 review environment providing synchronized source document citations alongside generated draft chapters.",
      },
      {
        title: "SOC2 Zero-Data-Retention Vault",
        description: "Cryptographic privacy layer guaranteeing sensitive government and corporate proposal data is never used for training.",
      },
    ],
    processSteps: DEFAULT_PROCESS_STEPS,
    gallery: [
      {
        id: "ac-1",
        title: "Autonomous RFP Ingestion Dashboard",
        subtitle: "Multi-modal extraction pipeline parsing complex solicitations, tables, and compliance requirements",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
        tag: "DOC INGESTION",
      },
      {
        id: "ac-2",
        title: "pgvector Semantic Query Matcher",
        subtitle: "Sub-50ms vector similarity matching querying past winning enterprise bids for grounded citations",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
        tag: "VECTOR RETRIEVAL",
      },
      {
        id: "ac-3",
        title: "Split-Screen Technical Proposal Editor",
        subtitle: "Real-time proposal review environment pairing source document citations with generated draft chapters",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
        tag: "AI EDITOR",
      },
      {
        id: "ac-4",
        title: "Automated Compliance Cross-Checker",
        subtitle: "Automated agent matrix verifying mandatory technical certifications and proposal criteria",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
        tag: "COMPLIANCE AUDIT",
      },
      {
        id: "ac-5",
        title: "SOC2 Zero-Data-Retention Vault",
        subtitle: "Enterprise confidentiality security layer ensuring proprietary bid data is never leaked or retained",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop",
        tag: "SECURITY VAULT",
      },
    ],
    visualShowcases: [
      {
        title: "Autonomous Multi-Agent Technical Drafting",
        category: "LLM ORCHESTRATION",
        description: "Specialized AI agents parse complex solicitation clauses, query past winning company proposals via pgvector embeddings, and draft compliant technical chapters with inline citations and zero hallucinations.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
        highlights: ["40+ Hours Saved / Week", "Sub-50ms Vector Retrieval", "Inline Document Citations"],
      },
      {
        title: "Enterprise Split-Screen Proposal Review",
        category: "COLLABORATIVE WORKSPACE",
        description: "Sales engineers review source document clauses and AI-generated proposal chapters side-by-side with real-time export to branded Word and PDF documents in under 30 seconds.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
        highlights: ["Split-Screen Synchronized View", "One-Click Word/PDF Export", "Strict Zero Data Retention"],
      },
    ],
    deliverables: [
      "FastAPI Document Parsing Engine",
      "pgvector Semantic Search Architecture",
      "Multi-Agent Proposal Drafting Pipeline",
      "Next.js Split-Screen Proposal Editor",
      "SOC2 Enterprise Role-Based Access Vault",
    ],
    liveUrl: "https://apexai.example.com",
    techStack: ["python", "nextjs", "typescript", "postgresql", "docker"],
    deliveryDays: "12 Days",
    sprints: 2,
    description: {
      lead: "Engineered an autonomous AI proposal generation engine for IT enterprises,",
      highlight: "reclaiming 40+ engineering hours weekly",
      tail: "with bespoke LLM fine-tuning, multi-page RFP document parsing, and automated vector search.",
    },
    metrics: {
      label: "Operational Time Saved",
      value: "40+ Hrs/Wk",
      progress: 98,
      sublabel: "Measured across 12-person sales engineering team",
    },
    milestones: [
      { name: "Vector Pipeline", detail: "pgvector Embedding", status: "verified" },
      { name: "RFP Parser", detail: "Sub-30s Extractor", status: "verified" },
      { name: "AI Draft Engine", detail: "Context-Aware Agent", status: "verified" },
      { name: "SOC2 Compliance", detail: "Zero-Retention Vault", status: "live" },
    ],
    technologies: [
      { name: "FastAPI Python", icon: Terminal, color: "text-emerald-600", bgLight: "bg-emerald-50", detail: "High-Throughput Async Backend" },
      { name: "Next.js 14", icon: Globe, color: "text-slate-900", bgLight: "bg-slate-100", detail: "Real-Time Proposal Editor" },
      { name: "OpenAI Agents", icon: Cpu, color: "text-indigo-600", bgLight: "bg-indigo-50", detail: "Domain-Specific Agent Workflows" },
      { name: "pgvector", icon: Database, color: "text-blue-600", bgLight: "bg-blue-50", detail: "Semantic Document Search" },
      { name: "Tailwind CSS", icon: Code2, color: "text-cyan-600", bgLight: "bg-cyan-50", detail: "High-Tech Dark Minimalist UI" },
    ],
    processPhases: [
      {
        phase: "Phase 01",
        days: "Days 1–3",
        title: "Enterprise RFP Parsing & Vector Ingestion",
        description: "Built multi-modal document extraction pipeline processing 100+ page technical solicitations, tables, and compliance matrices.",
        deliverables: [
          "Document ingestion pipeline parsing PDFs, Word documents, and spreadsheets",
          "Chunking strategy preserving hierarchical technical requirement context",
          "pgvector semantic search achieving sub-50ms query latencies",
        ],
      },
      {
        phase: "Phase 02",
        days: "Days 4–7",
        title: "Domain-Tuned Autonomous Drafting Agents",
        description: "Configured multi-agent workflow where specialized agents extract requirements, search past bids, and draft technical answers.",
        deliverables: [
          "Multi-agent architecture with automated validation and hallucination checks",
          "Custom tone-of-voice alignment matching client brand guidelines",
          "Compliance matrix cross-checker verifying every mandatory RFP requirement",
        ],
      },
      {
        phase: "Phase 03",
        days: "Days 8–10",
        title: "Enterprise Proposal Generator & Live Editor",
        description: "Built interactive web editor allowing sales executives to review extracted criteria, adjust pricing, and generate branded decks.",
        deliverables: [
          "Interactive Next.js 14 client portal with split-screen PDF preview",
          "Automated generation of branded corporate proposal documents",
          "Export to PDF and Word format in under 30 seconds",
        ],
      },
      {
        phase: "Phase 04",
        days: "Days 11–12",
        title: "Security Hardening & Production Rollout",
        description: "Implemented zero-data-retention compliance policies, end-to-end payload encryption, and enterprise SSO integration.",
        deliverables: [
          "SOC2-ready zero-data-retention AI processing architecture",
          "Team role-based access control with granular project permissions",
          "Immediate deployment saving 40 engineering hours per week",
        ],
      },
    ],
    highlights: {
      speedScore: "99/100",
      loadTime: "240ms",
      uptime: "99.99%",
    },
    accentColor: "#00D6A0",
  },
  {
    id: "kanvas-studio",
    title: "Kanvas Collaborative Studio",
    client: "Kanvas Creative Labs",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=900&auto=format&fit=crop",
    category: "saas",
    categoryLabel: "Software & SaaS",
    shortDescription: "Real-time vector design workspace with infinite multiplayer canvases, automated asset versioning, and token export.",
    projectType: "Real-Time Collaborative WebGL Design Workspace",
    overview: "Kanvas Studio is a GPU-accelerated multiplayer vector canvas engineered for creative agencies and product designers. Powered by WebGL shaders and Yjs CRDT synchronization, it supports sub-16ms synchronous multi-user editing with automatic design token code generation for Tailwind CSS.",
    estimatedCost: "₹4,90,000 (Estimated Project Value)",
    duration: "17 Days",
    features: [
      {
        title: "Conflict-Free Replicated State Engine (CRDT)",
        description: "Yjs synchronization across WebSockets guaranteeing simultaneous multi-user canvas updates without conflict locks.",
      },
      {
        title: "Hardware-Accelerated WebGL Vector Canvas",
        description: "Smooth 120fps GPU rendering loop handling thousands of complex vector paths, gradient fills, and boolean masks.",
      },
      {
        title: "Live Multiplayer Presence & Cursors",
        description: "Sub-20ms remote pointer positions, selection halos, and live user viewports rendered with zero frame stutter.",
      },
      {
        title: "Automated Tailwind & CSS Token Exporter",
        description: "One-click compilation transforming canvas typography scales and color themes into production-ready Tailwind configs.",
      },
      {
        title: "Local-First Offline State Persistence",
        description: "IndexedDB caching enabling seamless offline editing and graceful background synchronization on reconnect.",
      },
    ],
    processSteps: DEFAULT_PROCESS_STEPS,
    gallery: [
      {
        id: "ks-1",
        title: "Hardware-Accelerated Vector Canvas",
        subtitle: "120fps WebGL GPU rendering engine manipulating thousands of bezier curves and boolean paths",
        image: "https://images.unsplash.com/photo-1581291518655-9523c932edcf?q=80&w=1200&auto=format&fit=crop",
        tag: "WEBGL CANVAS",
      },
      {
        id: "ks-2",
        title: "Live Multiplayer Presence & Cursors",
        subtitle: "Sub-20ms remote pointer positions and live collaborative selection halos powered by Yjs CRDTs",
        image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1200&auto=format&fit=crop",
        tag: "MULTIPLAYER YJS",
      },
      {
        id: "ks-3",
        title: "Automated Tailwind Token Exporter",
        subtitle: "One-click compilation transforming canvas typography scales and palettes into production Tailwind configs",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop",
        tag: "CODE EXPORTER",
      },
      {
        id: "ks-4",
        title: "Reusable Component Symbol Library",
        subtitle: "Design token system with component overrides, nested variants, and auto-layout framing",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
        tag: "ASSET LIBRARY",
      },
      {
        id: "ks-5",
        title: "Local-First Offline Persistence",
        subtitle: "IndexedDB caching enabling uninterrupted offline editing with automatic reconciliation on reconnect",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop",
        tag: "OFFLINE STATE",
      },
    ],
    visualShowcases: [
      {
        title: "Hardware-Accelerated WebGL Rendering",
        category: "GPU COMPUTING",
        description: "Engineered a custom WebGL rendering loop capable of manipulating thousands of complex vector paths, boolean operations, and blur filters smoothly at 120fps with zero input lag.",
        image: "https://images.unsplash.com/photo-1581291518655-9523c932edcf?q=80&w=1200&auto=format&fit=crop",
        highlights: ["120fps Render Loop", "Sub-16ms Paint Latency", "GPU Shader Acceleration"],
      },
      {
        title: "Conflict-Free Replicated State (CRDT)",
        category: "REAL-TIME SYNC",
        description: "Powered by Yjs over secure WebSockets, multiple designers can edit identical canvas nodes concurrently without lock contention or lost edits across international network connections.",
        image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1200&auto=format&fit=crop",
        highlights: ["Zero Lock Contention", "Sub-20ms Presence Sync", "Automatic Offline Reconnection"],
      },
    ],
    deliverables: [
      "GPU-Accelerated Vector WebGL Canvas",
      "Yjs CRDT Real-Time Collaboration Engine",
      "Automated Tailwind CSS Token Compiler",
      "Multiplayer Presence & Cursor Protocol",
      "Local-First IndexedDB Offline Cache",
    ],
    liveUrl: "https://kanvasstudio.example.com",
    techStack: ["react", "typescript", "graphql", "threejs", "tailwind"],
    deliveryDays: "17 Days",
    sprints: 3,
    description: {
      lead: "Developed a WebGL-powered multiplayer design workspace for global brand agencies,",
      highlight: "enabling sub-16ms synchronous multi-user canvas collaboration",
      tail: "with real-time presence indicators, instant SVG vector path simplification, and automated CSS token generators.",
    },
    metrics: {
      label: "Canvas Render Latency",
      value: "Sub-16ms",
      progress: 97,
      sublabel: "At 120fps across 1,000 simultaneous canvas objects",
    },
    milestones: [
      { name: "Multiplayer Engine", detail: "Yjs CRDT Realtime", status: "verified" },
      { name: "Vector Canvas", detail: "WebGL Shader Pipeline", status: "verified" },
      { name: "Token Pipeline", detail: "Tailwind & Figma Token Exporter", status: "verified" },
      { name: "Cloud Sync", detail: "Edge KV Object Store", status: "live" },
    ],
    technologies: [
      { name: "React 18", icon: Globe, color: "text-cyan-600", bgLight: "bg-cyan-50", detail: "Reactive View State Engine" },
      { name: "TypeScript", icon: Code2, color: "text-blue-600", bgLight: "bg-blue-50", detail: "Strict Data Layer Typings" },
      { name: "Three.js", icon: Cpu, color: "text-emerald-600", bgLight: "bg-emerald-50", detail: "Hardware-Accelerated 2D/3D Rendering" },
      { name: "GraphQL", icon: Layers, color: "text-pink-600", bgLight: "bg-pink-50", detail: "Selective Node Property Queries" },
      { name: "Tailwind CSS", icon: Code2, color: "text-teal-600", bgLight: "bg-teal-50", detail: "Pixel-Perfect Dark UI" },
    ],
    processPhases: [
      {
        phase: "Phase 01",
        days: "Days 1–4",
        title: "CRDT Collaborative State & Memory Topology",
        description: "Built conflict-free replicated data type (CRDT) engine ensuring real-time multi-user editing without race conditions.",
        deliverables: [
          "Yjs state synchronization over secure WebSockets",
          "Low-overhead canvas memory model supporting 10,000+ vector paths",
          "Optimistic client-side updates with instant undo/redo stacks",
        ],
      },
      {
        phase: "Phase 02",
        days: "Days 5–9",
        title: "WebGL Canvas Rendering & Transform Tools",
        description: "Engineered GPU-accelerated canvas engine handling complex bezier curves, boolean path operations, and gradient fills.",
        deliverables: [
          "Sub-16ms canvas repaint loop during intensive multi-selection dragging",
          "Real-time cursor indicators showing remote team member positions",
          "Snapping alignment engine with dynamic smart guidelines",
        ],
      },
      {
        phase: "Phase 03",
        days: "Days 10–14",
        title: "Design System Token Exporter",
        description: "Built automated export pipelines translating canvas color palettes, typography styles, and spacing into code.",
        deliverables: [
          "One-click export to Tailwind config, CSS variables, and JSON design tokens",
          "SVG optimizer minimizing DOM payload by 60%",
          "Component code snippet generator supporting React and Vue",
        ],
      },
      {
        phase: "Phase 04",
        days: "Days 15–17",
        title: "Load Testing & Global Deployment",
        description: "Tested synchronized editing under 250 concurrent users per canvas with edge routing.",
        deliverables: [
          "Sub-30ms global WebSocket roundtrips via edge presence clusters",
          "Automatic offline local caching with seamless reconnection sync",
          "Live production launch to 50+ enterprise creative agencies",
        ],
      },
    ],
    highlights: {
      speedScore: "99/100",
      loadTime: "220ms",
      uptime: "99.99%",
    },
    accentColor: "#00D6A0",
  },
  {
    id: "helios-fitness",
    title: "Helios Athletic Ecosystem",
    client: "Helios Performance",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=900&auto=format&fit=crop",
    category: "web-app",
    categoryLabel: "Web Applications",
    shortDescription: "High-performance conditioning platform with biometric sensor synchronization, video coaching, and dynamic workout plans.",
    projectType: "Biometric Conditioning & Fitness Application",
    overview: "Helios is an athletic training application combining real-time Bluetooth heart rate telemetry with personalized progressive overload algorithms and HLS video coaching streams. The platform serves 18,000+ athletes with offline-capable workout tracking and multi-tier Stripe subscription billing.",
    estimatedCost: "₹3,60,000 (Estimated Project Value)",
    duration: "15 Days",
    features: [
      {
        title: "Web Bluetooth Heart-Rate Sensor Sync",
        description: "Zero-latency Bluetooth pairing with smart chest straps and wearable sensors with automatic reconnection logic.",
      },
      {
        title: "Dynamic Progressive Overload Algorithm",
        description: "Calculates daily training volumes and recovery scores based on resting heart rate and historical set intensity.",
      },
      {
        title: "Adaptive Bitrate HLS Video Player",
        description: "Sub-second buffer start times delivering crystal-clear exercise demonstrations on cellular and Wi-Fi networks.",
      },
      {
        title: "Real-Time Supabase Leaderboards",
        description: "Live athlete challenge sync motivating member engagement with social proof and instant ranking updates.",
      },
      {
        title: "Multi-Tier Member Subscription Gateway",
        description: "Integrated Stripe billing with automated recurring memberships, grace periods, and instant Apple Pay support.",
      },
    ],
    processSteps: DEFAULT_PROCESS_STEPS,
    gallery: [
      {
        id: "hf-1",
        title: "Athlete Conditioning Console",
        subtitle: "Real-time biometric telemetry tracking heart rate zones and live training intensity curves",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
        tag: "TRAINING CONSOLE",
      },
      {
        id: "hf-2",
        title: "Bluetooth Low Energy Sensor Pairing",
        subtitle: "Direct Web Bluetooth sync with smart chest straps and wearable sensors with automatic reconnect",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
        tag: "SENSOR STREAM",
      },
      {
        id: "hf-3",
        title: "Adaptive Video Coaching Stream",
        subtitle: "Sub-second HLS video buffer playback delivering form demonstration cues across all mobile devices",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
        tag: "HLS VIDEO PLAYER",
      },
      {
        id: "hf-4",
        title: "Trainer 1-on-1 Coaching Management",
        subtitle: "Biometric compliance review and remote program calibration workspace for head athletic coaches",
        image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop",
        tag: "COACH DASHBOARD",
      },
      {
        id: "hf-5",
        title: "Progressive Overload Analytics",
        subtitle: "Weekly volume tonnage tracking and recovery readiness scoring to prevent overtraining",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
        tag: "METRICS ENGINE",
      },
    ],
    visualShowcases: [
      {
        title: "Web Bluetooth Real-Time Biometric Stream",
        category: "HARDWARE TELEMETRY",
        description: "Connects web browsers directly to Bluetooth Low Energy (BLE) chest straps, streaming live heart rate and target zone pacing with zero latency and automatic connection recovery.",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
        highlights: ["Zero-Latency BLE Sync", "Instant Heart Rate Zones", "Automatic Sensor Recovery"],
      },
      {
        title: "Automated Progressive Overload Engine",
        category: "ALGORITHMIC TRAINING",
        description: "Dynamically calculates weight jumps, sets, and rest intervals based on previous session RPE and biometric heart rate recovery curves to optimize muscle hypertrophy and athletic recovery.",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop",
        highlights: ["Algorithm-Driven Pacing", "Volume Tonnage Analytics", "Offline PWA Workout Mode"],
      },
    ],
    deliverables: [
      "Web Bluetooth Biometric Telemetry Engine",
      "Dynamic Progressive Overload Algorithm",
      "HLS Low-Latency Coaching Video Player",
      "Trainer Management & Client Calibration Console",
      "Stripe Multi-Tier Subscription Pipeline",
    ],
    liveUrl: "https://heliosperformance.example.com",
    techStack: ["react", "typescript", "nodejs", "supabase", "stripe"],
    deliveryDays: "15 Days",
    sprints: 3,
    description: {
      lead: "Engineered an athletic training and biometric conditioning application,",
      highlight: "driving a 4.2x rise in monthly subscriber retention",
      tail: "featuring Bluetooth wearable telemetry ingestion, personalized adaptive volume algorithms, and interactive video training.",
    },
    metrics: {
      label: "Subscriber Retention Lift",
      value: "4.2x Growth",
      progress: 95,
      sublabel: "Across 18,000 active global athlete accounts",
    },
    milestones: [
      { name: "Wearable Sync", detail: "Web Bluetooth API", status: "verified" },
      { name: "Adaptive Engine", detail: "Personalized Volume Algorithm", status: "verified" },
      { name: "Media Delivery", detail: "Adaptive Bitrate HLS Stream", status: "verified" },
      { name: "Member Gateway", detail: "Stripe Tier Billing", status: "live" },
    ],
    technologies: [
      { name: "React 18", icon: Globe, color: "text-cyan-600", bgLight: "bg-cyan-50", detail: "Fluid Mobile-First Touch Interface" },
      { name: "TypeScript", icon: Code2, color: "text-blue-600", bgLight: "bg-blue-50", detail: "End-to-End Type Safety" },
      { name: "Node.js", icon: Terminal, color: "text-emerald-600", bgLight: "bg-emerald-50", detail: "Biometric Data Ingest Pipeline" },
      { name: "Supabase", icon: Database, color: "text-teal-600", bgLight: "bg-teal-50", detail: "Real-Time Leaderboard Database" },
      { name: "Stripe", icon: CreditCard, color: "text-indigo-600", bgLight: "bg-indigo-50", detail: "Subscription Lifecycle Manager" },
    ],
    processPhases: [
      {
        phase: "Phase 01",
        days: "Days 1–3",
        title: "Biometric Telemetry & Algorithm Design",
        description: "Formulated heart-rate zone calculation pipelines, progressive overload algorithms, and workout taxonomy models.",
        deliverables: [
          "Biometric ingestion schema handling 1Hz heart rate data packets",
          "Dynamic recovery readiness score calculation engine",
          "Mobile-first workout tracker UI wireframes with high-contrast displays",
        ],
      },
      {
        phase: "Phase 02",
        days: "Days 4–8",
        title: "Web Bluetooth & Interactive Workout Tracker",
        description: "Engineered real-time connection with smart heart rate monitors and Bluetooth power sensors.",
        deliverables: [
          "Zero-latency Bluetooth pairing with automatic reconnect logic",
          "Audio-guided interval rest timers with vibration feedback",
          "Interactive set-by-set weight and repetition logging interface",
        ],
      },
      {
        phase: "Phase 03",
        days: "Days 9–12",
        title: "Video Streaming & Community Leaderboards",
        description: "Integrated adaptive bitrate HLS video coaching and real-time community challenge leaderboards.",
        deliverables: [
          "Sub-second video stream start times on cellular mobile networks",
          "Real-time leaderboard updates powered by Supabase Realtime",
          "Social achievement badge generator with instant Instagram export",
        ],
      },
      {
        phase: "Phase 04",
        days: "Days 13–15",
        title: "Stripe Subscriptions & App Launch",
        description: "Configured multi-tier memberships, automated grace periods, and deployed to production.",
        deliverables: [
          "Recurring subscription billing supporting Apple Pay and credit cards",
          "100% offline-first workout logging capability with sync on reconnect",
          "Production cutover supporting 18,000 active athletes",
        ],
      },
    ],
    highlights: {
      speedScore: "99/100",
      loadTime: "250ms",
      uptime: "99.98%",
    },
    accentColor: "#00D6A0",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.id === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.id);
}
