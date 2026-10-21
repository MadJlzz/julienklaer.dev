/**
 * Content of the /cv page.
 *
 * Text fields accept two inline markers:
 *   {kind:text}  colours `text` with a skill category (see `Kind` below)
 *   **text**     plain emphasis, no category
 *
 * Tags are checked against `SKILLS`, so a typo fails `astro check`.
 */

export type Kind = 'cloud' | 'code' | 'ship' | 'people' | 'num';

export const KINDS: { kind: Kind; label: string }[] = [
  { kind: 'cloud', label: 'cloud & infra' },
  { kind: 'code', label: 'code' },
  { kind: 'ship', label: 'delivery & ops' },
  { kind: 'people', label: 'people' },
  { kind: 'num', label: 'numbers' },
];

export const SKILLS = {
  terraform: 'cloud',
  kubernetes: 'cloud',
  'cluster-api': 'cloud',
  gcp: 'cloud',
  'ibm-cloud': 'cloud',
  openshift: 'cloud',
  pcf: 'cloud',
  gke: 'cloud',
  golang: 'code',
  python: 'code',
  java: 'code',
  'spring-boot': 'code',
  angular: 'code',
  groovy: 'code',
  argocd: 'ship',
  observability: 'ship',
  'gitlab-ci': 'ship',
  'ci-cd': 'ship',
  'cloud-build': 'ship',
  jenkins: 'ship',
  ansible: 'ship',
  elk: 'ship',
  docker: 'ship',
  git: 'ship',
  maintenance: 'ship',
  management: 'people',
  training: 'people',
  leadership: 'people',
} as const satisfies Record<string, Exclude<Kind, 'num'>>;

export type Skill = keyof typeof SKILLS;

/** Year and month, e.g. '2022-08'. */
type YearMonth = string;

export interface Mission {
  id: string;
  role: string;
  client: string;
  start: YearMonth;
  end: YearMonth;
  summary: string;
  tags: Skill[];
  bullets?: string[];
}

export interface Job {
  role: string;
  company: string;
  start: YearMonth;
  /** `null` while it is the current job. */
  end: YearMonth | null;
  location: string;
  summary: string;
  tags: Skill[];
  bullets?: string[];
  roles?: { name: string; bullets: string[] }[];
  missions?: Mission[];
}

export interface CvData {
  name: string;
  title: string;
  location: string;
  since: YearMonth;
  contact: {
    email: string;
    emailLink: string;
    web: Link;
    github: Link;
    linkedin: Link;
  };
  about: string[];
  jobs: Job[];
  certifications: { year: number; name: string; issuer: string; href?: string }[];
  education: { year: number; name: string; school: string }[];
  languages: { name: string; level: number; label: string }[];
  interests: string[];
}

interface Link {
  label: string;
  href: string;
}

export const CV: CvData = {
  name: 'Julien Klaer',
  title: 'Senior Software Engineer · Cloud Architect',
  location: 'Luxembourg',
  /** First day in the industry, used for the uptime line. */
  since: '2014-07',

  contact: {
    email: 'klaer.julien@gmail.com',
    /** The mailto link uses a Gmail +alias so CV emails can be filtered. */
    emailLink: 'mailto:klaer.julien+cv@gmail.com',
    web: { label: 'julienklaer.dev', href: 'https://www.julienklaer.dev' },
    github: { label: 'github.com/MadJlzz', href: 'https://github.com/MadJlzz' },
    linkedin: { label: 'linkedin/klaer-julien', href: 'https://linkedin.com/in/klaer-julien' },
  },

  about: [
    "I'm a Senior Software Engineer who fell into the wonderful world of cloud computing and the DevOps philosophy. Always eager to learn, I make time to follow the industry and keep up with the latest trends. Over the last few years I've invested a lot in Python and Go, and I've fallen in love with both.",
    'I love taking on challenges and meeting new people. I am convinced that everyone has a story and something to share.',
    'Last but not least, I always do my best to spread good vibes.',
  ],

  jobs: [
    {
      role: 'Site Reliability Engineer',
      company: 'Tadaweb',
      start: '2022-08',
      end: null,
      location: 'Luxembourg',
      summary:
        'Tadaweb builds an OSINT platform whose mission is to make the world a safer place by empowering the human mind with the right information at the right time.',
      tags: ['terraform', 'kubernetes', 'cluster-api', 'golang', 'argocd', 'observability', 'gitlab-ci'],
      bullets: [
        "build and improve the platform's core infrastructure (VPCs, PostgreSQL, MongoDB, Redis, image registries and more) with {cloud:Terraform} on GCP, Azure and AWS",
        'deploy and operate {num:~15} {cloud:Kubernetes clusters} day to day, provisioned with Cluster API (self-managed) or Terraform (managed, e.g. GKE)',
        'maintain custom node images built with Packer, for immutable infrastructure and hardened security and compliance',
        'collect metrics, traces and logs to define SLIs and write meaningful {ship:SLOs} (Fluent Bit, Fluentd, Loki, Elasticsearch, Kibana, Prometheus, Grafana, Tempo/Jaeger, Thanos)',
        'set up smart alerts on those metrics to react quickly when a component fails, and write post-mortems covering what happened, how it was fixed and how to prevent it from happening again',
        'configure standalone VMs outside the main platform with Ansible',
        'run continuous deployment with a {ship:GitOps} model on Argo CD',
        'maintain a library of GitLab CI templates shared across development teams to standardise image building (Kaniko, Buildah), scanning (Trivy, Grype), signing (Cosign) and binary authorisation (Kyverno)',
        'write {code:Go} tools to solve platform challenges: a Terraform provider, CLIs, and services that talk directly to the Kubernetes API',
        'write Python glue tools that chain the steps of a process together (e.g. Terraform and Ansible)',
      ],
    },
    {
      role: 'Head of Software Engineers',
      company: 'Next Gate Tech',
      start: '2020-09',
      end: '2022-08',
      location: 'Luxembourg',
      summary:
        'Next Gate Tech is a FinTech company providing SaaS solutions to the asset management industry. I joined as a Google Cloud Architect, then took over as head of the software engineering team. Most of our projects were written in Python.',
      tags: ['gcp', 'terraform', 'ibm-cloud', 'python', 'management'],
      bullets: [
        'defined and maintained the **best practices** for using {cloud:Google Cloud Platform} (Cloud Functions, Cloud Run, App Engine, Compute Engine, Cloud Storage, Pub/Sub, BigQuery, Firestore/Datastore, Cloud Operations)',
        'managed GCP **costs** through alerts and reports',
        "led the full **migration** of the company's information system to {cloud:Google Workspace}, then ran it with strong **security practices** (password policy, 2FA, apps, users and groups)",
        'administered the company domain: DNS, SPF, DKIM, DMARC',
        "developed and maintained the company's first product in {code:Python 3.7}: scalable, cost-efficient and reliable data pipelines",
        'built NGX, a new {cloud:cloud-agnostic} version of the product in {code:Python 3.9}, and deployed it to {cloud:IBM Cloud} for a client',
        'managed part of the NGX project using agile methods',
        'promoted the {ship:DevOps philosophy}: Infrastructure as Code with Terraform, CI/CD with GitHub Actions and Cloud Build',
        'reviewed security policies with the cybersecurity engineer and wrote availability procedures following SRE practices (BCP, DRP, …)',
        "{people:managed} all of the company's software engineers",
      ],
    },
    {
      role: 'Team Leader · Consultant Software Engineer · Trainer',
      company: 'SFEIR',
      start: '2017-02',
      end: '2020-09',
      location: 'Luxembourg',
      summary:
        'I joined as a full-stack engineer specialising in back-end, DevOps and cloud. I soon took on more: coaching colleagues placed at different clients, training, recruiting, and giving talks on trending topics (IoT, Go, …).',
      tags: ['kubernetes', 'docker', 'training', 'leadership'],
      roles: [
        {
          name: 'team-lead',
          bullets: [
            "coached and managed a team of {num:10} {people:people}, following each colleague's career and assignments",
            'met clients to gauge their satisfaction with our work',
            'ran year-end reviews covering career plans and salary packages',
          ],
        },
        {
          name: 'trainer',
          bullets: [
            'created training materials (slides, exercises), including the {ship:Docker} and {cloud:Kubernetes} courses',
            'gave beginner and advanced training courses and talks, both internally and for clients such as the Luxembourg Chamber of Deputies and the CSSF',
            'delivered complete, tailor-made training sessions for clients such as Alten in Switzerland',
          ],
        },
        {
          name: 'recruiter',
          bullets: [
            'helped talent managers recruit through {people:PlayOffs}, a series of three live-coding tests on algorithms, languages and frameworks that assess both technical and soft skills',
          ],
        },
      ],
      missions: [
        {
          id: 'rbc',
          role: 'Consultant DevOps Engineer',
          client: 'RBC Investor & Treasury Services',
          start: '2020-03',
          end: '2020-09',
          summary:
            'I helped developers deliver more business value through tooling, support and migrations to modern platforms such as OpenShift and Pivotal Cloud Foundry, and provided CI/CD, workflow pipelines and server provisioning as a service.',
          tags: ['openshift', 'pcf', 'ci-cd'],
        },
        {
          id: 'aws-to-gcp',
          role: 'Consultant Cloud Architect',
          client: 'SFEIR client',
          start: '2020-01',
          end: '2020-02',
          summary:
            'A short mission helping colleagues migrate a client from AWS to Google Cloud, with their workload running on fully managed GKE.',
          tags: ['gke', 'spring-boot', 'angular', 'cloud-build'],
        },
        {
          id: 'ing',
          role: 'Consultant DevOps Engineer · Java Developer',
          client: 'ING Luxembourg',
          start: '2018-10',
          end: '2020-03',
          summary:
            'ING entrusted me with creating an Ops unit so that teams could manage the releases and incidents of their own applications. The initiative started in the Daily Banking & Lending tribe and then spread bank-wide. In parallel, I worked on a major overhaul of payment processing.',
          tags: ['java', 'jenkins', 'ansible', 'elk'],
          bullets: [
            'set up a guild to spread {ship:DevOps culture} within ING, and championed the model and its strategy',
            'rolled out Jenkins for packaging, Ansible for infrastructure as code, and ELK for log aggregation and service health monitoring',
            'contributed to implementing the European **PSD2** directive',
            'migrated the **SWIFT** payment platform to the ING Group platform, which processes {num:thousands of payments} a day',
          ],
        },
        {
          id: 'societe-generale',
          role: 'Consultant Fullstack Developer',
          client: 'Société Générale Bank & Trust',
          start: '2017-05',
          end: '2018-10',
          summary:
            'I migrated a legacy trading application built with Java and Qt Jambi, one financial product at a time, to Spring Boot 2 microservices and Angular 6 micro-frontends.',
          tags: ['spring-boot', 'angular', 'groovy', 'docker'],
          bullets: [
            'wrote a Groovy shared library for Jenkins pipelines as code, with deployments through XL Deploy',
            'built a complete CI/CD pipeline for Angular component libraries at a time when no native solution existed',
            'advised the architecture team on Docker, with proofs of concept including Spring Cloud integration',
          ],
        },
        {
          id: 'legitech',
          role: 'Consultant Fullstack Developer',
          client: 'Legitech',
          start: '2017-02',
          end: '2017-05',
          summary:
            "Legitech builds a document management platform that makes legislation easier to read for jurists and lawyers. I built the desktop publishing application that consolidates legal texts and exports them in a format the publisher can print as books.",
          tags: [],
        },
      ],
    },
    {
      role: 'Analyst Programmer',
      company: 'PwC Luxembourg',
      start: '2016-09',
      end: '2017-02',
      location: 'Luxembourg',
      summary: 'In the application maintenance team, I restored the stability of Java applications in production and modernised them.',
      tags: ['java', 'maintenance'],
      bullets: [
        'ensured the quality and availability of many applications, and analysed and fixed day-to-day issues',
        'set up new tools to make maintenance easier',
      ],
    },
    {
      role: 'System Administrator',
      company: 'efluid SAS',
      start: '2014-07',
      end: '2016-09',
      location: 'Metz',
      summary:
        'As a junior system administrator and integrator in the build and release team, I automated nightly builds, continuous integration, packaging and deployment.',
      tags: ['jenkins', 'docker', 'groovy', 'git'],
      bullets: [
        'managed application releases and kept CI and deployed applications healthy across dev, test and QA environments',
        'improved tooling for the DevOps strategy (Docker, Jenkins pipelines, Groovy)',
        'trained people on Git',
      ],
    },
  ],

  certifications: [
    { year: 2023, name: 'Certified Kubernetes Administrator', issuer: 'CNCF' },
    {
      year: 2019,
      name: 'Certified Kubernetes Administrator',
      issuer: 'CNCF',
      href: 'https://www.youracclaim.com/badges/d4555572-52f2-4767-9227-6dfb88006fce',
    },
    {
      year: 2018,
      name: 'Professional Cloud Architect',
      issuer: 'Google Cloud',
      href: 'https://www.credential.net/f2228374-66be-49d1-a5fb-63a3914f8adf?key=070697e1271dac232dc7b545e153a5ea49a921c302a9f06a1bab89dd47e61ab3',
    },
  ],

  education: [
    { year: 2014, name: 'Degree in Computer Science', school: 'Université de Lorraine, Metz' },
    { year: 2012, name: 'University Diploma of Technology (DUT)', school: 'Université de Lorraine, Metz' },
    { year: 2010, name: 'Baccalaureate, science track', school: 'Lycée Condorcet, Schoeneck' },
  ],

  /** `level` is out of 10 and drawn as a bar. */
  languages: [
    { name: 'French', level: 10, label: 'native' },
    { name: 'English', level: 8, label: 'professional' },
    { name: 'German', level: 6, label: 'proficient' },
  ],

  interests: ['music & guitar', 'riding motorcycles', 'video games', 'computer science'],
};

/* ---------- helpers ---------- */

export type Segment = { kind: Kind | 'em' | 'text'; text: string };

/** Split a text with `{kind:text}` and `**text**` markers into segments. */
export function rich(input: string): Segment[] {
  const out: Segment[] = [];
  const re = /\{(cloud|code|ship|people|num):([^}]+)\}|\*\*([^*]+)\*\*/g;
  let last = 0;
  for (const m of input.matchAll(re)) {
    const at = m.index ?? 0;
    if (at > last) out.push({ kind: 'text', text: input.slice(last, at) });
    if (m[1] && m[2]) out.push({ kind: m[1] as Kind, text: m[2] });
    else if (m[3]) out.push({ kind: 'em', text: m[3] });
    last = at + m[0].length;
  }
  if (last < input.length) out.push({ kind: 'text', text: input.slice(last) });
  return out;
}

const KIND_ORDER: Record<Kind, number> = { cloud: 0, code: 1, ship: 2, people: 3, num: 4 };

/** Tags grouped by category, in legend order. */
export function sortedTags(tags: readonly Skill[]): { name: Skill; kind: Kind }[] {
  return tags
    .map((name) => ({ name, kind: SKILLS[name] as Kind }))
    .sort((a, b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind]);
}

/** Months between a YYYY-MM date and `now`, as "12y 3m". */
export function uptime(since: string, now = new Date()): string {
  const [y, m] = since.split('-').map(Number);
  const months = (now.getFullYear() - (y ?? 0)) * 12 + (now.getMonth() + 1 - (m ?? 1));
  return `${Math.floor(months / 12)}y ${months % 12}m`;
}
