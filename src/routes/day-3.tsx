import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/day-3")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Coming Soon</div>;
}
