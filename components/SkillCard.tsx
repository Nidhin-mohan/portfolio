type SkillCardProps = {
  title: string;
  skills: string[];
};

export default function SkillCard({ title, skills }: SkillCardProps) {
  return (
    <div className="rounded-xl border border-border bg-background p-6 shadow-sm transition-shadow hover:shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-primary">{title}</h3>
      <ul className="space-y-2 text-muted-foreground">
        {skills.map((skill) => (
          <li key={skill} className="text-sm">
            • {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
