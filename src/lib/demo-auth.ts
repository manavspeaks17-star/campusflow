export type DemoRole = "Student" | "Merchant" | "Partner" | "Developer";

export type DemoAccount = {
  role: DemoRole;
  name: string;
  email: string;
  icon: string;
};

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    role: "Student",
    name: "Manav",
    email: "manav@lpu.in",
    icon: "👤",
  },
  {
    role: "Merchant",
    name: "Ridhima Sharma",
    email: "merchant@lpu.in",
    icon: "🏪",
  },
  {
    role: "Partner",
    name: "Altamas Raza",
    email: "partner@lpu.in",
    icon: "🛵",
  },
  {
    role: "Developer",
    name: "Manav",
    email: "dev@campusflow.local",
    icon: "🛠️",
  },
];

export function saveDemoAccount(account: DemoAccount) {
  localStorage.setItem("campusflow_user", JSON.stringify(account));
}

export function getDemoAccount(): DemoAccount | null {
  try {
    const raw = localStorage.getItem("campusflow_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearDemoAccount() {
  localStorage.removeItem("campusflow_user");
}

export function rolePath(role: DemoRole) {
  if (role === "Merchant") return "/merchant";
  if (role === "Partner") return "/partner";
  if (role === "Developer") return "/dev";
  return "/";
}

export function redirectForRole(role: DemoRole) {
  window.location.href = rolePath(role);
}
