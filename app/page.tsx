import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Spotlight from '@/components/Spotlight';
import BalanceCard from '@/components/BalanceCard';
import ProjectCard from '@/components/ProjectCard';
import Notifications from '@/components/Notifications';

const projects = [
  {
    title: 'Wearable AI Health',
    image: '/doctor.jpg',
    summary: 'A wearable health device that monitors body conditions like temperature, hydration, and immunity... more',
    raised: 2500,
    goal: 10000,
  },
  {
    title: 'Agri Robotics',
    image: '/farm.jpg',
    summary: 'Autonomous robots to improve crop monitoring and yields in sustainable farms.',
    raised: 5200,
    goal: 10000,
  },
];

export default function Page() {
  return (
    <div>
      <Header />
      <Sidebar />
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-6 md:grid-cols-[minmax(0,1fr)_420px]">
        <section>
          <Spotlight />
          <div className="mt-3"><BalanceCard /></div>
          <div className="mt-4 flex flex-col gap-4">
            {projects.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </section>
        <aside className="w-full">
          <Notifications />
        </aside>
      </main>
    </div>
  );
}


