import { developer } from "@/data/portfolio";
import { Award, Calendar } from "lucide-react";
import { certificates } from "@/data/portfolio";

export function AboutPanel() {
  return (
    <section id="about" className="panel">
      <div className="panel-header">
        <p className="panel-title">About Me</p>
      </div>
      <div className="panel-body">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <p className="text-sm leading-relaxed text-foreground-muted">{developer.bio}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-muted">
                <Calendar size={14} className="text-primary" /> {developer.experience} Experience
              </span>
              <span className="text-muted">{developer.location}</span>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-surface-2 p-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">Quick Facts</p>
            <ul className="space-y-2 text-sm">
              <li className="break-words"><span className="text-muted">Role:</span> {developer.role}</li>
              <li className="break-all"><span className="text-muted">Email:</span> {developer.email}</li>
              <li className="break-words"><span className="text-muted">Phone:</span> {developer.phone}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AchievementsPanel() {
  return (
    <section id="achievements" className="panel">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <Award size={16} className="text-primary" />
          <p className="panel-title">Education</p>
        </div>
      </div>
      <div className="panel-body">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <div key={cert.id} className="rounded-xl border border-border p-4 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Award size={20} className="text-primary" />
              </div>
              <p className="text-sm font-semibold">{cert.title}</p>
              <p className="text-xs text-muted">{cert.issuer}</p>
              <p className="mt-1 text-[10px] text-primary">{cert.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
