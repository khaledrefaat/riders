import { notFound } from "next/navigation";

export default function CatchAllPage() {
  // This will trigger the not-found.tsx component
  notFound();
}
