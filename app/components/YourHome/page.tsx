"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { db } from "../../../lib/db";
import { listings } from "@/lib/db/schema";

export default function AddPropertyForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    listingType: "",
    title: "",
    description: "",
    type: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    price: "",
    hoa: "",
    taxes: "",
    yearBuilt: "",
    parking: "",
    furnishing: "",
    status: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    neighborhood: "",
    latitude: "",
    longitude: "",
    mapLink: "",
    owner: "",
    phone: "",
    email: "",
    video: "",
    tour3D: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await db.insert(listings).values(form);
      alert(`Your property has been listed as ${form.listingType}!`);
    } catch (err) {
      console.error("Error saving property:", err);
      alert("Failed to save property!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto p-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        🏡 Add New Property
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left: Property Section */}
        <Card className="md:col-span-2 rounded-2xl shadow-lg border border-gray-200">
          <CardContent className="p-8 space-y-8">
            <Section title="Listing Type">
              <Select
                onValueChange={(val) => setForm({ ...form, listingType: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose Listing Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sale">For Sale</SelectItem>
                  <SelectItem value="rent">For Rent</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </Section>

            <Section title="Basic Info">
              <Input
                name="title"
                placeholder="Property Title"
                onChange={handleChange}
              />
              <Textarea
                name="description"
                placeholder="Description"
                onChange={handleChange}
              />
              <Select onValueChange={(val) => setForm({ ...form, type: val })}>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="plot">Plot</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </Section>

            <Section title="Property Details">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  name="bedrooms"
                  placeholder="Bedrooms"
                  onChange={handleChange}
                />
                <Input
                  name="bathrooms"
                  placeholder="Bathrooms"
                  onChange={handleChange}
                />
                <Input
                  name="area"
                  placeholder="Area (sq ft)"
                  onChange={handleChange}
                />
                <Input
                  name="price"
                  placeholder={
                    form.listingType === "rent"
                      ? "Rent (per month)"
                      : "Price (₹)"
                  }
                  onChange={handleChange}
                />
                <Input
                  name="hoa"
                  placeholder="HOA Fees (if any)"
                  onChange={handleChange}
                />
                <Input
                  name="taxes"
                  placeholder="Property Taxes"
                  onChange={handleChange}
                />
                <Input
                  name="yearBuilt"
                  placeholder="Year Built"
                  onChange={handleChange}
                />
                <Input
                  name="parking"
                  placeholder="Parking Spaces"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Select
                  onValueChange={(val) => setForm({ ...form, furnishing: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Furnishing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="furnished">Furnished</SelectItem>
                    <SelectItem value="semi">Semi-Furnished</SelectItem>
                    <SelectItem value="unfurnished">Unfurnished</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(val) => setForm({ ...form, status: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Listing Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Section>

            <Section title="Location">
              <Input
                name="address"
                placeholder="Address"
                onChange={handleChange}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input name="city" placeholder="City" onChange={handleChange} />
                <Input
                  name="state"
                  placeholder="State"
                  onChange={handleChange}
                />
                <Input name="zip" placeholder="ZIP Code" onChange={handleChange} />
                <Input
                  name="neighborhood"
                  placeholder="Neighborhood"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  name="latitude"
                  placeholder="Latitude"
                  onChange={handleChange}
                />
                <Input
                  name="longitude"
                  placeholder="Longitude"
                  onChange={handleChange}
                />
              </div>
              <Input
                name="mapLink"
                placeholder="Google Maps Link"
                onChange={handleChange}
              />
            </Section>

            <Section title="Media">
              <Input
                name="video"
                placeholder="YouTube Video Link (optional)"
                onChange={handleChange}
              />
              <Input
                name="tour3D"
                placeholder="3D/Virtual Tour Link (optional)"
                onChange={handleChange}
              />
            </Section>
          </CardContent>
        </Card>

        {/* Right: Owner Section */}
        <Card className="rounded-2xl shadow-lg border border-gray-200 h-fit">
          <CardContent className="p-8 space-y-8">
            <Section title="Owner Details">
              <Input
                name="owner"
                placeholder="Your Name"
                onChange={handleChange}
              />
              <Input
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
              />
              <Input
                name="email"
                placeholder="Email Id"
                onChange={handleChange}
              />
            </Section>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleSubmit}
                className="w-full text-lg py-6 rounded-xl"
                disabled={loading}
              >
                {loading ? "Publishing..." : "🚀 Publish Listing"}
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <Separator />
      <div className="space-y-4">{children}</div>
    </div>
  );
}
