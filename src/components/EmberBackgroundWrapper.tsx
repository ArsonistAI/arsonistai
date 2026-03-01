"use client";

import dynamic from "next/dynamic";

const EmberBackground = dynamic(() => import("@/components/EmberBackground"), {
  ssr: false,
  loading: () => null,
});

export default function EmberBackgroundWrapper() {
  return <EmberBackground />;
}
