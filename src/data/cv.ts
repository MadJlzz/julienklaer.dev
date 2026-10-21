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
    'Senior Software Engineer who got caught in the wonderful world of Cloud Computing and the DevOps philosophy. Always eager to learn, I spend real time on technology watch to keep up with the latest trends. Lately I have been putting effort into Python and Go, and I just fell in love with them.',
    'I love challenges and meeting new people. I am convinced that everyone has a story and something to share.',
    'Last but not least, I always do my best to share good vibes.',
  ],

  jobs: [
    {
      role: 'Site Reliability Engineer',
      company: 'Tadaweb',
      start: '2022-08',
      end: null,
      location: 'Luxembourg',
      summary:
        'Tadaweb builds an OSINT platform whose purpose is to make the world safer by empowering the human mind with the right information at the right time.',
      tags: ['terraform', 'kubernetes', 'cluster-api', 'golang', 'argocd', 'observability', 'gitlab-ci'],
      bullets: [
        'build and enhance core platform infrastructure (VPCs, Postgres, Mongo, Redis, image registries, […]) with {cloud:Terraform} on GCP, Azure and AWS',
        'deploy and run {num:~15} {cloud:Kubernetes clusters} day to day, provisioned with Cluster API (self-managed) or Terraform (managed, e.g. GKE)',
        'maintain custom node images built with Packer for immutable infrastructure and hardened security/compliance',
        'collect metrics, traces and logs to derive SLIs and write meaningful {ship:SLOs} (Fluent Bit, Fluentd, Loki, Elasticsearch, Kibana, Prometheus, Grafana, Tempo/Jaeger, Thanos)',
        'ship smart alerts on those metrics to act fast when a component fails, and write post-mortems on what happened, how it was solved and how to avoid it next time',
        'configure standalone VMs with Ansible',
        'continuous deployment with a {ship:GitOps} model on ArgoCD',
        'maintain a library of GitLab CI templates shared across dev teams: image builds (Kaniko, Buildah), scanning (Trivy, Grype), signing (Cosign) and binary authorization (Kyverno)',
        'write tools in {code:Go} for platform challenges: a Terraform provider, CLIs, services talking directly to the Kubernetes API',
        'write Python glue tools that chain process steps together (e.g. Terraform with Ansible)',
      ],
    },
    {
      role: 'Head of Software Engineers',
      company: 'Next Gate Tech',
      start: '2020-09',
      end: '2022-08',
      location: 'Luxembourg',
      summary:
        'FinTech providing SaaS solutions for the asset management industry. Joined as Google Cloud Architect, then took the lead of the software engineering team. Most projects were written in Python.',
      tags: ['gcp', 'terraform', 'ibm-cloud', 'python', 'management'],
      bullets: [
        'own the **best practices** for consuming {cloud:Google Cloud Platform} (Cloud Functions, Cloud Run, App Engine, Compute Engine, Cloud Storage, Pub/Sub, BigQuery, Firestore/Datastore, Cloud Operations)',
        'manage GCP **costs** with alerts and reports',
        'full **migration** of the company information system to {cloud:Google Workspace}, then run it with strong **security practices** (password policy, 2FA, apps, users and groups)',
        'domain administrator: DNS, SPF, DKIM, DMARC',
        "develop and maintain the company's first product in {code:Python 3.7}: scalable, cost-efficient and reliable data pipelines",
        'build NGX, a new {cloud:cloud-independent} version of the product in {code:Python 3.9}, and deploy it to {cloud:IBM Cloud} for a client',
        'project management on part of NGX following agile methodology',
        'promote the {ship:DevOps philosophy}: Infrastructure as Code with Terraform, CI/CD with GitHub Actions and Cloud Build',
        'review security policies with the Cybersecurity Engineer and write availability procedures following SRE practices (BCP, DRP, …)',
        '{people:manage} all software engineers of the company',
      ],
    },
    {
      role: 'Team Leader · Consultant Software Engineer · Trainer',
      company: 'SFEIR',
      start: '2017-02',
      end: '2020-09',
      location: 'Luxembourg',
      summary:
        'Joined as a fullstack engineer specialised in backend, DevOps and Cloud. Quickly took on coaching colleagues spread across clients, training, recruiting, and talks on trending topics (IoT, Go, …).',
      tags: ['kubernetes', 'docker', 'training', 'leadership'],
      roles: [
        {
          name: 'team-lead',
          bullets: [
            "coached and managed a team of {num:10} {people:people}, following each colleague's career and missions",
            'met clients to measure their satisfaction with what we delivered',
            'ran year-end reviews covering career and salary package',
          ],
        },
        {
          name: 'trainer',
          bullets: [
            'created training material (slides, exercises), including the {ship:Docker} and {cloud:Kubernetes} courses',
            'gave basic and advanced trainings and talks, internally and for clients such as the Luxembourg Chamber of Deputies and the CSSF',
            'delivered full custom training sessions for clients like Alten in Switzerland',
          ],
        },
        {
          name: 'recruiter',
          bullets: [
            'helped Talent Managers hire through {people:PlayOffs}: three live-coding tests on algorithms, languages and frameworks that assess both technical and soft skills',
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
            'Helped developers deliver more business value with tooling, support and migrations to modern platforms like OpenShift and Pivotal Cloud Foundry. Provided CI/CD, workflow pipelines and server provisioning as a service.',
          tags: ['openshift', 'pcf', 'ci-cd'],
        },
        {
          id: 'aws-to-gcp',
          role: 'Consultant Cloud Architect',
          client: 'SFEIR client',
          start: '2020-01',
          end: '2020-02',
          summary:
            'Short mission migrating a client from AWS to Google Cloud, running their workload on fully managed GKE.',
          tags: ['gke', 'spring-boot', 'angular', 'cloud-build'],
        },
        {
          id: 'ing',
          role: 'Consultant DevOps Engineer · Java Developer',
          client: 'ING Luxembourg',
          start: '2018-10',
          end: '2020-03',
          summary:
            'ING entrusted me with creating an OPS unit so teams could own releases and incidents on their assets, started in the Daily Banking & Lending tribe and extended bank-wide. In parallel, a large refactor of payment processing.',
          tags: ['java', 'jenkins', 'ansible', 'elk'],
          bullets: [
            'set up a guild to spread the {ship:DevOps culture} within ING, and evangelised the model and its strategy',
            'rolled out Jenkins for packaging, Ansible for infrastructure as code, ELK for log aggregation and liveness',
            'contributed to the **PSD2** European directive implementation',
            'migrated the **SWIFT** payment platform to the ING group platform, processing {num:thousands of payments} daily',
          ],
        },
        {
          id: 'societe-generale',
          role: 'Consultant Fullstack Developer',
          client: 'Société Générale Bank & Trust',
          start: '2017-05',
          end: '2018-10',
          summary:
            'Migrated a legacy Java QT Jambi trading application, one financial product at a time, into Spring Boot 2 microservices and Angular 6 micro-frontends.',
          tags: ['spring-boot', 'angular', 'groovy', 'docker'],
          bullets: [
            'wrote a Groovy shared library for Jenkins pipelines as code; deployments with XL Deploy',
            'built a full CI/CD pipeline for Angular component libraries, when no native solution existed',
            'advised the architecture team on Docker, with POCs including Spring Cloud',
          ],
        },
        {
          id: 'legitech',
          role: 'Consultant Fullstack Developer',
          client: 'Legitech',
          start: '2017-02',
          end: '2017-05',
          summary:
            'Document management platform that makes laws readable for jurists and lawyers. Built the desktop publishing application that consolidates legal texts and exports them in a printer-publisher format to be printed as books.',
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
      summary: 'TMA team: restored the stability of Java applications in production and modernised them.',
      tags: ['java', 'maintenance'],
      bullets: [
        'ensure quality and availability of many applications, analyse day-to-day issues and fix them',
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
        'Junior sysadmin/integrator in the manufacturing process team: automation of nightly builds, continuous integration, packaging and deployment.',
      tags: ['jenkins', 'docker', 'groovy', 'git'],
      bullets: [
        'release management of applications, and health of CI and deployed apps across dev, test and QA',
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
    { year: 2014, name: 'Computer Science degree', school: 'Université de Lorraine, Metz' },
    { year: 2012, name: 'DUT, University Technological Diploma', school: 'Université de Lorraine, Metz' },
    { year: 2010, name: 'Scientific Baccalaureate', school: 'Lycée Condorcet, Schoeneck' },
  ],

  /** `level` is out of 10 and drawn as a bar. */
  languages: [
    { name: 'French', level: 10, label: 'native' },
    { name: 'English', level: 8, label: 'professional' },
    { name: 'German', level: 6, label: 'proficient' },
  ],

  interests: ['music & guitar', 'motorcycles', 'video games', 'computer science'],
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
