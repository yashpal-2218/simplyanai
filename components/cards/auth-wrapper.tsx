import { Card, CardContent, CardTitle } from "../ui/card";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card className="border-0 shadow-none sm:border sm:shadow-sm w-full max-w-sm px-2 py-4">
      <CardContent className="py-5 flex flex-col">
        <CardTitle className="">Simplyanai</CardTitle>
        {children}
      </CardContent>
    </Card>
  );
}
