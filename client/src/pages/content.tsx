import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const contentItems = [
  { label: "Website Pages", href: "/content/website-pages" },
  { label: "Landing Pages", href: "/content/landing-pages" },
  { label: "Blog", href: "/content/blog" },
  { label: "Podcasts", href: "/content/podcasts" },
  { label: "Case Studies", href: "/content/case-studies" },
  { label: "Embeds", href: "/content/embeds" },
  { label: "Knowledge Base", href: "/content/knowledge-base" },
  { label: "Customer Portal", href: "/content/customer-portal" },
  { label: "Remix", href: "/content/remix" },
  { label: "SEO", href: "/content/seo" },
  { label: "Memberships", href: "/content/memberships" },
  { label: "Design Manager", href: "/content/design-manager" },
];

export default function Content() {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
        <p className="text-muted-foreground">Create and manage your content across different channels.</p>
      </div>

      <Card className="bg-slate-800">
        {contentItems.map((item) => (
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