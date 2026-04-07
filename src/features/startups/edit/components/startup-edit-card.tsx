
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit3 } from "lucide-react";
import Link from "next/link";

interface StartupEditCardProps {
    startupId: string;
    title: string;
    children: React.ReactNode;
}

export function StartupEditCard({ startupId, title, children }: StartupEditCardProps) {
    return (
        <div className="min-h-screen bg-background pb-20 pt-4">
            <main className="max-w-4xl mx-auto p-4 sm:p-6">
                <Link href={`/startups/${startupId}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold">Back to Startup</span>
                </Link>

                <div className="space-y-8">
                    <h1 className="text-4xl font-headline font-bold">Edit Startup</h1>
                    
                    <Card className="rounded-[2.5rem] border-none shadow-2xl bg-white overflow-hidden">
                        <CardHeader className="p-8 border-b bg-muted/20">
                            <CardTitle className="flex items-center gap-3 text-xl"><Edit3 className="w-6 h-6 text-primary" /> {title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            {children}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
