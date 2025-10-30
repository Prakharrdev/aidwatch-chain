import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp, Lock, Eye, Zap, CheckCircle2, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Blockchain Ledger",
      description: "Immutable records of every aid movement from donors to beneficiaries with cryptographic verification.",
    },
    {
      icon: Eye,
      title: "Transparency Dashboard",
      description: "Real-time tracking for donors and public to verify fund usage and relief delivery status.",
    },
    {
      icon: Lock,
      title: "Smart Contracts",
      description: "Automated fund release upon verified delivery milestones, ensuring accountability.",
    },
    {
      icon: Users,
      title: "Role-Based Access",
      description: "Secure permissions for NGOs, government agencies, and donors with audit trails.",
    },
  ];

  const stats = [
    { value: "$2.4M+", label: "Distributed" },
    { value: "1,089", label: "Verified Deliveries" },
    { value: "342", label: "Active Donors" },
    { value: "100%", label: "Transparent" },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-foreground">AidChain</span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition">
                Dashboard
              </Link>
              <Link to="/tracking" className="text-sm font-medium text-muted-foreground hover:text-foreground transition">
                Tracking
              </Link>
              <Link to="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition">
                Features
              </Link>
              <Button variant="hero" size="sm">
                Get Started
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center animate-slide-up">
          <Badge className="mb-6 text-sm px-4 py-2" variant="outline">
            <Zap className="w-4 h-4 mr-2" />
            Blockchain-Powered Disaster Aid Tracking
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Transparency in
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Disaster Relief</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Track every dollar, verify every delivery. Our blockchain platform ensures complete transparency and accountability in
            disaster aid distribution.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button variant="hero" size="lg">
                View Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/tracking">
              <Button variant="outline" size="lg">
                Track Aid
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-lg transition-all animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">
            Features
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">Built for Trust & Accountability</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge blockchain technology combined with intuitive interfaces for complete aid transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-8 hover:shadow-lg hover:border-primary/50 transition-all animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">
            Process
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">How AidChain Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From donation to delivery, every step is verified and recorded on the blockchain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              step: "01",
              title: "Donation Recorded",
              description: "Funds are received and immediately logged on the blockchain with smart contract activation.",
            },
            {
              step: "02",
              title: "Aid Procurement & Transit",
              description:
                "Each procurement and logistics milestone is verified by independent auditors and recorded immutably.",
            },
            {
              step: "03",
              title: "Verified Delivery",
              description:
                "Final delivery confirmation triggers smart contract release and updates all stakeholders in real-time.",
            },
          ].map((step, index) => (
            <div key={index} className="relative animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              {index < 2 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-border">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <ArrowRight className="w-5 h-5 text-border" />
                  </div>
                </div>
              )}
              <Card className="p-8 relative z-10 hover:shadow-lg transition-all">
                <div className="text-5xl font-bold text-primary/20 mb-4">{step.step}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="p-12 bg-gradient-primary text-primary-foreground text-center max-w-4xl mx-auto">
          <CheckCircle2 className="w-16 h-16 mx-auto mb-6 text-primary-foreground/80" />
          <h2 className="text-3xl font-bold mb-4">Ready to Ensure Transparency?</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of organizations using AidChain to track and verify disaster relief aid with complete transparency.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" size="lg" className="bg-background text-primary hover:bg-background/90">
              Request Demo
            </Button>
            <Link to="/dashboard">
              <Button variant="secondary" size="lg">
                Explore Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-bold text-foreground">AidChain</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 AidChain. Powered by blockchain technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
