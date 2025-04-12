import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/day-2")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Coming Soon</div>;
}
