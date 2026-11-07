import { useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleUserRound,
  Clock3,
  Compass,
  FileText,
  Home,
  Inbox,
  Link2,
  ListFilter,
  LockKeyhole,
  LogOut,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  Send,
  Settings,
  Sparkles,
  Target,
  Upload,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";

type Screen =
  | "auth"
  | "onboarding"
  | "home"
  | "new"
  | "refine"
  | "summary"
  | "matches"
  | "collaborator"
  | "inbox"
  | "project"
  | "chat"
  | "browse"
  | "proposals"
  | "profile";

const jane =
  "https://images.unsplash.com/photo-1645620592218-cf03f0d8c778?auto=format&fit=crop&w=240&h=240&q=85";

const people = [
  {
    name: "David Mwangi",
    role: "Applied Statistics",
    school: "University of Nairobi",
    country: "Kenya",
    score: 96,
    skills: ["Statistics", "R", "Experiments"],
    reason:
      "Strong experimental design experience and deep context on digital products in East Africa.",
    image:
      "https://images.unsplash.com/photo-1678282955808-de92256dbd59?auto=format&fit=crop&w=240&h=240&q=85",
    same: true,
  },
  {
    name: "Ama Owusu",
    role: "Social Psychology",
    school: "University of Ghana",
    country: "Ghana",
    score: 92,
    skills: ["Psychology", "Behaviour", "Surveys"],
    reason: "Researches cultural patterns in digital behaviour and mixed-method user studies.",
    image:
      "https://images.unsplash.com/photo-1615813967515-e1838c1c5116?auto=format&fit=crop&w=240&h=240&q=85",
  },
  {
    name: "Kofi Mensah",
    role: "Design Research",
    school: "Ashesi University",
    country: "Ghana",
    score: 89,
    skills: ["UX Research", "Prototyping", "Accessibility"],
    reason: "Has led participatory design research for locally relevant mobile services.",
    image:
      "https://images.unsplash.com/photo-1702677853205-16a0b71c6d85?auto=format&fit=crop&w=240&h=240&q=85",
  },
];

const navItems = [
  { label: "Home", screen: "home" as Screen, icon: Home },
  { label: "Explore", screen: "browse" as Screen, icon: Compass },
  { label: "Proposals", screen: "proposals" as Screen, icon: FileText },
  { label: "Matches", screen: "inbox" as Screen, icon: UsersRound },
  { label: "Profile", screen: "profile" as Screen, icon: UserRound },
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand">
      <div className="brand-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      {!compact && <span>TOWERS</span>}
    </div>
  );
}

function Button({
  children,
  onClick,
  kind = "primary",
  className = "",
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  kind?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <button type={type} onClick={onClick} className={`btn btn-${kind} ${className}`}>
      {children}
    </button>
  );
}

function Avatar({
  src,
  name,
  size = "md",
}: {
  src: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  return <img className={`avatar avatar-${size}`} src={src} alt={`${name} portrait`} />;
}

function Tag({ children, removable = false }: { children: ReactNode; removable?: boolean }) {
  return (
    <span className="tag">
      {children}
      {removable && <X size={13} />}
    </span>
  );
}

function Progress({ step }: { step: number }) {
  return (
    <div className="progress-wrap">
      <div className="progress-copy">
        <span>Profile setup</span>
        <span>{step} of 3</span>
      </div>
      <div className="progress-track">
        <span style={{ width: `${(step / 3) * 100}%` }} />
      </div>
    </div>
  );
}

function Topbar({ title, back, right }: { title?: string; back?: () => void; right?: ReactNode }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        {back ? (
          <button className="icon-button" onClick={back} aria-label="Go back">
            <ArrowLeft size={20} />
          </button>
        ) : (
          <Logo />
        )}
        {title && <strong>{title}</strong>}
      </div>
      {right ?? (
        <button className="icon-button notification" aria-label="Notifications">
          <Bell size={20} />
          <span />
        </button>
      )}
    </header>
  );
}

function Shell({
  screen,
  go,
  children,
  hideNav = false,
}: {
  screen: Screen;
  go: (screen: Screen) => void;
  children: ReactNode;
  hideNav?: boolean;
}) {
  return (
    <div className="app-shell">
      {!hideNav && (
        <aside className="side-nav">
          <Logo />
          <div className="side-profile">
            <Avatar src={jane} name="Jane" size="sm" />
            <div>
              <strong>Jane Wanjiku</strong>
              <span>University of Nairobi</span>
            </div>
          </div>
          <nav>
            {navItems.map((item) => (
              <button
                key={item.label}
                className={
                  screen === item.screen ||
                  (item.screen === "inbox" && ["matches", "collaborator"].includes(screen))
                    ? "active"
                    : ""
                }
                onClick={() => go(item.screen)}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>
          <button className="support-link">
            <MessageCircle size={19} />
            Help & support
          </button>
        </aside>
      )}
      <main className={`main-view ${hideNav ? "full" : ""}`}>{children}</main>
      {!hideNav && (
        <nav className="bottom-nav">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={screen === item.screen ? "active" : ""}
              onClick={() => go(item.screen)}
            >
              <item.icon size={21} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}

function Auth({ go, openTerms }: { go: (screen: Screen) => void; openTerms: () => void }) {
  const [phase, setPhase] = useState<"email" | "otp">("email");
  const [consent, setConsent] = useState(true);
  return (
    <div className="auth-page">
      <div className="auth-art" aria-hidden="true">
        <div className="big-word">TOWERS</div>
        <div className="art-orb orb-one" />
        <div className="art-orb orb-two" />
        <div className="art-lines" />
        <div className="auth-quote">
          <Sparkles size={22} />
          <p>Ideas travel further when disciplines meet.</p>
        </div>
      </div>
      <section className="auth-panel">
        <Logo />
        <div className="auth-form">
          <div className="eyebrow">Welcome to Towers</div>
          <h1>{phase === "email" ? "Build beyond your discipline." : "Check your inbox."}</h1>
          <p>
            {phase === "email"
              ? "Find the right students to turn a promising research idea into a real project."
              : "We sent a six-digit verification code to jane@uonbi.ac.ke."}
          </p>
          {phase === "email" ? (
            <>
              <label className="field">
                <span>University email</span>
                <input defaultValue="jane@uonbi.ac.ke" type="email" />
              </label>
              <label className="check-row">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                />
                <span>
                  I agree to the{" "}
                  <button onClick={openTerms}>Terms of Use and Privacy Policy</button>.
                </span>
              </label>
              <Button onClick={() => consent && setPhase("otp")}>
                Continue with university email <ArrowRight size={17} />
              </Button>
              <div className="or">
                <span>or</span>
              </div>
              <Button kind="secondary">
                <span className="google-g">G</span> Continue with Google
              </Button>
              <p className="login-link">
                Already have an account? <button onClick={() => go("home")}>Log in</button>
              </p>
            </>
          ) : (
            <>
              <div className="otp-row">
                {[8, 2, 5, 1, 4, 9].map((digit, index) => (
                  <input key={index} defaultValue={digit} aria-label={`Digit ${index + 1}`} />
                ))}
              </div>
              <Button onClick={() => go("onboarding")}>
                Verify & continue <ArrowRight size={17} />
              </Button>
              <button className="text-link" onClick={() => setPhase("email")}>
                Use a different email
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function Onboarding({ go }: { go: (screen: Screen) => void }) {
  const [step, setStep] = useState(1);
  const tags = ["Design", "UX", "Computer science", "Kenyan apps"];
  return (
    <div className="onboarding-page">
      <header>
        <Logo />
        <button className="text-link" onClick={() => go("auth")}>
          Save & exit
        </button>
      </header>
      <section className="onboarding-card">
        <Progress step={step} />
        {step === 1 && (
          <>
            <div className="section-heading">
              <span className="eyebrow">First, the essentials</span>
              <h1>Tell us about yourself.</h1>
              <p>This helps us prioritize collaborators who understand your academic context.</p>
            </div>
            <div className="photo-upload">
              <Avatar src={jane} name="Jane" size="lg" />
              <div>
                <Button kind="secondary">
                  <Upload size={17} /> Upload photo
                </Button>
                <small>JPG or PNG, up to 5MB</small>
              </div>
            </div>
            <div className="form-grid">
              <label className="field full">
                <span>Full name</span>
                <input defaultValue="Jane Wanjiku" />
              </label>
              <label className="field full">
                <span>University</span>
                <div className="input-icon">
                  <Search size={17} />
                  <input defaultValue="University of Nairobi" />
                </div>
              </label>
              <label className="field">
                <span>Country</span>
                <input value="Kenya" readOnly />
              </label>
              <label className="field">
                <span>Year of study</span>
                <select defaultValue="2">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </label>
              <label className="field full">
                <span>Department or course</span>
                <input defaultValue="Computer Science" />
              </label>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="section-heading">
              <span className="eyebrow">Find your people</span>
              <h1>What lights you up?</h1>
              <p>
                Add interests and specialist skills so your profile appears in the right searches.
              </p>
            </div>
            <label className="field">
              <span>Search or add a skill</span>
              <div className="input-icon">
                <Search size={17} />
                <input placeholder="Try “data visualization”" />
              </div>
            </label>
            <div className="selected-tags">
              {tags.map((tag) => (
                <Tag key={tag} removable>
                  {tag}
                </Tag>
              ))}
            </div>
            <div className="suggested">
              <span>Suggested for you</span>
              <div>
                {[
                  "Product design",
                  "Mobile development",
                  "Design research",
                  "Accessibility",
                  "AI",
                ].map((tag) => (
                  <button key={tag}>
                    <Plus size={14} /> {tag}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div className="section-heading">
              <span className="eyebrow">Show your depth</span>
              <h1>Bring your experience to life.</h1>
              <p>A richer profile gives our matching engine more to work with.</p>
            </div>
            <div className="completeness">
              <div>
                <strong>Profile strength</strong>
                <span>Almost there</span>
              </div>
              <div className="progress-track">
                <span style={{ width: "86%" }} />
              </div>
              <b>86%</b>
            </div>
            <label className="upload-box">
              <input type="file" accept=".pdf" />
              <FileText size={26} />
              <span>
                <strong>Upload your CV</strong>
                <small>PDF, up to 10MB</small>
              </span>
              <Button kind="secondary">Choose file</Button>
            </label>
            <label className="field">
              <span>Short bio</span>
              <textarea defaultValue="CS student and product designer interested in how technology can better reflect the communities that use it." />
            </label>
            <label className="field">
              <span>Past work</span>
              <textarea defaultValue="Led UX research and interaction design for a student budgeting app used by 400+ students across campus." />
            </label>
          </>
        )}
        <div className="onboarding-actions">
          {step > 1 && (
            <Button kind="ghost" onClick={() => setStep(step - 1)}>
              <ArrowLeft size={17} /> Back
            </Button>
          )}
          <Button
            onClick={() => (step < 3 ? setStep(step + 1) : go("home"))}
            className="push-right"
          >
            {step === 3 ? "Finish setup" : "Save & continue"} <ArrowRight size={17} />
          </Button>
        </div>
      </section>
    </div>
  );
}

function HomeScreen({ go }: { go: (screen: Screen) => void }) {
  return (
    <>
      <Topbar />
      <div className="page-content">
        <section className="welcome-row">
          <div>
            <span className="eyebrow">Thursday, 14 March</span>
            <h1>Good morning, Jane.</h1>
            <p>What could your idea become today?</p>
          </div>
          <Button onClick={() => go("new")}>
            <Plus size={18} /> Start a new proposal
          </Button>
        </section>
        <section className="nudge-card">
          <div className="nudge-icon">
            <Target size={23} />
          </div>
          <div>
            <strong>Your profile is already making better matches.</strong>
            <p>Add one more past project to reach 100% profile strength.</p>
          </div>
          <button onClick={() => go("profile")}>
            Improve profile <ArrowRight size={16} />
          </button>
          <div className="ring">
            <b>86</b>
            <small>%</small>
          </div>
        </section>
        <div className="dashboard-grid">
          <section>
            <div className="section-title">
              <div>
                <h2>My proposals</h2>
                <span>Ideas moving forward</span>
              </div>
              <button onClick={() => go("proposals")}>View all</button>
            </div>
            <div className="proposal-list">
              <ProposalCard
                title="Design principles for Kenyan mobile users"
                status="Matching"
                date="Updated 2h ago"
                count="12 matches"
                onClick={() => go("matches")}
              />
              <ProposalCard
                title="Reducing food waste in campus kitchens"
                status="Refining"
                date="Updated yesterday"
                count="3 new prompts"
                onClick={() => go("refine")}
              />
              <ProposalCard
                title="Peer-led mental health check-ins"
                status="Draft"
                date="Updated 5 days ago"
                count="Draft"
                onClick={() => go("new")}
              />
            </div>
          </section>
          <section>
            <div className="section-title">
              <div>
                <h2>Active project</h2>
                <span>Your team at a glance</span>
              </div>
            </div>
            <button className="active-project-card" onClick={() => go("project")}>
              <div className="project-top">
                <span className="status active">Research</span>
                <MoreHorizontal size={20} />
              </div>
              <h3>Inclusive mobile design in Kenya</h3>
              <p>
                Understanding which interface patterns build trust and usability for Kenyan mobile
                users.
              </p>
              <div className="project-progress">
                <span>
                  <b>2</b> of 5 milestones
                </span>
                <span>40%</span>
              </div>
              <div className="progress-track">
                <span style={{ width: "40%" }} />
              </div>
              <div className="project-footer">
                <div className="avatar-stack">
                  {[jane, people[0].image, people[1].image].map((src, i) => (
                    <Avatar key={src} src={src} name={`Team member ${i + 1}`} size="sm" />
                  ))}
                </div>
                <span>Next: Research plan · Mar 18</span>
              </div>
            </button>
          </section>
        </div>
      </div>
    </>
  );
}

function ProposalCard({
  title,
  status,
  date,
  count,
  onClick,
}: {
  title: string;
  status: string;
  date: string;
  count: string;
  onClick: () => void;
}) {
  return (
    <button className="proposal-card" onClick={onClick}>
      <div className="proposal-icon">
        <BookOpen size={20} />
      </div>
      <div className="proposal-main">
        <div>
          <span className={`status ${status.toLowerCase()}`}>{status}</span>
          <small>{date}</small>
        </div>
        <h3>{title}</h3>
      </div>
      <div className="proposal-meta">
        <span>{count}</span>
        <ArrowRight size={18} />
      </div>
    </button>
  );
}

function NewProposal({ go }: { go: (screen: Screen) => void }) {
  return (
    <>
      <Topbar
        title="New proposal"
        back={() => go("home")}
        right={
          <button className="text-link" onClick={() => go("home")}>
            Save as draft
          </button>
        }
      />
      <div className="narrow-page">
        <div className="step-label">
          <span>01</span>
          <i />
          <span>Start with the spark</span>
        </div>
        <h1>What do you want to explore?</h1>
        <p>
          Write naturally. You don’t need a polished research question yet—we’ll shape it together.
        </p>
        <label className="field">
          <span>Working title</span>
          <input defaultValue="Design principles for Kenyan mobile users" />
        </label>
        <label className="field idea-field">
          <span>Describe your idea</span>
          <textarea defaultValue="I want to explore what makes apps feel intuitive, trustworthy, and useful for Kenyan users. Many design principles come from Western contexts, and I want to understand what should change when designing for local needs, languages, payment habits, and connectivity." />
          <small>326 / 1,500 characters</small>
        </label>
        <div className="hint">
          <Sparkles size={18} />
          <span>
            <strong>A useful starting point:</strong> What have you noticed, who does it affect, and
            why does it matter?
          </span>
        </div>
        <button className="attachment-row">
          <Paperclip size={19} />
          <span>
            <strong>Add links or attachments</strong>
            <small>Optional · PDF, DOCX, or URL</small>
          </span>
          <Plus size={18} />
        </button>
        <div className="page-actions">
          <Button kind="ghost" onClick={() => go("home")}>
            Save as draft
          </Button>
          <Button onClick={() => go("refine")}>
            Continue to refinement <ArrowRight size={17} />
          </Button>
        </div>
      </div>
    </>
  );
}

function Refine({ go }: { go: (screen: Screen) => void }) {
  const [sent, setSent] = useState(false);
  return (
    <>
      <Topbar
        title="Refine your proposal"
        back={() => go("home")}
        right={
          <button className="text-link" onClick={() => go("home")}>
            Save & exit
          </button>
        }
      />
      <div className="refine-layout">
        <section className="chat-panel">
          <div className="ai-intro">
            <div className="ai-avatar">
              <Sparkles size={19} />
            </div>
            <div>
              <strong>Towers guide</strong>
              <span>Refining with you</span>
            </div>
          </div>
          <div className="message ai">
            <p>
              This is a strong starting point. Let’s make the research goal more specific.{" "}
              <strong>
                Who is most affected by design patterns that don’t fit the Kenyan context?
              </strong>
            </p>
          </div>
          <div className="message user">
            <p>
              People who rely on mobile-first services, especially younger users and people using
              lower-cost Android devices with limited data.
            </p>
          </div>
          <div className="message ai">
            <p>
              That gives us a clear audience. To understand both behaviour and measurable impact,
              what expertise would strengthen your own design and CS background?
            </p>
          </div>
          {sent && (
            <div className="message user">
              <p>
                I’d need someone who understands statistics, behavioural psychology, and field-based
                design research.
              </p>
            </div>
          )}
          <div className="prompt-chips">
            <span>Try a prompt</span>
            <button>Who is affected?</button>
            <button>What expertise do I need?</button>
          </div>
          <div className="chat-compose">
            <textarea placeholder="Share your thoughts..." />
            <button onClick={() => setSent(true)} aria-label="Send">
              <Send size={18} />
            </button>
          </div>
        </section>
        <aside className="summary-panel">
          <div className="summary-head">
            <div>
              <span>Live proposal</span>
              <h2>Design principles for Kenyan mobile users</h2>
            </div>
            <span className="saved">
              <Check size={13} /> Saved
            </span>
          </div>
          <div className="summary-section">
            <label>Refined problem</label>
            <p>
              How might culturally relevant design principles improve trust, usability, and adoption
              of mobile-first services among young Kenyan users?
            </p>
            <button>Edit summary</button>
          </div>
          <div className="summary-section">
            <label>People affected</label>
            <p>
              Young mobile-first users, especially those on low-cost Android devices and limited
              data plans.
            </p>
          </div>
          <div className="summary-section">
            <label>Skills we’re detecting</label>
            <div className="selected-tags">
              {["Statistics", "Psychology", "Design research"].map((tag) => (
                <Tag key={tag} removable>
                  {tag}
                </Tag>
              ))}
              <button className="add-tag">
                <Plus size={14} /> Add
              </button>
            </div>
          </div>
          <Button onClick={() => go("summary")}>
            Looks good — review proposal <ArrowRight size={17} />
          </Button>
        </aside>
      </div>
    </>
  );
}

function Summary({ go }: { go: (screen: Screen) => void }) {
  return (
    <>
      <Topbar title="Review proposal" back={() => go("refine")} />
      <div className="review-page">
        <div className="review-intro">
          <span className="eyebrow">Ready to match</span>
          <h1>Your idea, sharpened.</h1>
          <p>
            Review the details below. This is what Towers will use to find collaborators who add
            something new.
          </p>
        </div>
        <div className="review-grid">
          <section className="paper-card">
            <span className="mini-label">Research proposal</span>
            <h2>Design principles for Kenyan mobile users</h2>
            <h4>Research question</h4>
            <p>
              How might culturally relevant design principles improve trust, usability, and adoption
              of mobile-first services among young Kenyan users?
            </p>
            <h4>Context</h4>
            <p>
              Many established design principles reflect Western usage patterns. This research will
              study local needs, languages, payment habits, device constraints, and connectivity.
            </p>
            <button className="text-link" onClick={() => go("refine")}>
              Edit proposal
            </button>
          </section>
          <aside className="skill-card">
            <div>
              <span className="mini-label">Collaboration brief</span>
              <h3>Skills this project needs</h3>
            </div>
            {["Statistics", "Behavioural psychology", "Design research"].map((skill, i) => (
              <div className="skill-row" key={skill}>
                <div>
                  <strong>{skill}</strong>
                  <span>{i < 2 ? "Required" : "Nice to have"}</span>
                </div>
                <button className={i < 2 ? "toggle on" : "toggle"}>
                  <span />
                </button>
              </div>
            ))}
            <button className="add-skill">
              <Plus size={16} /> Add another skill
            </button>
            <div className="match-note">
              <UsersRound size={20} />
              <p>
                <strong>We found a promising pool.</strong>
                <br />
                Your brief can be matched across 6 disciplines.
              </p>
            </div>
            <Button onClick={() => go("matches")}>
              Run matching <Sparkles size={17} />
            </Button>
          </aside>
        </div>
      </div>
    </>
  );
}

function Matches({
  go,
  invited,
  invite,
}: {
  go: (screen: Screen) => void;
  invited: boolean;
  invite: () => void;
}) {
  const [filter, setFilter] = useState("All");
  return (
    <>
      <Topbar title="Collaborator matches" back={() => go("home")} />
      <div className="page-content matches-page">
        <div className="matches-heading">
          <div>
            <span className="eyebrow">12 strong matches</span>
            <h1>Different strengths. One shared idea.</h1>
            <p>
              Ranked for your proposal based on complementary expertise, experience, and context.
            </p>
          </div>
          <div className="score-legend">
            <Sparkles size={18} />
            <span>Match quality updates as profiles grow</span>
          </div>
        </div>
        <div className="filter-row">
          <button className="filter-button">
            <ListFilter size={17} /> Filters
          </button>
          {["All", "Same university", "Kenya", "Statistics", "Psychology"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={filter === item ? "active" : ""}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="match-list">
          {people.map((person, index) => (
            <article className="match-card" key={person.name}>
              <div className="rank">0{index + 1}</div>
              <Avatar src={person.image} name={person.name} size="lg" />
              <div className="match-person">
                <div className="person-name">
                  <h3>{person.name}</h3>
                  {person.same && (
                    <span>
                      <Home size={12} /> Same university
                    </span>
                  )}
                </div>
                <p>
                  {person.role} · {person.school}
                </p>
                <small>{person.country}</small>
                <div className="selected-tags">
                  {person.skills.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
                <div className="why">
                  <Sparkles size={16} />
                  <p>
                    <strong>Why this match:</strong> {person.reason}
                  </p>
                </div>
              </div>
              <div className="match-actions">
                <div className="match-score">
                  <b>{person.score}%</b>
                  <span>match</span>
                </div>
                <Button onClick={invite} kind={invited && index === 0 ? "secondary" : "primary"}>
                  {invited && index === 0 ? (
                    <>
                      <Check size={17} /> Invited
                    </>
                  ) : (
                    "Invite"
                  )}
                </Button>
                <button className="text-link" onClick={() => go("collaborator")}>
                  View profile
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

function Collaborator({
  go,
  invite,
  invited,
}: {
  go: (screen: Screen) => void;
  invite: () => void;
  invited: boolean;
}) {
  const person = people[0];
  return (
    <>
      <Topbar title="Collaborator profile" back={() => go("matches")} />
      <div className="profile-detail">
        <section className="profile-hero">
          <div className="profile-accent" />
          <Avatar src={person.image} name={person.name} size="xl" />
          <div>
            <span className="same-badge">
              <Home size={13} /> Same university
            </span>
            <h1>{person.name}</h1>
            <p>{person.role} · 3rd year</p>
            <span>
              {person.school}, {person.country}
            </span>
          </div>
          <div className="hero-score">
            <b>96%</b>
            <span>match</span>
          </div>
        </section>
        <div className="profile-columns">
          <main>
            <section>
              <span className="mini-label">About</span>
              <h2>Turning complex data into decisions people can act on.</h2>
              <p>
                Applied statistics student focused on experimental design, human behaviour, and
                making research useful in real-world African contexts.
              </p>
            </section>
            <section>
              <span className="mini-label">Selected experience</span>
              <div className="experience">
                <div className="experience-icon">
                  <FileText size={20} />
                </div>
                <div>
                  <h3>Mobile money trust study</h3>
                  <p>
                    Designed and analysed a 600-person study on trust signals in digital payment
                    interfaces across Nairobi.
                  </p>
                  <span>Research assistant · 2023</span>
                </div>
              </div>
            </section>
            <section>
              <span className="mini-label">Skills & tools</span>
              <div className="selected-tags">
                {[
                  "Statistical modelling",
                  "R",
                  "Python",
                  "Survey design",
                  "A/B testing",
                  "Data storytelling",
                ].map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </section>
          </main>
          <aside className="fit-card">
            <Sparkles size={22} />
            <span className="mini-label">Why David fits</span>
            <h3>The quantitative lens your idea needs.</h3>
            <p>
              David can design a statistically sound study, measure which patterns influence trust,
              and help separate cultural preferences from device constraints.
            </p>
            <ul>
              <li>
                <CheckCircle2 size={17} /> Directly fills a required skill
              </li>
              <li>
                <CheckCircle2 size={17} /> Shared university context
              </li>
              <li>
                <CheckCircle2 size={17} /> Relevant mobile research
              </li>
            </ul>
            <Button onClick={invite}>
              {invited ? (
                <>
                  <Check size={17} /> Invitation sent
                </>
              ) : (
                <>
                  Invite to project <ArrowRight size={17} />
                </>
              )}
            </Button>
            <button className="text-link" onClick={() => go("matches")}>
              Back to results
            </button>
          </aside>
        </div>
      </div>
    </>
  );
}

const openProposals = [
  {
    title: "Mapping safer night routes around African campuses",
    summary:
      "A participatory mapping study exploring how lighting, transport, and social context shape students’ sense of safety after dark.",
    discipline: "Urban studies",
    university: "University of Cape Town",
    location: "South Africa",
    author: "Lerato Mokoena",
    authorImage:
      "https://images.unsplash.com/photo-1645620592218-cf03f0d8c778?auto=format&fit=crop&w=160&h=160&q=85",
    skills: ["GIS", "Data visualization", "Community research"],
    team: 2,
    spots: 2,
    posted: "2 days ago",
    featured: true,
  },
  {
    title: "Low-data learning tools for rural secondary schools",
    summary:
      "Testing offline-first learning patterns that help teachers share useful materials where connectivity and device access are limited.",
    discipline: "Education",
    university: "Makerere University",
    location: "Uganda",
    author: "Brian Okello",
    authorImage: people[2].image,
    skills: ["Mobile development", "Learning design", "Field research"],
    team: 3,
    spots: 1,
    posted: "4 days ago",
  },
  {
    title: "Predicting campus food waste before it happens",
    summary:
      "Combining kitchen operations data and student behaviour to help university dining halls prepare the right amount of food.",
    discipline: "Climate",
    university: "University of Nairobi",
    location: "Kenya",
    author: "David Mwangi",
    authorImage: people[0].image,
    skills: ["Machine learning", "Behavioural science", "Sustainability"],
    team: 2,
    spots: 2,
    posted: "1 week ago",
  },
  {
    title: "Making maternal health information easier to trust",
    summary:
      "Exploring how language, tone, and visual communication influence trust in mobile health guidance for first-time mothers.",
    discipline: "Public health",
    university: "University of Ghana",
    location: "Ghana",
    author: "Ama Owusu",
    authorImage: people[1].image,
    skills: ["Health research", "Psychology", "Content design"],
    team: 4,
    spots: 1,
    posted: "1 week ago",
  },
];

function BrowseProposals({ go }: { go: (screen: Screen) => void }) {
  const [query, setQuery] = useState("");
  const [discipline, setDiscipline] = useState("All");
  const [interested, setInterested] = useState<string[]>([]);
  const disciplines = ["All", "Design", "Technology", "Public health", "Climate", "Education"];
  const visibleProposals = openProposals.filter((proposal) => {
    const matchesQuery = `${proposal.title} ${proposal.summary} ${proposal.skills.join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesDiscipline =
      discipline === "All" ||
      proposal.discipline === discipline ||
      (discipline === "Technology" && proposal.skills.includes("Mobile development")) ||
      (discipline === "Design" && proposal.skills.some((skill) => skill.includes("design")));
    return matchesQuery && matchesDiscipline;
  });

  const toggleInterest = (title: string) => {
    setInterested((current) =>
      current.includes(title) ? current.filter((item) => item !== title) : [...current, title],
    );
  };

  return (
    <>
      <Topbar />
      <div className="page-content browse-page">
        <section className="browse-hero">
          <div>
            <span className="eyebrow">Open collaboration</span>
            <h1>Find an idea worth joining.</h1>
            <p>
              Explore student-led research across universities and discover where your perspective
              could move a project forward.
            </p>
          </div>
          <div className="browse-stat">
            <strong>48</strong>
            <span>open proposals across 11 disciplines</span>
          </div>
        </section>

        <section className="browse-tools">
          <div className="browse-search">
            <Search size={19} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by topic, skill, or research question"
            />
          </div>
          <div className="discipline-filters">
            {disciplines.map((item) => (
              <button
                key={item}
                className={discipline === item ? "active" : ""}
                onClick={() => setDiscipline(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <div className="browse-results-head">
          <div>
            <h2>Proposals looking for collaborators</h2>
            <span>{visibleProposals.length} proposals matched to your interests</span>
          </div>
          <button>
            Most relevant <ChevronDown size={15} />
          </button>
        </div>

        <div className="browse-grid">
          {visibleProposals.map((proposal) => {
            const hasInterest = interested.includes(proposal.title);
            return (
              <article className="browse-card" key={proposal.title}>
                <div className="browse-card-top">
                  <span className="discipline-label">{proposal.discipline}</span>
                  {proposal.featured && (
                    <span className="featured-label">
                      <Sparkles size={12} /> Strong fit
                    </span>
                  )}
                </div>
                <h3>{proposal.title}</h3>
                <p>{proposal.summary}</p>
                <div className="selected-tags">
                  {proposal.skills.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
                <div className="proposal-author">
                  <Avatar src={proposal.authorImage} name={proposal.author} size="sm" />
                  <div>
                    <strong>{proposal.author}</strong>
                    <span>
                      {proposal.university} · {proposal.location}
                    </span>
                  </div>
                </div>
                <div className="browse-card-meta">
                  <span>
                    <UsersRound size={15} /> {proposal.team} on team · {proposal.spots} open{" "}
                    {proposal.spots === 1 ? "spot" : "spots"}
                  </span>
                  <span>
                    <Clock3 size={14} /> {proposal.posted}
                  </span>
                </div>
                <div className="browse-card-actions">
                  <Button
                    kind={hasInterest ? "secondary" : "primary"}
                    onClick={() => toggleInterest(proposal.title)}
                  >
                    {hasInterest ? (
                      <>
                        <Check size={16} /> Interest sent
                      </>
                    ) : (
                      "I’m interested"
                    )}
                  </Button>
                  <button onClick={() => go("project")}>
                    View proposal <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        {visibleProposals.length === 0 && (
          <div className="browse-empty">
            <Search size={25} />
            <h3>No proposals found</h3>
            <p>Try another topic or clear your discipline filter.</p>
            <Button
              kind="secondary"
              onClick={() => {
                setQuery("");
                setDiscipline("All");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

function Proposals({ go }: { go: (screen: Screen) => void }) {
  return (
    <>
      <Topbar />
      <div className="page-content">
        <div className="list-heading">
          <div>
            <span className="eyebrow">Your ideas</span>
            <h1>My proposals</h1>
            <p>Everything you’re exploring, from first thought to active team.</p>
          </div>
          <div className="heading-actions">
            <Button kind="secondary" onClick={() => go("browse")}>
              <Compass size={17} /> Browse proposals
            </Button>
            <Button onClick={() => go("new")}>
              <Plus size={17} /> New proposal
            </Button>
          </div>
        </div>
        <div className="toolbar">
          <div className="input-icon">
            <Search size={17} />
            <input placeholder="Search proposals" />
          </div>
          <button>
            <ListFilter size={17} /> All statuses <ChevronDown size={15} />
          </button>
        </div>
        <div className="proposal-list large">
          <ProposalCard
            title="Design principles for Kenyan mobile users"
            status="Matching"
            date="Updated 2h ago"
            count="12 matches"
            onClick={() => go("matches")}
          />
          <ProposalCard
            title="Reducing food waste in campus kitchens"
            status="Refining"
            date="Updated yesterday"
            count="3 new prompts"
            onClick={() => go("refine")}
          />
          <ProposalCard
            title="Peer-led mental health check-ins"
            status="Draft"
            date="Updated 5 days ago"
            count="Draft"
            onClick={() => go("new")}
          />
          <ProposalCard
            title="Inclusive campus navigation"
            status="Active"
            date="Updated 2 weeks ago"
            count="Project live"
            onClick={() => go("project")}
          />
        </div>
      </div>
    </>
  );
}

function InboxScreen({ go }: { go: (screen: Screen) => void }) {
  const [tab, setTab] = useState("Received");
  return (
    <>
      <Topbar />
      <div className="page-content inbox-page">
        <div className="list-heading">
          <div>
            <span className="eyebrow">Connections</span>
            <h1>Matches inbox</h1>
            <p>Manage invitations and start building your team.</p>
          </div>
        </div>
        <div className="tabs">
          {["Received", "Sent", "Accepted"].map((item) => (
            <button
              key={item}
              className={tab === item ? "active" : ""}
              onClick={() => setTab(item)}
            >
              {item}
              {item === "Received" && <i>1</i>}
            </button>
          ))}
        </div>
        {tab === "Received" ? (
          <article className="invite-card">
            <Avatar src={people[1].image} name={people[1].name} size="md" />
            <div>
              <span className="mini-label">Project invitation</span>
              <h3>Solar-powered study spaces</h3>
              <p>
                <strong>{people[1].name}</strong> invited you to bring UX research skills to this
                project.
              </p>
              <div className="invite-details">
                <span>
                  <Clock3 size={14} /> 2 hours ago
                </span>
                <span>
                  <UsersRound size={14} /> 3 collaborators
                </span>
              </div>
            </div>
            <div className="invite-actions">
              <Button kind="secondary">Decline</Button>
              <Button onClick={() => go("project")}>Accept invitation</Button>
            </div>
          </article>
        ) : tab === "Sent" ? (
          <article className="invite-card">
            <Avatar src={people[0].image} name={people[0].name} size="md" />
            <div>
              <span className="mini-label">Invitation sent</span>
              <h3>Design principles for Kenyan mobile users</h3>
              <p>
                Waiting for <strong>{people[0].name}</strong> to respond.
              </p>
            </div>
            <span className="status matching">Pending</span>
          </article>
        ) : (
          <article className="invite-card" onClick={() => go("project")}>
            <div className="proposal-icon">
              <Check size={20} />
            </div>
            <div>
              <span className="mini-label">Active collaboration</span>
              <h3>Inclusive mobile design in Kenya</h3>
              <p>3 collaborators · Research stage</p>
            </div>
            <ArrowRight size={19} />
          </article>
        )}
      </div>
    </>
  );
}

function Project({ go }: { go: (screen: Screen) => void }) {
  const [stage, setStage] = useState(1);
  const [milestoneModal, setMilestoneModal] = useState(false);
  const [addedMilestone, setAddedMilestone] = useState(false);
  const stages = ["Forming", "Research", "Drafting", "Review", "Complete"];
  return (
    <>
      <Topbar
        title="Project workspace"
        back={() => go("home")}
        right={
          <button className="icon-button">
            <MoreHorizontal size={20} />
          </button>
        }
      />
      <div className="project-page">
        <div className="project-heading">
          <div>
            <span className="status active">Active project</span>
            <h1>Inclusive mobile design in Kenya</h1>
            <p>
              Understanding which interface patterns build trust and usability for Kenyan mobile
              users.
            </p>
          </div>
          <Button kind="secondary" onClick={() => go("chat")}>
            <MessageCircle size={18} /> Team chat <i>2</i>
          </Button>
        </div>
        <section className="stage-card">
          <div className="section-title">
            <div>
              <h2>Project journey</h2>
              <span>Keep the team aligned as work moves forward</span>
            </div>
            <button onClick={() => setStage(Math.min(stage + 1, 4))}>
              Advance stage <ArrowRight size={15} />
            </button>
          </div>
          <div className="stage-stepper">
            {stages.map((item, index) => (
              <div key={item} className={index <= stage ? "done" : ""}>
                <span>{index < stage ? <Check size={15} /> : index + 1}</span>
                <b>{item}</b>
              </div>
            ))}
          </div>
        </section>
        <div className="project-grid">
          <section>
            <div className="section-title">
              <div>
                <h2>Milestones</h2>
                <span>2 of 5 completed</span>
              </div>
              <button onClick={() => setMilestoneModal(true)}>
                <Plus size={15} /> Add milestone
              </button>
            </div>
            <div className="milestone-list">
              {[
                ["Define research question", "Mar 10", true, 0],
                ["Build participant research plan", "Mar 18", true, 1],
                ["Run interviews & survey", "Apr 02", false, 2],
                ["Synthesize design principles", "Apr 15", false, 0],
              ].map(([title, date, done, person], i) => (
                <div className={`milestone ${done ? "complete" : ""}`} key={String(title)}>
                  <button>{done ? <Check size={16} /> : null}</button>
                  <div>
                    <strong>{String(title)}</strong>
                    <span>
                      <Clock3 size={13} /> Due {String(date)}
                    </span>
                  </div>
                  <Avatar
                    src={[jane, people[0].image, people[1].image][Number(person)]}
                    name="Assignee"
                    size="sm"
                  />
                  <MoreHorizontal size={18} />
                </div>
              ))}
              {addedMilestone && (
                <div className="milestone">
                  <button />
                  <div>
                    <strong>Prepare interview synthesis</strong>
                    <span>
                      <Clock3 size={13} /> Due Apr 20
                    </span>
                  </div>
                  <Avatar src={jane} name="Jane" size="sm" />
                  <MoreHorizontal size={18} />
                </div>
              )}
            </div>
          </section>
          <aside>
            <section className="team-card">
              <div className="section-title">
                <div>
                  <h2>Your team</h2>
                  <span>3 disciplines</span>
                </div>
              </div>
              {[
                { name: "Jane Wanjiku", role: "Product design & CS", image: jane },
                people[0],
                people[1],
              ].map((person) => (
                <div className="team-member" key={person.name}>
                  <Avatar src={person.image} name={person.name} size="sm" />
                  <div>
                    <strong>{person.name}</strong>
                    <span>{"role" in person ? person.role : ""}</span>
                  </div>
                  <span className="online" />
                </div>
              ))}
            </section>
            <section className="activity-card">
              <div className="section-title">
                <div>
                  <h2>Recent activity</h2>
                </div>
              </div>
              <div className="activity">
                <span />
                <p>
                  <strong>David</strong> completed the research plan.<small>45 min ago</small>
                </p>
              </div>
              <div className="activity">
                <span />
                <p>
                  <strong>Ama</strong> added 3 resources.<small>Yesterday</small>
                </p>
              </div>
            </section>
          </aside>
        </div>
        {milestoneModal && (
          <div className="modal-backdrop" onClick={() => setMilestoneModal(false)}>
            <section className="modal" onClick={(event) => event.stopPropagation()}>
              <button className="modal-close" onClick={() => setMilestoneModal(false)}>
                <X size={20} />
              </button>
              <span className="eyebrow">New milestone</span>
              <h2>Plan the next step.</h2>
              <label className="field">
                <span>Milestone name</span>
                <input defaultValue="Prepare interview synthesis" />
              </label>
              <label className="field">
                <span>Due date</span>
                <input type="date" defaultValue="2025-04-20" />
              </label>
              <Button
                onClick={() => {
                  setAddedMilestone(true);
                  setMilestoneModal(false);
                }}
              >
                Add milestone
              </Button>
            </section>
          </div>
        )}
      </div>
    </>
  );
}

function Chat({ go }: { go: (screen: Screen) => void }) {
  const [messages, setMessages] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  return (
    <>
      <Topbar
        title="Team chat"
        back={() => go("project")}
        right={
          <div className="avatar-stack">
            {people.slice(0, 2).map((p) => (
              <Avatar key={p.name} src={p.image} name={p.name} size="sm" />
            ))}
            <Avatar src={jane} name="Jane" size="sm" />
          </div>
        }
      />
      <div className="project-chat">
        <div className="date-divider">
          <span>Today</span>
        </div>
        <div className="chat-line">
          <Avatar src={people[0].image} name={people[0].name} size="sm" />
          <div>
            <span>
              <strong>David</strong> 9:42 AM
            </span>
            <p>
              I’ve added a first pass at the sampling plan. I think we should split by device type
              and data usage.
            </p>
          </div>
        </div>
        <div className="chat-line">
          <Avatar src={people[1].image} name={people[1].name} size="sm" />
          <div>
            <span>
              <strong>Ama</strong> 10:05 AM
            </span>
            <p>
              Agreed. I can draft the behaviour and trust questions today, then we can compare notes
              tomorrow.
            </p>
          </div>
        </div>
        <div className="chat-line mine">
          <div>
            <span>
              <strong>You</strong> 10:18 AM
            </span>
            <p>Perfect. I’ll prepare the prototype screens we can use in the interviews.</p>
          </div>
        </div>
        {messages.map((message, index) => (
          <div className="chat-line mine" key={index}>
            <div>
              <span>
                <strong>You</strong> just now
              </span>
              <p>{message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-bar">
        <button>
          <Paperclip size={20} />
        </button>
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Message your team..."
          onKeyDown={(event) => {
            if (event.key === "Enter" && draft) {
              setMessages([...messages, draft]);
              setDraft("");
            }
          }}
        />
        <button
          className="send-button"
          onClick={() => {
            if (draft) {
              setMessages([...messages, draft]);
              setDraft("");
            }
          }}
        >
          <Send size={18} />
        </button>
      </div>
    </>
  );
}

function Profile({ go }: { go: (screen: Screen) => void }) {
  return (
    <>
      <Topbar />
      <div className="page-content profile-page">
        <section className="my-profile-header">
          <div className="profile-cover" />
          <div className="profile-identity">
            <Avatar src={jane} name="Jane" size="xl" />
            <div>
              <h1>Jane Wanjiku</h1>
              <p>Computer Science · 2nd year</p>
              <span>University of Nairobi, Kenya</span>
            </div>
            <Button kind="secondary" onClick={() => go("onboarding")}>
              Edit profile
            </Button>
          </div>
        </section>
        <div className="profile-dashboard">
          <main>
            <section className="content-card">
              <span className="mini-label">About</span>
              <p>
                CS student and product designer interested in how technology can better reflect the
                communities that use it.
              </p>
            </section>
            <section className="content-card">
              <span className="mini-label">Skills & interests</span>
              <div className="selected-tags">
                {[
                  "Product design",
                  "UX research",
                  "Computer science",
                  "Kenyan apps",
                  "Mobile interfaces",
                ].map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </section>
            <section className="content-card">
              <span className="mini-label">Past work</span>
              <div className="experience">
                <div className="experience-icon">
                  <FileText size={20} />
                </div>
                <div>
                  <h3>Student budgeting app</h3>
                  <p>
                    Led UX research and interaction design for a tool used by more than 400
                    students.
                  </p>
                  <span>Product designer · 2023</span>
                </div>
              </div>
            </section>
          </main>
          <aside>
            <section className="strength-card">
              <div className="ring big">
                <b>86</b>
                <small>%</small>
              </div>
              <h3>Strong profile</h3>
              <p>Add one more past project to improve the quality of your matches.</p>
              <button onClick={() => go("onboarding")}>
                Complete profile <ArrowRight size={15} />
              </button>
            </section>
            <section className="settings-card">
              <button>
                <Settings size={18} /> Account settings <ArrowRight size={16} />
              </button>
              <button onClick={() => go("auth")}>
                <LogOut size={18} /> Log out <ArrowRight size={16} />
              </button>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("auth");
  const [terms, setTerms] = useState(false);
  const [invited, setInvited] = useState(false);
  const [toast, setToast] = useState("");

  const go = (next: Screen) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const invite = () => {
    setInvited(true);
    setToast("Invitation sent to David");
    window.setTimeout(() => setToast(""), 2800);
  };

  const render = () => {
    switch (screen) {
      case "auth":
        return <Auth go={go} openTerms={() => setTerms(true)} />;
      case "onboarding":
        return <Onboarding go={go} />;
      case "home":
        return <HomeScreen go={go} />;
      case "new":
        return <NewProposal go={go} />;
      case "refine":
        return <Refine go={go} />;
      case "summary":
        return <Summary go={go} />;
      case "matches":
        return <Matches go={go} invited={invited} invite={invite} />;
      case "collaborator":
        return (
          <Collaborator
            go={go}
            invited={invited}
            invite={() => {
              invite();
              go("matches");
            }}
          />
        );
      case "proposals":
        return <Proposals go={go} />;
      case "browse":
        return <BrowseProposals go={go} />;
      case "inbox":
        return <InboxScreen go={go} />;
      case "project":
        return <Project go={go} />;
      case "chat":
        return <Chat go={go} />;
      case "profile":
        return <Profile go={go} />;
    }
  };

  const authLike = screen === "auth" || screen === "onboarding";
  return (
    <Shell screen={screen} go={go} hideNav={authLike}>
      {render()}
      {terms && (
        <div className="modal-backdrop" onClick={() => setTerms(false)}>
          <section className="modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setTerms(false)}>
              <X size={20} />
            </button>
            <LockKeyhole size={25} />
            <span className="eyebrow">Your trust matters</span>
            <h2>Terms & privacy</h2>
            <p>
              Towers uses your university identity and profile details to help you discover relevant
              research collaborators. We never sell personal information, and you control what
              appears on your public profile.
            </p>
            <p>
              By continuing, you agree to use Towers respectfully and only for genuine academic
              collaboration.
            </p>
            <Button onClick={() => setTerms(false)}>I understand</Button>
          </section>
        </div>
      )}
      {toast && (
        <div className="toast">
          <CheckCircle2 size={18} />
          {toast}
          <button onClick={() => go("inbox")}>View inbox</button>
        </div>
      )}
    </Shell>
  );
}
