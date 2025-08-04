import { PricingTableWithData } from "./cached-pricing-table";
import { Button } from "@/components/ui/button";
import { revalidatePricingTable } from "./actions";

export default function Home() {
    return (
        <div className="font-sansitems-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px]  items-center sm:items-start">
                <form action={revalidatePricingTable}>
                    <Button>Revalidate Pricing Table</Button>
                </form>

                <PricingTableWithData />
            </main>
        </div>
    );
}
