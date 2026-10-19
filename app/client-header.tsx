"use client";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export function ClientHeader() {
    return (
        <header className="flex h-16 items-center justify-end gap-4 border-b p-4">
            <Show when="signed-out">
                <SignInButton />
                <SignUpButton />
            </Show>
            <Show when="signed-in">
                <UserButton />
            </Show>
        </header>
    );
}
