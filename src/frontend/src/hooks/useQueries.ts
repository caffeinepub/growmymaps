import { useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitLead() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      phone: string;
      businessName: string;
      location: string;
      source: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitLead(
        data.name,
        data.phone,
        data.businessName,
        data.location || null,
        data.source,
      );
    },
  });
}
