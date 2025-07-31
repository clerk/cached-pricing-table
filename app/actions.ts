import { revalidateTag } from "next/cache";

async function revalidatePricingTable() {
    "use server";
    console.log("Revalidating pricing table...");
    revalidateTag("pricing-table");
}

export { revalidatePricingTable };
