"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { motion } from "framer-motion";

import {
  MapPin,Bed,Bath,Square,Car,Home,Calendar,X,Share2,Phone,Ruler,  TrendingUp,Heart,Eye,Calculator,
} from "lucide-react";
import { Property } from "../PropertyBrowser/propertyData";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import SchoolSearch from "../../components/SchoolSearch";

interface PropertyCardProps {
  property: Property;
  isFavorited: boolean;
  onToggleFavorite: (id: number) => void;
  onViewOnMap: () => void;
state?: string;
  city?: string;
  lat?: {
    latitude: number;
    longitude: number;
  };
}

export function PropertyCard({
     state, city, lat, 
  property,
  isFavorited,
  onToggleFavorite,
  onViewOnMap,
}: PropertyCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden  ">
        <div className="relative overflow-hidden">
          <img
            src={
              property.imgSrc ||
              "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800"
            }
            alt={property.statusType}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground shadow-lg">
            {property.grade}% ROI
          </Badge>
          <Button
            size="sm"
            variant={isFavorited ? "default" : "secondary"}
            className="absolute top-4 left-4  hover:shadow-xl "
            onClick={() => onToggleFavorite(property.id)}
            >
            <Heart className={`h-8 w-8 ${isFavorited ? "fill-current" : ""}`} />
          </Button>
        </div>

        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-primary">
              {property.statusText}
            </h3>
            <Badge variant="outline">{property.statusType}</Badge>
          </div>

          <p className="text-muted-foreground mb-4 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {property.address}
          </p>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {property.description}
          </p>

          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold text-primary">
              ${property.price}
            </span>
            <div className="flex items-center text-sm text-accent">
              <TrendingUp className="h-4 w-4 mr-1" />
              {property.flexFieldText}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              {property.beds} bed
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              {property.baths} bath
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              {property.area} sqft
            </div>
          </div>

          <div className="flex space-x-2">
            <Button className="flex-1 hover-lift" onClick={() => setOpen(true)}>
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hover-lift bg-transparent"
            >
              <Calculator className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hover-lift bg-transparent"
              onClick={onViewOnMap}
            >
              <MapPin className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal for Details */}
      

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="w-full h-screen min-w-full p-0 overflow-hidden bg-white">
    {/* Accessibility */}
    <DialogHeader>
      <VisuallyHidden>
        <DialogTitle>{property.statusText}</DialogTitle>
      </VisuallyHidden>
    </DialogHeader>

    {/* HEADER */}
    <div className="flex items-center justify-between px-6 py-4 border-b bg-white shadow-md sticky top-0 z-30">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpen(false)}
          className="rounded-full"
        >
          ← Back
        </Button>
        <h2 className="text-xl font-semibold">{property.statusText}</h2>
      </div>
      <div className="flex space-x-2">
        <Button variant="ghost" size="icon">
          <Share2 className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(false)}
          className="rounded-full"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>

    {/* MAIN CONTENT */}
    <div className="overflow-y-auto h-[calc(100vh-64px)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 mb-20">
        {/* LEFT: IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={
              property.imgSrc ||
              "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800"
            }
            alt={property.statusType}
            className="w-full h-[450px] object-cover rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group glass-card"
          />
          <div className="flex items-center justify-between mt-4">
            <Badge className="bg-accent text-accent-foreground shadow-lg">
              {property.grade}% ROI
            </Badge>
          </div>
        </motion.div>

        {/* RIGHT: DETAILS */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col space-y-6"
        >
          <div>
            <span className="text-3xl font-bold text-primary block mb-1">
              ${property.price}
            </span>
            <h3 className="text-3xl font-bold text-primary mb-2">
              {property.statusText}
            </h3>
            <p className="text-muted-foreground flex items-center text-lg">
              <MapPin className="h-5 w-5 mr-2" />
              {property.address}
            </p>
          </div>

          <p className="text-base leading-relaxed">{property.description}</p>

          {/* QUICK FACTS */}
          <div className="grid grid-cols-3 hover:shadow-xl transition-all duration-300 group glass-card gap-4 text-center bg-muted rounded-lg p-4">
            <div>
              <Bed className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-lg font-semibold">{property.beds}</p>
              <p className="text-sm text-muted-foreground">Beds</p>
            </div>
            <div>
              <Bath className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-lg font-semibold">{property.baths}</p>
              <p className="text-sm text-muted-foreground">Baths</p>
            </div>
            <div>
              <Square className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-lg font-semibold">{property.area} sqft</p>
              <p className="text-sm text-muted-foreground">Area</p>
            </div>
          </div>

          {/* EXTRA INFO */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg flex items-center space-x-3 hover:shadow-xl transition-all duration-300 group glass-card">
              <Home className="text-primary h-5 w-5" />
              <div>
                <p className="text-sm text-muted-foreground">Property Type</p>
                <p className="font-medium">{property.statusText || "Apartment"}</p>
              </div>
            </div>
            <div className="p-4 border rounded-lg flex items-center space-x-3 hover:shadow-xl transition-all duration-300 group glass-card">
              <Calendar className="text-primary h-5 w-5" />
              <div>
                <p className="text-sm text-muted-foreground">Year Built</p>
                <p className="font-medium">{property.statusText || "2022"}</p>
              </div>
            </div>
            <div className="p-4 border rounded-lg flex items-center space-x-3 hover:shadow-xl transition-all duration-300 group glass-card">
              <Car className="text-primary h-5 w-5" />
              <div>
                <p className="text-sm text-muted-foreground">Parking</p>
                <p className="font-medium">{property.parking || "2 Spots"}</p>
              </div>
            </div>
            <div className="p-4 border rounded-lg flex items-center space-x-3 hover:shadow-xl transition-all duration-300 group glass-card">
              <Ruler className="text-primary h-5 w-5" />
              <div>
                <p className="text-sm text-muted-foreground">Lot Size</p>
                <p className="font-medium">{property.statusText || "5000 sqft"}</p>
              </div>
            </div>
          </div>

          {/* AGENT INFO */}
          <div className="p-4 border rounded-lg flex items-center space-x-3 hover:shadow-xl transition-all duration-300 group glass-card ">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Agent"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-muted-foreground">Real Estate Agent</p>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">
              <Phone className="h-4 w-4 mr-1" /> Call
            </Button>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex space-x-3 ">
            <Button className="flex-1 hover:shadow-xl">Contact Agent</Button>
            <Button variant="outline" className="flex-1 hover:shadow-xl">
              Get Loan Estimate
            </Button>
          </div>
        </motion.div>
        {/* <SchoolSearch  lat={{ latitude: 12.34, longitude: 56.78 }} /> */}
      </div>
    </div>
  </DialogContent>
</Dialog>



    </>
  );
}
