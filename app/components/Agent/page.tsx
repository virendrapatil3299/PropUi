"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Star, Search, Phone } from "lucide-react";

type Agent = {
  name: string;
  link: string;
  username: string;
  encodedZuid: string;
  imageUrl?: string;
  isTopAgent?: boolean;
  profileData?: { data: string; label: string }[];
  reviewInformation?: { rating: number; totalReviews: string };
  brokerage?: string;
  phone?: string;
};

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [location, setLocation] = useState("10001");
  const [agentName, setAgentName] = useState("");
  const [filter, setFilter] = useState("");
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/agents?location=${location}&agentName=${agentName}&page=${page}&filter=${filter}`
        );
        const data = await res.json();
        const newAgents = data?.agents || [];
        if (page === 1) {
          setAgents(newAgents);
        } else {
          setAgents((prev) => [...prev, ...newAgents]);
        }
        setTotal(data?.total || 0);
        setHasMore(newAgents.length > 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, [page, location, agentName, filter]);

  const handleSearch = () => {
    setPage(1);
    setHasMore(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Background */}
      <div className="relative h-[350px] w-full">
        <img
          src="/find.jpg"
          alt="Real Estate Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Find Real Estate Agents
          </motion.h1>

          {/* Search Bar inside Hero */}
          <motion.div
            className="flex flex-col md:flex-row gap-3 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg max-w-2xl w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Input
              placeholder="Enter location (zip code)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 rounded-xl"
            />
            <Input
              placeholder="Search by agent name"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              className="flex-1 rounded-xl"
            />
            <Button
              onClick={handleSearch}
              className="rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 text-white shadow-md"
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Filters */}
          <motion.div
            className="flex flex-wrap gap-3 items-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {["buying", "selling", "top"].map((f) => (
              <motion.div key={f} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Badge
                  onClick={() => {
                    setFilter(f);
                    setPage(1);
                  }}
                  className={`cursor-pointer px-4 py-2 text-sm rounded-xl transition ${
                    filter === f
                      ? "bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 text-white shadow"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {f === "top" ? "⭐ Top Agent" : f.charAt(0).toUpperCase() + f.slice(1)}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* Total Results */}
          {total > 0 && (
            <p className="text-gray-700 mb-6">
              <span className="font-semibold">{total.toLocaleString()}</span> agents found
            </p>
          )}

          {/* Agent Cards */}
          <AnimatePresence>
            {agents.length > 0 ? (
              <motion.div
                className="grid md:grid-cols-2 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {agents.map((agent, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className="hover:scale-[1.02] hover:shadow-lg transition rounded-2xl overflow-hidden border border-gray-200 bg-white">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-4">
                          {agent.imageUrl ? (
                            <img
                              src={agent.imageUrl}
                              alt={agent.name}
                              className={`w-16 h-16 rounded-full object-cover border-4 ${
                                agent.isTopAgent
                                  ? "border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.6)]"
                                  : "border-gray-300"
                              }`}
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-700 to-purple-500 text-white flex items-center justify-center text-xl font-bold">
                              {agent.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <a
                              href={agent.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-lg font-bold text-gray-900 hover:text-purple-700 transition"
                            >
                              {agent.name}
                            </a>
                            <p className="text-sm text-gray-500">
                              {agent.brokerage || "No Brokerage Info"}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 text-sm text-gray-700 space-y-1">
                          {agent.reviewInformation && (
                            <p className="flex items-center">
                              <Star className="w-4 h-4 text-purple-600 mr-1" />
                              {agent.reviewInformation.rating} (
                              {agent.reviewInformation.totalReviews} reviews)
                            </p>
                          )}
                          {agent.profileData?.map((item, idx) => (
                            <p key={idx}>
                              <span className="font-semibold">{item.data}</span> {item.label}
                            </p>
                          ))}
                        </div>

                        <div className="mt-4 flex gap-3">
                          <Button
                            asChild
                            className="flex-1 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 text-white shadow hover:scale-105 transition"
                          >
                            <a href={agent.link} target="_blank" rel="noopener noreferrer">
                              View on Zillow
                            </a>
                          </Button>
                          {agent.phone && (
                            <Button
                              variant="outline"
                              asChild
                              className="rounded-xl border-2 border-purple-600 hover:bg-purple-50"
                            >
                              <a href={`tel:${agent.phone}`}>
                                <Phone className="w-4 h-4 text-purple-700" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : loading ? (
              <p className="flex items-center gap-2 text-gray-500">
                <Loader2 className="animate-spin h-5 w-5" /> Loading agents...
              </p>
            ) : (
              <p className="text-gray-500">No agents found.</p>
            )}
          </AnimatePresence>

          {/* Load More */}
          <div className="flex justify-center mt-10">
            {hasMore && !loading && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="px-10 py-3 rounded-2xl bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 text-white font-semibold shadow-lg"
                >
                  Load More
                </Button>
              </motion.div>
            )}
            {loading && <Loader2 className="animate-spin h-6 w-6 text-purple-600" />}
          </div>
        </div>
      </div>
    </div>
  );
}
