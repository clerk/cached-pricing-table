"use client";

import { CommercePlan } from "@clerk/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Check, CircleHelp } from "lucide-react";
import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

import {
    CheckoutButton,
    SubscriptionDetailsButton,
    useSubscription,
} from "@clerk/nextjs/experimental";

import { SignedOut, SignInButton, useAuth, useClerk } from "@clerk/nextjs";

const ANNUAL_DISCOUNT = 20;

const PlanCTA = ({ plan }: { plan: CommercePlan }) => {
    const { data: subscription } = useSubscription();
    const { userId } = useAuth();
    const { loaded } = useClerk();
    const { selectedBillingPeriod } = useContext(PeriodContext);

    const isSubscribed = useMemo(() => {
        return subscription?.subscriptionItems.some(
            (item) => item.plan.id === plan.id
        );
    }, [subscription?.subscriptionItems, plan]);

    if (isSubscribed) {
        return (
            <SubscriptionDetailsButton>
                <Button variant="outline" size="lg" className="mt-6 w-full">
                    Manage Subscription
                </Button>
            </SubscriptionDetailsButton>
        );
    }

    if (!loaded || !userId) {
        return (
            <SignInButton>
                <Button variant="default" size="lg" className="mt-6 w-full">
                    Get started
                </Button>
            </SignInButton>
        );
    }

    return (
        <CheckoutButton planId={plan.id} planPeriod={selectedBillingPeriod}>
            <Button variant="default" size="lg" className="mt-6 w-full">
                {userId ? "Subscribe" : "Get started"}
            </Button>
        </CheckoutButton>
    );
};

const PlanCard = ({
    plan,
    isPopular,
}: {
    plan: CommercePlan;
    isPopular: boolean;
}) => {
    const { selectedBillingPeriod } = useContext(PeriodContext);

    const isMonthlyOnly = plan.hasBaseFee && plan.annualFee.amount === 0;

    return (
        <div
            key={plan.name}
            className={cn(
                "relative flex min-w-[300px] flex-col rounded-xl border p-6 shadow-sm",
                {
                    "border-primary border-[2px] py-10": isPopular,
                }
            )}
        >
            {isPopular && (
                <Badge className="absolute right-1/2 top-0 -translate-y-1/2 translate-x-1/2">
                    Most Popular
                </Badge>
            )}
            <h3 className="text-lg font-medium">{plan.name}</h3>
            <p className="text-muted-foreground text-sm">{plan.description}</p>
            <p className="my-4 text-4xl font-bold">
                $
                {selectedBillingPeriod === "month" || isMonthlyOnly
                    ? plan.fee.amountFormatted
                    : plan.annualMonthlyFee.amountFormatted}
                <span className="text-muted-foreground ml-1.5 text-sm font-normal">
                    /month
                </span>
            </p>

            {isMonthlyOnly && (
                <p className="text-muted-foreground text-xs">
                    Only billed monthly
                </p>
            )}

            <Separator className="my-4" />

            <ul className="space-y-3">
                {plan.features.map((feature) => (
                    <li
                        key={feature.id}
                        className="flex items-center gap-1.5 text-sm"
                    >
                        <Check className="h-4 w-4" />
                        {feature.name}
                        {feature.description && (
                            <Tooltip>
                                <TooltipTrigger className="cursor-help">
                                    <CircleHelp className="mt-1 h-4 w-4 text-gray-500" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    {feature.description}
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </li>
                ))}
            </ul>
            <PlanCTA plan={plan} />
        </div>
    );
};

const PeriodContext = createContext<{
    selectedBillingPeriod: "month" | "annual";
    setSelectedBillingPeriod: (period: "month" | "annual") => void;
}>({
    selectedBillingPeriod: "month",
    setSelectedBillingPeriod: () => {},
});

const PeriodProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedBillingPeriod, setSelectedBillingPeriod] = useState<
        "month" | "annual"
    >("month");

    return (
        <PeriodContext.Provider
            value={{ selectedBillingPeriod, setSelectedBillingPeriod }}
        >
            {children}
        </PeriodContext.Provider>
    );
};
const PeriodToggle = () => {
    const { selectedBillingPeriod, setSelectedBillingPeriod } =
        useContext(PeriodContext);

    const onValueChange = useCallback(
        (value: string) => {
            setSelectedBillingPeriod(value as "month" | "annual");
        },
        [setSelectedBillingPeriod]
    );
    return (
        <Tabs
            value={selectedBillingPeriod}
            onValueChange={onValueChange}
            className="mt-8"
        >
            <TabsList>
                <TabsTrigger value="month">Monthly</TabsTrigger>
                <TabsTrigger value="annual">
                    Annually (Save {ANNUAL_DISCOUNT}%)
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
};

/**
 * This is a pricing table component that uses the Clerk API to fetch the plans and subscription details.
 *
 * Data are fetched are fetched client side, it is a adviced that you display a skeleton via the `fallback` prop.
 */
export const PricingTable = ({ plans }: { plans: CommercePlan[] }) => {
    // Prefetch subscripton
    useSubscription();

    return (
        <div className="flex flex-col items-center justify-center px-6 py-12">
            <PeriodProvider>
                <PeriodToggle />
                <div className="mx-auto mt-12 grid max-w-screen-lg grid-cols-1 items-center gap-8 lg:grid-cols-3">
                    {plans.map((plan) => (
                        <PlanCard
                            key={plan.id}
                            plan={plan}
                            isPopular={plan.slug === "pro"}
                        />
                    ))}
                </div>
            </PeriodProvider>
        </div>
    );
};
