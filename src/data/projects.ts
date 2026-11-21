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

export interface Project {
  id: string;
  title: string;
  client: string;
  image: string;
  category: "ecommerce" | "web-app" | "proptech" | "ai";
  categoryLabel: string;
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
    id: "gt-travels",
    title: "Enterprise Mobility & Booking Fleet",
    client: "GT Travels",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop",
    category: "web-app",
    categoryLabel: "Web Applications",
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
        description:
          "Mapped multi-city route tables, seat inventory locks, and distributed state machines to prevent overbooking across simultaneous customer checkouts.",
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
        description:
          "Designed 60fps bus floorplan layout with real-time seat status updates via WebSockets and instant seat hold timers.",
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
        description:
          "Integrated Razorpay webhook callbacks with automated reconciliation and real-time GPS tracking for dispatch managers.",
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
        description:
          "Executed distributed stress tests simulating 25,000 concurrent holiday travelers and deployed multi-region Cloudflare edge caching.",
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
    accentColor: "#10b981",
    clientQuote: {
      text: "Grandeur Net delivered our high-throughput booking engine in 18 days. We handled 50,000+ daily searches during peak festival season without a single glitch.",
      author: "Gaurav Thapa",
      role: "COO, GT Travels Mobility",
    },
  },
  {
    id: "kraftwood",
    title: "Luxury Teak Furniture E-Commerce",
    client: "Kraftwood India",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
    category: "ecommerce",
    categoryLabel: "E-Commerce",
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
        description:
          "Formulated an editorial luxury visual identity and optimized 3D glTF models from 85MB CAD files down to 1.8MB for instant web rendering.",
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
        description:
          "Engineered 60fps 3D customizer allowing buyers to swap wood finishes, upholstery fabrics, and preview custom dimensions in real time.",
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
        description:
          "Engineered frictionless one-page checkout integrating Razorpay and Stripe with instant credit card EMI calculators.",
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
        description:
          "Achieved a 99/100 Mobile Lighthouse Performance score with edge image generation and smart asset prefetching.",
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
    accentColor: "#059669",
    clientQuote: {
      text: "Grandeur Net transformed our traditional woodcraft business into an international digital powerhouse. The 3D customizer alone increased our average order value by 45%.",
      author: "Rajesh Malhotra",
      role: "Managing Director, Kraftwood India",
    },
  },
  {
    id: "divyanshi-properties",
    title: "High-Velocity PropTech Lead Portal",
    client: "Divyanshi Properties",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    category: "proptech",
    categoryLabel: "PropTech & Real Estate",
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
        description:
          "Structured Dehradun and Uttarakhand property GIS coordinates, boundary polygons, and residential metadata schemas.",
        deliverables: [
          "Custom Mapbox vector tile styles matching Grandeur Net luxury design",
          "Property listing data model with verified RERA documentation fields",
          "High-conversion lead capture modals designed for mobile buyers",
        ],
      },
      {
        phase: "Phase 02",
        days: "Days 4–8",
        title: "Interactive Map Clustering & 360° Tours",
        description:
          "Developed high-fps interactive map clustering with price pins, radius proximity search, and panoramic walkthroughs.",
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
        description:
          "Built real-time inquiry distribution engine that instantly notifies the assigned sales executive within 15 seconds.",
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
        description:
          "Optimized for 4G mobile connections across North India and achieved 100% responsive touch parity.",
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
    accentColor: "#0284c7",
  },
  {
    id: "interiorpreneurs",
    title: "Designer Commerce & Multi-Vendor Hub",
    client: "Interiorpreneurs",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    category: "ecommerce",
    categoryLabel: "E-Commerce",
    deliveryDays: "21 Days",
    sprints: 4,
    description: {
      lead: "Built a premier architectural marketplace bridging luxury interior designers,",
      highlight: "processing ₹4.8 Crore in annual platform volume",
      tail: "with automated multi-vendor commission splits, bespoke quotation engines, and live tracking.",
    },
    metrics: {
      label: "Annual Platform Volume",
      value: "₹4.8 Cr",
      progress: 82,
      sublabel: "Processed through automated split escrow",
    },
    milestones: [
      { name: "Vendor Matrix", detail: "Drizzle ORM Engine", status: "verified" },
      { name: "Quote Generator", detail: "Serverless PDF Engine", status: "verified" },
      { name: "Commission Split", detail: "Automated Escrow", status: "verified" },
      { name: "Unified Graph", detail: "GraphQL Microservice", status: "live" },
    ],
    technologies: [
      { name: "Next.js 14", icon: Globe, color: "text-slate-900", bgLight: "bg-slate-100", detail: "Modular Component Architecture" },
      { name: "Drizzle ORM", icon: Database, color: "text-amber-600", bgLight: "bg-amber-50", detail: "Zero-Overhead SQL Queries" },
      { name: "GraphQL API", icon: Cpu, color: "text-pink-600", bgLight: "bg-pink-50", detail: "Unified Multi-Vendor Graph" },
      { name: "Tailwind CSS", icon: Code2, color: "text-cyan-600", bgLight: "bg-cyan-50", detail: "Enterprise Design System" },
      { name: "PostgreSQL", icon: Database, color: "text-blue-600", bgLight: "bg-blue-50", detail: "ACID Financial Ledger" },
    ],
    processPhases: [
      {
        phase: "Phase 01",
        days: "Days 1–5",
        title: "Marketplace Architecture & Vendor Workflows",
        description:
          "Modeled multi-tenant vendor hierarchies, catalog permissions, and automated commission fee structures.",
        deliverables: [
          "Relational database schema with multi-tenant data isolation",
          "Automated KYC vendor onboarding workflow with bank account validation",
          "Vendor portal wireframes with inventory bulk-upload capabilities",
        ],
      },
      {
        phase: "Phase 02",
        days: "Days 6–12",
        title: "Bespoke Quotation Engine & PDF Generation",
        description:
          "Engineered dynamic proposal generator allowing interior designers to assemble custom product bundles and export client PDFs.",
        deliverables: [
          "Interactive drag-and-drop moodboard builder with real-time bill of materials",
          "Serverless PDF rendering service generating branded client quotes in 1.2s",
          "Granular margin adjustment controls for verified trade designers",
        ],
      },
      {
        phase: "Phase 03",
        days: "Days 13–18",
        title: "Split Escrow Payouts & Order Orchestration",
        description:
          "Integrated automated multi-party banking payouts routing designer commissions and manufacturer payments on delivery confirmation.",
        deliverables: [
          "Automated ledger entries with zero reconciliation variance",
          "Milestone-based escrow releases triggered by proof of delivery scans",
          "Vendor payout tracking dashboard with automated tax reports",
        ],
      },
      {
        phase: "Phase 04",
        days: "Days 19–21",
        title: "Security Audit & Enterprise Launch",
        description:
          "Conducted financial transaction security audits, penetration testing, and rolled out to 150+ founding design firms.",
        deliverables: [
          "Zero financial audit vulnerabilities detected in third-party review",
          "Sub-250ms API response times across GraphQL schema",
          "Live launch processing ₹4.8 Crore in first year platform volume",
        ],
      },
    ],
    highlights: {
      speedScore: "98/100",
      loadTime: "310ms",
      uptime: "99.98%",
    },
    accentColor: "#db2777",
  },
  {
    id: "apex-cloud",
    title: "AI Proposal & RFP Automation Suite",
    client: "Apex Enterprise Cloud",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    category: "ai",
    categoryLabel: "AI & Automation",
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
        description:
          "Built multi-modal document extraction pipeline processing 100+ page technical solicitations, tables, and compliance matrices.",
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
        description:
          "Configured multi-agent workflow where specialized agents extract requirements, search past winning bids, and draft technical answers.",
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
        description:
          "Built interactive web editor allowing sales executives to review extracted criteria, adjust pricing, and generate branded decks.",
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
        description:
          "Implemented zero-data-retention compliance policies, end-to-end payload encryption, and enterprise SSO integration.",
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
    accentColor: "#4f46e5",
  },
  {
    id: "zenith-diagnostics",
    title: "Telehealth & Diagnostic Records Portal",
    client: "Zenith Diagnostics",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    category: "web-app",
    categoryLabel: "Web Applications",
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
        description:
          "Formulated strict medical data privacy schemas adhering to HIPAA and ISO 27001 healthcare standards.",
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
        description:
          "Engineered HL7 and ASTM protocol ingestion pipelines connecting laboratory blood analyzers directly to the cloud database.",
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
        description:
          "Integrated sub-second transactional SMS gateways and calendar scheduling for one-click doctor video consultations.",
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
        description:
          "Conducted third-party penetration testing and live parallel cutover across 12 diagnostic collection centers.",
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
    accentColor: "#0891b2",
    clientQuote: {
      text: "Our pathology network can now deliver automated lab reports to patients' phones within seconds of analyzer completion. Grandeur Net's HIPAA architecture has been rock-solid.",
      author: "Dr. A. K. Nautiyal",
      role: "Director, Zenith Diagnostics",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.id === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.id);
}

