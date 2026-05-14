/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Zap, 
  Globe, 
  Cpu, 
  Search, 
  Menu, 
  X, 
  ChevronRight,
  Github,
  Twitter,
  Database,
  Cloud,
  Eye,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("features");
  
  // AI Security Check State
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runAnalysis = async () => {
    if (!input.trim()) return;
    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze the following suspicious behavior, file description, or URL for potential security threats. Be concise and professional: "${input}"`,
        config: {
          systemInstruction: "You are a senior cybersecurity expert. Analyze potential threats and provide brief, actionable advice."
        }
      });
      setAnalysis(response.text || "No specific threat detected based on the description.");
    } catch (error) {
      console.error("AI Analysis Error:", error);
      setAnalysis("Error connecting to AI Security module. Please try again later.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-teal-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 backdrop-blur-md bg-slate-950/50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="p-2 bg-teal-500/10 rounded-xl border border-teal-500/20 group-hover:bg-teal-500/20 transition-all">
                <ShieldCheck className="w-8 h-8 text-teal-400" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400">
                CYPHERGUARD
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-medium text-slate-400 hover:text-teal-400 transition-colors">实时防御</a>
              <a href="#" className="text-sm font-medium text-slate-400 hover:text-teal-400 transition-colors">隐私保护</a>
              <a href="#" className="text-sm font-medium text-slate-400 hover:text-teal-400 transition-colors">企业方案</a>
              <a href="#" className="text-sm font-medium text-slate-400 hover:text-teal-400 transition-colors">关于我们</a>
              <button className="px-6 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg transition-all transform active:scale-95 shadow-lg shadow-teal-500/20">
                立即下载
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-400">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900 border-b border-slate-800"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                <a href="#" className="block px-3 py-4 text-base font-medium text-slate-300 border-b border-slate-800">实时防御</a>
                <a href="#" className="block px-3 py-4 text-base font-medium text-slate-300 border-b border-slate-800">隐私保护</a>
                <a href="#" className="block px-3 py-4 text-base font-medium text-slate-300 border-b border-slate-800">企业方案</a>
                <button className="w-full mt-4 bg-teal-500 text-slate-950 font-bold py-4 rounded-xl">
                  立即下载
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-widest mb-6">
                <Zap className="w-3 h-3" /> 下一代智能防护
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tighter mb-8 italic">
                重塑数字 <br />
                <span className="text-teal-400">安全边界</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-lg mb-10 leading-relaxed">
                CypherGuard 结合顶级 AI 威胁感知技术，为您提供毫秒级的全方位病毒防护、隐私加密与网络防火墙解决方案。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-teal-500/20">
                  免费体验 <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-slate-900 border border-slate-800 hover:border-slate-600 font-bold rounded-xl transition-all">
                  查看企业套件
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: "spring" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-teal-500/20 blur-[100px] rounded-full animate-pulse" />
              <img 
                src="https://picsum.photos/seed/security/800/800" 
                alt="Security Hero"
                className="relative rounded-3xl border border-slate-800 shadow-2xl skew-y-3 transform grayscale opacity-80"
                referrerPolicy="no-referrer"
              />
              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 p-5 bg-slate-900/80 backdrop-blur border border-slate-700 rounded-2xl shadow-2xl hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <ShieldCheck className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">实时状态</p>
                    <p className="text-sm font-bold text-green-400">完全受保护</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Feature Tabs */}
        <section className="bg-slate-900/30 border-y border-slate-800/50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">全方位的防护矩阵</h2>
              <p className="text-slate-500">不仅仅是查杀病毒，更是建立一套完整的数字免疫系统。</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Search, title: "实时感知", desc: "毫秒级捕捉已知与未知威胁", color: "teal" },
                { icon: Globe, title: "网络墙", desc: "端到端加密，阻断恶意域名", color: "blue" },
                { icon: Database, title: "隐私金库", desc: "敏感数据的高强度动态加密", color: "purple" },
                { icon: Cpu, title: "性能优化", desc: "极低系统占用，释放算力潜能", color: "orange" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl hover:border-teal-500/50 hover:bg-teal-500/[0.02] transition-all"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-${feature.color}-500/10 flex items-center justify-center mb-6 border border-${feature.color}-500/20`}>
                    <feature.icon className={`text-${feature.color}-400 w-6 h-6`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Security Analysis Module */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-[2rem] p-8 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
              <Cpu className="w-64 h-64" />
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start relative z-10">
              <div>
                <h2 className="text-4xl font-extrabold mb-6 leading-tight italic">
                  人工智能 <br /> <span className="text-teal-400">漏洞分析实验室</span>
                </h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  怀疑某个链接或是奇怪的文件行为？输入其详细描述，我们的 AI 安全专家将实时为您分析潜在风险。
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-800/30 rounded-2xl border border-slate-700 flex items-start gap-3">
                    <AlertCircle className="text-teal-400 mt-1 shrink-0" />
                    <p className="text-sm text-slate-400">AI 分析结果仅供参考，请结合实际安全规范进行操作。</p>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-inner">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="例如：收到了一个关于中奖的链接：https://fake.site/win..."
                    className="w-full h-32 bg-transparent border-none text-slate-200 placeholder:text-slate-600 focus:ring-0 resize-none font-mono text-sm"
                  />
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-[10px] uppercase tracking-widest text-slate-600 font-bold">Secure Input Channel</span>
                    <button 
                      onClick={runAnalysis}
                      disabled={isAnalyzing || !input}
                      className="px-6 py-2 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold rounded-lg transition-all flex items-center gap-2"
                    >
                      {isAnalyzing ? (
                        <>分析中... <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Cpu className="w-4 h-4" /></motion.div></>
                      ) : (
                        <>开始安全分析</>
                      )}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {analysis && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-6 bg-teal-500/5 border border-teal-500/20 rounded-2xl"
                    >
                      <h4 className="text-teal-400 font-bold text-sm mb-3 uppercase tracking-widest">专家诊断报告</h4>
                      <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap italic">
                         "{analysis}"
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Global Security Network */}
        <section className="py-24 overflow-hidden relative border-t border-slate-900">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="inline-block p-4 bg-blue-500/10 rounded-full mb-8">
                <Globe className="w-12 h-12 text-blue-400 animate-pulse" />
              </div>
              <h2 className="text-4xl font-bold mb-6">全球安全防御网络</h2>
              <p className="text-slate-400 max-w-2xl mx-auto mb-12">
                连接全球 200+ 数据中心，实时同步威胁数据库。无论身在何处，CypherGuard 都在为您守卫。
              </p>
              
              {/* Trust Logos Simulated */}
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                <div className="flex items-center gap-2 font-black text-2xl tracking-tighter italic">DEFCON</div>
                <div className="flex items-center gap-2 font-black text-2xl tracking-tighter italic">OWASP</div>
                <div className="flex items-center gap-2 font-black text-2xl tracking-tighter italic">NIST</div>
                <div className="flex items-center gap-2 font-black text-2xl tracking-tighter italic">ISO 27001</div>
              </div>
           </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-950 border-t border-slate-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <ShieldCheck className="w-8 h-8 text-teal-400" />
                  <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400">
                    CYPHERGUARD
                  </span>
                </div>
                <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                  提供全球领先的 AI 驱动安全解决方案。致力于保护人类的每一个比特。
                </p>
              </div>
              <div>
                <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-slate-400">产品</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li><a href="#" className="hover:text-teal-400">桌面端防护</a></li>
                  <li><a href="#" className="hover:text-teal-400">移动端防火墙</a></li>
                  <li><a href="#" className="hover:text-teal-400">企业级路由</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-slate-400">支持</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li><a href="#" className="hover:text-teal-400">安全文档</a></li>
                  <li><a href="#" className="hover:text-teal-400">API 参考</a></li>
                  <li><a href="#" className="hover:text-teal-400">漏洞提交</a></li>
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-slate-900 text-xs text-slate-600 flex flex-col md:flex-row justify-between items-center gap-4">
              <p>© 2026 CypherGuard AI Security Inc. 保留所有权利。</p>
              <div className="flex gap-6 text-sm">
                <Github className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                <Twitter className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
