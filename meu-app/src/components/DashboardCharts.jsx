// src/components/DashboardCharts.jsx
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar, ScatterChart, Scatter, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart
} from "recharts";
import {
  Menu, Home, Layers, PieChart as PieIcon, BarChart as BarIcon,
  Grid, ArrowLeft, ArrowRight, Settings, Search, Clock, User, Sun, Moon
} from "lucide-react";

/**
 * DashboardCharts.jsx
 * - Único arquivo (menu lateral + conteúdo)
 * - Tema dark <-> light com persistência (localStorage)
 * - Labels corporativas em PT-BR
 * - Toggle de tema na NAVBAR (antes do search)
 * - Sidebar renomeada para funcionalidades de dados
 */

export default function DashboardCharts() {
  // tema com persistência
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("corp_theme") || "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    try { localStorage.setItem("corp_theme", theme); } catch {}
  }, [theme]);

  // UI
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [period, setPeriod] = useState("all");
  const [metric, setMetric] = useState("sales");
  const [query, setQuery] = useState("");

  // mock data
  const rawData = [
    { name: "Jan", sales: 4000, revenue: 2400, profit: 1400, users: 1200 },
    { name: "Fev", sales: 3200, revenue: 2100, profit: 1100, users: 1300 },
    { name: "Mar", sales: 5000, revenue: 3800, profit: 2500, users: 1600 },
    { name: "Abr", sales: 4700, revenue: 3900, profit: 2100, users: 1700 },
    { name: "Mai", sales: 5900, revenue: 4800, profit: 3000, users: 2000 },
    { name: "Jun", sales: 6300, revenue: 4200, profit: 2800, users: 2200 },
    { name: "Jul", sales: 7200, revenue: 5100, profit: 3300, users: 2400 },
  ];

  const pieData = [
    { name: "Produto A", value: 400 },
    { name: "Produto B", value: 300 },
    { name: "Produto C", value: 300 },
    { name: "Produto D", value: 200 },
  ];

  const radarData = [
    { subject: "Marketing", A: 120, fullMark: 150 },
    { subject: "Vendas", A: 98, fullMark: 150 },
    { subject: "Operações", A: 86, fullMark: 150 },
    { subject: "RH", A: 99, fullMark: 150 },
    { subject: "Financeiro", A: 85, fullMark: 150 },
  ];

  const scatterData = [
    { x: 100, y: 200 },
    { x: 120, y: 100 },
    { x: 170, y: 300 },
    { x: 140, y: 250 },
    { x: 150, y: 400 },
    { x: 110, y: 280 },
  ];

  const COLORS = ["#60a5fa", "#7c3aed", "#e879f9", "#06b6d4", "#a78bfa"];

  // derived
  const filteredData = useMemo(() => {
    if (period === "first-half") return rawData.slice(0, 3);
    if (period === "second-half") return rawData.slice(3);
    return rawData;
  }, [rawData, period]);

  // animations
  const containerVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.995 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } },
  };

  // theme classes
  const isDark = theme === "dark";
  const rootBg = isDark ? "bg-[#071022] text-slate-100" : "bg-[#e3e5e8] text-gray-900";
  const sidebarBg = isDark ? "bg-gradient-to-b from-[#0b1220] to-[#08151f]" : "bg-white shadow-sm";
  const cardBg = isDark ? "bg-[#071827] border border-slate-800" : "bg-white border border-gray-200";
  const inputBg = isDark ? "bg-[#0b1624] border border-slate-800 text-slate-200" : "bg-white border border-gray-200 text-gray-900";
  const subtleText = isDark ? "text-slate-400" : "text-gray-500";
  const navHighlight = isDark ? "bg-[#081827]" : "bg-[#f3f4f6]"; // navbar/inputs highlight in light

  // sidebar labels (dados)
  const sidebarItems = [
    { key: "insights", icon: <Home size={16} />, label: "Insights" },
    { key: "correlations", icon: <Grid size={16} />, label: "Correlações" },
    { key: "ranking", icon: <BarIcon size={16} />, label: "Ranking" },
    { key: "models", icon: <PieIcon size={16} />, label: "Modelos" },
    { key: "settings", icon: <Settings size={16} />, label: "Parâmetros" },
  ];

  return (
    <div className={clsx("min-h-screen flex", rootBg)}>
      {/* SIDEBAR */}
      <motion.aside
        layout
        initial={{ width: sidebarOpen ? 256 : 64 }}
        animate={{ width: sidebarOpen ? 256 : 64 }}
        className={clsx("flex-shrink-0", sidebarBg, isDark ? "border-r border-slate-800" : "border-r border-gray-200")}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center gap-3 px-4 py-4">
            <div className={clsx("flex items-center justify-center w-10 h-10 rounded-md border", isDark ? "bg-[#081827] border-slate-700" : "bg-white border-gray-200")}>
              <Menu size={18} />
            </div>

            <div className={clsx("overflow-hidden transition-all duration-300", sidebarOpen ? "w-auto" : "w-0")}>
              <h3 className={clsx("text-sm font-semibold", isDark ? "text-white" : "text-gray-900")}>André Pimentel Santos</h3>
              <p className={clsx("text-xs", subtleText)}>Painel Executivo</p>
            </div>

            <button
              aria-label="alternar sidebar"
              onClick={() => setSidebarOpen(v => !v)}
              className={clsx("ml-auto", isDark ? "text-slate-400 hover:text-white" : "text-gray-600 hover:text-gray-900")}
            >
              {sidebarOpen ? <ArrowLeft size={18}/> : <ArrowRight size={18} />}
            </button>
          </div>

          <nav className="mt-4 flex-1 px-2 space-y-1">
            {sidebarItems.map(item => (
              <motion.button
                key={item.key}
                whileHover={{ scale: 1.02 }}
                className={clsx(
                  "group w-full flex items-center gap-3 px-3 py-2 rounded-lg",
                  isDark ? "hover:bg-slate-800 text-slate-200" : "hover:bg-gray-100 text-gray-700"
                )}
              >
                <div className="text-slate-300">{item.icon}</div>
                <span className={clsx("text-sm transition-all", sidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden")}>
                  {item.label}
                </span>
              </motion.button>
            ))}
          </nav>

          {/* RODAPÉ: perfil + toggle removido daqui (moved to navbar) */}
          <div className={clsx("px-3 py-3 border-t", isDark ? "border-slate-800" : "border-gray-200")}>
            <div className="flex items-center gap-3">
              <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center border", isDark ? "bg-slate-900 border-slate-700" : "bg-gray-100 border-gray-200")}>
                <User size={18} />
              </div>
              <div className={clsx("transition-all", sidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden")}>
                <p className={clsx("text-sm font-medium", isDark ? "text-white" : "text-gray-900")}>André Silva</p>
                <p className={clsx("text-xs", subtleText)}>Analista de Dados</p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* MAIN */}
      <div className={clsx("flex-1 p-6 overflow-auto")}>
        {/* HEADER (navbar) */}
        <div className={clsx("flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6", navHighlight, isDark ? "rounded-lg p-3" : "rounded-lg p-3 shadow-sm")}>
          <div>
            <h1 className={clsx("text-2xl font-semibold", isDark ? "text-white" : "text-gray-900")}>Painel Corporativo</h1>
            <div className="flex items-center gap-3">
              <p className={clsx("text-sm", subtleText)}>Visão consolidada • dados simulados</p>
              <span className={clsx("text-sm", "text-gray-400")}>•</span>
              <a href="https://linkedin.com/in/andrepimentelsantos01" target="_blank" rel="noreferrer" className="text-sm text-blue-500 hover:underline">@andrepimentelsantos01</a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* THEME TOGGLE (moved to navbar, before search) */}
            <div className="flex items-center">
              <ThemeToggle theme={theme} setTheme={setTheme} isDark={isDark} />
            </div>

            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pesquisar métricas..."
                className={clsx("rounded-full px-4 py-2 pr-10 text-sm", inputBg)}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
                <Search size={16} />
              </div>
            </div>

            <div className={clsx("flex items-center gap-2 rounded-lg px-3 py-1", inputBg)}>
              <Clock size={16} className={clsx(isDark ? "text-slate-300" : "text-gray-500")} />
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="bg-transparent outline-none text-sm"
              >
                <option value="all">Últimos 12 meses</option>
                <option value="first-half">1º Semestre</option>
                <option value="second-half">2º Semestre</option>
              </select>
            </div>

            <div className={clsx("flex items-center gap-2 rounded-lg px-3 py-1", inputBg)}>
              <span className="text-sm">Métrica</span>
              <select
                value={metric}
                onChange={(e) => setMetric(e.target.value)}
                className="bg-transparent outline-none text-sm"
              >
                <option value="sales">Vendas</option>
                <option value="revenue">Receita</option>
                <option value="profit">Lucro</option>
              </select>
            </div>
          </div>
        </div>

        {/* CARDS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          {[
            { title: "Receita", value: "R$1.200.000", delta: "+8.2%", color: isDark ? "bg-gradient-to-r from-sky-600 to-indigo-600" : "bg-gradient-to-r from-blue-400 to-indigo-500" },
            { title: "Lucro Projetado", value: "R$8.500.000", delta: "+3.1%", color: isDark ? "bg-gradient-to-r from-emerald-600 to-cyan-600" : "bg-gradient-to-r from-emerald-400 to-cyan-400" },
            { title: "Clientes Ativos", value: "4.500", delta: "+1.8%", color: isDark ? "bg-gradient-to-r from-violet-600 to-fuchsia-600" : "bg-gradient-to-r from-violet-400 to-fuchsia-400" },
            { title: "Lucro Líquido", value: "R$312.000", delta: "-0.8%", color: isDark ? "bg-gradient-to-r from-slate-600 to-slate-700" : "bg-gradient-to-r from-gray-200 to-gray-300" },
          ].map((c, i) => (
            <motion.div key={i} variants={cardVariants} whileHover={{ y: -4 }} className={clsx("rounded-xl p-4 shadow-md", c.color)}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/90">{c.title}</p>
                  <p className="text-2xl font-bold text-white">{c.value}</p>
                </div>
                <div className="text-sm text-white/80">{c.delta}</div>
              </div>
              <div className="mt-3 text-xs text-white/70">Resumo • últimos 30 dias</div>
            </motion.div>
          ))}
        </motion.div>

        {/* GRID DE GRÁFICOS */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          {/* LINE */}
          <motion.div variants={cardVariants} className={clsx(cardBg, "p-4 rounded-xl shadow-sm backdrop-blur-sm")}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">
                Tendência — {metric === "sales" ? "Vendas" : metric === "revenue" ? "Receita" : "Lucro"}
              </h3>
              <div className="text-xs" style={{ color: isDark ? "#94a3b8" : "#6b7280" }}>Últimos 12 meses</div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#072639" : "#eef2f6"} />
                <XAxis dataKey="name" stroke={isDark ? "#7b8ea6" : "#6b7280"} />
                <YAxis stroke={isDark ? "#7b8ea6" : "#6b7280"} />
                <Tooltip wrapperStyle={{ background: isDark ? "#071827" : "#ffffff", border: `1px solid ${isDark ? "#0b2330" : "#e6e7eb"}` }} />
                <Legend />
                <Line type="monotone" dataKey={metric} stroke="#60a5fa" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="users" stroke="#7c3aed" strokeWidth={1} strokeDasharray="3 3" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* BAR */}
          <motion.div variants={cardVariants} className={clsx(cardBg, "p-4 rounded-xl shadow-sm backdrop-blur-sm")}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">Comparativo</h3>
              <div className="text-xs" style={{ color: isDark ? "#94a3b8" : "#6b7280" }}>Vendas vs Receita</div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#072639" : "#eef2f6"} />
                <XAxis dataKey="name" stroke={isDark ? "#7b8ea6" : "#6b7280"} />
                <YAxis stroke={isDark ? "#7b8ea6" : "#6b7280"} />
                <Tooltip wrapperStyle={{ background: isDark ? "#071827" : "#ffffff", border: `1px solid ${isDark ? "#0b2330" : "#e6e7eb"}` }} />
                <Legend />
                <Bar dataKey="sales" fill="#06b6d4" />
                <Bar dataKey="revenue" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* AREA */}
          <motion.div variants={cardVariants} className={clsx(cardBg, "p-4 rounded-xl shadow-sm backdrop-blur-sm")}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">Lucro Acumulado</h3>
              <div className="text-xs" style={{ color: isDark ? "#94a3b8" : "#6b7280" }}>Acumulado no período</div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={filteredData}>
                <defs>
                  <linearGradient id="gradProfit" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#072639" : "#eef2f6"} />
                <XAxis dataKey="name" stroke={isDark ? "#7b8ea6" : "#6b7280"} />
                <YAxis stroke={isDark ? "#7b8ea6" : "#6b7280"} />
                <Tooltip wrapperStyle={{ background: isDark ? "#071827" : "#ffffff", border: `1px solid ${isDark ? "#0b2330" : "#e6e7eb"}` }} />
                <Area type="monotone" dataKey="profit" stroke="#7c3aed" fill="url(#gradProfit)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* PIE */}
          <motion.div variants={cardVariants} className={clsx(cardBg, "p-4 rounded-xl shadow-sm backdrop-blur-sm")}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">Participação por Produto</h3>
              <div className="text-xs" style={{ color: isDark ? "#94a3b8" : "#6b7280" }}>Quota de mercado</div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={75} innerRadius={36} label>
                  {pieData.map((entry, idx) => (<Cell key={idx} fill={COLORS[idx % COLORS.length]} />))}
                </Pie>
                <Tooltip wrapperStyle={{ background: isDark ? "#071827" : "#ffffff", border: `1px solid ${isDark ? "#0b2330" : "#e6e7eb"}` }} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* RADAR */}
          <motion.div variants={cardVariants} className={clsx(cardBg, "p-4 rounded-xl shadow-sm backdrop-blur-sm")}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">Desempenho por Área</h3>
              <div className="text-xs" style={{ color: isDark ? "#94a3b8" : "#6b7280" }}>KPI por setor</div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData}>
                <PolarGrid stroke={isDark ? "#072639" : "#eef2f6"} />
                <PolarAngleAxis dataKey="subject" stroke={isDark ? "#7b8ea6" : "#6b7280"} />
                <PolarRadiusAxis stroke={isDark ? "#213243" : "#e6eef8"} />
                <Radar dataKey="A" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.45}/>
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* SCATTER */}
          <motion.div variants={cardVariants} className={clsx(cardBg, "p-4 rounded-xl shadow-sm backdrop-blur-sm")}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">Correlação</h3>
              <div className="text-xs" style={{ color: isDark ? "#94a3b8" : "#6b7280" }}>Comparação de métricas</div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#072639" : "#eef2f6"} />
                <XAxis dataKey="x" stroke={isDark ? "#7b8ea6" : "#6b7280"} />
                <YAxis dataKey="y" stroke={isDark ? "#7b8ea6" : "#6b7280"} />
                <Tooltip wrapperStyle={{ background: isDark ? "#071827" : "#ffffff", border: `1px solid ${isDark ? "#0b2330" : "#e6e7eb"}` }} />
                <Scatter data={scatterData} fill="#06b6d4" />
              </ScatterChart>
            </ResponsiveContainer>
          </motion.div>

          {/* COMPOSED (span full) */}
          <motion.div variants={cardVariants} className={clsx(cardBg, "p-4 rounded-xl shadow-sm backdrop-blur-sm col-span-full md:col-span-2 xl:col-span-3")}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">Visão Geral Combinada</h3>
              <div className="text-xs" style={{ color: isDark ? "#94a3b8" : "#6b7280" }}>Visão consolidada</div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={filteredData}>
                <CartesianGrid stroke={isDark ? "#072639" : "#eef2f6"} />
                <XAxis dataKey="name" stroke={isDark ? "#7b8ea6" : "#6b7280"} />
                <YAxis stroke={isDark ? "#7b8ea6" : "#6b7280"} />
                <Tooltip wrapperStyle={{ background: isDark ? "#071827" : "#ffffff", border: `1px solid ${isDark ? "#0b2330" : "#e6e7eb"}` }} />
                <Legend />
                <Area type="monotone" dataKey="profit" fill="#7c3aed" stroke="#7c3aed"/>
                <Bar dataKey="sales" barSize={18} fill="#06b6d4" />
                <Line type="monotone" dataKey="revenue" stroke="#60a5fa" />
              </ComposedChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>

        {/* FOOTER */}
        <div className={clsx("mt-6 text-xs", isDark ? "text-slate-500" : "text-gray-500")}>
          Dados simulados • Interface demonstrativa • React + Recharts + Framer Motion • Publi: <a href="https://linkedin.com/in/andrepimentelsantos01" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">@andrepimentelsantos01</a>
        </div>
      </div>
    </div>
  );
}

/* ----------------------
   ThemeToggle Component
   placed at bottom of file for single-file convenience
   ---------------------- */
function ThemeToggle({ theme, setTheme, isDark }) {
  // animated sliding toggle
  return (
    <button
      onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")}
      aria-label="Alternar tema"
      title="Alternar tema"
      className={clsx(
        "flex items-center gap-3 px-3 py-1 rounded-full transition-all",
        isDark ? "bg-[#0b1624] border border-slate-700 text-slate-200" : "bg-white border border-gray-200 text-gray-700 shadow-sm"
      )}
    >
      <div className="flex items-center gap-2">
        <div className={clsx("w-10 h-6 rounded-full p-0.5 relative", isDark ? "bg-slate-700" : "bg-gray-200")}>
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={clsx("w-5 h-5 rounded-full bg-white absolute top-0.5")}
            style={{ left: theme === "dark" ? 2 : 22 }}
          />
          {/* icons inside the toggle */}
          <div className="absolute left-1 top-0.5 text-xs" style={{ opacity: theme === "dark" ? 1 : 0 }}>
            <Moon size={12} />
          </div>
          <div className="absolute right-1 top-0.5 text-xs" style={{ opacity: theme === "dark" ? 0 : 1 }}>
            <Sun size={12} />
          </div>
        </div>
      </div>
    </button>
  );
}
