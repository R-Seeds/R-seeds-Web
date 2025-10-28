'use client'
import { Button, Card } from '../../components/ui';
import { Wallet } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BalanceCard() {
  const router = useRouter();
  return (
    <Card className="flex items-center justify-between rounded-2xl p-6 shadow-card">
      <div className="flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-brand/10">
          <Wallet className="text-brand" size={28} />
        </div>
        <div>
          <div className="text-4xl font-semibold tracking-tight">$2,500</div>
          <div className="-mt-1 text-lg text-slate-500">Wallet Balance</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button className="rounded-full px-6 py-2">Request Withdraw</Button>
        <Button
          className="rounded-full px-6 py-2"
          variant="primary"
          onClick={() => router.push('/graduate/add-new-project')}
        >
          Add project
        </Button>
      </div>
    </Card>
  );
}


