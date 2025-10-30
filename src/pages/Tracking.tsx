import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Package, MapPin, CheckCircle2, Clock, TruckIcon, Search, AlertCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { WalletButton } from "@/components/WalletButton";
import { useWeb3 } from "@/contexts/Web3Context";
import { useContractData, ScanLogData } from "@/hooks/useContractData";
import { useState } from "react";
import { STAGE_NAMES } from "@/config/contract";

const Tracking = () => {
  const { isConnected } = useWeb3();
  const { getAssetHistory, getAssetData } = useContractData();
  const [assetId, setAssetId] = useState("");
  const [history, setHistory] = useState<ScanLogData[]>([]);
  const [assetData, setAssetData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!assetId || !isConnected) return;
    
    setLoading(true);
    setSearched(true);
    try {
      const [data, logs] = await Promise.all([
        getAssetData(assetId),
        getAssetHistory(assetId)
      ]);
      setAssetData(data);
      setHistory(logs);
    } catch (error) {
      console.error("Error fetching asset:", error);
      setAssetData(null);
      setHistory([]);
    }
    setLoading(false);
  };

  const getStatusIcon = (currentStage: number, itemStage: number) => {
    if (itemStage < currentStage) {
      return <CheckCircle2 className="w-6 h-6 text-success" />;
    } else if (itemStage === currentStage) {
      return <TruckIcon className="w-6 h-6 text-warning animate-pulse-subtle" />;
    } else {
      return <Clock className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (currentStage: number, itemStage: number) => {
    if (itemStage < currentStage) {
      return "success";
    } else if (itemStage === currentStage) {
      return "warning";
    } else {
      return "secondary";
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
              <WalletButton />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <Card className="p-8 mb-8 animate-slide-up">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Track Aid Package</h1>
            <p className="text-muted-foreground">Enter the Asset ID to track its journey on the blockchain</p>
          </div>

          {!isConnected ? (
            <div className="p-6 bg-warning/10 border border-warning/50 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-warning" />
                <div>
                  <h3 className="font-semibold text-foreground">Wallet Not Connected</h3>
                  <p className="text-sm text-muted-foreground">Please connect your wallet to track assets on the blockchain.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <Input
                placeholder="Enter Asset ID (e.g., 0x742d35a8f9c1...)"
                value={assetId}
                onChange={(e) => setAssetId(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button onClick={handleSearch} disabled={loading || !assetId}>
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Search className="w-4 h-4 mr-2" />
                )}
                Search
              </Button>
            </div>
          )}
        </Card>

        {/* Results */}
        {searched && isConnected && (
          <>
            {loading ? (
              <Card className="p-12">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Loading asset data from blockchain...</p>
                </div>
              </Card>
            ) : assetData ? (
              <>
                {/* Package Header */}
                <Card className="p-8 mb-8 animate-slide-up">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant={getStatusBadge(assetData.currentStage, assetData.currentStage) as any}>
                          {assetData.stageName}
                        </Badge>
                        {assetData.isFlagged && (
                          <Badge variant="destructive">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Flagged
                          </Badge>
                        )}
                      </div>
                      <h2 className="text-3xl font-bold text-foreground mb-2">{assetData.description}</h2>
                      <p className="text-sm text-muted-foreground font-mono">Asset ID: {assetData.id}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Donor</p>
                      <p className="text-sm font-mono text-foreground">{assetData.donor.slice(0, 6)}...{assetData.donor.slice(-4)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Allocated Funds</p>
                      <p className="text-lg font-semibold text-primary">{parseFloat(assetData.allocatedFunds).toFixed(4)} ETH</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Assigned NGO</p>
                      <p className="text-sm font-mono text-foreground">{assetData.assignedNGO.slice(0, 6)}...{assetData.assignedNGO.slice(-4)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Funds Released</p>
                      <p className="text-2xl font-bold text-success">{parseFloat(assetData.releasedFunds).toFixed(4)} ETH</p>
                      <p className="text-xs text-muted-foreground mt-1">{assetData.fundsReleasedPercentage}% of total</p>
                    </div>
                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Progress</p>
                      <p className="text-2xl font-bold text-primary">{assetData.progressPercentage}%</p>
                      <p className="text-xs text-muted-foreground mt-1">{assetData.scansCount} scans recorded</p>
                    </div>
                  </div>
                </Card>

                {/* Timeline */}
                <Card className="p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <MapPin className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Delivery Timeline</h2>
                  </div>

                  {history.length > 0 ? (
                    <div className="space-y-8">
                      {history.map((item, index) => (
                        <div key={index} className="relative animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                          {/* Connection Line */}
                          {index < history.length - 1 && (
                            <div
                              className={`absolute left-[13px] top-12 w-0.5 h-16 ${
                                item.stage <= assetData.currentStage ? "bg-success" : "bg-border"
                              }`}
                            />
                          )}

                          <div className="flex gap-4">
                            {/* Icon */}
                            <div
                              className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                                item.stage < assetData.currentStage
                                  ? "bg-success/10"
                                  : item.stage === assetData.currentStage
                                  ? "bg-warning/10"
                                  : "bg-muted"
                              }`}
                            >
                              <div className="w-3 h-3">{getStatusIcon(assetData.currentStage, item.stage)}</div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 pb-8">
                              <div className={`p-5 border rounded-lg transition-all ${
                                item.anomalyFlagged 
                                  ? "border-destructive bg-destructive/5" 
                                  : "border-border hover:border-primary/50 hover:shadow-md"
                              }`}>
                                <div className="flex items-start justify-between mb-3">
                                  <div>
                                    <div className="flex items-center gap-2 mb-2">
                                      <h3 className="text-lg font-semibold text-foreground">{item.stageName}</h3>
                                      {item.anomalyFlagged && (
                                        <Badge variant="destructive" className="text-xs">
                                          <AlertCircle className="w-3 h-3 mr-1" />
                                          Anomaly Detected
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">{item.notes}</p>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                      <MapPin className="w-3 h-3" />
                                      {item.geoTag}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                      Scanner: {item.scanner.slice(0, 6)}...{item.scanner.slice(-4)}
                                    </p>
                                  </div>
                                  <Badge variant={getStatusBadge(assetData.currentStage, item.stage) as any}>
                                    {item.stage <= assetData.currentStage ? "Completed" : "Pending"}
                                  </Badge>
                                </div>
                                <div className="flex items-center justify-between pt-3 border-t border-border text-xs text-muted-foreground">
                                  <span>{new Date(item.timestamp * 1000).toLocaleString()}</span>
                                  {item.photoHash !== "0x0000000000000000000000000000000000000000000000000000000000000000" && (
                                    <span className="font-mono">Photo: {item.photoHash.slice(0, 10)}...</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                      <p className="text-muted-foreground">No tracking history available yet</p>
                    </div>
                  )}
                </Card>
              </>
            ) : (
              <Card className="p-12">
                <div className="text-center">
                  <AlertCircle className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Asset Not Found</h3>
                  <p className="text-muted-foreground">No asset found with this ID. Please check and try again.</p>
                </div>
              </Card>
            )}
          </>
        )}

        {/* Blockchain Verification Banner */}
        {!searched && isConnected && (
          <Card className="mt-8 p-8 bg-gradient-primary text-primary-foreground">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Real-Time Blockchain Tracking</h3>
                <p className="text-primary-foreground/90 mb-4">
                  Every scan and movement is recorded on the blockchain with cryptographic verification, ensuring complete transparency.
                </p>
                <Badge variant="outline" className="bg-background text-primary">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  100% Transparent & Immutable
                </Badge>
              </div>
              <Shield className="w-32 h-32 text-primary-foreground/20" />
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Tracking;
