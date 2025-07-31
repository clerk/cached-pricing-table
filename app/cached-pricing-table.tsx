import { PricingTable } from "@/components/ui/pricing-table";
import { createClerkClient } from "@clerk/nextjs/server";

import { unstable_cacheLife as cacheLife } from "next/cache";
import { unstable_cacheTag as cacheTag } from "next/cache";

const client = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
});

export async function PricingTableWithData() {
    "use cache";
    cacheLife({
        stale: 3600, // 1 hour
        revalidate: 30 * 24 * 3600, // 30 days
    });
    cacheTag("pricing-table");

    const { data } = await client.billing
        .getPlanList()
        .then((list) => ({
            data: list.data
                .map((plan) => ({
                    ...plan,
                    features: plan.features.map((feature) => ({ ...feature })),
                }))
                .filter((plan) => plan.forPayerType === "user"),
        }))
        .catch(() => ({ data: [] }));

    return (
        <>
            Last updated at: {new Date().toISOString()}
            <PricingTable plans={data} />
        </>
    );
}
