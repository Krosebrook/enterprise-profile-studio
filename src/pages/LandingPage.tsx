import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Building2, 
  ArrowRight, 
  Shield, 
  Zap, 
  Globe,
  Users,
  BarChart3,
  CheckCircle2
} from 'lucide-react';

const features = [
  {
    icon: <Building2 className="h-6 w-6" />,
    title: 'Professional Profiles',
    description: 'Create stunning enterprise profiles that showcase your company\'s strengths and capabilities.',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Compliance Ready',
    description: 'Display certifications, compliance standards, and security credentials with confidence.',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Quick Setup',
    description: 'Guided wizard walks you through each section. Complete your profile in minutes.',
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Share Anywhere',
    description: 'Publish and share your profile with a unique URL. Export to PDF for offline use.',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Team Showcase',
    description: 'Highlight your leadership team and key personnel with rich profiles.',
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: 'Analytics',
    description: 'Track profile views and engagement with built-in analytics.',
  },
];

const benefits = [
  'Streamlined profile creation process',
  'Professional, modern design templates',
  'Secure data storage and privacy',
  'Version history and revisions',
  'Team collaboration features',
  'Export and share capabilities',
];

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden pb-24 pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.1),transparent_50%)]" />
        
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
              <Zap className="h-4 w-4 text-primary" />
              Build your enterprise presence in minutes
            </div>
            
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Create Professional
              <span className="text-gradient block">Enterprise Profiles</span>
            </h1>
            
            <p className="mt-6 text-lg text-white/70 md:text-xl">
              Showcase your company's capabilities, team, services, and compliance credentials 
              with beautiful, shareable enterprise profiles.
            </p>
            
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button 
                asChild 
                size="lg" 
                className="primary-gradient border-0 px-8 shadow-glow"
              >
                <Link to={user ? '/dashboard' : '/signup'}>
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Everything you need to
              <span className="text-gradient"> stand out</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Build comprehensive enterprise profiles with our intuitive tools
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {feature.icon}
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-y border-border bg-muted/30 py-24">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Built for modern
                <span className="text-gradient"> enterprises</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Whether you're a startup or an established enterprise, our platform 
                helps you create professional profiles that win trust and business.
              </p>
              
              <ul className="mt-8 space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                asChild 
                size="lg" 
                className="primary-gradient mt-8 border-0"
              >
                <Link to={user ? '/dashboard' : '/signup'}>
                  Start Building
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl" />
              <div className="relative rounded-2xl border border-border bg-card p-8 shadow-xl">
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl primary-gradient flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold">Acme Corporation</h3>
                    <p className="text-muted-foreground">Technology • Since 2020</p>
                  </div>
                </div>
                <p className="mb-6 text-muted-foreground">
                  Leading provider of innovative enterprise solutions, serving Fortune 500 
                  companies worldwide with cutting-edge technology.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-success/10 px-3 py-1 text-sm text-success">SOC 2</span>
                  <span className="rounded-full bg-success/10 px-3 py-1 text-sm text-success">ISO 27001</span>
                  <span className="rounded-full bg-success/10 px-3 py-1 text-sm text-success">GDPR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl hero-gradient px-8 py-16 text-center md:px-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.2),transparent_70%)]" />
            
            <div className="relative">
              <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                Ready to build your enterprise profile?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
                Join thousands of companies using ProfileBuilder to showcase their 
                capabilities and win new business.
              </p>
              <Button 
                asChild 
                size="lg" 
                className="mt-8 bg-white text-foreground hover:bg-white/90"
              >
                <Link to={user ? '/dashboard' : '/signup'}>
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
