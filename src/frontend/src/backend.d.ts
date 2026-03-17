import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface LeadSubmission {
    source: string;
    name: string;
    businessName: string;
    phone: string;
    location?: string;
}
export interface backendInterface {
    getAllLeads(): Promise<Array<LeadSubmission>>;
    getMyLeads(): Promise<Array<LeadSubmission>>;
    submitLead(name: string, phone: string, businessName: string, location: string | null, source: string): Promise<void>;
}
