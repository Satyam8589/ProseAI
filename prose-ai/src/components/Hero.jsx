'use client';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center py-24 md:py-32 overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] -top-[10%] -left-[10%] rounded-full bg-purple-600/30 blur-[100px] animate-float" />
        <div className="absolute w-[400px] h-[400px] top-[20%] -right-[5%] rounded-full bg-blue-500/30 blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute w-[350px] h-[350px] -bottom-[10%] left-[50%] rounded-full bg-cyan-500/30 blur-[100px] animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in-up">
          {/* Privacy Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 mb-8 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 text-sm font-semibold animate-pulse-glow">
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>100% Privacy Guaranteed - Zero Data Storage</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transform Your Messages
            <br />
            <span className="text-gradient">With AI-Powered Tone</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Rewrite your messages instantly in any tone - professional, friendly, casual, or comedy.
            <br />
            <strong className="text-gradient font-semibold">Your privacy is sacred. We never store your messages.</strong>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={() => {
                alert('📦 Installation Instructions:\n\n1. Open Chrome and go to chrome://extensions/\n2. Enable "Developer mode" (top right)\n3. Click "Load unpacked"\n4. Select the folder: d:\\ProseAI\\prose-ai\\extension\n5. Done! The extension is now installed.\n\n✨ Then open WhatsApp, Telegram, or LinkedIn to use ProseAI!');
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:-translate-y-1 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Install Extension
            </button>
            <button 
              onClick={() => {
                document.querySelector('.glass')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-purple-500 text-white font-semibold rounded-xl hover:bg-purple-500 hover:-translate-y-1 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polygon strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="5 3 19 12 5 21 5 3" />
              </svg>
              Watch Demo
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-gradient mb-2">0</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Messages Stored</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-gradient mb-2">100%</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Privacy Protected</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-gradient mb-2">Instant</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Processing</div>
            </div>
          </div>
        </div>

        {/* Demo Visual */}
        <div className="max-w-4xl mx-auto animate-fade-in-up-delayed">
          <div className="glass p-8 rounded-3xl">
            {/* Demo Header */}
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-gray-400 font-semibold">Message Rewriter</span>
            </div>

            {/* Demo Content */}
            <div className="space-y-6 mb-8">
              {/* Original Message */}
              <div className="p-6 bg-[#0f0f1e]/50 rounded-xl border border-white/5">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Original Message:</p>
                <p className="text-lg text-white">"hey can you send me that file"</p>
              </div>

              {/* Arrow */}
              <div className="text-center">
                <svg className="w-6 h-6 mx-auto text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              {/* Rewritten Message */}
              <div className="p-6 bg-[#0f0f1e]/50 rounded-xl border border-white/5">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Professional Tone:</p>
                <p className="text-lg text-gradient font-semibold">"Could you please share that file with me at your earliest convenience?"</p>
              </div>
            </div>

            {/* Tone Chips */}
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm rounded-full font-medium cursor-pointer">
                Professional
              </span>
              <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 text-gray-400 text-sm rounded-full font-medium cursor-pointer hover:bg-purple-500/20 hover:border-purple-500/40 transition-all">
                Friendly
              </span>
              <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 text-gray-400 text-sm rounded-full font-medium cursor-pointer hover:bg-purple-500/20 hover:border-purple-500/40 transition-all">
                Casual
              </span>
              <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 text-gray-400 text-sm rounded-full font-medium cursor-pointer hover:bg-purple-500/20 hover:border-purple-500/40 transition-all">
                Comedy
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
