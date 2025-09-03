"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  CheckCircle,
  Clock,
  Users,
  FileText,
  DollarSign,
  Target,
  MessageSquare,
  Paperclip,
  Plus,
  Search,
  BarChart3,
} from "lucide-react"

export function ProjectManagement() {
  const [selectedProject, setSelectedProject] = useState("downtown-condo")
  const [taskFilter, setTaskFilter] = useState("all")

  const projects = [
    {
      id: "downtown-condo",
      name: "Downtown Luxury Condo",
      status: "In Progress",
      progress: 65,
      budget: "$1.2M",
      spent: "$780K",
      timeline: "8 months",
      team: 12,
      tasksCompleted: 45,
      totalTasks: 68,
    },
    {
      id: "suburban-development",
      name: "Suburban Development",
      status: "Planning",
      progress: 25,
      budget: "$3.5M",
      spent: "$425K",
      timeline: "18 months",
      team: 8,
      tasksCompleted: 18,
      totalTasks: 95,
    },
    {
      id: "office-renovation",
      name: "Office Building Renovation",
      status: "On Hold",
      progress: 40,
      budget: "$850K",
      spent: "$340K",
      timeline: "6 months",
      team: 6,
      tasksCompleted: 22,
      totalTasks: 55,
    },
  ]

  const tasks = [
    {
      id: 1,
      title: "Finalize architectural plans",
      description: "Complete detailed architectural drawings and get approval",
      assignee: "Sarah Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "completed",
      priority: "high",
      dueDate: "2024-01-15",
      category: "Design",
      progress: 100,
    },
    {
      id: 2,
      title: "Obtain building permits",
      description: "Submit permit applications and follow up with city planning",
      assignee: "Mike Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "in-progress",
      priority: "high",
      dueDate: "2024-01-25",
      category: "Legal",
      progress: 75,
    },
    {
      id: 3,
      title: "Site preparation and excavation",
      description: "Clear site and begin foundation excavation",
      assignee: "Construction Team",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "pending",
      priority: "medium",
      dueDate: "2024-02-01",
      category: "Construction",
      progress: 0,
    },
    {
      id: 4,
      title: "Material procurement",
      description: "Order and schedule delivery of construction materials",
      assignee: "Lisa Wang",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "in-progress",
      priority: "high",
      dueDate: "2024-01-30",
      category: "Procurement",
      progress: 60,
    },
    {
      id: 5,
      title: "HVAC system design",
      description: "Design and approve HVAC system specifications",
      assignee: "Tom Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "pending",
      priority: "medium",
      dueDate: "2024-02-10",
      category: "MEP",
      progress: 0,
    },
  ]

  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Project Manager",
      avatar: "/placeholder.svg?height=40&width=40",
      tasks: 8,
      status: "active",
    },
    {
      name: "Mike Johnson",
      role: "Legal Advisor",
      avatar: "/placeholder.svg?height=40&width=40",
      tasks: 3,
      status: "active",
    },
    {
      name: "Lisa Wang",
      role: "Procurement Manager",
      avatar: "/placeholder.svg?height=40&width=40",
      tasks: 5,
      status: "active",
    },
    {
      name: "Tom Rodriguez",
      role: "MEP Engineer",
      avatar: "/placeholder.svg?height=40&width=40",
      tasks: 4,
      status: "busy",
    },
    {
      name: "Construction Team",
      role: "General Contractor",
      avatar: "/placeholder.svg?height=40&width=40",
      tasks: 12,
      status: "active",
    },
    { name: "David Kim", role: "Architect", avatar: "/placeholder.svg?height=40&width=40", tasks: 6, status: "active" },
  ]

  const budgetBreakdown = [
    { category: "Construction", budgeted: 650000, spent: 420000, remaining: 230000 },
    { category: "Materials", budgeted: 280000, spent: 185000, remaining: 95000 },
    { category: "Labor", budgeted: 180000, spent: 125000, remaining: 55000 },
    { category: "Permits & Fees", budgeted: 45000, spent: 35000, remaining: 10000 },
    { category: "Contingency", budgeted: 45000, spent: 15000, remaining: 30000 },
  ]

  const milestones = [
    { name: "Design Approval", date: "2024-01-15", status: "completed", progress: 100 },
    { name: "Permits Obtained", date: "2024-01-25", status: "in-progress", progress: 75 },
    { name: "Foundation Complete", date: "2024-02-15", status: "pending", progress: 0 },
    { name: "Framing Complete", date: "2024-03-30", status: "pending", progress: 0 },
    { name: "MEP Rough-in", date: "2024-04-20", status: "pending", progress: 0 },
    { name: "Final Inspection", date: "2024-06-15", status: "pending", progress: 0 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gradient">Project Management Dashboard</h2>
          <p className="text-muted-foreground">Comprehensive project tracking and team collaboration</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="bg-gradient-to-r from-primary to-accent">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Project Progress", value: "65%", icon: Target, color: "text-blue-600" },
              { title: "Budget Used", value: "65%", icon: DollarSign, color: "text-green-600" },
              { title: "Tasks Completed", value: "45/68", icon: CheckCircle, color: "text-purple-600" },
              { title: "Team Members", value: "12", icon: Users, color: "text-orange-600" },
            ].map((metric, index) => (
              <Card key={index} className="glass-card hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{metric.value}</div>
                  {metric.title === "Project Progress" && <Progress value={65} className="mt-2" />}
                  {metric.title === "Budget Used" && <Progress value={65} className="mt-2" />}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-accent" />
                  Project Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{project.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {project.timeline} • {project.team} team members
                      </p>
                      <Progress value={project.progress} className="mt-2 h-2" />
                    </div>
                    <div className="text-right ml-4">
                      <Badge className={getStatusColor(project.status.toLowerCase().replace(" ", "-"))}>
                        {project.status}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">{project.progress}%</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  Upcoming Milestones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {milestones.slice(0, 4).map((milestone, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        milestone.status === "completed"
                          ? "bg-green-500"
                          : milestone.status === "in-progress"
                            ? "bg-blue-500"
                            : "bg-gray-300"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{milestone.name}</p>
                      <p className="text-sm text-muted-foreground">{milestone.date}</p>
                    </div>
                    <Badge className={getStatusColor(milestone.status)}>{milestone.status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search tasks..." className="pl-10 w-64" />
              </div>
              <Select value={taskFilter} onValueChange={setTaskFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tasks</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-gradient-to-r from-primary to-accent">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>

          <div className="space-y-4">
            {tasks.map((task) => (
              <Card key={task.id} className="glass-card hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{task.title}</h3>
                        <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                        <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{task.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={task.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {task.assignee
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{task.assignee}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{task.dueDate}</span>
                        </div>
                        <Badge variant="outline">{task.category}</Badge>
                      </div>
                      {task.progress > 0 && (
                        <div className="mt-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} className="h-2" />
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                Project Timeline & Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          milestone.status === "completed"
                            ? "bg-green-500 border-green-500"
                            : milestone.status === "in-progress"
                              ? "bg-blue-500 border-blue-500"
                              : "bg-white border-gray-300"
                        }`}
                      />
                      {index < milestones.length - 1 && <div className="w-0.5 h-12 bg-gray-200 mt-2" />}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{milestone.name}</h3>
                        <Badge className={getStatusColor(milestone.status)}>{milestone.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Due: {milestone.date}</p>
                      {milestone.progress > 0 && (
                        <div className="mt-2">
                          <Progress value={milestone.progress} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">{milestone.progress}% complete</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-center">Total Budget</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold text-primary">$1.2M</p>
                <p className="text-sm text-muted-foreground">Allocated</p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-center">Spent</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold text-red-600">$780K</p>
                <p className="text-sm text-muted-foreground">65% of budget</p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-center">Remaining</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold text-green-600">$420K</p>
                <p className="text-sm text-muted-foreground">35% remaining</p>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-accent" />
                Budget Breakdown by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budgetBreakdown.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.category}</span>
                      <span className="text-sm text-muted-foreground">
                        ${item.spent.toLocaleString()} / ${item.budgeted.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(item.spent / item.budgeted) * 100} className="h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Spent: ${item.spent.toLocaleString()}</span>
                      <span>Remaining: ${item.remaining.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="glass-card hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Active Tasks</span>
                      <span className="font-semibold">{member.tasks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Status</span>
                      <Badge
                        className={
                          member.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {member.status}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Project Documents</h3>
            <Button className="bg-gradient-to-r from-primary to-accent">
              <Plus className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Architectural Plans v3.2", type: "PDF", size: "2.4 MB", date: "2024-01-15", category: "Design" },
              { name: "Building Permits", type: "PDF", size: "1.8 MB", date: "2024-01-20", category: "Legal" },
              {
                name: "Material Specifications",
                type: "XLSX",
                size: "856 KB",
                date: "2024-01-18",
                category: "Procurement",
              },
              { name: "Site Survey Report", type: "PDF", size: "3.2 MB", date: "2024-01-10", category: "Survey" },
              { name: "HVAC System Design", type: "DWG", size: "4.1 MB", date: "2024-01-22", category: "MEP" },
              { name: "Project Timeline", type: "PDF", size: "1.2 MB", date: "2024-01-25", category: "Planning" },
            ].map((doc, index) => (
              <Card key={index} className="glass-card hover-lift cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <FileText className="h-8 w-8 text-accent mt-1" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{doc.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {doc.size} • {doc.date}
                      </p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {doc.category}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
