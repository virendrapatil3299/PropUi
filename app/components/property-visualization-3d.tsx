"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Html, Box, Sphere, Cylinder } from "@react-three/drei"
import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Maximize2, RotateCcw, ZoomIn, Home, Building, Map, Ruler, Palette, Camera, Play } from "lucide-react"

type EnhancedPropertyModelProps = {
  viewMode: "exterior" | "interior" | "floorplan"
  showMeasurements: boolean
}


function EnhancedPropertyModel({ viewMode, showMeasurements }: EnhancedPropertyModelProps) {
  const [hovered, setHovered] = useState<string | null>(null)
  // const meshRef = useRef<any>()
  // const meshRef = useRef()

  const renderExteriorView = () => (
    <group>
      {/* Main Building Structure */}
      <Box
        // ref={meshRef}
        args={[4, 3, 2]}
        position={[0, 1.5, 0]}
        // onPointerOver={() => setHovered("building")}
        onPointerOut={() => setHovered(null)}
      >
        <meshStandardMaterial color={hovered === "building" ? "#8b5cf6" : "#374151"} />
      </Box>

      {/* Roof */}
      <Box args={[4.2, 0.2, 2.2]} position={[0, 3.1, 0]}>
        <meshStandardMaterial color="#1f2937" />
      </Box>

      {/* Foundation */}
      <Box args={[4.5, 0.5, 2.5]} position={[0, 0.25, 0]}>
        <meshStandardMaterial color="#111827" />
      </Box>

      {/* Windows */}
      {[-1.5, 0, 1.5].map((x, i) => (
        <group key={i}>
          <Box args={[0.7, 0.9, 0.1]} position={[x, 2, 1.05]}>
            <meshStandardMaterial color="#1f2937" />
          </Box>
          <Box args={[0.6, 0.8, 0.05]} position={[x, 2, 1.08]}>
            <meshStandardMaterial color="#e5e7eb" transparent opacity={0.8} />
          </Box>
        </group>
      ))}

      {/* Door */}
      <Box args={[0.9, 1.9, 0.1]} position={[0, 1, 1.05]}>
        <meshStandardMaterial color="#1f2937" />
      </Box>
      <Box args={[0.8, 1.8, 0.05]} position={[0, 1, 1.08]}>
        <meshStandardMaterial color="#92400e" />
      </Box>

      {/* Landscaping */}
      <Cylinder args={[6, 6, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#16a34a" />
      </Cylinder>

      {/* Trees */}
      {[[-3, 0, -2], [3, 0, -2], [-2, 0, 3]].map((pos, i) => (
        // <group key={i} position={pos}>
          <group key={i} >
          <Cylinder args={[0.1, 0.1, 2]} position={[0, 1, 0]}>
            <meshStandardMaterial color="#92400e" />
          </Cylinder>
          <Sphere args={[0.8]} position={[0, 2.5, 0]}>
            <meshStandardMaterial color="#16a34a" />
          </Sphere>
        </group>
      ))}

      {/* Measurements */}
      {showMeasurements && (
        <group>
          <Html position={[0, 4.5, 0]} center>
            <div className="bg-purple-600 text-white px-2 py-1 rounded text-xs">Building Height: 12.5ft</div>
          </Html>
          <Html position={[2.5, 0.5, 0]} center>
            <div className="bg-purple-600 text-white px-2 py-1 rounded text-xs">Width: 16ft</div>
          </Html>
        </group>
      )}
    </group>
  )

  const renderInteriorView = () => (
    <group>
      {/* Room walls */}
      <Box args={[4, 3, 0.1]} position={[0, 1.5, -1]}>
        <meshStandardMaterial color="#f3f4f6" />
      </Box>
      <Box args={[0.1, 3, 2]} position={[-2, 1.5, 0]}>
        <meshStandardMaterial color="#f3f4f6" />
      </Box>
      <Box args={[0.1, 3, 2]} position={[2, 1.5, 0]}>
        <meshStandardMaterial color="#f3f4f6" />
      </Box>

      {/* Floor */}
      <Box args={[4, 0.1, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#d1d5db" />
      </Box>

      {/* Furniture */}
      <Box args={[1.5, 0.5, 0.8]} position={[-0.5, 0.25, -0.3]}>
        <meshStandardMaterial color="#374151" />
      </Box>
      <Box args={[0.6, 1, 0.6]} position={[1, 0.5, 0.3]}>
        <meshStandardMaterial color="#92400e" />
      </Box>

      {/* Virtual staging indicators */}
      <Html position={[0, 2, 0]} center>
        <div className="bg-green-600 text-white px-2 py-1 rounded text-xs">AI Staged Interior</div>
      </Html>
    </group>
  )

  const renderFloorPlan = () => (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <Box args={[4, 2, 0.05]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#e5e7eb" />
      </Box>

      {/* Room divisions */}
      <Box args={[0.05, 2, 0.1]} position={[0, 0, 0.05]}>
        <meshStandardMaterial color="#374151" />
      </Box>
      <Box args={[4, 0.05, 0.1]} position={[0, 0.5, 0.05]}>
        <meshStandardMaterial color="#374151" />
      </Box>

      {/* Room labels */}
      <Html position={[-1, -0.5, 0.1]} center>
        <div className="bg-white border px-2 py-1 rounded text-xs">Living Room</div>
      </Html>
      <Html position={[1, -0.5, 0.1]} center>
        <div className="bg-white border px-2 py-1 rounded text-xs">Kitchen</div>
      </Html>
      <Html position={[0, 0.7, 0.1]} center>
        <div className="bg-white border px-2 py-1 rounded text-xs">Bedroom</div>
      </Html>
    </group>
  )

  return (
    <group>
      {viewMode === "exterior" && renderExteriorView()}
      {viewMode === "interior" && renderInteriorView()}
      {viewMode === "floorplan" && renderFloorPlan()}
    </group>
  )
}

export function PropertyVisualization3D() {
  const [viewMode, setViewMode] = useState("exterior")
  const [showMeasurements, setShowMeasurements] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState(false)

  return (
    <div className="space-y-6">
      <Card className="border-purple-200 bg-gradient-to-br from-white to-purple-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-gray-800 bg-clip-text text-transparent">
                AI-Powered 3D Property Modeling
              </CardTitle>
              <CardDescription>
                Advanced visualization with virtual tours, measurements, and AI insights
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setShowMeasurements(!showMeasurements)}>
                <Ruler className="h-4 w-4 mr-2" />
                {showMeasurements ? "Hide" : "Show"} Measurements
              </Button>
              <Button variant="outline" size="sm">
                <Camera className="h-4 w-4 mr-2" />
                Screenshot
              </Button>
              <Button variant="outline" size="sm">
                <Maximize2 className="h-4 w-4 mr-2" />
                Fullscreen
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={viewMode} onValueChange={setViewMode} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="exterior" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Exterior View
              </TabsTrigger>
              <TabsTrigger value="interior" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Interior View
              </TabsTrigger>
              <TabsTrigger value="floorplan" className="flex items-center gap-2">
                <Map className="h-4 w-4" />
                Floor Plan
              </TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* 3D Viewer */}
              <div className="lg:col-span-3">
                <div className="w-full h-[600px] bg-gradient-to-br from-gray-900 to-purple-900 rounded-lg overflow-hidden border border-purple-200 shadow-2xl">
                  <Canvas camera={{ position: [8, 6, 8], fov: 50 }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[10, 10, 5]} intensity={1.2} />
                    <pointLight position={[-10, -10, -10]} intensity={0.3} />
                    {/* <EnhancedPropertyModel viewMode={viewMode} showMeasurements={showMeasurements} /> */}
                    <OrbitControls minDistance={3} maxDistance={25} />
                    <Environment preset="city" />
                  </Canvas>
                </div>

                {/* Control Panel */}
                <div className="mt-4 flex items-center justify-between bg-white rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Virtual Tour
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setAiAnalysis(!aiAnalysis)}>
                      <Palette className="h-4 w-4 mr-2" />
                      AI Staging
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset View
                    </Button>
                    <Button variant="outline" size="sm">
                      <ZoomIn className="h-4 w-4 mr-2" />
                      Zoom Fit
                    </Button>
                  </div>
                </div>
              </div>

              {/* Details Panel */}
              <div className="space-y-4">
                {/* AI Property Analysis */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-600">AI Property Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800">Modern Luxury Estate</h4>
                      <p className="text-sm text-gray-600">456 Premium Boulevard, Uptown</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Total Area</p>
                        <p className="font-semibold">3,200 sq ft</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Lot Size</p>
                        <p className="font-semibold">0.45 acres</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Bedrooms</p>
                        <p className="font-semibold">4</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Bathrooms</p>
                        <p className="font-semibold">3.5</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-semibold text-purple-600">AI Design Optimization</h5>
                      {[
                        { label: "Space Utilization", value: 92 },
                        { label: "Natural Light Score", value: 88 },
                        { label: "Energy Efficiency", value: 95 },
                      ].map((item, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">{item.label}</span>
                            <span className="text-sm font-semibold">{item.value}%</span>
                          </div>
                          <Progress value={item.value} className="h-2" />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-semibold text-purple-600">AI Insights</h5>
                      <div className="space-y-1">
                        <Badge className="bg-purple-100 text-purple-800 border-purple-200">Optimal Layout Design</Badge>
                        <Badge className="bg-green-100 text-green-800 border-green-200">High ROI Potential: 24%</Badge>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          Premium Location Score: 9.8/10
                        </Badge>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-purple-600 to-gray-800 hover:from-purple-700 hover:to-gray-900">
                      Generate 3D Report
                    </Button>
                  </CardContent>
                </Card>

                {/* Virtual Staging Options */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-600">Virtual Staging Options</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { style: "Modern Minimalist", cost: "$2,400", time: "2 days" },
                      { style: "Luxury Traditional", cost: "$3,200", time: "3 days" },
                      { style: "Contemporary Chic", cost: "$2,800", time: "2 days" },
                    ].map((option, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center p-3 bg-purple-50 rounded border border-purple-100"
                      >
                        <div>
                          <p className="font-medium text-sm text-gray-800">{option.style}</p>
                          <p className="text-xs text-gray-600">{option.time} completion</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-purple-600">{option.cost}</p>
                          <Button size="sm" variant="outline" className="mt-1 text-xs bg-transparent">
                            Preview
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Measurement Tools */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-600">Measurement Tools</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-purple-50 p-2 rounded">
                        <p className="text-gray-600">Living Room</p>
                        <p className="font-semibold">18' × 24'</p>
                      </div>
                      <div className="bg-purple-50 p-2 rounded">
                        <p className="text-gray-600">Master Bedroom</p>
                        <p className="font-semibold">16' × 20'</p>
                      </div>
                      <div className="bg-purple-50 p-2 rounded">
                        <p className="text-gray-600">Kitchen</p>
                        <p className="font-semibold">12' × 16'</p>
                      </div>
                      <div className="bg-purple-50 p-2 rounded">
                        <p className="text-gray-600">Ceiling Height</p>
                        <p className="font-semibold">10' 6"</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-2 bg-transparent">
                      Export Measurements
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
