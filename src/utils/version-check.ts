import { APP_VERSION } from "../constants/app";

export function checkAppVersion() {
  const storedVersion = localStorage.getItem("appVersion");

  if (storedVersion !== APP_VERSION) {
    console.log(
      `App version changed from ${storedVersion || "none"} to ${APP_VERSION}`
    );

    handleVersionChange(storedVersion);

    // Update to the new version
    localStorage.setItem("appVersion", APP_VERSION);
  }
}

function handleVersionChange(oldVersion: string | null) {
  if (!oldVersion) {
    return;
  }

  // If major version changed, reset data
  if (oldVersion.split(".")[0] !== APP_VERSION.split(".")[0]) {
    localStorage.clear();
    console.log("Major update detected — local data cleared.");
  }
}
