import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const libraryItems = [
  { label: "Templates", href: "/library/templates" },
  { label: "Meetings Scheduler", href: "/library/meetings" },
  { label: "Files", href: "/library/files" },
  { label: "Documents", href: "/library/documents" },
  { label: "Google Trends Explorer", href: "/library/trends" },
  { label: "Playbooks", href: "/library/playbooks" },
  { label: "Snippets", href: "/library/snippets" },
  { label: "Coaching Playlists", href: "/library/coaching" },
];

export default function Library() {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Library</h1>
        <p className="text-muted-foreground">Access your templates, documents, and resources</p>
      </div>

      <Card className="bg-slate-800">
        {libraryItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <a className={cn(
              "block px-6 py-5 mt-[1px] text-gray-100 transition-all duration-200 hover:bg-slate-700/50",
              "text-sm font-medium border-b border-slate-700/50 last:border-0"
            )}>
              {item.label}
            </a>
          </Link>
        ))}
      </Card>
    </div>
  );
}