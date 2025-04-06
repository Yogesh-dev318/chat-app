import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { useState } from "react";
import { Send, Moon, Bell, Shield, Palette, ChevronRight, User, Settings as SettingsIcon } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey there! How's everything going?", isSent: false, time: "11:42 AM" },
  { id: 2, content: "Pretty good! Just finishing up the new design system.", isSent: true, time: "11:45 AM" },
  { id: 3, content: "It's looking fantastic. When do you think it'll be ready to share with the team?", isSent: false, time: "11:48 AM" },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const [activeSection, setActiveSection] = useState("appearance");

  const navigationItems = [
    { id: "appearance", label: "Appearance", icon: <Palette size={20} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={20} /> },
    { id: "security", label: "Security", icon: <Shield size={20} /> },
    { id: "account", label: "Account", icon: <User size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* Header */}
      <header className="bg-base-100 border-b border-base-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <SettingsIcon size={24} />
            Settings
          </h1>
          <button className="btn btn-primary btn-sm">Save Changes</button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-64 shrink-0">
            <nav className="bg-base-100 rounded-xl border border-base-200 overflow-hidden shadow-sm sticky top-24">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`
                    w-full flex items-center justify-between px-5 py-4 text-left transition-all
                    border-l-4 ${activeSection === item.id 
                      ? "border-primary bg-primary/5 text-primary font-medium" 
                      : "border-transparent hover:bg-base-200"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className={activeSection === item.id ? "text-primary" : "text-base-content/70"}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight 
                    size={18} 
                    className={activeSection === item.id ? "text-primary" : "text-base-content/30"} 
                  />
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {activeSection === "appearance" && (
              <div className="space-y-10">
                <div>
                  <h2 className="text-xl font-semibold flex items-center gap-2 mb-1">
                    <Palette size={22} className="text-primary" />
                    Appearance
                  </h2>
                  <p className="text-base-content/60">Customize the look and feel of your chat interface</p>
                </div>

                {/* Theme Selection */}
                <section className="bg-base-100 rounded-xl border border-base-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-base-200">
                    <h3 className="font-medium text-lg mb-1">Theme Selection</h3>
                    <p className="text-sm text-base-content/60">Choose a color theme that suits your style</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {THEMES.map((t) => (
                        <button
                          key={t}
                          onClick={() => setTheme(t)}
                          className={`
                            group flex flex-col p-4 rounded-lg transition-all
                            ${theme === t 
                              ? "bg-base-200 ring-2 ring-primary" 
                              : "hover:bg-base-200 border border-base-200"
                            }
                          `}
                        >
                          <div className="relative h-14 w-full rounded-md overflow-hidden mb-3" data-theme={t}>
                            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1">
                              <div className="rounded bg-primary"></div>
                              <div className="rounded bg-secondary"></div>
                              <div className="rounded bg-accent"></div>
                              <div className="rounded bg-neutral"></div>
                            </div>
                          </div>
                          <span className={`text-sm font-medium ${theme === t ? "text-primary" : ""}`}>
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Preview */}
                <section className="bg-base-100 rounded-xl border border-base-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-base-200">
                    <h3 className="font-medium text-lg mb-1">Preview</h3>
                    <p className="text-sm text-base-content/60">See how your selected theme looks in action</p>
                  </div>
                  
                  <div className="p-6 bg-base-200/50">
                    <div className="max-w-xl mx-auto">
                      {/* Chat Preview */}
                      <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden border border-base-300">
                        {/* Chat Header */}
                        <div className="px-4 py-3 bg-base-100 border-b border-base-200 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="avatar online">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-content flex items-center justify-center font-semibold">
                                A
                              </div>
                            </div>
                            <div>
                              <h3 className="font-medium">Alex Morgan</h3>
                              <p className="text-xs text-base-content/60">Last seen just now</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="btn btn-ghost btn-sm btn-circle">
                              <Moon size={16} />
                            </button>
                            <button className="btn btn-ghost btn-sm btn-circle">
                              <Bell size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="p-4 space-y-4 h-[300px] overflow-y-auto bg-base-100">
                          <div className="text-xs text-center text-base-content/40 my-2">Today</div>
                          
                          {PREVIEW_MESSAGES.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${message.isSent ? "justify-end" : "justify-start"} gap-2`}
                            >
                              {!message.isSent && (
                                <div className="avatar self-end">
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-content flex items-center justify-center text-xs font-semibold">
                                    A
                                  </div>
                                </div>
                              )}
                              
                              <div
                                className={`
                                  max-w-[70%] p-3 shadow-sm
                                  ${message.isSent 
                                    ? "bg-primary text-primary-content rounded-2xl rounded-br-none" 
                                    : "bg-base-200 rounded-2xl rounded-bl-none"
                                  }
                                `}
                              >
                                <p className="text-sm">{message.content}</p>
                                <div className="flex justify-end mt-1">
                                  <p className={`text-xs ${message.isSent ? "text-primary-content/70" : "text-base-content/50"}`}>
                                    {message.time}
                                  </p>
                                </div>
                              </div>
                              
                              {message.isSent && (
                                <div className="avatar self-end">
                                  <div className="w-8 h-8 rounded-full bg-neutral text-neutral-content flex items-center justify-center text-xs font-semibold">
                                    Me
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Chat Input */}
                        <div className="p-3 border-t border-base-200 bg-base-100">
                          <div className="flex items-center gap-2">
                            <button className="btn btn-circle btn-sm btn-ghost">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-base-content/70"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                            </button>
                            <input
                              type="text"
                              className="input input-bordered flex-1 bg-base-200 text-sm h-10 rounded-full border-base-300"
                              placeholder="Type a message..."
                              defaultValue=""
                            />
                            <button className="btn btn-primary h-10 w-10 min-h-0 rounded-full flex items-center justify-center p-0">
                              <Send size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                
                
              </div>
            )}

            {activeSection !== "appearance" && (
              <div className="bg-base-100 rounded-xl border border-base-200 shadow-sm p-8 text-center">
                <div className="max-w-md mx-auto">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center">
                      {activeSection === "notifications" && <Bell size={28} className="text-base-content/60" />}
                      {activeSection === "security" && <Shield size={28} className="text-base-content/60" />}
                      {activeSection === "account" && <User size={28} className="text-base-content/60" />}
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Settings</h3>
                  <p className="text-base-content/60 mb-6">This section is currently under development.</p>
                  <button className="btn btn-outline btn-sm">Coming Soon</button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;