import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eye, Mic, Keyboard, ShieldCheck, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 bg-background relative">
      <div className="max-w-4xl w-full relative z-10 py-8 md:py-0 fade-in">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">

          <div className="space-y-6 md:space-y-8 text-left">
            <h1 className="text-4xl md:text-7xl font-bold text-foreground leading-[1.1]">
              Ishihara <span className="text-primary italic">Color Test</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Standardized assessment for red-green color vision deficiencies.
              Designed for clinical accuracy and ease of use.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2 md:pt-4">
              <Button
                size="lg"
                onClick={onStart}
                className="px-6 py-6 md:px-8 md:py-7 text-lg md:text-xl font-semibold shadow-2xl shadow-primary/20 premium-gradient hover:scale-[1.02] transition-transform"
              >
                Launch Assessment
              </Button>
            </div>
          </div>

          <div className="relative">
            <Card className="bg-white p-8 md:p-10 space-y-8 border-slate-200 shadow-2xl relative z-20">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  Quick Protocol
                </h2>

                <ul className="space-y-5">
                  {[
                    { icon: Eye, text: "14 Ishihara Plates", detail: "Clinical standard images" },
                    { icon: Mic, text: "Voice Control", detail: "Hands-free interaction" },
                    { icon: Keyboard, text: "Instant Analysis", detail: "Real-time accuracy scoring" }
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{item.text}</p>
                        <p className="text-xs text-muted-foreground">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-[12px] leading-relaxed text-muted-foreground italic">
                  "This tool provides a rapid screening for red-green deficiencies. Consult a specialist for formal diagnosis."
                </p>
              </div>
            </Card>

            <div className="absolute top-4 -right-4 w-full h-full bg-primary/5 rounded-[var(--radius)] -z-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
