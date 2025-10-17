import Image from 'next/image';
import { Card, Button } from './ui';
import { Heart, MessageCircle, Bookmark, Share2, Ellipsis } from 'lucide-react';

type Project = {
  title: string;
  image: string;
  summary: string;
  raised: number;
  goal: number;
};

export default function ProjectCard({ project }: { project: Project }) {
  const progress = Math.min(100, Math.round((project.raised / project.goal) * 100));
  return (
    <Card className="overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between px-4 pt-3">
        <div className="flex items-center gap-3">
          <Image src="/microguard.jpg" alt="MicroGuard" width={32} height={32} className="h-8 w-8 rounded-full object-cover" />
          <div className="text-base font-semibold">MicroGuard</div>
        </div>
        <Ellipsis className="text-slate-500" size={18} />
      </div>
      <div className="relative mx-4 mt-3 h-[320px] overflow-hidden rounded-2xl">
        <Image src={project.image} alt={project.title} fill className="object-cover" />
      </div>

      {/* floating actions */}
      <div className="relative mx-4 -mt-6 flex justify-center">
        <div className="glass flex gap-10 rounded-2xl px-6 py-3 shadow-card">
          <div className="flex flex-col items-center text-brand">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-brand/15">
              <Heart size={22} />
            </div>
            <div className="mt-1 text-xs text-slate-600">123k</div>
          </div>
          <div className="flex flex-col items-center text-brand">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-brand/15">
              <MessageCircle size={22} />
            </div>
            <div className="mt-1 text-xs text-slate-600">200</div>
          </div>
          <div className="flex flex-col items-center text-brand">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-brand/15">
              <Bookmark size={22} />
            </div>
            <div className="mt-1 text-xs text-slate-600">Save</div>
          </div>
          <div className="flex flex-col items-center text-brand">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-brand/15">
              <Share2 size={22} />
            </div>
            <div className="mt-1 text-xs text-slate-600">200</div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-5 pt-4">
        <p className="text-[15px] text-slate-700">{project.summary}</p>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-brand" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-sm text-slate-700">Raised ${project.raised.toLocaleString()} of ${project.goal.toLocaleString()}</div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-full border-brand text-brand hover:bg-brand/5">View Project</Button>
            <Button className="rounded-full">Follow</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}


