import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Array "mo:core/Array";

actor {
  type LeadSubmission = {
    name : Text;
    phone : Text;
    businessName : Text;
    location : ?Text;
    source : Text;
  };

  let submissions = Map.empty<Principal, List.List<LeadSubmission>>();

  public query ({ caller }) func getAllLeads() : async [LeadSubmission] {
    let list = List.empty<LeadSubmission>();
    for ((user, userSubmissions) in submissions.entries()) {
      list.addAll(userSubmissions.values());
    };
    list.toArray();
  };

  public shared ({ caller }) func submitLead(name : Text, phone : Text, businessName : Text, location : ?Text, source : Text) : async () {
    let newLead : LeadSubmission = {
      name;
      phone;
      businessName;
      location;
      source;
    };

    let currentLeads = switch (submissions.get(caller)) {
      case (null) { List.empty<LeadSubmission>() };
      case (?leads) { leads };
    };

    currentLeads.add(newLead);
    submissions.add(caller, currentLeads);
  };

  public query ({ caller }) func getMyLeads() : async [LeadSubmission] {
    switch (submissions.get(caller)) {
      case (null) { Runtime.trap("No submissions found for this user.") };
      case (?userLeads) { userLeads.toArray() };
    };
  };
};
