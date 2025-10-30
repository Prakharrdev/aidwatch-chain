import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Package, MapPin, CheckCircle2, Clock, TruckIcon, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Tracking = () => {
  const aidPackage = {
    id: "AID-2024-0547",
    donor: "Global Relief Fund",
    amount: "$50,000",
    items: "Medical Supplies, Food Packages, Water Filters",
    beneficiary: "Flood Relief - Region 5",
    startDate: "March 15, 2024",
    estimatedDelivery: "March 22, 2024",
    currentStatus: "in-transit",
    blockchainHash: "0x742d35a8f9c1e4b6d2a8c5f3e1b9a7d4c2e6f8a3",
  };

  const timeline = [
    {
      status: "completed",
      title: "Donation Received",
      description: "Funds received from Global Relief Fund",
      location: "Smart Contract Wallet",
      timestamp: "Mar 15, 2024 - 09:30 AM",
      txHash: "0x742d...a3f9",
    },
    {
      status: "completed",
      title: "Procurement Complete",
      description: "Medical supplies and essentials procured",
      location: "Distribution Center - City A",
      timestamp: "Mar 16, 2024 - 02:15 PM",
      txHash: "0x8a1c...b2e4",
    },
    {
      status: "completed",
      title: "Quality Verification",
      description: "All items verified by independent auditor",
      location: "Quality Control Station",
      timestamp: "Mar 17, 2024 - 11:00 AM",
      txHash: "0x3f7d...c8a1",
    },
    {
      status: "active",
      title: "In Transit",
      description: "Package en route to destination",
      location: "Highway Checkpoint - Zone 3",
      timestamp: "Mar 19, 2024 - 08:45 AM",
      txHash: "0x9e2a...d5f7",
    },
    {
      status: "pending",
      title: "Final Delivery",
      description: "Awaiting delivery to beneficiaries",
      location: "Flood Relief - Region 5",
      timestamp: "Estimated: Mar 22, 2024",
      txHash: "Pending...",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-6 h-6 text-success" />;
      case "active":
        return <TruckIcon className="w-6 h-6 text-warning animate-pulse-subtle" />;
      case "pending":
        return <Clock className="w-6 h-6 text-muted-foreground" />;
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
              <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition">
                Dashboard
              </Link>
              <Link to="/tracking" className="text-sm font-medium text-primary">
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
        {/* Package Header */}
        <Card className="p-8 mb-8 animate-slide-up">
          <div className="flex items-start justify-between mb-6">
            <div>
              <Badge variant="warning" className="mb-3">
                <Clock className="w-3 h-3 mr-1" />
                In Transit
              </Badge>
              <h1 className="text-3xl font-bold text-foreground mb-2">Aid Package Tracking</h1>
              <p className="text-muted-foreground">Package ID: {aidPackage.id}</p>
            </div>
            <Button variant="hero">
              <Package className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Donor</p>
              <p className="text-lg font-semibold text-foreground">{aidPackage.donor}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Amount</p>
              <p className="text-lg font-semibold text-primary">{aidPackage.amount}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Beneficiary</p>
              <p className="text-lg font-semibold text-foreground">{aidPackage.beneficiary}</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Blockchain Transaction Hash</p>
            <p className="font-mono text-sm text-primary">{aidPackage.blockchainHash}</p>
          </div>
        </Card>

        {/* Timeline */}
        <Card className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Delivery Timeline</h2>
          </div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="relative animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                {/* Connection Line */}
                {index < timeline.length - 1 && (
                  <div
                    className={`absolute left-[13px] top-12 w-0.5 h-16 ${
                      item.status === "completed" ? "bg-success" : "bg-border"
                    }`}
                  />
                )}

                <div className="flex gap-4">
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                      item.status === "completed"
                        ? "bg-success/10"
                        : item.status === "active"
                        ? "bg-warning/10"
                        : "bg-muted"
                    }`}
                  >
                    <div className="w-3 h-3">{getStatusIcon(item.status)}</div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="p-5 border border-border rounded-lg hover:border-primary/50 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {item.location}
                          </div>
                        </div>
                        <Badge
                          variant={
                            item.status === "completed"
                              ? "success"
                              : item.status === "active"
                              ? "warning"
                              : "secondary"
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground font-mono">{item.txHash}</span>
                          {item.status !== "pending" && (
                            <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                              Verify
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Verification Info */}
        <Card className="mt-8 p-8 bg-gradient-success text-success-foreground">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Verified & Tracked</h3>
              <p className="text-success-foreground/90 mb-4">
                Every milestone is cryptographically verified and permanently recorded on the blockchain for complete transparency.
              </p>
              <Button variant="outline" className="bg-background text-success hover:bg-background/90">
                View Full Audit Trail
              </Button>
            </div>
            <CheckCircle2 className="w-32 h-32 text-success-foreground/20" />
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Tracking;
