import { APP_VERSION } from "../constants";

export function checkAppVersion(): void {
  const storedVersion: string | null = localStorage.getItem("appVersion");

  if (storedVersion !== APP_VERSION) {
    console.log(
      `App version changed from ${storedVersion || "none"} to ${APP_VERSION}`
    );

    handleVersionChange(storedVersion);

    localStorage.setItem("appVersion", APP_VERSION);
  }
}

function handleVersionChange(oldVersion: string | null): void {
  if (!oldVersion) {
    return;
  }

  if (oldVersion.split(".")[0] !== APP_VERSION.split(".")[0]) {
    localStorage.clear();
    console.log("Major update detected — local data cleared.");
  }
}
