"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function ApiMonitoringDashboard() {
  const [activeTab, setActiveTab] = useState("Compliance")

  // Sample data for the uptime/downtime grid
  const days = ["18 Nov", "19 Nov", "20 Nov", "21 Nov", "22 Nov", "23 Nov", "24 Nov"]
  const timeSlots = [
    "00:00",
    "00:15",
    "00:25",
    "00:35",
    "00:45",
    "00:55",
    "01:05",
    "01:15",
    "01:25",
    "01:35",
    "01:45",
    "01:55",
  ]

  // Generate random status data (green/red)
  const statusData = days.map((day) => ({
    day,
    slots: Array(timeSlots.length)
      .fill(0)
      .map(() => (Math.random() > 0.2 ? "up" : "down")),
  }))

  // Sample data for the response time chart
  const responseTimeData = [
    { time: "0:00", ms: 230 },
    { time: "2:00", ms: 654 },
    { time: "2:30", ms: 457 },
    { time: "3:00", ms: 520 },
    { time: "3:30", ms: 380 },
    { time: "4:00", ms: 420 },
    { time: "4:30", ms: 290 },
    { time: "5:00", ms: 310 },
    { time: "5:30", ms: 280 },
    { time: "6:00", ms: 350 },
    { time: "7:00", ms: 180 },
    { time: "8:00", ms: 450 },
    { time: "9:00", ms: 530 },
    { time: "10:00", ms: 380 },
    { time: "11:00", ms: 290 },
    { time: "12:00", ms: 420 },
  ]

  // Sample data for the compliance breakdown
  const complianceItems = [
    { type: "requestBody", status: "compliant", threat: "No Threats" },
    { type: "responseBody", status: "compliant", threat: "No Threats" },
    { type: "header", status: "non-compliant", threat: "No Threats" },
    { type: "path", status: "compliant", threat: "No Threats" },
    { type: "query", status: "compliant", threat: "No Threats" },
    { type: "formData", status: "compliant", threat: "No Threats" },
  ]

  // Data for the donut chart
  const donutData = [
    { name: "Compliant", value: 37, color: "#4ade80" },
    { name: "Non-Compliant", value: 148, color: "#f87171" },
  ]

  // Data for the horizontal bar chart
  const breakupData = [
    { name: "Request Body", value: 20, color: "#60a5fa" },
    { name: "Response Body", value: 35, color: "#f472b6" },
    { name: "Path", value: 15, color: "#38bdf8" },
    { name: "Header", value: 25, color: "#a78bfa" },
    { name: "Query", value: 5, color: "#4ade80" },
    { name: "Form", value: 10, color: "#fbbf24" },
  ]

  return (
    <div className="flex flex-col h-screen text-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <div>
          <h1 className="text-xl font-medium">Monitoring Products API</h1>
          <div className="text-sm text-gray-400">18 Nov - 22 Nov</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
            <span className="text-sm">Downtime</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
            <span className="text-sm">Uptime</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-md p-3">
          <div className="text-sm text-gray-400">API name in</div>
          <div className="font-medium">Test Suite</div>
          <div className="text-xs text-gray-400">Test Suite &gt; Acme Bank Branch Location v1</div>
        </div>
      </div>

      <div className="flex h-full">
        {/* Left panel - Uptime/Downtime grid and Response time chart */}
        <div className="w-2/5 border-r border-gray-700 p-4 overflow-auto">
          {/* Uptime/Downtime grid */}
          <div className="mb-8">
            <div className="flex mb-2">
              <div className="w-16"></div>
              {timeSlots.map((slot, idx) => (
                <div key={idx} className="flex-1 text-[10px] text-center text-gray-400">
                  {idx % 2 === 0 ? slot : ""}
                </div>
              ))}
            </div>

            {statusData.map((dayData, dayIdx) => (
              <div key={dayIdx} className="flex items-center mb-1">
                <div className="w-16 text-xs text-gray-400">{dayData.day}</div>
                <div className="flex-1 flex">
                  {dayData.slots.map((status, slotIdx) => (
                    <div
                      key={slotIdx}
                      className={`h-4 flex-1 mx-0.5 rounded-sm ${status === "up" ? "bg-green-500" : "bg-red-500"}`}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Response time chart */}
          <div className="h-64 mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={responseTimeData}>
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                  axisLine={{ stroke: "#4b5563" }}
                  tickLine={{ stroke: "#4b5563" }}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                  axisLine={{ stroke: "#4b5563" }}
                  tickLine={{ stroke: "#4b5563" }}
                  tickFormatter={(value) => `${value} ms`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", borderColor: "#4b5563" }}
                  labelStyle={{ color: "#e5e7eb" }}
                />
                <Bar dataKey="ms" fill="#3b82f6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Message box */}
          <div className="mt-8 bg-gray-800 rounded-md p-4">
            <div className="text-sm font-medium mb-2">Messages</div>
            <div className="bg-gray-900 rounded p-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="bg-green-500/20 text-green-500 p-1 rounded">
                  <CheckCircle size={16} />
                </div>
                <div className="text-xs">Header 3</div>
              </div>
              <div className="text-xs font-medium">header key</div>
              <div className="text-xs text-gray-400 mt-2">The header Param (x-fapi-financial-id) is compliant</div>
            </div>
          </div>
        </div>

        {/* Right panel - Test Suite details and Compliance Report */}
        <div className="flex-1 overflow-auto">
          {/* Test Suite header */}
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-medium">Test Suite</h2>

            {/* Tabs */}
            <div className="flex mt-4 border-b border-gray-700">
              {["General", "Request", "Response", "Compliance"].map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === tab ? "text-white border-b-2 border-blue-500" : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* API Operation details */}
          <div className="p-4 border-b border-gray-700 grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-400">Operation Name</div>
              <div className="font-medium">getListOfBranchLocations</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Swagger Name</div>
              <div className="font-medium">Acme Bank Branch Location</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Status</div>
              <div className="text-red-400 flex items-center gap-1">
                <AlertCircle size={16} />
                <span>Non-Compliant</span>
              </div>
            </div>
          </div>

          {/* Compliance Report */}
          <div className="p-4">
            <h3 className="text-lg font-medium mb-4">Compliance Report</h3>

            <div className="mb-8">
              <div className="grid grid-cols-3 gap-4 text-sm text-gray-400 mb-2 px-4">
                <div>Type</div>
                <div>Compliance Status</div>
                <div>Security Threat</div>
              </div>

              {complianceItems.map((item, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-4 py-3 px-4 border-b border-gray-700 items-center">
                  <div>{item.type}</div>
                  <div
                    className={`flex items-center gap-1 ${
                      item.status === "compliant" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {item.status === "compliant" ? <CheckCircle size={16} /> : <XCircle size={16} />}
                    <span className="capitalize">{item.status}</span>
                  </div>
                  <div className="text-gray-300">{item.threat}</div>
                </div>
              ))}
            </div>

            {/* Charts section */}
            <div className="grid grid-cols-2 gap-8">
              {/* Donut chart */}
              <div className="bg-gray-800 rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm font-medium">Total Traffic</div>
                  <div className="text-2xl font-bold">185</div>
                </div>
                <div className="text-xs text-gray-400 mb-4">Requests</div>

                <div className="h-48 flex justify-center">
                  <PieChart width={180} height={180}>
                    <Pie
                      data={donutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {donutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-lg font-bold">
                      37
                    </text>
                  </PieChart>
                </div>

                <div className="flex justify-around text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>Compliant</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span>Non-Compliant</span>
                  </div>
                </div>
              </div>

              {/* Horizontal bar chart */}
              <div>
                <h4 className="text-sm font-medium mb-4">Non Compliant Breakup</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={breakupData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#4b5563" />
                      <XAxis
                        type="number"
                        tick={{ fontSize: 10, fill: "#9ca3af" }}
                        axisLine={{ stroke: "#4b5563" }}
                        tickLine={{ stroke: "#4b5563" }}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fontSize: 10, fill: "#9ca3af" }}
                        axisLine={{ stroke: "#4b5563" }}
                        tickLine={{ stroke: "#4b5563" }}
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1f2937", borderColor: "#4b5563" }}
                        labelStyle={{ color: "#e5e7eb" }}
                      />
                      {breakupData.map((entry, index) => (
                        <Bar
                          key={`bar-${index}`}
                          dataKey="value"
                          fill={entry.color}
                          name={entry.name}
                          radius={[0, 4, 4, 0]}
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {breakupData.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-xs">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

