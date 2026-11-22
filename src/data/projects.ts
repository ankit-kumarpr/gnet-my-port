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

export type ProjectCategory = "ecommerce" | "web-app" | "saas" | "proptech" | "ai";

export interface Project {
  id: string;
  title: string;
  client: string;
  image: string;
  category: ProjectCategory;
  categoryLabel: string;
  shortDescription: string;
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

export const PROJECTS: Project[] = [
  {
    id: "kraftwoods",
    title: "KraftWoods Luxury Living",
    client: "KraftWoods India",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=900&auto=format&fit=crop",
    category: "ecommerce",
    categoryLabel: "E-Commerce",
    shortDescription: "Bespoke direct-to-consumer digital flagship featuring interactive 3D furniture customizers and frictionless checkout.",
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
