'use client';

export default function Features() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: "Zero Data Storage",
      description: "Your messages are processed in real-time and immediately discarded. We never log, store, or track your content.",
      highlight: "100% Privacy"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
      title: "Instant Processing",
      description: "AI-powered rewriting happens in milliseconds. No waiting, no delays - just instant tone transformation.",
      highlight: "Lightning Fast"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="3.27 6.96 12 12.01 20.73 6.96" />
          <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      title: "6 Tone Options",
      description: "Professional, Friendly, Casual, Comedy, Polite, and Confident - choose the perfect tone for every situation.",
      highlight: "Versatile"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="9" y1="9" x2="15" y2="15" />
          <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="15" y1="9" x2="9" y2="15" />
        </svg>
      ),
      title: "No Copy-Paste",
      description: "Works directly in your message box on WhatsApp, Telegram, and LinkedIn. Seamless integration, zero friction.",
      highlight: "Seamless"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="14 2 14 8 20 8" />
          <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="16" y1="13" x2="8" y2="13" />
          <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="16" y1="17" x2="8" y2="17" />
          <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="10 9 9 9 8 9" />
        </svg>
      ),
      title: "English Only",
      description: "Optimized for English text processing. Smart detection ensures only English messages are rewritten.",
      highlight: "Focused"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L2 7l10 5 10-5-10-5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 17l10 5 10-5" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12l10 5 10-5" />
        </svg>
      ),
      title: "Open Source Ready",
      description: "Built with transparency in mind. Review our code, contribute, and verify our privacy commitments yourself.",
      highlight: "Transparent"
    }
  ];

  const privacyProofs = [
    {
      icon: "🔒",
      title: "No Database",
      description: "We don't have a database to store messages. Architecturally impossible to log your data."
    },
    {
      icon: "⚡",
      title: "Stateless API",
      description: "Our API processes requests without maintaining any session or user data."
    },
    {
      icon: "🛡️",
      title: "Local Processing",
      description: "Text detection and validation happen in your browser before any API call."
    },
    {
      icon: "🔍",
      title: "Open Source",
      description: "Audit our code yourself. Complete transparency in how we handle your messages."
    }
  ];

  return (
    <>
      {/* Features Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Powerful Features,
              <br />
              <span className="text-gradient">Uncompromising Privacy</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to communicate better, with absolute privacy protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="relative p-8 bg-[#1a1a2e] rounded-2xl border border-white/5 hover:bg-[#252540] hover:border-purple-500/30 hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl text-white">
                  {feature.icon}
                </div>

                {/* Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs text-purple-300 font-semibold">
                  {feature.highlight}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 text-center">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Proof Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-transparent to-purple-500/5">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            {/* Shield Icon */}
            <div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500 rounded-full text-white animate-pulse-glow">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
              </svg>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Your Privacy is <span className="text-gradient">Sacred</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              We've built ProseAI from the ground up with privacy as the foundation.
              <br />
              Here's our technical proof that we never store your messages:
            </p>
          </div>

          {/* Privacy Proofs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {privacyProofs.map((proof, index) => (
              <div key={index} className="glass p-8 rounded-2xl text-center">
                <div className="text-5xl mb-4">{proof.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{proof.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{proof.description}</p>
              </div>
            ))}
          </div>

          {/* Privacy Guarantee */}
          <div className="max-w-4xl mx-auto">
            <div className="glass p-12 rounded-3xl border-2 border-purple-500/30">
              <h3 className="text-3xl font-bold text-gradient text-center mb-8">
                Our Privacy Guarantee
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-lg text-white">Messages are processed in-memory only</span>
                </div>
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-lg text-white">No logging, tracking, or analytics on message content</span>
                </div>
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-lg text-white">API keys are secured and never exposed to client</span>
                </div>
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-lg text-white">Complete source code transparency</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
