import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, TrendingUp, Users, Package, ChevronRight, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    { label: "Total Aid Packages", value: "1,247", icon: Package, trend: "+12.3%" },
    { label: "Active Donors", value: "342", icon: Users, trend: "+8.1%" },
    { label: "Verified Deliveries", value: "1,089", icon: CheckCircle2, trend: "+15.7%" },
    { label: "Funds Distributed", value: "$2.4M", icon: TrendingUp, trend: "+23.4%" },
  ];

  const recentTransactions = [
    {
      id: "TX-2024-001247",
      donor: "Global Relief Fund",
      amount: "$50,000",
      beneficiary: "Flood Relief - Region 5",
      status: "completed",
      timestamp: "2 hours ago",
      hash: "0x742d...a3f9",
    },
    {
      id: "TX-2024-001246",
      donor: "Healthcare Initiative",
      amount: "$25,000",
      beneficiary: "Medical Supplies - District 12",
      status: "in-transit",
      timestamp: "5 hours ago",
      hash: "0x8a1c...b2e4",
    },
    {
      id: "TX-2024-001245",
      donor: "Education Fund",
      amount: "$15,000",
      beneficiary: "School Reconstruction - Zone 3",
      status: "pending",
      timestamp: "8 hours ago",
      hash: "0x3f7d...c8a1",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "in-transit":
        return "warning";
      case "pending":
        return "secondary";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "in-transit":
        return <Clock className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

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
              <Link to="/dashboard" className="text-sm font-medium text-primary">
                Dashboard
              </Link>
              <Link to="/tracking" className="text-sm font-medium text-muted-foreground hover:text-foreground transition">
                Tracking
              </Link>
              <Link to="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition">
                Verification
              </Link>
              <Button variant="outline" size="sm">
                Connect Wallet
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-all animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-success border-success/50">
                    {stat.trend}
                  </Badge>
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            );
          })}
        </div>

        {/* Recent Transactions */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">Recent Blockchain Transactions</h2>
              <p className="text-sm text-muted-foreground">Real-time verified aid distribution on the blockchain</p>
            </div>
            <Button variant="outline">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="space-y-4">
            {recentTransactions.map((tx, index) => (
              <div
                key={tx.id}
                className="p-5 border border-border rounded-lg hover:border-primary/50 hover:shadow-md transition-all animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant={getStatusColor(tx.status) as any} className="flex items-center gap-1">
                        {getStatusIcon(tx.status)}
                        {tx.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-mono">{tx.hash}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{tx.donor}</h3>
                    <p className="text-sm text-muted-foreground">{tx.beneficiary}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary mb-1">{tx.amount}</p>
                    <p className="text-xs text-muted-foreground">{tx.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">Transaction ID: {tx.id}</span>
                  <Button variant="link" size="sm" className="h-auto p-0">
                    View Details
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Blockchain Verification Banner */}
        <Card className="mt-8 p-8 bg-gradient-primary text-primary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">100% Transparent & Immutable</h3>
              <p className="text-primary-foreground/90 mb-4">
                Every transaction is recorded on the blockchain with cryptographic verification, ensuring complete transparency and preventing tampering.
              </p>
              <Button variant="outline" className="bg-background text-primary hover:bg-background/90">
                Learn About Our Technology
              </Button>
            </div>
            <Shield className="w-32 h-32 text-primary-foreground/20" />
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
