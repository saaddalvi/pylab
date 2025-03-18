import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 py-6 md:py-0">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-24">
        <p className="text-center md:text-left text-sm leading-loose text-muted-foreground">
          © 2023 PyLab. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Terms
          </a>
          <Separator orientation="vertical" className="h-4" />
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Privacy
          </a>
          <Separator orientation="vertical" className="h-4" />
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
} 