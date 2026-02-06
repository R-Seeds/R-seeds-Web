'use client';
import { Button, Card } from '@/components/ui';
import { Wallet } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BalanceCard() {
  const router = useRouter();
  return (
    <Card className="flex items-center justify-between rounded-2xl p-6 shadow-sm border-gray-50 mb-8 bg-white">
      <div className="flex items-center gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-xl bg-[#e6f9f5] border border-brand/10">
          <Wallet className="text-[#00c399]" size={26} />
        </div>
        <div>
          <div className="text-3xl font-bold tracking-tight text-gray-900">$2,500</div>
          <div className="text-sm font-medium text-gray-400 uppercase tracking-tight">Wallet Balance</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button className="rounded-lg px-5 py-2 whitespace-nowrap bg-brand hover:bg-brand/90 text-white font-bold text-sm shadow-md shadow-brand/10">Request Withdraw</Button>
        <Button
          className="rounded-lg px-5 py-2 whitespace-nowrap bg-brand hover:bg-brand/90 text-white font-bold text-sm shadow-md shadow-brand/10"
          onClick={() => router.push('/graduate/add-new-project')}
        >
          Add project
        </Button>
      </div>
    </Card>
  );
}


